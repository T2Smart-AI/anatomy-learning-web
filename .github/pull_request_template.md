## Description

What does this PR change? Link the issue it closes (`Closes #…`).

## Checklist

- [ ] Tested locally (`python -m http.server`, desktop + phone widths)
- [ ] Attribution files untouched (`src/models/ATTRIBUTION.md`, `NOTICE.md`)
- [ ] No new runtime dependencies (plain ES modules, no build step)
- [ ] Model pipeline: if `atlas.json`/`sys-*.bin.gz` changed, ran `node tools/repack-by-system.mjs` and part indices stayed stable
- [ ] Descriptions remain original writing from public-domain sources
