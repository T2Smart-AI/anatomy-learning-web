# 3D model attribution (REQUIRED — do not remove)

All human-anatomy geometry in `src/models/` derives from **BodyParts3D 4.0**,
© The Database Center for Life Science (DBCLS), licensed under
**CC Attribution 4.0 International (CC BY 4.0)**:

- Database license: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html
- Dataset: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- License terms: https://creativecommons.org/licenses/by/4.0/
- Publication: Mitsuhashi et al. (2009), *BodyParts3D: 3D structure database
  for anatomical concepts*. https://doi.org/10.1093/nar/gkn613

## Provenance of these files

- `atlas.json` + `body-0..14.bin.gz`: repackaged from the open-source viewer
  [human-atlas](https://github.com/ashemag/human-atlas) (MIT-licensed code) by
  Ashe Magalhaes, which adapts BodyParts3D 4.0 (`isa_BP3D_4.0_obj_99.zip`):
  axes/units converted (mm/Z-up → m/Y-up), geometry simplified with
  meshoptimizer (≈0.2% error per structure), normals quantized to signed
  16-bit, packed into 15 gzip chunks; 2,234 meshes, 3,432 FMA concepts.
- Adaptations in this generator: chunked lazy loading, per-system merged
  rendering, quadrilingual (EN/ES/FR/Latin) concept mapping, quiz/bookmark layers.
  Original mesh identity (FJ… mesh IDs, FMA concept IDs) is preserved in
  `atlas.json` and `src/part-map.json`.

## License compliance notes

- CC BY 4.0 permits redistribution and adaptation, including in this free
  educational generator, provided this credit is kept. If you fork or
  re-host these model files, keep this file alongside them.
- BodyParts3D depicts an adult male reference anatomy (TARO MRI + illustration
  refinements). It is educational, not a clinical tool — see the in-app note.

## Deliberately NOT used

- `thebuggeddev/anatomy` (no license → all rights reserved, unusable).
- `Nurkan1/Anatria-3D` (BSL 1.1 source-available license, too restrictive).
- `Z-Anatomy/Models-of-human-anatomy` (CC BY-NC-SA; non-commercial clause).
- `hunglkt/3D-Anatomy-Atlas` (docs only, no model assets).
- `biocat-ugent/Open-Anatomy-Explorer` (Apache-2.0 viewer, no bundled meshes).
- Nothing from the reverse-engineered commercial APK (proprietary meshes).
