// Real-anatomy viewer: BodyParts3D 4.0 meshes (CC BY 4.0, see src/models/ATTRIBUTION.md)
// packed as one .bin.gz per source system (tools/repack-by-system.mjs).
// Progressive loading: tier-1 systems (body shape) first, the rest in
// background or on demand. Merged per-system rendering, invisible per-part
// pickers, on-demand highlight, manual clamped wheel zoom.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { getStructure, SYSTEM_OF } from "./anatomy-data.js";

// source-system palette (human-atlas) + material tweaks
const SRC_SYS = [
  ["skeletal", "#e2d9ba"], ["sensory", "#b0c8ce"], ["nervous", "#d8b565"],
  ["connective", "#c9b8a6"], ["muscular", "#a85b50"], ["arterial", "#c05245"],
  ["cardiac", "#b96760"], ["endocrine", "#c9a0c8"], ["venous", "#527c9f"],
  ["digestive", "#cf9a5e"], ["respiratory", "#b98991"], ["lymphatic", "#8fc39a"],
  ["integumentary", "#d9a066"], ["reproductive", "#c58af0"], ["urinary", "#9ad0a5"],
];
// source system -> our browser system (for isolate + tabs)
const SRC_TO_OUR = {
  skeletal: "skeletal", muscular: "muscular", arterial: "cardiovascular",
  venous: "cardiovascular", cardiac: "cardiovascular", nervous: "nervous",
  sensory: "nervous", connective: "muscular", digestive: "digestive",
  respiratory: "respiratory", urinary: "urinary", reproductive: "reproductive",
  lymphatic: "lymphatic", endocrine: "endocrine", integumentary: "integumentary",
};

// Loading tiers: tier 1 gives a recognizable body fast (~17 MB gz),
// tier 2 adds organs/vessels/nerves, tier 3 the small systems.
const TIER1 = ["skeletal", "muscular", "integumentary", "connective"];
const TIER2 = ["nervous", "arterial", "venous", "cardiac", "digestive", "respiratory", "urinary"];
const TIER3 = ["sensory", "endocrine", "lymphatic", "reproductive"];
const SYSTEM_ORDER = [...TIER1, ...TIER2, ...TIER3];
const SYSTEM_RANK = new Map(SYSTEM_ORDER.map((s, i) => [s, i]));

