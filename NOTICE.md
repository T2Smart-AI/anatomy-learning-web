# Notice — third-party data & credits

## 3D anatomy models (mandatory attribution)

All human-anatomy geometry in `src/models/` derives from **BodyParts3D 4.0**,
© The Database Center for Life Science (DBCLS), licensed under
**CC Attribution 4.0 International (CC BY 4.0)**:

- Database license: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html
- Dataset: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- License terms: https://creativecommons.org/licenses/by/4.0/
- Publication: Mitsuhashi et al. (2009), *BodyParts3D: 3D structure database
  for anatomical concepts*. https://doi.org/10.1093/nar/gkn613

The files were repackaged from the open-source viewer
[human-atlas](https://github.com/ashemag/human-atlas) (MIT-licensed code) by
Ashe Magalhaes: axes/units converted (mm/Z-up → m/Y-up), geometry simplified
with meshoptimizer (≈0.2% error per structure), normals quantized to signed
16-bit, and regrouped into one gzip chunk per source system
(`tools/repack-by-system.mjs`). Original mesh identity (FJ… mesh IDs, FMA
concept IDs) is preserved in `src/models/atlas.json` and `src/part-map.json`.

CC BY 4.0 permits redistribution and adaptation, including in this free
educational app, provided the credit in `src/models/ATTRIBUTION.md` is kept.
If you fork or re-host the model files, keep that file alongside them.

BodyParts3D depicts an adult male reference anatomy. It is educational,
**not a clinical tool**.

## Software

- [Three.js](https://threejs.org/) r160 — MIT, vendored in `src/vendor/`
- Everything else is original code of this project (MIT)

## Deliberately not used

- `thebuggeddev/anatomy` (no license → all rights reserved)
- `Nurkan1/Anatria-3D` (BSL 1.1 source-available, too restrictive)
- `Z-Anatomy/Models-of-human-anatomy` (CC BY-NC-SA — non-commercial clause)
- Anything derived from the commercial APK this project was clean-room rebuilt from
