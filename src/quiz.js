// Quiz engine: Find-Word (mesh → name) and Find-Point (name → mesh).
import { STRUCTURES, getStructure } from "./anatomy-data.js";

function shuffle(a) { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [x[i], x[j]] = [x[j], x[i]]; } return x; }

export function createQuiz(opts) {
  const { viewer, meshIds, kv, onEvent } = opts;
  const Q = {
    active: false, mode: "word", scope: "all", round: 0, total: 10,
    score: 0, streak: 0, best: 0, current: null, choices: [], log: [],
  };
  async function loadBest() {
    try { Q.best = (await kv.get("best_" + Q.mode + "_" + Q.scope)) || 0; } catch { Q.best = 0; }
  }
  async function saveBest() {
    try {
      const k = "best_" + Q.mode + "_" + Q.scope;
      const prev = (await kv.get(k)) || 0;
      if (Q.score > prev) { await kv.set(k, Q.score); Q.best = Q.score; }
    } catch {}
  }
  function pool() {
    const QUIZABLE = new Set(("sk_frontal sk_mandible sk_maxilla sk_hyoid sk_cervical sk_thoracic sk_lumbar sk_sacrum sk_sternum sk_ribs sk_clavicle sk_scapula sk_humerus sk_radius sk_ulna sk_carpals sk_metacarpals sk_coxae sk_femur sk_patella sk_tibia sk_fibula sk_tarsals sk_metatarsals " +
      "cv_heart cv_aorticarch cv_carotid cv_carotid_int cv_ivc cv_portal cv_renal_a cv_mitral cv_aortic_valve cv_radial_a cv_cephalic cv_basilic " +
      "nv_brain nv_frontal_lobe nv_temporal_lobe nv_occipital_lobe nv_thalamus nv_hippocampus nv_corpus_callosum nv_optic nv_spinalcord nv_sciatic " +
      "re_trachea re_lungs re_larynx re_larynx_cart re_epiglottis re_cricoid dg_esophagus dg_stomach dg_liver dg_colon ur_kidney ur_bladder en_thyroid mu_sartorius mu_soleus mu_psoas mu_gracilis mu_serratus mu_mylohyoid ly_spleen").split(" "));
    const ids = meshIds().filter(id => getStructure(id) && QUIZABLE.has(id));
    const scoped = Q.scope === "all" ? ids : ids.filter(id => getStructure(id).s === Q.scope);
    if (scoped.length >= 4) return [...new Set(scoped)];
    const fb = meshIds().filter(id => getStructure(id) && id !== "in_skin");
    const fbs = Q.scope === "all" ? fb : fb.filter(id => getStructure(id).s === Q.scope);
    return [...new Set(fbs)];
  }
  function distractors(correct, n = 3) {
    const st = getStructure(correct);
    const p = pool().filter(id => id !== correct);
    const same = shuffle(p.filter(id => getStructure(id).s === st.s));
    const rest = shuffle(p.filter(id => getStructure(id).s !== st.s));
    return [...same, ...rest].slice(0, n);
  }
  async function start(mode, scope) {
    Q.active = true; Q.mode = mode; Q.scope = scope;
    Q.round = 0; Q.score = 0; Q.streak = 0; Q.log = [];
    await loadBest();
    next();
  }
  function stop() { Q.active = false; Q.current = null; emit(); }
  function next() {
    const p = shuffle(pool());
    if (!p.length || Q.round >= Q.total) { finish(); return; }
    Q.current = p[0];
    Q.round++;
    if (Q.mode === "word") {
      Q.choices = shuffle([Q.current, ...distractors(Q.current)]);
      viewer.select(Q.current); viewer.focus(Q.current);
    } else {
      Q.choices = [];
      viewer.select(null); // clear highlight; user must find it
    }
    emit();
  }
  function answerWord(id) {
    if (!Q.active || Q.mode !== "word" || !Q.current) return null;
    const ok = id === Q.current;
    grade(ok, Q.current, id);
    return ok;
  }
  function handlePick(sid) {
    if (!Q.active || Q.mode !== "point" || !Q.current) return null;
    const ok = sid === Q.current || aliasMatch(sid, Q.current);
    grade(ok, Q.current, sid);
    if (ok) viewer.select(sid);
    return ok;
  }
  function aliasMatch(a, b) { // mirrored/paired meshes share base structure
    return a === b;
  }
  function grade(ok, correct, given) {
    if (ok) { Q.score += 10 + Math.min(Q.streak * 2, 10); Q.streak++; }
    else { Q.score = Math.max(0, Q.score - 5); Q.streak = 0; }
    Q.log.push({ correct, given, ok });
    emit();
    clearTimeout(grade._t);
    grade._t = setTimeout(() => { if (Q.active) { if (Q.round >= Q.total) finish(); else next(); } }, ok ? 700 : 1400);
  }
  async function finish() {
    Q.active = false;
    await saveBest();
    try {
      const weak = Q.log.filter(l => !l.ok).map(l => l.correct);
      const prev = (await kv.get("weak")) || [];
      await kv.set("weak", [...new Set([...prev, ...weak])].slice(-60));
    } catch {}
    emit(true);
  }
  function emit(done = false) { onEvent && onEvent({ ...Q }, done); }
  return { Q, start, stop, next, answerWord, handlePick };
}
