// Extend src/part-map.json so EVERY atlas part maps to a structure.
// Until now only 1,087 of 2,234 parts had an owner (dead clicks on skin,
// bladder, appendix, tongue, named arteries, foot muscles, eye parts...).
//
// Strategy per unmapped part (deterministic, offline, re-runnable):
//   1. curated name rules  (gingiva -> maxilla, tongue -> mouth, taenia -> colon...)
//   2. distinctive-token match against structure names (EN/ES/FR/LA/id),
//      guarded by source system (a muscular part never maps to a bone)
//   3. nearest already-mapped part in the SAME source system (AABB centers)
//   4. nearest already-mapped part in ANY system (connective chunk has no
//      mapped anchors at all, so its ligaments fall back to nearest body part)
// Existing assignments are always kept (first claimant wins).
//
// Usage:
//   node tools/extend-part-map.mjs          # write extended part-map.json
//   node tools/extend-part-map.mjs --check  # exit 1 if coverage < 100% (CI)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const atlas = JSON.parse(fs.readFileSync(path.join(root, "src/models/atlas.json"), "utf8"));
const partMap = JSON.parse(fs.readFileSync(path.join(root, "src/part-map.json"), "utf8"));
const { STRUCTURES } = await import(pathToFileURL(path.join(root, "src/anatomy-data.js")).href);

const parts = atlas.parts;
const originalMap = JSON.parse(JSON.stringify(partMap)); // preserved verbatim below
const owner = new Array(parts.length).fill(null);
const structChunks = new Map(); // structure id -> Set(chunk) from its existing parts
for (const s of STRUCTURES) structChunks.set(s.id, new Set());
for (const [id, idxs] of Object.entries(partMap)) {
  for (const i of idxs) {
    if (!owner[i]) owner[i] = id; // first claimant wins (same as the app)
    structChunks.get(id)?.add(String(parts[i].chunk));
  }
}
const originallyOwned = new Set(Object.values(partMap).flat());

const center = (p) => [
  (p.bounds[0][0] + p.bounds[1][0]) / 2,
  (p.bounds[0][1] + p.bounds[1][1]) / 2,
  (p.bounds[0][2] + p.bounds[1][2]) / 2,
];
const centers = parts.map(center);

// ── curated name rules (regex -> structure id, optional required chunk) ──
// Curated targets are trusted even when the structure lives in another
// source system (e.g. nasal cartilage is stored in the respiratory chunk
// but belongs with the nasal bone card).
const CURATED = [
  [/^gingiva of upper/i, "sk_maxilla"],
  [/^gingiva of lower/i, "sk_mandible"],
  [/tongue/i, "dg_salivary"],
  [/cystic duct/i, "dg_gallbladder"],
  [/hepatic duct/i, "dg_liver"],
  [/^taenia /i, "dg_colon"],
  [/pharyng|palatopharyngeus|salpingopharyngeus|stylopharyngeus/i, "re_pharynx"],
  [/lacrimal/i, "sk_nasolacrimal"],
  [/pulmonary (artery|vein)/i, "cv_heart"],
  [/nasal cartilage|alar cartilage|septal cartilage|vomer|nasal concha|nasal turbinate|bony labyrinth/i, "sk_nasal"],
  [/arytenoid|corniculate|cuneiform cartilage|thyro-?arytenoid/i, "re_cricoid"],
  [/choroid plexus/i, "nv_brain"],
  [/linea alba/i, "mu_rectusabd"],
  [/ventricle|atrium|auricle|interventricular/i, "cv_heart", "cardiac"],
  [/urinary bladder/i, "ur_bladder"],
  [/^skin$/i, "in_skin"],
  [/^appendix$/i, "dg_appendix"],
  [/eyebrow|^lip$/i, "in_skin"],
  [/albuginea|corpus cavernosum|corpus spongiosum|glans|epididym|deferent duct|seminal vesicle/i, "rp_testis"],
  [/menisc/i, "se_knee"],
  [/nail/i, "in_nail"],
  [/sweat gland|sebaceous/i, "in_sweat"],
  [/hair follicle|^hair$/i, "in_hair"],
];

// Every curated target must be a real structure id — a typo would silently
// drop parts when the map is rebuilt (owner ids not in STRUCTURES vanish).
{
  const valid = new Set(STRUCTURES.map((s) => s.id));
  for (const [re, rid] of CURATED) {
    if (!valid.has(rid)) throw new Error(`CURATED rule ${re} targets unknown structure id "${rid}"`);
  }
}

