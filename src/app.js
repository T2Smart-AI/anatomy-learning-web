// App wiring: grouped browser, viewer, detail, quiz, bookmarks, flashcards, themes, i18n.
import { SYSTEMS, REGIONS, SUBGROUPS, HISTOLOGY, STRUCTURES, SYSTEM_OF, REGION_OF, getStructure, searchStructures } from "./anatomy-data.js";
import { createViewer } from "./viewer3d.js";
import { createQuiz } from "./quiz.js";
import { storage } from "./storage.js";

const $ = (id) => document.getElementById(id);
const kvSafe = storage;
const state = {
  sys: "all", view: "systems", lang: "en", selected: null,
  bookmarks: [], collapsed: new Set(), theme: "midnight", navIdx: -1,
};
const nameOf = (st) => state.lang === "la" ? st.la : state.lang === "es" ? st.es : state.lang === "fr" ? (st.fr || st.en) : st.en;
const descOf = (st) => state.lang === "es" ? st.de : state.lang === "fr" ? (st.df || st.d) : st.d;
const sysNameOf = (s) => state.lang === "es" ? s.es : state.lang === "fr" ? (s.fr || s.en) : s.en;
const regionNameOf = (r) => state.lang === "es" ? r.es : state.lang === "fr" ? (r.fr || r.en) : r.en;
const subNameOf = (sysId, subId) => {
  const sg = (SUBGROUPS[sysId] || []).find(g => g.id === subId);
  if (!sg) return subId;
  return state.lang === "es" ? sg.es : state.lang === "fr" ? (sg.fr || sg.en) : sg.en;
};
const byName = (a, b) => nameOf(a).localeCompare(nameOf(b));
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

let viewer, quiz;
let coreShown = false;

// ── themes ──
const THEMES = {
  midnight: { name: "Midnight", color: "#060b16" },
  pearl: { name: "Pearl", color: "#eef2f9" },
  pop: { name: "Pop", color: "#120826" },
};
async function applyTheme(id, save = true) {
  if (!THEMES[id]) id = "midnight";
  state.theme = id;
  document.documentElement.dataset.theme = id;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = THEMES[id].color;
  $("themeName").textContent = THEMES[id].name;
  document.querySelectorAll("#themeMenu button").forEach(b => b.classList.toggle("on", b.dataset.themeId === id));
  if (save) await kvSafe.set("theme", id);
}

// ── system tabs ──
function renderTabs() {
  const c = $("sysTabs"); c.innerHTML = "";
  const mk = (id, label, color, count) => {
    const b = document.createElement("button");
    b.className = "tab" + (state.sys === id ? " on" : "");
    b.style.setProperty("--tabc", color || "var(--accent)");
    if (color) { const d = document.createElement("span"); d.className = "dot"; d.style.background = color; b.appendChild(d); }
    const t = document.createElement("span"); t.textContent = label; b.appendChild(t);
    const cnt = document.createElement("span"); cnt.className = "cnt"; cnt.textContent = count; b.appendChild(cnt);
    b.onclick = () => { state.sys = id; state.collapsed.clear(); renderTabs(); renderList($("searchInput").value); };
    c.appendChild(b);
  };
  mk("all", state.lang === "es" ? "Todo" : state.lang === "fr" ? "Tout" : "All systems", null, STRUCTURES.length);
  for (const s of SYSTEMS) mk(s.id, sysNameOf(s), s.color, STRUCTURES.filter(x => x.s === s.id).length);
}

