# Anatomy Learning — 3D Human Body Explorer

Free, open-source, interactive 3D anatomy for everybody. No account, no paywall, no ads — just a browser.

**→ Live demo:** [https://&lt;your-username&gt;.github.io/anatomy-learning-web/](https://your-username.github.io/anatomy-learning-web/) *(replace with your GitHub Pages URL)*

![status](https://img.shields.io/badge/status-alpha-orange) ![license](https://img.shields.io/badge/license-MIT-blue) ![models](https://img.shields.io/badge/models-CC%20BY%204.0-green)

## Features

- **Real 3D anatomy** — 2,234 meshes from the open BodyParts3D 4.0 dataset, rendered with Three.js
- **12 body systems** — skeletal, muscular, cardiovascular, nervous, respiratory, digestive, urinary, reproductive, lymphatic, endocrine, integumentary + sectional notes
- **150+ structures** with names and descriptions in **English, Spanish, French and Latin**
- **Interactions** — orbit/zoom/pan, click-to-select, labels, isolate system, X-ray bones, muscle/skin transparency, exploded view
- **Quizzes** — *Find the word* and *Find the point*, scoring, streaks, mistake review
- **Flashcards & bookmarks** — saved on your device (localStorage)
- **Progressive loading** — the body shape appears after ~17 MB; remaining systems stream in the background or load on demand
- **Responsive** — 3-pane desktop layout, stacked mobile layout
- **Works without WebGL** — search, browser, details, flashcards and quizzes all still function

## Screenshots

*(add `docs/screenshots/*.png` and link them here)*

## Tech stack

Vanilla ES modules · [Three.js](https://threejs.org/) 0.160 (vendored in `src/vendor/`, MIT) · no build step, no backend, no tracker.

```
index.html            app shell (import map, SEO meta, styles)
src/app.js            wiring: search, browser, detail, quiz, bookmarks, i18n
src/anatomy-data.js   structure database (EN/ES/FR/LA, systems, histology)
src/viewer3d.js       3D viewer + progressive per-system loader
src/quiz.js           quiz engine
src/storage.js        per-device persistence (localStorage)
src/vendor/           Three.js + addons (pinned 0.160.0)
src/models/           BodyParts3D 4.0 meshes, one .bin.gz per system (CC BY 4.0)
tools/                repack-by-system.mjs — rebuilds per-system packs from the raw atlas
legacy/perchance/     original Perchance generator files (archived, not used)
```

## Running locally

Any static file server works (ES modules require http://, not file://):

```bash
python -m http.server 8000
# or: npx serve .
```

Open http://localhost:8000 — first load fetches ~33 MB of compressed anatomy, then everything is cached by your browser.

## Deploying (GitHub Pages, free)

1. Create a GitHub repository and push this code.
2. Repository → Settings → Pages → Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`.
3. Wait ~2 minutes; the app is live at `https://<username>.github.io/<repo>/`.

No build step is needed — the site is plain static files.

## Licensing

- **Code**: [MIT License](LICENSE) — do what you want, credit kept.
- **3D models & atlas data**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) © The Database Center for Life Science (DBCLS), via the [human-atlas](https://github.com/ashemag/human-atlas) project. Attribution is mandatory and lives in [src/models/ATTRIBUTION.md](src/models/ATTRIBUTION.md) — keep it when redistributing the model files.
- Terminology follows standard public-domain anatomy (Nomina Anatomica); descriptions are original.

The app is **educational, not a clinical tool**.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Easy first issues: translations, more quiz distractors, accessibility improvements, per-system lazy-loading polish.

## Roadmap

- [ ] PWA / offline mode (service worker)
- [ ] UI chrome translations (structure names are already 4-language)
- [ ] 16-bit position quantization (~33% smaller models)
- [ ] Keyboard shortcuts for the 3D viewer
- [ ] Sectional slice viewer
