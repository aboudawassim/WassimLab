/**
 * Deterministic point cloud for the ambient star field.
 * Seeded so the layout is stable between mounts; no Math.random at render time.
 */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Points inside a sphere; a smaller flatten value turns the cloud into a wide strip. */
export function createStarPositions(count = 1600, radius = 1.25, seed = 20261108, flatten = 0.55) {
  if (!Number.isInteger(count) || count < 1) throw new RangeError('Star count must be a positive integer');
  const rand = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const r = radius * Math.cbrt(rand());
    const s = Math.sqrt(1 - u * u);
    positions[i * 3] = r * s * Math.cos(theta);
    positions[i * 3 + 1] = r * u * flatten;
    positions[i * 3 + 2] = r * s * Math.sin(theta);
  }
  return positions;
}