// ── sections for the browser list ──
function buildSections(q) {
  if (q.trim()) return [{ flat: true, items: searchStructures(q).sort(byName) }];
  const inScope = state.sys === "all" ? STRUCTURES : STRUCTURES.filter(s => s.s === state.sys);
  if (state.view === "az") return [{ flat: true, items: [...inScope].sort(byName) }];
  if (state.view === "regions") {
    return REGIONS.map(r => ({ key: "r:" + r.id, title: regionNameOf(r), color: r.color, items: inScope.filter(s => s.r === r.id).sort(byName) }))
      .filter(sec => sec.items.length);
  }
  if (state.sys === "all") {
    return SYSTEMS.map(sy => ({
      key: "s:" + sy.id, title: sysNameOf(sy), color: sy.color, items: inScope.filter(s => s.s === sy.id),
      subs: (SUBGROUPS[sy.id] || []).map(g => ({ title: subNameOf(sy.id, g.id), items: inScope.filter(s => s.s === sy.id && s.g === g.id).sort(byName) })).filter(g => g.items.length),
    })).filter(sec => sec.items.length);
  }
  return (SUBGROUPS[state.sys] || []).map(g => ({
    key: "g:" + state.sys + ":" + g.id, title: subNameOf(state.sys, g.id), color: SYSTEM_OF[state.sys].color,
    items: inScope.filter(s => s.g === g.id).sort(byName),
  })).filter(sec => sec.items.length);
}

const HAS_MESH = new Set(); // ids with 3D meshes (filled after viewer reports)
function refreshMeshSet() {
  try { if (viewer && viewer.meshIds) for (const id of viewer.meshIds()) HAS_MESH.add(id); } catch {}
}

function rowEl(st) {
  const sys = SYSTEM_OF[st.s];
  const el = document.createElement("button");
  el.className = "row" + (state.selected === st.id ? " on" : "");
  el.dataset.id = st.id;
  el.setAttribute("role", "listitem");
  const bm = state.bookmarks.includes(st.id) ? '<span class="bm">★</span>' : "";
  const badge = HAS_MESH.has(st.id) ? '<span class="badge b3d">3D</span>' : '<span class="badge bref">ref</span>';
  el.innerHTML = `<span class="dot" style="background:${sys.color}"></span><span class="nm">${esc(nameOf(st))}<small>${esc(st.la)}</small></span>${badge}${bm}`;
  el.onclick = () => select(st.id, true);
  return el;
}

function renderList(q = "") {
  refreshMeshSet();
  const list = $("browserList"); list.innerHTML = "";
  const searching = q.trim().length > 0;
  $("searchClear").hidden = !searching;
  const sections = buildSections(q);
  const total = sections.reduce((n, sec) => n + sec.items.length, 0);
  $("resultCount").textContent = searching
    ? `${total} match${total === 1 ? "" : "es"} across all systems`
    : `${total} structures` + (state.sys !== "all" ? " · " + sysNameOf(SYSTEM_OF[state.sys]) : "");
  if (!total) {
    list.innerHTML = `<div class="emptyState">No structure matches <b>“${esc(q)}”</b>.<br>Try a shorter word, or another language — the search covers EN, ES, FR and Latin.<br><br><button id="emptyClear">Clear search</button></div>`;
    const b = $("emptyClear"); if (b) b.onclick = () => { $("searchInput").value = ""; renderList(""); };
    list._ids = [];
    return;
  }
  const ids = [];
  for (const sec of sections) {
    if (!sec.flat) {
      const closed = state.collapsed.has(sec.key);
      const h = document.createElement("button");
      h.className = "grpHead" + (closed ? " closed" : "");
      h.innerHTML = `<span class="dot" style="background:${sec.color}"></span><span class="chev">▼</span><span>${esc(sec.title)}</span><span class="cnt">${sec.items.length}</span>`;
      h.onclick = () => { closed ? state.collapsed.delete(sec.key) : state.collapsed.add(sec.key); renderList(q); };
      list.appendChild(h);
      if (closed) continue;
      if (sec.subs) {
        for (const g of sec.subs) {
          const sh = document.createElement("div"); sh.className = "subHead"; sh.textContent = g.title; list.appendChild(sh);
          for (const st of g.items) { list.appendChild(rowEl(st)); ids.push(st.id); }
        }
        continue;
      }
    }
    for (const st of sec.items) { list.appendChild(rowEl(st)); ids.push(st.id); }
  }
  list._ids = ids;
  markRow(false);
}

