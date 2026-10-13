# SPEC — Anatomy Learning Web Edition

## 1. Identity
- Title: `Anatomy Learning — 3D Human Body Explorer`.
- Tagline: every structure, four languages (EN / ES / FR / Latin), zero paywall.
- Dark clinical theme, responsive (desktop 3-pane, phone stacked), English default.

## 2. Systems (12 tabs + All)
`skeletal, muscular, cardiovascular, nervous, respiratory, digestive, urinary,
reproductive, lymphatic, endocrine, integumentary, sectional`
(`sectional` = cross-section notes + histology references, no separate meshes.)

## 3. Browser (left pane)
- Search box (EN/ES/FR/Latin, prefix + substring, diacritic-insensitive), system
  filter tabs, result count, alphabetical list with system dot + Latin subtitle.
- Click → select: viewer focuses/highlights, detail panel updates.
- `All` shows everything; empty query shows system contents.

## 4. 3D viewer (center)
- Three.js orbit (rotate/zoom/pan), auto-rotate toggle, reset view.
- Procedural body: full skeleton (skull, mandible, hyoid, spine, ribs, sternum,
  clavicles, scapulae, humeri, radii/ulnae, hands, pelvis, femora, patellae,
  tibiae/fibulae, feet) + organs (brain, heart, lungs, liver, stomach, kidneys,
  bladder) + major muscles (trapezius, deltoid, pectoralis, biceps, rectus
  abdominis, quadriceps, gastrocnemius) + vessels/nerves (aorta, vena cava,
  carotids, sciatic) as tubes.
- Interactions: click mesh → select; hover tooltip; labels toggle (sprite
  labels for visible structures); isolate system; X-ray (translucent bone);
  explode slider (separate parts); clipping? (v1: no).
- Non-meshed structures: detail still shows; viewer pulses nearest proxy.

## 5. Detail panel (right)
- EN name, Latin, ES, FR, system chip, histology chip (when mapped), EN/ES/FR
  description (switchable via language buttons), ID, mesh note.
- Buttons: Bookmark, Flashcard add, Isolate system, Focus, Quiz this.

## 6. Quiz bar (bottom of viewport)
- Modes: `Find the word` (highlight → 4 choices) and `Find the point`
  (name → click the 3D part). Scope = current system or All. 10 rounds,
  +10 correct / −5 wrong, streak bonus, best score in kv.
- Results modal with review list; `Open all quizzes` cycles modes.

## 7. Flashcards + Bookmarks
- Flashcards: deck from bookmarks or weak quiz items; front EN → back LA/ES;
  flip, shuffle, mark known (kv).
- Bookmarks: toggle per structure, persisted `kv.anatomy.bookmarks`.

## 8. i18n
- UI chrome stays EN; structure names/descriptions switch EN/ES/FR/LA via header
  segmented control. Search matches all three.

## 9. Non-goals (v1)
- No DICOM viewer, no user painting/colorballs, no server sync, no IAP/ads,
  no exact Unity mesh replicas, no sectional slice renderer (notes only).
