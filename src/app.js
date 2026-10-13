// App wiring: browser, viewer, detail, quiz, bookmarks, flashcards, i18n.
import { SYSTEMS, HISTOLOGY, STRUCTURES, SYSTEM_OF, getStructure, bySystem, searchStructures } from "./anatomy-data.js";
import { createViewer } from "./viewer3d.js";
import { createQuiz } from "./quiz.js";
import { storage } from "./storage.js";

const $ = (id) => document.getElementById(id);
const state = { sys: "all", lang: "en", selected: "cv_heart", bookmarks: [], deck: [], fcIdx: 0, fcFlipped: false };
const kvSafe = storage;
const nameOf = (st) => state.lang === "la" ? st.la : state.lang === "es" ? st.es : state.lang === "fr" ? (st.fr || st.en) : st.en;
const descOf = (st) => state.lang === "es" ? st.de : state.lang === "fr" ? (st.df || st.d) : st.d;
const sysNameOf = (s) => state.lang === "es" ? s.es : state.lang === "fr" ? (s.fr || s.en) : s.en;

let viewer, quiz;
let coreShown = false;

// ── systems tabs ──
function renderTabs() {
  const c = $("sysTabs"); c.innerHTML = "";
  const mk = (id, label) => {
    const b = document.createElement("button");
    b.className = "tab" + (state.sys === id ? " on" : "");
    b.textContent = label; b.onclick = () => { state.sys = id; renderTabs(); renderList($("searchInput").value); };
    c.appendChild(b);
  };
  mk("all", state.lang === "es" ? "Todo" : state.lang === "fr" ? "Tout" : "All");
  for (const s of SYSTEMS) mk(s.id, sysNameOf(s));
}

// ── browser list ──
function renderList(q = "") {
  const list = $("browserList"); list.innerHTML = "";
  let items = q.trim() ? searchStructures(q) : STRUCTURES;
  if (state.sys !== "all") items = items.filter(s => s.s === state.sys);
  items = [...items].sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
  $("resultCount").textContent = items.length + " structures";
  for (const st of items.slice(0, 600)) {
    const sys = SYSTEM_OF[st.s];
    const el = document.createElement("button");
    el.className = "row" + (state.selected === st.id ? " on" : "");
    el.innerHTML = `<span class="dot" style="background:${sys.color}"></span><span class="nm">${escapeHtml(nameOf(st))}<small>${escapeHtml(st.la)}</small></span>${state.bookmarks.includes(st.id) ? '<span class="bm">★</span>' : ''}`;
    el.onclick = () => select(st.id, true);
    list.appendChild(el);
  }
}
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

// ── selection / detail ──
function select(id, focus = false) {
  const st = getStructure(id); if (!st) return;
  state.selected = id;
  viewer.select(id);
  if (focus) viewer.focus(id);
  renderDetail(st);
  [...$("browserList").children].forEach(() => {});
  renderList($("searchInput").value);
}
function renderDetail(st) {
  const sys = SYSTEM_OF[st.s];
  $("dEn").textContent = st.en;
  $("dLa").textContent = st.la;
  $("dEs").textContent = st.es;
  $("dFr").textContent = st.fr || "—";
  $("dSys").textContent = sys.en + " · " + sys.es + " · " + (sys.fr || sys.en);
  $("dSys").style.borderColor = sys.color;
  $("dHist").textContent = st.h != null ? HISTOLOGY[st.h].en + " · " + HISTOLOGY[st.h].es + " · " + (HISTOLOGY[st.h].fr || HISTOLOGY[st.h].en) : "—";
  $("dHist").hidden = st.h == null;
  $("dDesc").textContent = descOf(st);
  let idLine = st.id;
  try {
    const inf = viewer && viewer.info ? viewer.info(st.id) : null;
    if (inf && inf.meshes) idLine += ` · ${inf.meshes} mesh${inf.meshes > 1 ? "es" : ""}` + (inf.sample && inf.sample.length ? ` · e.g. ${inf.sample[0]}` : "");
    else idLine += " · info only";
  } catch { idLine += " · info only"; }
  $("dId").textContent = idLine;
  $("bookmarkBtn").textContent = state.bookmarks.includes(st.id) ? "★ Bookmarked" : "☆ Bookmark";
}

// ── quiz UI ──
function renderQuiz(q, done) {
  $("quizScore").textContent = "Score " + q.score + (q.best ? " · Best " + q.best : "");
  $("quizRound").textContent = q.active || done ? `Round ${Math.min(q.round, q.total)}/${q.total}` : "Quiz ready";
  const ch = $("quizChoices"); ch.innerHTML = "";
  if (done) { showResults(q); $("quizPrompt").textContent = "Quiz finished — review below or start a new one."; return; }
  if (!q.active) { $("quizPrompt").textContent = "Pick a quiz mode to test yourself on the 3D body."; return; }
  const st = getStructure(q.current);
  if (q.mode === "word") {
    $("quizPrompt").innerHTML = `Which structure is highlighted? <b>¿Cuál es la estructura resaltada?</b> <b>Quelle structure est surlignée ?</b>`;
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
    $("quizPrompt").innerHTML = `Click <b>${escapeHtml(nameOf(st))}</b> <small>${escapeHtml(st.la)}</small> in 3D`;
  }
}
function showResults(q) {
  $("resSummary").textContent = `Score ${q.score} · ${q.log.filter(l => l.ok).length}/${q.total} correct · Best ${q.best}`;
  const r = $("resReview"); r.innerHTML = "";
  for (const l of q.log) {
    const s = getStructure(l.correct);
    const d = document.createElement("div");
    d.className = "rev" + (l.ok ? "" : " bad");
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
    b.className = "row"; b.innerHTML = `<span class="nm">${escapeHtml(nameOf(st))}<small>${escapeHtml(st.la)}</small></span><span class="bm">★</span>`;
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
function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(() => t.hidden = true, 2200); }

// ── boot ──
async function boot() {
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
      if (p.coreDone && !coreShown) {
        coreShown = true;
        hide($("loadOverlay"));
        select(state.selected, false);
        renderDetail(getStructure(state.selected));
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
  window.__anat = { viewer, quiz, state };
  select(state.selected, false);
  renderQuiz(quiz.Q, false);

  $("searchInput").addEventListener("input", (e) => renderList(e.target.value));
  document.querySelectorAll("#langSeg button").forEach(b => b.onclick = () => {
    state.lang = b.dataset.lang;
    document.querySelectorAll("#langSeg button").forEach(x => x.classList.toggle("on", x === b));
    renderTabs(); renderList($("searchInput").value); renderDetail(getStructure(state.selected));
    if (viewer && viewer.setLang) viewer.setLang(state.lang);
  });
  $("labelsChk").onchange = (e) => viewer.setLabels(e.target.checked);
  $("xrayChk").onchange = (e) => viewer.setXray(e.target.checked);
  $("softRange").oninput = (e) => viewer.setSoftOpacity(parseFloat(e.target.value));
  $("rotateChk").onchange = (e) => viewer.setAutoRotate(e.target.checked);
  $("explodeRange").oninput = (e) => viewer.setExplode(parseFloat(e.target.value));
  $("resetBtn").onclick = () => viewer.reset();
  $("isolateBtn").onclick = () => { viewer.isolate(state.sys === "all" ? null : state.sys); toast(state.sys === "all" ? "Showing full body" : "Isolated: " + state.sys); };
  $("showAllBtn").onclick = () => { viewer.isolate(null); };
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
}
if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", boot);
else boot();