function markRow(scroll = true) {
  const list = $("browserList");
  for (const el of list.querySelectorAll(".row")) el.classList.toggle("on", el.dataset.id === state.selected);
  if (scroll) {
    const el = list.querySelector(`.row[data-id="${state.selected}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }
}

// update 3D/ref badges in place as model chunks finish loading (no list rebuild)
function updateBadges() {
  refreshMeshSet();
  for (const el of $("browserList").querySelectorAll(".row")) {
    const b = el.querySelector(".badge"); if (!b) continue;
    const has = HAS_MESH.has(el.dataset.id);
    const want = has ? "b3d" : "bref";
    if (!b.classList.contains(want)) { b.className = "badge " + want; b.textContent = has ? "3D" : "ref"; }
  }
}

// ── selection / detail ──
function select(id, focus = false) {
  const st = getStructure(id); if (!st) return;
  state.selected = id;
  viewer.select(id);
  if (focus) viewer.focus(id);
  renderDetail(st);
  markRow(true);
}
function renderDetail(st) {
  if (!st) { $("detailBody").hidden = true; return; }
  $("detailBody").hidden = false;
  const sys = SYSTEM_OF[st.s], reg = REGION_OF[st.r];
  $("dDot").style.background = sys.color;
  $("dEn").textContent = nameOf(st);
  $("dLa").textContent = st.la;
  // other-language names, compact
  const alt = [];
  if (state.lang !== "en") alt.push("EN: " + st.en);
  if (state.lang !== "es") alt.push("ES: " + st.es);
  if (state.lang !== "fr" && st.fr) alt.push("FR: " + st.fr);
  if (state.lang !== "la") alt.push("LA: " + st.la);
  $("dAlt").textContent = alt.join("  ·  ");
  $("dSys").textContent = sysNameOf(sys);
  $("dSys").style.borderColor = sys.color;
  $("dReg").textContent = reg ? regionNameOf(reg) : "—";
  if (reg) { $("dReg").style.borderColor = reg.color; $("dReg").hidden = false; } else $("dReg").hidden = true;
  $("dHist").hidden = st.h == null;
  if (st.h != null) $("dHist").textContent = HISTOLOGY[st.h].en;
  refreshMeshSet();
  const has3d = HAS_MESH.has(st.id);
  const d3 = $("d3d");
  d3.textContent = has3d ? "◉ 3D interactive" : "ℹ Reference entry";
  d3.style.borderColor = has3d ? "var(--accent)" : "var(--stroke-strong)";
  d3.style.color = has3d ? "var(--accent)" : "var(--faint)";
  $("dDesc").textContent = descOf(st);
  let idLine = st.id;
  try {
    const inf = viewer && viewer.info ? viewer.info(st.id) : null;
    if (inf && inf.meshes) idLine += ` · ${inf.meshes} mesh${inf.meshes > 1 ? "es" : ""}` + (inf.sample && inf.sample.length ? ` · e.g. ${inf.sample[0]}` : "");
    else idLine += " · info only";
  } catch { idLine += " · info only"; }
  $("dId").textContent = idLine;
  $("bookmarkBtn").textContent = state.bookmarks.includes(st.id) ? "★ Bookmarked" : "☆ Bookmark";
  $("focusBtn").disabled = !has3d;
}

// ── quiz UI ──
function renderQuiz(q, done) {
  $("quizScore").textContent = "Score " + q.score + (q.best ? " · Best " + q.best : "");
  $("quizRound").textContent = q.active || done ? `Round ${Math.min(q.round, q.total)}/${q.total}` : "Quiz ready";
  $("stopQuizBtn").hidden = !q.active;
  const ch = $("quizChoices"); ch.innerHTML = "";
  if (done) { showResults(q); $("quizPrompt").textContent = "Quiz finished — review below or start a new one."; return; }
  if (!q.active) { $("quizPrompt").textContent = "Test yourself on the 3D body — 10 questions per round."; return; }
  const st = getStructure(q.current);
  if (q.mode === "word") {
    $("quizPrompt").innerHTML = `Which structure is highlighted? <small>¿Cuál es la estructura resaltada? · Quelle structure est surlignée ?</small>`;
    for (const id of q.choices) {
      const s = getStructure(id);
      const b = document.createElement("button");
      b.className = "choice"; b.textContent = nameOf(s);
      b.onclick = () => {
        const ok = quiz.answerWord(id);
        b.classList.add(ok ? "ok" : "bad");
        [...ch.children].forEach(x => x.disabled = true);
      };
      ch.appendChild(b);
    }
  } else {
    $("quizPrompt").innerHTML = `Click <b>${esc(nameOf(st))}</b> <small>${esc(st.la)}</small> in 3D`;
  }
}
function showResults(q) {
  $("resSummary").textContent = `Score ${q.score} · ${q.log.filter(l => l.ok).length}/${q.total} correct · Best ${q.best}`;
  const r = $("resReview"); r.innerHTML = "";
  for (const l of q.log) {
    const s = getStructure(l.correct);
    const d = document.createElement("div");
    d.className = "rev " + (l.ok ? "ok2" : "bad");
    d.textContent = (l.ok ? "✓ " : "✗ ") + s.en + " — " + s.la;
    d.onclick = () => { hide($("resultsModal")); select(l.correct, true); };
    r.appendChild(d);
  }
  show($("resultsModal"));
}

// ── bookmarks / flashcards ──
async function toggleBookmark() {
  const id = state.selected;
  state.bookmarks = state.bookmarks.includes(id) ? state.bookmarks.filter(x => x !== id) : [...state.bookmarks, id];
  await kvSafe.set("bookmarks", state.bookmarks);
  renderDetail(getStructure(id)); renderList($("searchInput").value);
}
function openBookmarks() {
  const c = $("bmList"); c.innerHTML = "";
  if (!state.bookmarks.length) c.innerHTML = "<p class='muted'>No bookmarks yet — open any structure and press Bookmark.</p>";
  for (const id of state.bookmarks) {
    const st = getStructure(id); if (!st) continue;
    const b = document.createElement("button");
    b.className = "row";
    b.innerHTML = `<span class="dot" style="background:${SYSTEM_OF[st.s].color}"></span><span class="nm">${esc(nameOf(st))}<small>${esc(st.la)}</small></span><span class="bm">★</span>`;
    b.onclick = () => { hide($("bmModal")); select(id, true); };
    c.appendChild(b);
  }
  show($("bmModal"));
}
async function buildDeck(fromWeak) {
  let ids;
  if (fromWeak) ids = (await kvSafe.get("weak")) || [];
  else ids = state.bookmarks.length ? state.bookmarks : STRUCTURES.filter(s => s.m).map(s => s.id);
  state.deck = ids.filter(id => getStructure(id));
  if (!state.deck.length) state.deck = STRUCTURES.slice(0, 20).map(s => s.id);
  state.fcIdx = 0; state.fcFlipped = false;
  renderCard();
}
function renderCard() {
  const st = getStructure(state.deck[state.fcIdx % state.deck.length]);
  $("fcCount").textContent = `${(state.fcIdx % state.deck.length) + 1}/${state.deck.length}`;
  $("fcFront").textContent = state.fcFlipped ? `${st.la} · ${st.es} · ${st.fr || ""}` : nameOf(st);
  $("fcBack").textContent = state.fcFlipped ? descOf(st) : "tap to flip · toca para girar · touchez pour retourner";
}

// ── helpers ──
function show(el) { el.hidden = false; } function hide(el) { el.hidden = true; }
function anyModalOpen() { return [...document.querySelectorAll(".modal")].some(m => !m.hidden); }
function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(() => t.hidden = true, 2200); }

// ── boot ──
async function boot() {
  state.theme = (await kvSafe.get("theme")) || "midnight";
  await applyTheme(state.theme, false);
  state.bookmarks = (await kvSafe.get("bookmarks")) || [];
  renderTabs(); renderList("");
  const canvas = $("viewCanvas");
  const setLoad = (pct, p) => { $("loadBar").style.width = pct + "%"; $("loadPct").textContent = p && p.totalMB ? p.pct + "% of " + p.totalMB + " MB" + (p.current ? " (" + p.current + ")" : "") : pct + "% · loading anatomy"; };
  viewer = createViewer(canvas, {
    onPick: (sid) => {
      if (quiz && quiz.Q.active && quiz.Q.mode === "point") {
        const ok = quiz.handlePick(sid);
        toast(ok ? "✓ Correct" : "✗ Keep looking — click: " + nameOf(getStructure(quiz.Q.current)));
        if (!ok) { const st = getStructure(sid); if (st) { state.selected = sid; renderDetail(st); } }
        else select(sid, false);
      } else select(sid, false);
    },
    onProgress: (p) => {
      setLoad(p.pct, p);
      if (p.current) updateBadges();
      if (p.coreDone && !coreShown) {
        coreShown = true;
        hide($("loadOverlay"));
        refreshMeshSet();
        select(state.selected || "cv_heart", false);
        renderList($("searchInput").value);
        toast("Anatomy ready — explore the 3D body");
      }
    },
    onError: (msg) => {
      $("loadPct").textContent = "Some 3D files could not be loaded.";
      const e = $("loadErr"); e.textContent = msg + " Search, details, cards and quizzes still work; 3D needs the model files."; e.hidden = false;
      $("loadRetry").hidden = false;
    },
  });
  $("loadRetry").onclick = () => location.reload();
  quiz = createQuiz({ viewer, meshIds: () => viewer.meshIds(), kv: kvSafe, onEvent: renderQuiz });
  window.__anat = { viewer, quiz, state, select, renderList };
  select(state.selected || "cv_heart", false);
  renderQuiz(quiz.Q, false);

  // search: global (ignores the active tab), with clear button
  $("searchInput").addEventListener("input", (e) => renderList(e.target.value));
  $("searchClear").onclick = () => { $("searchInput").value = ""; renderList(""); $("searchInput").focus(); };

  // view mode
  document.querySelectorAll("#viewSeg button").forEach(b => b.onclick = () => {
    state.view = b.dataset.view;
    document.querySelectorAll("#viewSeg button").forEach(x => x.classList.toggle("on", x === b));
    state.collapsed.clear();
    renderList($("searchInput").value);
  });

  // language
  document.querySelectorAll("#langSeg button").forEach(b => b.onclick = () => {
    state.lang = b.dataset.lang;
    document.querySelectorAll("#langSeg button").forEach(x => x.classList.toggle("on", x === b));
    renderTabs(); renderList($("searchInput").value); renderDetail(getStructure(state.selected));
    if (viewer && viewer.setLang) viewer.setLang(state.lang);
  });

  // themes
  const themeBtn = $("themeBtn"), themeMenu = $("themeMenu");
  themeBtn.onclick = (e) => { e.stopPropagation(); const open = themeMenu.hidden; themeMenu.hidden = !open; themeBtn.setAttribute("aria-expanded", String(open)); };
  document.querySelectorAll("#themeMenu button").forEach(b => b.onclick = () => { applyTheme(b.dataset.themeId); themeMenu.hidden = true; themeBtn.setAttribute("aria-expanded", "false"); });
  document.addEventListener("click", (e) => { if (!themeMenu.hidden && !e.target.closest(".themeWrap")) { themeMenu.hidden = true; themeBtn.setAttribute("aria-expanded", "false"); } });

  // toolbar
  $("labelsChk").onchange = (e) => viewer.setLabels(e.target.checked);
  $("xrayChk").onchange = (e) => viewer.setXray(e.target.checked);
  $("softRange").oninput = (e) => viewer.setSoftOpacity(parseFloat(e.target.value));
  $("rotateChk").onchange = (e) => viewer.setAutoRotate(e.target.checked);
  $("explodeRange").oninput = (e) => viewer.setExplode(parseFloat(e.target.value));
  $("resetBtn").onclick = () => viewer.reset();
  $("isolateBtn").onclick = () => {
    if (state.sys === "all") { viewer.isolate(null); toast("Pick a system tab, then Isolate to focus it"); }
    else { viewer.isolate(state.sys); toast("Isolated: " + sysNameOf(SYSTEM_OF[state.sys])); }
  };
  $("showAllBtn").onclick = () => { viewer.isolate(null); toast("Showing full body"); };
  $("focusBtn").onclick = () => viewer.focus(state.selected);
  $("bookmarkBtn").onclick = toggleBookmark;
  $("bookmarksBtn").onclick = openBookmarks;
  $("flashBtn").onclick = async () => { await buildDeck(false); show($("fcModal")); };
  $("weakBtn").onclick = async () => { await buildDeck(true); show($("fcModal")); };

  const needMeshes = () => {
    if (!viewer.coreReady()) { toast("Still loading the 3D body — please wait"); return false; }
    if (!viewer.meshIds().length) { toast("No 3D meshes loaded yet"); return false; }
    return true;
  };
  $("quizThisBtn").onclick = async () => { if (!needMeshes()) return; const sc = getStructure(state.selected).s; await viewer.ensureScope(sc); quiz.start("word", sc); $("viewWrap").scrollIntoView({ behavior: "smooth", block: "center" }); };
  $("startWordBtn").onclick = async () => { if (!needMeshes()) return; await viewer.ensureScope(state.sys === "all" ? null : state.sys); quiz.start("word", state.sys); };
  $("startPointBtn").onclick = async () => { if (!needMeshes()) return; await viewer.ensureScope(state.sys === "all" ? null : state.sys); quiz.start("point", state.sys); };
  $("stopQuizBtn").onclick = () => { quiz.stop(); renderQuiz(quiz.Q, false); };
  $("fcFlip").onclick = () => { state.fcFlipped = !state.fcFlipped; renderCard(); };
  $("fcCard").onclick = () => { state.fcFlipped = !state.fcFlipped; renderCard(); };
  $("fcNext").onclick = () => { state.fcIdx++; state.fcFlipped = false; renderCard(); };
  $("fcKnown").onclick = async () => {
    const id = state.deck[state.fcIdx % state.deck.length];
    state.bookmarks = state.bookmarks.filter(x => x !== id);
    await kvSafe.set("bookmarks", state.bookmarks);
    state.fcIdx++; state.fcFlipped = false; renderCard(); toast("Marked known - removed from deck");
  };
  $("fcShuffle").onclick = () => { state.deck.sort(() => Math.random() - 0.5); state.fcIdx = 0; state.fcFlipped = false; renderCard(); };
  document.querySelectorAll("[data-close]").forEach(b => b.onclick = () => hide(b.closest(".modal")));
  $("resClose").onclick = () => hide($("resultsModal"));

  // keyboard navigation
  const typing = (e) => e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA");
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !typing(e)) { e.preventDefault(); $("searchInput").focus(); return; }
    if (e.key === "Escape") {
      if (anyModalOpen()) { document.querySelectorAll(".modal").forEach(hide); return; }
      if (typing(e) && e.target.id === "searchInput") { e.target.value = ""; renderList(""); e.target.blur(); }
      return;
    }
    if (typing(e) || anyModalOpen()) return;
    const ids = $("browserList")._ids || [];
    if (!ids.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const cur = ids.indexOf(state.selected);
      let next = e.key === "ArrowDown" ? cur + 1 : cur - 1;
      if (next < 0) next = 0;
      if (next >= ids.length) next = ids.length - 1;
      select(ids[next], false);
      state.navIdx = next;
    } else if (e.key === "Enter" && state.selected) {
      e.preventDefault();
      viewer.focus(state.selected);
    }
  });
}
if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", boot);
else boot();
