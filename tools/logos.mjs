// OpenMaxwell logo variants for review (npm run logos). Writes public/brand/{a,b}-{horizontal,icon,dark}.svg.
//   A: the original idea redrawn: an M with three Wi-Fi arcs above it.
//   B: the arcs become field lines. With equal and opposite line charges at the two peaks of the M, every
//      electric field line is a circular arc through both charges, so the arcs share their endpoints.
// Wordmarks are outlined from the fonts (no font needed to show the logo).
import opentype from "opentype.js";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const NAVY = "#16325C", BLUE = "#2F7BD8", PAPER = "#F6F4EE";
const DARK_BG = "#0C1B33", DARK_M = "#EEF2F8", DARK_BLUE = "#7DB4FF";
const font = (p) => opentype.parse(readFileSync(new URL("../node_modules/" + p, import.meta.url)).buffer);
const SANS = font("@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff");
const SANS_LIGHT = font("@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff");
const SERIF = font("@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff");
const SERIF_LIGHT = font("@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff");

// The M on a 100 x 100 grid: stroke-drawn, square ends, mitred peaks.
const SW = 13;
const L = 14, R = 86, TOP = 30, BOT = 92, MID = 66;
const M = (c) => `<path d="M${L} ${BOT}V${TOP}L50 ${MID}L${R} ${TOP}V${BOT}" fill="none" stroke="${c}" stroke-width="${SW}" stroke-linejoin="miter" stroke-miterlimit="10"/>`;

function arcsA(c) {            // concentric arcs centred over the M
  const cx = 50, cy = 34, out = [];
  for (const r of [12, 25, 38]) {
    const a = (44 * Math.PI) / 180;      // half-angle of each arc
    const x1 = cx - r * Math.sin(a), y1 = cy - r * Math.cos(a), x2 = cx + r * Math.sin(a);
    out.push(`<path d="M${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y1.toFixed(2)}" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`);
  }
  return out.join("");
}

function arcsB(c) {            // circular field lines through both peaks (the charges)
  const a = (R - L) / 2, py = TOP - SW / 2 + 1, out = [];
  for (const s of [9, 20, 33]) {        // sagitta: height of each arc above the peaks
    const r = (a * a + s * s) / (2 * s);
    out.push(`<path d="M${L} ${py}A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${R} ${py}" fill="none" stroke="${c}" stroke-width="4"/>`);
  }
  return out.join("");
}

const mark = (v, m, b) => (v === "a" ? arcsA(b) : arcsB(b)) + M(m);
const MARK_TOP = -14;          // arcs rise above the 100-grid
// "Open" in the regular weight, "Maxwell" in semibold: one word, read as two.
function wordmark(v, color, x, baseline, size) {
  const [light, bold] = v === "a" ? [SANS_LIGHT, SANS] : [SERIF_LIGHT, SERIF];
  const p1 = light.getPath("Open", x, baseline, size);
  const x2 = x + light.getAdvanceWidth("Open", size);
  const p2 = bold.getPath("Maxwell", x2, baseline, size);
  const width = p2.getBoundingBox().x2 - x;
  return { svg: `<path d="${p1.toPathData(2)}${p2.toPathData(2)}" fill="${color}"/>`, width };
}

function horizontal(v, dark) {
  const m = dark ? DARK_M : NAVY, b = dark ? DARK_BLUE : BLUE;
  const w = wordmark(v, m, 128, 88, v === "a" ? 84 : 92);
  const W = Math.ceil(128 + w.width + 8), H = 100 - MARK_TOP + 8;
  const pad = dark ? 28 : 0;
  const bg = dark ? `<rect x="${-pad}" y="${MARK_TOP - 4 - pad}" width="${W + 2 * pad}" height="${H + 2 * pad}" rx="10" fill="${DARK_BG}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${MARK_TOP - 4 - pad} ${W + 2 * pad} ${H + 2 * pad}" role="img" aria-label="OpenMaxwell">${bg}${mark(v, m, b)}${w.svg}</svg>`;
}

function icon(v) {             // square: mark only, on paper
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 ${MARK_TOP - 8} 128 128" role="img" aria-label="OpenMaxwell"><rect x="-14" y="${MARK_TOP - 8}" width="128" height="128" rx="22" fill="${PAPER}"/>${mark(v, NAVY, BLUE)}</svg>`;
}

const out = new URL("../public/brand/", import.meta.url);
mkdirSync(out, { recursive: true });
for (const v of ["a", "b"]) {
  writeFileSync(new URL(`${v}-horizontal.svg`, out), horizontal(v, false));
  writeFileSync(new URL(`${v}-dark.svg`, out), horizontal(v, true));
  writeFileSync(new URL(`${v}-icon.svg`, out), icon(v));
  // bare mark for the site header (inherits currentColor + --field)
  writeFileSync(new URL(`../src/generated/mark-${v}.svg.txt`, import.meta.url),
    (v === "a" ? arcsA("var(--field)") : arcsB("var(--field)")) + M("currentColor"));
}
// the site icon: the variant in use (SITE.logo in src/data/site.ts; pass LOGO=a to switch)
const USE = process.env.LOGO || "b";
writeFileSync(new URL("icon.svg", out), icon(USE));
console.log("logos: public/brand/{a,b}-{horizontal,dark,icon}.svg");