// Parts whose name-matching would only produce cross-region noise
// (eye "rectus/oblique" muscles -> abdominal rectus/oblique). They skip
// step 2 and fall through to the spatial nearest-neighbour step.
const SKIP_TOKENS = [
  /\brectus\b|\boblique\b|levator palpebrae|check ligament|common tendinous ring/i,
];

// ── token matcher ──
const STOP = new Set(("left right of the and or with to in for a an its their this that " +
  "part parts set branch branches segment segments wall type proper great small " +
  "superior inferior anterior posterior medial lateral proximal distal deep superficial " +
  "external internal interosseous first second third fourth fifth sixth seventh eighth ninth tenth " +
  "descending ascending perforating set sets proper great small common trunk arteries veins").split(" "));
const stem = (t) => (t.length > 6 ? t.slice(0, t.length - 3) : t);
const tokens = (name) => String(name).toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ")
  .filter((t) => t.length > 1 && !STOP.has(t) && !/^\d+$/.test(t));

const structTokens = new Map(); // id -> Set(stem)
const tokenFreq = new Map();    // stem -> #structures containing it
for (const s of STRUCTURES) {
  const words = [...tokens(s.en), ...tokens(s.la), ...tokens(s.es), ...tokens(s.fr || ""), ...tokens(s.id.replace(/_/g, " "))];
  const set = new Set();
  for (const w of words) { set.add(w); set.add(stem(w)); }
  structTokens.set(s.id, set);
  for (const st of set) tokenFreq.set(st, (tokenFreq.get(st) || 0) + 1);
}
const DISTINCTIVE = 6; // stems rarer than this count as strong evidence

// Browser-system -> source chunks it can legitimately own. Used to guard
// structures that had NO parts before (empty chunk set), which otherwise
// escape the chunk guard and soak up cross-system noise
// ("abdominal aorta" -> rectus abdominis, "thoracic aorta" -> lymphatic duct).
const OUR_CHUNKS = {
  skeletal: ["skeletal"], muscular: ["muscular", "connective"],
  cardiovascular: ["arterial", "venous", "cardiac"], nervous: ["nervous", "sensory"],
  digestive: ["digestive"], respiratory: ["respiratory"], urinary: ["urinary"],
  reproductive: ["reproductive"], lymphatic: ["lymphatic"], endocrine: ["endocrine"],
  integumentary: ["integumentary"],
};

function matchByTokens(name, chunk) {
  // Vessel words are strong system evidence: an "artery"/"aorta" part should
  // only map to a card that actually contains arterial geometry, and
  // likewise for veins (prevents "pulmonary artery" -> pulmonary alveoli).
  const isArtery = /\barter(y|ies|ial)\b|\baorta\b/.test(name);
  const isVein = /\bvein(s|ous)\b/.test(name);
  const ptoks = [...new Set(tokens(name).flatMap((t) => [t, stem(t)]))];
  let best = null, bestScore = 0;
  for (const s of STRUCTURES) {
    const sc = structChunks.get(s.id);
    if (sc && sc.size) {
      if (!sc.has(chunk)) continue; // system guard
      if (isArtery && !(sc.has("arterial") || sc.has("cardiac"))) continue;
      if (isVein && !(sc.has("venous") || sc.has("cardiac"))) continue;
    } else {
      // no known chunks: fall back to the structure's browser system
      const allow = OUR_CHUNKS[s.s] || [];
      if (!allow.includes(chunk)) continue;
    }
    const set = structTokens.get(s.id);
    let score = 0, strong = 0;
    for (const t of ptoks) {
      if (!set.has(t)) continue;
      const f = tokenFreq.get(t) || 99;
      if (f <= DISTINCTIVE) { strong++; score += 10; } else score += 1;
    }
    const ok = strong >= 1 || score >= 2;
    if (ok && score > bestScore) { bestScore = score; best = s.id; }
  }
  return best;
}

