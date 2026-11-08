/**
 * WebGL capability probe.
 * A failed `WebGLRenderer` construction is fatal to the React tree, so the
 * ambient field must never mount without a working context. Probe once, then
 * release the test context so the real canvas can claim the GPU.
 */
let cached: boolean | null = null;

export function hasWebGL() {
  if (cached !== null) return cached;
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl');
    cached = Boolean(gl);
    if (gl && 'getExtension' in gl) {
      const lose = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
      lose?.loseContext();
    }
  } catch {
    cached = false;
  }
  return cached;
}
