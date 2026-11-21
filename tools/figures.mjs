// Build-time figures. Writes src/generated/field.json: electric field lines of an oscillating
// (Hertzian) dipole, the figure behind the home page. Rerun after changing anything here:
//   node tools/figures.mjs        (npm run build runs it first)
//
// For a short dipole along z, the electric field lines in a meridian plane are the contours of
//   Q(r, θ) = sin²θ · [ cos(kr − ωt) / (kr) − sin(kr − ωt) ]
// (Hertz 1889; e.g. Jackson, Classical Electrodynamics, §9.2). We draw them at ωt = phase, in units of
// the wavelength, with x = r sinθ across the page and z = r cosθ up it.
import { contours } from "d3-contour";
import { writeFileSync, mkdirSync } from "node:fs";

const W = 1440, H = 760;            // viewBox, px
const SPAN = 3.0;                     // wavelengths across the full width
const PHASE = 0.35;                   // ωt
const CX = W * 0.7, CZ = H * 0.5;   // dipole position in the viewBox (right of the headline)
const NX = Math.round(W * 0.8), NZ = Math.round(H * 0.8);          // sampling grid
const LEVELS = [0.03, 0.09, 0.17, 0.27, 0.4, 0.56, 0.76, 1.0, 1.35, 1.85, 2.6].flatMap((v) => [-v, v]);
const R_MIN = 0.06;                 // wavelengths: leave the singular core blank

const k = 2 * Math.PI;              // per wavelength
const scale = SPAN / W;             // wavelengths per px

function Q(px, pz) {
  const x = (px - CX) * scale, z = (CZ - pz) * scale;
  const r0 = Math.hypot(x, z) || 1e-9;
  const s2 = (x * x) / (r0 * r0);
  const r = Math.max(r0, R_MIN);
  const kr = k * r;
  return s2 * (Math.cos(kr - PHASE) / kr - Math.sin(kr - PHASE));
}

const values = new Float64Array(NX * NZ);
for (let j = 0; j < NZ; j++)
  for (let i = 0; i < NX; i++) {
    const v = Q((i / (NX - 1)) * W, (j / (NZ - 1)) * H);
    values[j * NX + i] = Number.isNaN(v) ? 0 : v;
  }

// Contour polygons close along the grid edge and around the blank core; keep only the true field lines.
const onEdge = ([x, y]) => x <= 0.001 || y <= 0.001 || x >= NX - 1.001 || y >= NZ - 1.001;
const inCore = ([x, y]) => Math.hypot((x / (NX - 1)) * W - CX, (y / (NZ - 1)) * H - CZ) * scale < R_MIN * 1.25;

function rdp(pts, eps) {           // Ramer–Douglas–Peucker
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let dmax = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const d = Math.abs((b[1] - a[1]) * p[0] - (b[0] - a[0]) * p[1] + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(b[0] - a[0], b[1] - a[1]) || 1);
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax <= eps) return [a, b];
  return rdp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(pts.slice(idx), eps));
}

const lines = [];
for (const c of contours().size([NX, NZ]).thresholds(LEVELS)(values)) {
  for (const poly of c.coordinates)
    for (const ring of poly) {
      let cur = [];
      const flush = () => { if (cur.length > 4) lines.push({ level: c.value, pts: cur }); cur = []; };
      for (const p of ring) {
        if (onEdge(p) || inCore(p)) { flush(); continue; }
        cur.push([(p[0] / (NX - 1)) * W, (p[1] / (NZ - 1)) * H]);
      }
      flush();
    }
}

const f = (n) => Math.round(n * 10) / 10;
const paths = lines.map(({ level, pts }) => ({
  level,
  d: rdp(pts, 0.35).map((p, i) => (i ? "L" : "M") + f(p[0]) + " " + f(p[1])).join(""),
}));
mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
writeFileSync(new URL("../src/generated/field.json", import.meta.url),
  JSON.stringify({ width: W, height: H, cx: CX, cz: CZ, span: SPAN, phase: PHASE, paths }));
console.log(`figures: ${paths.length} field lines, ${(JSON.stringify(paths).length / 1024).toFixed(0)} KB`);