export function createViewer(canvas, opts = {}) {
  const { onPick, onProgress, onError } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
  const HOME_POS = new THREE.Vector3(1.15, 1.05, 3.1);
  const HOME_TGT = new THREE.Vector3(0, 0.85, 0);
  camera.position.copy(HOME_POS);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(HOME_TGT);
  controls.enableDamping = true;
  controls.dampingFactor = 0.085;
  controls.enableZoom = false; // manual wheel zoom below (immune to NaN corruption)
  controls.minDistance = 0.15;
  controls.maxDistance = 12;
  const MAX_POLAR = Math.PI * 0.96;
  controls.maxPolarAngle = MAX_POLAR;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a949e, 1.0));
  const key = new THREE.DirectionalLight(0xfffaf4, 2.2); key.position.set(-2, 4, 3); scene.add(key);
  const rim = new THREE.DirectionalLight(0xe9f0ff, 1.6); rim.position.set(2, 2, -3); scene.add(rim);
  const grid = new THREE.GridHelper(3, 12, 0x2a3a55, 0x1a2540);
  grid.position.y = -0.02; scene.add(grid);

  function healCamera() {
    const p = camera.position, t = controls.target;
    if (!isFinite(p.x + p.y + p.z) || !isFinite(t.x + t.y + t.z)) {
      camera.position.copy(HOME_POS); controls.target.copy(HOME_TGT);
    }
  }
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    healCamera();
    const off = new THREE.Vector3().subVectors(camera.position, controls.target);
    const len = off.length();
    if (!isFinite(len) || len < 1e-6) { camera.position.copy(HOME_POS); return; }
    const factor = Math.min(2, Math.max(0.5, Math.exp(e.deltaY * 0.0012)));
    const next = Math.min(controls.maxDistance, Math.max(controls.minDistance, len * factor));
    camera.position.copy(controls.target).addScaledVector(off.normalize(), next);
  }, { passive: false });

  // ── state ──
  let atlas = null, partMap = null;
  const partBox = [];      // per-part Box3
  const partCenter = [];   // per-part Vector3
  const sysOfPart = [];    // source system per part
  const merged = new Map();// srcSys -> Mesh
  const pickers = [];      // per-part invisible Mesh (null until its system loads)
  const keepAlive = new Map(); // srcSys -> ArrayBuffer (picker views reference them)
  const hlCache = new Map();// ourId -> BufferGeometry (merged subset)
  let highlight = null;
  const hlMat = new THREE.MeshStandardMaterial({ color: 0x2dd4bf, emissive: 0x0d5a52, emissiveIntensity: 0.9, roughness: 0.4, metalness: 0.05, transparent: true, opacity: 0.96, depthTest: true });
  const mats = new Map();
  let selected = null, isolatedOur = null, xray = false, explodeF = 0, labelsOn = true, ready = false, coreDone = false, labelLang = "en";
  function labelOf(st) {
    if (!st) return "";
    if (labelLang === "fr") return st.fr || st.en;
    if (labelLang === "es") return st.es;
    if (labelLang === "la") return st.la;
    return st.en;
  }
  const sysOffset = new Map(); // srcSys -> Vector3 (explode)
  const labelGroup = new THREE.Group(); scene.add(labelGroup);

  // systems faded by the "Muscles" slider (bulk that hides the skeleton)
  const SOFT_GROUP = new Set(["muscular", "connective", "integumentary"]);
  let softF = 1; // muscle/skin opacity 0..1
  function materialFor(src) {
    const col = (SRC_SYS.find(([s]) => s === src) || [])[1] || "#aebbb8";
    const base = src === "integumentary" ? 0.12 : 1;
    const m = new THREE.MeshStandardMaterial({
      color: col, metalness: 0.08, roughness: 0.53, side: THREE.DoubleSide,
      transparent: true, opacity: base,
      depthWrite: base >= 0.99,
    });
    m.userData.src = src;
    m.userData.base = base;
    return m;
  }
  function applyOpacities() {
    for (const [src, m] of mats) {
      let op;
      if (xray && src !== "skeletal") op = 0.1;            // X-ray: reveal bones
      else if (SOFT_GROUP.has(src)) op = Math.min(m.userData.base, softF);
      else op = m.userData.base;
      m.opacity = op;
      m.depthWrite = op >= 0.99;
      m.needsUpdate = false;
    }
  }
  function ensureMats() {
    for (const [s] of SRC_SYS) if (!mats.has(s)) mats.set(s, materialFor(s));
  }
  function applyVisibility() {
    for (const [src, mesh] of merged) {
      const our = SRC_TO_OUR[src];
      mesh.visible = !isolatedOur || our === isolatedOur;
    }
    if (highlight) {
      const st = getStructure(selected);
      highlight.visible = !isolatedOur || (st && st.s === isolatedOur);
    }
    refreshLabels();
  }
  function applyExplode() {
    sysOffset.clear();
    SRC_SYS.forEach(([src], i) => {
      const a = (i / SRC_SYS.length) * Math.PI * 2;
      sysOffset.set(src, new THREE.Vector3(Math.sin(a) * explodeF * 0.55, (explodeF * 0.12) * ((i % 3) - 1), Math.cos(a) * explodeF * 0.55));
    });
    for (const [src, mesh] of merged) mesh.position.copy(sysOffset.get(src));
    for (const pk of pickers) if (pk) pk.position.copy(sysOffset.get(sysOfPart[pk.userData.part]));
    if (highlight && selected) {
      const parts = partMap[selected] || [];
      const src = parts.length ? sysOfPart[parts[0]] : null;
      if (src) highlight.position.copy(sysOffset.get(src));
    }
    refreshLabels();
  }
  function partWorldCenter(i, out) {
    out.copy(partCenter[i]);
    const off = sysOffset.get(sysOfPart[i]);
    if (off) out.add(off);
    return out;
  }

  // ── labels ──
  const PRIORITY = ["sk_frontal", "cv_heart", "re_lungs", "dg_liver", "sk_femur", "sk_humerus", "sk_ribs", "dg_stomach", "sk_tibia", "ur_kidney"];
  function makeLabel(text) {
    const c = document.createElement("canvas"); c.width = 256; c.height = 64;
    const g = c.getContext("2d");
    g.fillStyle = "rgba(8,15,30,0.85)"; g.beginPath();
    if (g.roundRect) g.roundRect(2, 6, 252, 52, 10); else g.rect(2, 6, 252, 52);
    g.fill(); g.strokeStyle = "#4dd0e1"; g.lineWidth = 2; g.stroke();
    g.fillStyle = "#fff"; g.font = "600 24px system-ui"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(String(text).slice(0, 22), 128, 33);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, transparent: true }));
    sp.scale.set(0.2, 0.05, 1);
    return sp;
  }
  const _v = new THREE.Vector3();
  function refreshLabels() {
    labelGroup.clear();
    if (!labelsOn || !atlas) return;
    const ids = [];
    if (selected && partMap[selected]) ids.push(selected);
    for (const id of PRIORITY) if (id !== selected && partMap[id]) ids.push(id);
    const seen = new Set();
    ids.slice(0, 14).forEach((id, k) => {
      const st = getStructure(id); if (!st) return;
      const parts = partMap[id]; if (!parts || !parts.length) return;
      const box = new THREE.Box3();
      for (const pi of parts) { _v.copy(partCenter[pi]); const o = sysOffset.get(sysOfPart[pi]); if (o) _v.add(o); box.expandByPoint(_v); }
      if (box.isEmpty()) return;
      box.getCenter(_v); _v.y += 0.06 + (k % 5) * 0.055;
      _v.x += (k % 2 ? 0.34 : -0.34);
      const key2 = parts[0];
      if (seen.has(key2)) return; seen.add(key2);
      const sp = makeLabel(labelOf(st));
      sp.position.copy(_v);
      if (id === selected) sp.scale.set(0.28, 0.07, 1);
      labelGroup.add(sp);
    });
  }

  // ── picking ──
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(), hitP = new THREE.Vector3(), wBox = new THREE.Box3();
  const ourOfPart = []; // part idx -> ourId (first claimant wins)
  let downAt = 0, downXY = null;
  canvas.addEventListener("pointerdown", (e) => { downAt = performance.now(); downXY = [e.clientX, e.clientY]; });
  canvas.addEventListener("pointerup", (e) => {
    if (performance.now() - downAt > 400) return;
    if (downXY && Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]) > 6) return; // was a drag
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    let best = -1, bestD = Infinity;
    const integHidden = !isolatedOur || isolatedOur !== "integumentary";
    for (let i = 0; i < pickers.length; i++) {
      const pk = pickers[i]; if (!pk) continue;
      const src = sysOfPart[i];
      if (isolatedOur && SRC_TO_OUR[src] !== isolatedOur) continue;
      if (integHidden && src === "integumentary") continue;
      wBox.copy(partBox[i]).translate(pk.position);
      if (!ray.ray.intersectBox(wBox, hitP)) continue;
      const hits = ray.intersectObject(pk, false);
      if (hits.length && hits[0].distance < bestD) { bestD = hits[0].distance; best = i; }
    }
    if (best >= 0 && ourOfPart[best]) { select(ourOfPart[best]); onPick && onPick(ourOfPart[best]); }
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!atlas || e.buttons) { canvas.style.cursor = "grab"; return; }
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    let hov = false;
    for (let i = 0; i < pickers.length && !hov; i += 7) {
      const pk = pickers[i]; if (!pk) continue;
      wBox.copy(partBox[i]).translate(pk.position);
      if (ray.ray.intersectBox(wBox, hitP)) hov = true;
    }
    canvas.style.cursor = hov ? "pointer" : "grab";
  });

  // ── progressive per-system loading ──
  async function gunzip(payload, expected) {
    const sig = new Uint8Array(payload, 0, Math.min(2, payload.byteLength));
    const gz = sig[0] === 0x1f && sig[1] === 0x8b;
    let buf = payload;
    if (gz) {
      if (typeof DecompressionStream === "undefined") throw new Error("Browser cannot decompress anatomy files.");
      buf = await new Response(new Blob([payload]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
    }
    if (buf.byteLength !== expected) throw new Error("An anatomy file was incomplete.");
    return buf;
  }

  const loadedSystems = new Set();
  const loadingSystems = new Map(); // srcSys -> Promise
  const loadQueue = [];
  const loadErrors = [];
  let totalBytes = 0, loadedBytes = 0;

  function emitProgress(current = null) {
    onProgress && onProgress({
      pct: totalBytes ? Math.min(100, Math.round((loadedBytes / totalBytes) * 100)) : 0,
      loadedMB: +(loadedBytes / 1e6).toFixed(1),
      totalMB: +(totalBytes / 1e6).toFixed(1),
      current,
      coreDone,
      done: ready,
    });
  }
  function checkCoreDone() {
    if (!coreDone && TIER1.every((s) => loadedSystems.has(s))) {
      coreDone = true;
      emitProgress();
    }
  }
  function enqueue(sys, priority = false) {
    if (loadedSystems.has(sys) || loadingSystems.has(sys) || loadQueue.includes(sys)) return;
    if (priority) {
      const rank = SYSTEM_RANK.get(sys) ?? 99;
      const pos = loadQueue.findIndex((s) => (SYSTEM_RANK.get(s) ?? 99) > rank);
      if (pos === -1) loadQueue.push(sys); else loadQueue.splice(pos, 0, sys);
    } else loadQueue.push(sys);
  }
  function buildSystem(sys, buf) {
    const geos = [];
    atlas.parts.forEach((p, i) => {
      if (p.chunk !== sys) return;
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(buf, p.positions, p.vertexCount * 3), 3));
      g.setAttribute("normal", new THREE.BufferAttribute(new Int16Array(buf, p.normals, p.vertexCount * 3), 3, true));
      g.setIndex(new THREE.BufferAttribute(new Uint32Array(buf, p.indices, p.indexCount), 1));
      g.boundingBox = partBox[i].clone();
      g.computeBoundingSphere();
      const pk = new THREE.Mesh(g);
      pk.matrixAutoUpdate = false; pk.userData.part = i; pk.visible = false;
      pickers[i] = pk; scene.add(pk);
      geos.push(g);
    });
    const mergedGeo = mergeGeometries(geos, false);
    if (!mergedGeo) throw new Error("Could not assemble " + sys + " anatomy.");
    const mesh = new THREE.Mesh(mergedGeo, mats.get(sys));
    mesh.frustumCulled = false;
    mesh.position.copy(sysOffset.get(sys) || new THREE.Vector3());
    mesh.visible = !isolatedOur || SRC_TO_OUR[sys] === isolatedOur;
    scene.add(mesh);
    merged.set(sys, mesh);
    loadedSystems.add(sys);
    checkCoreDone();
  }
  function startLoad(sys) {
    if (loadedSystems.has(sys) || loadingSystems.has(sys)) return loadingSystems.get(sys) || Promise.resolve();
    const ch = atlas.chunks.find((c) => c.id === sys);
    const p = (async () => {
      if (!ch) throw new Error("Unknown anatomy system: " + sys);
      const res = await fetch("src/models/sys-" + sys + ".bin.gz");
      if (!res.ok) throw new Error("Could not load the " + sys + " model file.");
      const buf = await gunzip(await res.arrayBuffer(), ch.bytes);
      keepAlive.set(sys, buf);
      loadedBytes += ch.gzipBytes;
      buildSystem(sys, buf);
      emitProgress(sys);
    })();
    loadingSystems.set(sys, p);
    p.catch(() => { loadingSystems.delete(sys); loadedBytes = Math.max(0, loadedBytes - (ch ? ch.gzipBytes : 0)); });
    return p;
  }
  async function worker() {
    while (loadQueue.length) {
      const sys = loadQueue.shift();
      if (loadedSystems.has(sys) || loadingSystems.has(sys)) continue;
      try { await startLoad(sys); } catch (e) { loadErrors.push(e); }
    }
  }
  // Load one source system now (jumps the queue). Used on demand.
  // Waits for atlas.json/part-map.json before touching chunk metadata,
  // so early calls (isolate/quiz/select before boot finishes) are safe.
  function ensureSystem(sys) {
    if (loadedSystems.has(sys)) return Promise.resolve();
    if (loadingSystems.has(sys)) return loadingSystems.get(sys);
    return boot_p.then(() => {
      if (loadedSystems.has(sys)) return;
      if (loadingSystems.has(sys)) return loadingSystems.get(sys);
      enqueue(sys, true);
      return startLoad(sys);
    }).catch(() => {});
  }
  // Load every source system behind one of our 12 browser systems.
  function ensureScope(our) {
    const srcs = SRC_SYS.map(([s]) => s).filter((s) => SRC_TO_OUR[s] === our);
    return Promise.all(srcs.map(ensureSystem)).then(() => applyVisibility());
  }

  async function load() {
    ensureMats();
    const [am, pm] = await Promise.all([
      fetch("src/models/atlas.json").then(r => { if (!r.ok) throw new Error("atlas.json missing"); return r.json(); }),
      fetch("src/part-map.json").then(r => { if (!r.ok) throw new Error("part-map.json missing"); return r.json(); }),
    ]);
    atlas = am; partMap = pm;
    atlas.parts.forEach((p, i) => {
      partBox[i] = new THREE.Box3(new THREE.Vector3().fromArray(p.bounds[0]), new THREE.Vector3().fromArray(p.bounds[1]));
      partCenter[i] = partBox[i].getCenter(new THREE.Vector3());
      sysOfPart[i] = p.system;
      pickers[i] = null;
    });
    for (const [ourId, parts] of Object.entries(partMap))
      for (const pi of parts) if (ourOfPart[pi] === undefined) ourOfPart[pi] = ourId;
    totalBytes = atlas.chunks.reduce((a, c) => a + (c.gzipBytes || 0), 0);
    SYSTEM_ORDER.forEach((s) => enqueue(s));
    emitProgress();
    let firstError = null;
    const loadErrors = [];
    const guarded = async () => { try { await worker(); } catch (e) { firstError = firstError || e; } };
    await Promise.all([guarded(), guarded()]);
    ready = true;
    applyVisibility(); applyExplode();
    emitProgress();
    if (loadErrors.length) onError && onError(loadErrors[0] instanceof Error ? loadErrors[0].message : String(loadErrors[0]));
    else if (firstError) onError && onError(firstError instanceof Error ? firstError.message : String(firstError));
  }
  let boot_p = Promise.resolve();
  boot_p = load().catch((e) => { onError && onError(e instanceof Error ? e.message : String(e)); });

  // ── API ──
  function buildHighlight() {
    if (highlight) { scene.remove(highlight); highlight.geometry.dispose(); highlight = null; }
    const parts = (partMap && partMap[selected]) || [];
    if (parts.length && parts.every((pi) => pickers[pi])) {
      let g = hlCache.get(selected);
      if (!g) {
        const gs = parts.map((pi) => pickers[pi] ? pickers[pi].geometry.clone() : null).filter(Boolean);
        if (gs.length) { g = mergeGeometries(gs, false); gs.forEach(x => { if (x !== g) x.dispose(); }); hlCache.set(selected, g); }
      }
      if (g) {
        highlight = new THREE.Mesh(g, hlMat);
        highlight.frustumCulled = false;
        const src = sysOfPart[parts[0]];
        if (src) highlight.position.copy(sysOffset.get(src) || new THREE.Vector3());
        const st = getStructure(selected);
        if (st && SYSTEM_OF[st.s]) { // tint the highlight with the structure's system color
          const c = new THREE.Color(SYSTEM_OF[st.s].color);
          hlMat.color.copy(c); hlMat.emissive.copy(c).multiplyScalar(0.4);
        } else { hlMat.color.set(0x2dd4bf); hlMat.emissive.set(0x0d5a52); }
        highlight.visible = !isolatedOur || (st && st.s === isolatedOur);
        highlight.renderOrder = 5;
        scene.add(highlight);
      }
    }
  }
  function select(id) {
    selected = id;
    const parts = (partMap && partMap[id]) || [];
    const sys = parts.length ? sysOfPart[parts[0]] : null;
    if (sys && !loadedSystems.has(sys)) {
      ensureSystem(sys).then(() => { if (selected === id) { buildHighlight(); refreshLabels(); } }).catch(() => {});
      refreshLabels(); // labels work from atlas bounds, even before meshes arrive
      return id;
    }
    buildHighlight();
    refreshLabels();
    return id;
  }
  function focus(id) {
    const parts = (partMap && partMap[id]) || [];
    if (!parts.length) return;
    const sys = sysOfPart[parts[0]];
    const doFocus = () => {
      const box = new THREE.Box3();
      for (const pi of parts) box.expandByPoint(partWorldCenter(pi, new THREE.Vector3()));
      const c = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3()).length();
      const dist = Math.min(10, Math.max(0.35, size * 2.2));
      controls.target.copy(c);
      camera.position.copy(c).add(new THREE.Vector3(0.25, 0.12, 1).normalize().multiplyScalar(dist));
    };
    if (sys && !loadedSystems.has(sys)) ensureSystem(sys).then(doFocus).catch(() => {});
    else doFocus();
  }
  function resize() {
    const holder = canvas.parentElement;
    const w = canvas.clientWidth || (holder && holder.clientWidth) || 600;
    const h = canvas.clientHeight || (holder && holder.clientHeight) || 480;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize); resize();
  // The layout is user-resizable (splitter drags, focus mode), so watch the
  // canvas itself — window resize events alone no longer cover size changes.
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(resize).observe(canvas);
  (function loop() {
    requestAnimationFrame(loop);
    healCamera(); controls.update(); renderer.render(scene, camera);
  })();
  applyVisibility();

  return {
    select, focus,
    isolate(sys) { isolatedOur = sys; if (sys) ensureScope(sys).catch(() => {}); applyVisibility(); },
    ensureScope,
    setXray(b) {
      xray = b;
      applyOpacities();
      applyVisibility();
    },
    setSoftOpacity(f) { softF = Math.min(1, Math.max(0.03, f)); applyOpacities(); },
    setExplode(f) { explodeF = f; if (atlas) applyExplode(); },
    setLabels(b) { labelsOn = b; refreshLabels(); },
    setLang(l) { labelLang = l; refreshLabels(); },
    setAutoRotate(b) { controls.autoRotate = b; controls.autoRotateSpeed = 0.8; },
    reset() { camera.position.copy(HOME_POS); controls.target.copy(HOME_TGT); },
    selectedId: () => selected,
    meshIds: () => (partMap ? Object.keys(partMap).filter(id => (partMap[id] || []).length > 0 && partMap[id].every(pi => pickers[pi])) : []),
    info(id) {
      const parts = (partMap && partMap[id]) || [];
      const sample = parts.slice(0, 3).map(pi => atlas && atlas.parts[pi].name).filter(Boolean);
      return { meshes: parts.length, loaded: parts.filter(pi => pickers[pi]).length, sample };
    },
    isReady: () => ready,
    coreReady: () => coreDone,
    loadedSystems: () => [...loadedSystems],
    _debug: { camera, controls, renderer, scene },
  };
}
