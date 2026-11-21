// A person's "field signature": dipole field lines (r = C sin²(θ − θ0)) and a few wavefronts, with every parameter
// drawn from a hash of their name, so each pattern is unique and stable. Computed at build time; no JS on the page.
function hash(s: string) {
  let h = 2166136261;
  for (const c of s) { h ^= c.codePointAt(0)!; h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
}

export function signature(name: string) {
  const rnd = hash(name);
  const th0 = rnd() * Math.PI;                       // dipole axis
  const n = 3 + Math.floor(rnd() * 3);               // nested loops per lobe
  const scale = 40 + rnd() * 14;                     // size of the outer loop
  const fronts = 2 + Math.floor(rnd() * 2);          // wavefronts
  const accent = rnd() < 0.5;                        // which family takes the copper
  const cx = 50, cy = 50;                            // the source sits at the centre, under the initials
  const f = (v: number) => v.toFixed(1);
  const loops: { d: string; copper: boolean }[] = [];
  for (let i = 1; i <= n; i++) {
    const C = (scale * i) / n;
    for (const side of [0, Math.PI]) {
      const pts: string[] = [];
      for (let k = 0; k <= 48; k++) {
        const t = side + (k / 48) * Math.PI;
        const r = C * Math.sin(t) ** 2;
        pts.push(`${k ? "L" : "M"}${f(cx + r * Math.cos(t + th0))} ${f(cy + r * Math.sin(t + th0))}`);
      }
      loops.push({ d: pts.join(""), copper: accent ? i === n : i === 1 });
    }
  }
  const waves = Array.from({ length: fronts }, (_, i) => ({ r: 30 + i * 8 + rnd() * 4, copper: !accent && i === fronts - 1 }));
  return { cx, cy, loops, waves };
}
