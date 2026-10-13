// Generates per-theme background textures (SVG) for the UI themes.
// Deterministic (seeded PRNG) so re-running produces identical files.
// Output: src/themes/midnight.svg, pearl.svg, pop.svg
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src", "themes");
mkdirSync(OUT, { recursive: true });

// mulberry32 seeded PRNG
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const W = 1280, H = 800;
const r2 = (n) => Math.round(n * 10) / 10;

// soft radial blob
function blob(cx, cy, r, color, op) {
  return `<radialGradient id="b${cx}${cy}" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${color}" stop-opacity="${op}"/>
    <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
  </radialGradient>
  <circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}" fill="url(#b${cx}${cy})"/>`;
}

// ── MIDNIGHT: deep navy, teal/cyan glows, dotted grid, fine grain ──
function midnight() {
  const r = rng(1337);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
<stop offset="0%" stop-color="#0a1322"/><stop offset="55%" stop-color="#081020"/><stop offset="100%" stop-color="#050a14"/>
</linearGradient>
<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
<circle cx="1.4" cy="1.4" r="1.1" fill="#27406b" opacity="0.35"/>
</pattern>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch"/>
<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.045 0"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.5"/>`;
  const glows = [["#14b8a6", 240, 150, 460], ["#0ea5e9", 1080, 120, 420], ["#6366f1", 640, 760, 560], ["#22d3ee", 150, 700, 380]];
  for (const [c, x, y, rad] of glows) s += blob(x + r() * 60, y + r() * 40, rad, c, 0.16);
  s += `<rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.5"/></svg>`;
  return s;
}

// ── PEARL: soft light, pastel blue/mint/lilac blobs, airy grain ──
function pearl() {
  const r = rng(2024);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
<stop offset="0%" stop-color="#f2f6fd"/><stop offset="60%" stop-color="#e9eef9"/><stop offset="100%" stop-color="#e4ebf7"/>
</linearGradient>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" stitchTiles="stitch"/>
<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>`;
  const glows = [["#93c5fd", 200, 120, 500], ["#6ee7b7", 1120, 200, 440], ["#c4b5fd", 900, 760, 520], ["#fbcfe8", 120, 720, 380]];
  for (const [c, x, y, rad] of glows) s += blob(x + r() * 50, y + r() * 40, rad, c, 0.28);
  s += `<rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.55"/></svg>`;
  return s;
}

// ── POP: playful dark-violet canvas, candy blobs, confetti ──
function pop() {
  const r = rng(90210);
  const candy = ["#ff6ec7", "#ffb547", "#4dd0e1", "#a78bfa", "#f472b6", "#34d399"];
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1">
<stop offset="0%" stop-color="#1b0f33"/><stop offset="55%" stop-color="#150b28"/><stop offset="100%" stop-color="#0f0720"/>
</linearGradient>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" stitchTiles="stitch"/>
<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>`;
  const glows = [[candy[0], 180, 140, 470], [candy[1], 1120, 160, 430], [candy[2], 980, 720, 480], [candy[3], 240, 740, 500], [candy[4], 640, 400, 560]];
  for (const [c, x, y, rad] of glows) s += blob(x + r() * 60, y + r() * 40, rad, c, 0.2);
  // confetti: small dots + tiny rings
  for (let i = 0; i < 64; i++) {
    const x = r() * W, y = r() * H, rad = 1.5 + r() * 3.4, c = candy[(i * 7 + 3) % candy.length], op = 0.25 + r() * 0.4;
    if (i % 4 === 0) s += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(rad + 2.5)}" fill="none" stroke="${c}" stroke-width="1.4" opacity="${r2(op * 0.8)}"/>`;
    else s += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(rad)}" fill="${c}" opacity="${r2(op)}"/>`;
  }
  s += `<rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.5"/></svg>`;
  return s;
}

const files = { "midnight.svg": midnight(), "pearl.svg": pearl(), "pop.svg": pop() };
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg, "utf8");
  console.log("wrote src/themes/" + name, (svg.length / 1024).toFixed(1) + " KB");
}