// Anchors: parts with a known owner + their centers. Parts whose bounding
// box spans a huge region ("Set of ... veins" covering a whole limb or the
// whole body) are excluded — their centre lands mid-body and poisons the
// nearest-neighbour step for everything nearby.
const MAX_ANCHOR_DIAG = 0.45;
const anchors = [];
const diag = (p) => {
  const [a, b] = p.bounds;
  return Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
};
owner.forEach((id, i) => {
  if (id && diag(parts[i]) <= MAX_ANCHOR_DIAG) anchors.push({ i, id, chunk: String(parts[i].chunk), c: centers[i] });
});

function nearest(filter) {
  return (pi) => {
    const c = centers[pi];
    let best = null, bd = Infinity;
    for (const a of anchors) {
      if (!filter(a)) continue;
      const d = Math.hypot(a.c[0] - c[0], a.c[1] - c[1], a.c[2] - c[2]);
      if (d < bd) { bd = d; best = a.id; }
    }
    return best ? { id: best, d: bd } : null;
  };
}
// A same-system anchor further than this is worse than any-system at hand
// (hand veins' nearest vein anchor was the testicular vein 25 cm away —
// the hand bones 2 cm away make a far better card).
const MAX_SAME_DIST = 0.15;

const stats = { kept: 0, curated: 0, tokens: 0, nearestSame: 0, nearestAny: 0, failed: 0 };
const examples = { curated: [], tokens: [], nearestSame: [], nearestAny: [], failed: [] };

parts.forEach((p, i) => {
  if (owner[i]) { stats.kept++; return; }
  const chunk = String(p.chunk);
  let id = null, how = null;
  for (const [re, rid, reqChunk] of CURATED) {
    if (!re.test(p.name || "")) continue;
    if (reqChunk && chunk !== reqChunk) continue; // rule pinned to a system
    id = rid; how = "curated"; break;             // curated is trusted as-is
  }
  if (!id && !SKIP_TOKENS.some((re) => re.test(p.name || ""))) {
    id = matchByTokens(p.name, chunk); if (id) how = "tokens";
  }
  if (!id) {
    const ns = nearest((a) => a.chunk === chunk)(i);
    if (ns && ns.d <= MAX_SAME_DIST) { id = ns.id; how = "nearestSame"; }
  }
  if (!id) { const na = nearest(() => true)(i); if (na) { id = na.id; how = "nearestAny"; } }
  if (!id) { how = "failed"; stats.failed++; if (examples.failed.length < 8) examples.failed.push(`${p.name} #${i}`); return; }
  owner[i] = id;
  stats[how]++;
  if (examples[how] && examples[how].length < 8) examples[how].push(`${p.name} → ${id}`);
});

// Rebuild: the ORIGINAL map is preserved verbatim (a part index may be
// listed under several cards — valve cusps under both valves, hippocampus
// under hippocampus and brain — and picking resolves to the first claimant
// in the app). Only newly assigned parts get appended.
const out = {};
for (const [id, idxs] of Object.entries(originalMap)) out[id] = [...idxs];
owner.forEach((id, i) => {
  if (!id || originallyOwned.has(i)) return;
  (out[id] = out[id] || []).push(i);
});
for (const id of Object.keys(out)) {
  out[id] = [...new Set(out[id])].sort((a, b) => a - b);
}
// coverage is measured on the map that would actually be written
const written = new Set(Object.values(out).flat());
const covered = written.size;
const pct = ((covered / parts.length) * 100).toFixed(1);

if (process.argv.includes("--check")) {
  console.log(`part-map coverage: ${covered}/${parts.length} (${pct}%)`);
  if (covered !== parts.length) { console.error("FAIL: some atlas parts have no structure (dead clicks)."); process.exit(1); }
  console.log("OK: every atlas part is clickable.");
  process.exit(0);
}

fs.writeFileSync(path.join(root, "src/part-map.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`Coverage: ${covered}/${parts.length} parts (${pct}%)`);
console.log(`  kept (already mapped): ${stats.kept}`);
console.log(`  curated name rules:    ${stats.curated}`);
console.log(`  token name match:      ${stats.tokens}`);
console.log(`  nearest same system:   ${stats.nearestSame}`);
console.log(`  nearest any system:    ${stats.nearestAny}`);
if (stats.failed) console.log(`  FAILED: ${stats.failed}`, examples.failed);
for (const k of ["curated", "tokens", "nearestSame", "nearestAny"]) {
  if (examples[k].length) console.log(`\n${k} e.g.:\n  ` + examples[k].join("\n  "));
}
