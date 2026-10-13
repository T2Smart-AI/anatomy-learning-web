// Repack atlas meshes into one .bin.gz per source system with
// strict 4-byte alignment (Float32 positions and Uint32 indices
// require it; Int16 normals only need 2-byte alignment).
//
// Input (either):
//   legacy:  src/models/body-<i>.bin.gz + atlas.json with numeric chunk ids
//   packed:  src/models/sys-<system>.bin.gz + atlas.json with string chunk ids
// Output: src/models/atlas.json (updated offsets) + src/models/sys-<system>.bin.gz
// Part indices are preserved, so src/part-map.json stays valid.
// Idempotent: re-running on already-packed output just re-aligns.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const modelsDir = path.join(process.cwd(), "src", "models");
const atlasPath = path.join(modelsDir, "atlas.json");
const atlas = JSON.parse(fs.readFileSync(atlasPath, "utf8"));

const legacyMode = fs.existsSync(path.join(modelsDir, "body-0.bin.gz"));
const packedMode = !legacyMode && atlas.chunks.every((c) => typeof c.id === "string");
if (!legacyMode && !packedMode) {
  console.error("Neither legacy body-*.bin.gz chunks nor per-system packs found.");
  process.exit(1);
}
console.log(legacyMode ? "Mode: legacy mixed chunks → per-system" : "Mode: re-align existing per-system packs");

// Read a part's three arrays from wherever they currently live.
function readPart(p) {
  let src;
  if (legacyMode) {
    if (!chunkBuffers[p.chunk]) {
      const file = path.join(modelsDir, `body-${p.chunk}.bin.gz`);
      const buf = zlib.gunzipSync(fs.readFileSync(file));
      if (buf.byteLength !== atlas.chunks[p.chunk].bytes) throw new Error(`legacy chunk ${p.chunk} size mismatch`);
      chunkBuffers[p.chunk] = buf;
    }
    src = chunkBuffers[p.chunk];
  } else {
    const key = String(p.chunk);
    if (!chunkBuffers[key]) {
      const file = path.join(modelsDir, `sys-${key}.bin.gz`);
      chunkBuffers[key] = zlib.gunzipSync(fs.readFileSync(file));
    }
    src = chunkBuffers[key];
  }
  const pLen = p.vertexCount * 3 * 4;
  const nLen = p.vertexCount * 3 * 2;
  const iLen = p.indexCount * 4;
  return {
    positions: Buffer.from(src.subarray(p.positions, p.positions + pLen)),
    normals: Buffer.from(src.subarray(p.normals, p.normals + nLen)),
    indices: Buffer.from(src.subarray(p.indices, p.indices + iLen)),
  };
}
const chunkBuffers = new Map();

// Group part indices by source system, keeping original order.
const bySystem = new Map();
atlas.parts.forEach((p, i) => {
  const sys = String(p.chunk);
  if (!bySystem.has(sys)) bySystem.set(sys, []);
  bySystem.get(sys).push(i);
});

const newParts = atlas.parts.map((p) => ({ ...p }));
const newChunks = [];
const report = [];

for (const [sys, idxs] of bySystem) {
  // First pass: compute sizes with 4-byte alignment padding before indices.
  let total = 0;
  const sizes = idxs.map((i) => {
    const p = atlas.parts[i];
    const pLen = p.vertexCount * 3 * 4;
    const nLen = p.vertexCount * 3 * 2;
    const iLen = p.indexCount * 4;
    const pad = (4 - ((pLen + nLen) % 4)) % 4;
    total += pLen + nLen + pad + iLen;
    return { pLen, nLen, iLen, pad };
  });
  const buf = Buffer.alloc(total);
  let off = 0;
  idxs.forEach((i, k) => {
    const { positions, normals, indices } = readPart(atlas.parts[i]);
    const { pLen, nLen, iLen, pad } = sizes[k];
    positions.copy(buf, off);
    newParts[i].positions = off;
    normals.copy(buf, off + pLen);
    newParts[i].normals = off + pLen;
    const idxOff = off + pLen + nLen + pad;
    indices.copy(buf, idxOff);
    newParts[i].indices = idxOff;
    newParts[i].chunk = sys;
    if (idxOff % 4 !== 0 || off % 4 !== 0) throw new Error(`alignment broken for ${sys} part ${i}`);
    off = idxOff + iLen;
  });
  if (off !== total) throw new Error(`layout mismatch for ${sys}: ${off} != ${total}`);
  const gz = zlib.gzipSync(buf, { level: 9 });
  fs.writeFileSync(path.join(modelsDir, `sys-${sys}.bin.gz`), gz);
  newChunks.push({
    id: sys,
    url: `/models/sys-${sys}.bin`,
    gzip: `/models/sys-${sys}.bin.gz`,
    bytes: total,
    gzipBytes: gz.byteLength,
    meshes: idxs.length,
  });
  report.push({ sys, meshes: idxs.length, gzMB: (gz.byteLength / 1e6).toFixed(1) });
}

atlas.parts = newParts;
atlas.chunks = newChunks;
atlas.packing = "per-source-system, 4-byte aligned (tools/repack-by-system.mjs)";
fs.writeFileSync(atlasPath, JSON.stringify(atlas));

const totalGz = report.reduce((a, r) => a + parseFloat(r.gzMB), 0);
console.log("Per-system packs (gzipped):");
for (const r of report) console.log(`  ${r.sys.padEnd(16)} ${String(r.meshes).padStart(5)} meshes  ${r.gzMB} MB`);
console.log(`TOTAL: ${totalGz.toFixed(1)} MB across ${report.length} files`);
