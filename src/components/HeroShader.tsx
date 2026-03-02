import { useEffect, useRef } from 'react';

const VERTEX_SOURCE = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SOURCE = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// --- Simplex 3D Noise ---
vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Grid line function — returns intensity
float gridLine(vec2 p, float spacing, float thickness) {
  vec2 grid = abs(fract(p / spacing - 0.5) - 0.5) * spacing;
  float line = min(grid.x, grid.y);
  return 1.0 - smoothstep(0.0, thickness, line);
}

// Dot at grid intersections
float gridDot(vec2 p, float spacing, float radius) {
  vec2 cell = fract(p / spacing) - 0.5;
  return 1.0 - smoothstep(radius - 0.003, radius, length(cell) * spacing);
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = u_time * 0.08;

  // --- Noise fields ---
  float n1 = snoise(vec3(p * 0.9, t * 0.7)) * 0.5 + 0.5;
  float n2 = snoise(vec3(p * 1.8 + 5.0, t * 0.5 + 10.0)) * 0.5 + 0.5;
  float n3 = snoise(vec3(p * 3.0 - 3.0, t * 0.9 + 20.0)) * 0.5 + 0.5;

  // Mouse
  vec2 mouseUV = u_mouse * vec2(aspect, 1.0);
  float mouseDist = length(p - mouseUV);
  float mouseWarp = smoothstep(0.4, 0.0, mouseDist) * 0.10;
  n1 += mouseWarp;
  n2 += mouseWarp * 0.5;

  // Color palette — light, clean, bold accents
  vec3 cleanWhite = vec3(0.96, 0.975, 0.995);   // near-white with cool tint
  vec3 softTint   = vec3(0.92, 0.96, 0.99);      // #EBF4FF area
  vec3 brandBlue  = vec3(0.094, 0.388, 0.863);   // #1863DC
  vec3 accentSky  = vec3(0.165, 0.655, 0.875);   // #2AA7DF
  vec3 brandNavy  = vec3(0.027, 0.251, 0.420);   // #07406B

  // --- Build clean light base ---
  vec3 col = cleanWhite;
  // Subtle tint variation — barely perceptible warm/cool shifts
  col = mix(col, softTint, smoothstep(0.3, 0.7, n1) * 0.6);

  // Bold blue energy at edges — confident, not dark
  float edgeDist = length(p);
  float edgeMask = smoothstep(0.25, 0.75, edgeDist);
  vec3 edgeColor = mix(brandBlue, accentSky, n2);
  col = mix(col, edgeColor, edgeMask * 0.18);

  // Flowing accent ribbons — brand blue moves through the field
  float ribbon1 = smoothstep(0.55, 0.75, n3) * smoothstep(0.85, 0.75, n3);
  col = mix(col, brandBlue, ribbon1 * 0.12);
  float ribbon2 = smoothstep(0.45, 0.6, n2) * smoothstep(0.7, 0.6, n2);
  col = mix(col, accentSky, ribbon2 * 0.08);

  // Mouse proximity — bold blue glow near cursor
  float mouseGlow = smoothstep(0.3, 0.0, mouseDist);
  col = mix(col, brandBlue, mouseGlow * 0.12);
  col = mix(col, accentSky, mouseGlow * 0.04);

  // --- Grid overlay ---
  vec2 gridP = p;
  gridP += vec2(
    snoise(vec3(p * 0.5, t * 0.3)) * 0.015,
    snoise(vec3(p * 0.5 + 10.0, t * 0.3)) * 0.015
  );

  float gridSpacing = 0.10;
  float lines = gridLine(gridP, gridSpacing, 0.0006);
  float dots = gridDot(gridP, gridSpacing, 0.006);

  // Grid visible across the field, stronger at edges
  float gridFade = 0.3 + edgeMask * 0.7;
  // Mouse reveals grid nearby
  float mouseGridBoost = smoothstep(0.25, 0.0, mouseDist) * 0.6;
  gridFade = min(gridFade + mouseGridBoost, 1.0);

  // Grid drawn in brand blue on light background
  col = mix(col, brandBlue * 0.5, lines * gridFade * 0.12);
  col = mix(col, brandBlue, dots * gridFade * 0.2);

  // Node pulse — dots near mouse pulse bolder
  float nodePulse = smoothstep(0.18, 0.0, mouseDist) * dots;
  col = mix(col, brandBlue, nodePulse * 0.5);
  col = mix(col, accentSky, nodePulse * 0.2);

  // --- Subtle bottom edge fade to navy (anchors the hero) ---
  float bottomFade = smoothstep(0.3, 0.5, -p.y);
  col = mix(col, brandNavy, bottomFade * 0.08);

  // --- Very subtle scan lines for texture ---
  float scanline = sin(uv.y * u_resolution.y * 0.5) * 0.5 + 0.5;
  col *= 0.995 + scanline * 0.005;

  // --- Light film grain ---
  float grain = (snoise(vec3(uv * 400.0, t * 40.0)) * 0.5 + 0.5) * 0.012;
  col += grain - 0.006; // center around zero to avoid brightening

  fragColor = vec4(col, 1.0);
}`;

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) return;

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let animId = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    const startTime = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function render() {
      const elapsed = (performance.now() - startTime) / 1000;
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05;
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uResolution, width, height);
      gl!.uniform2f(uMouse, smoothMouse.x - 0.5, -(smoothMouse.y - 0.5));
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    resize();
    animId = requestAnimationFrame(render);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };
    const handleLeave = () => { mouse.x = 0.5; mouse.y = 0.5; };

    const section = canvas.closest('section');
    (section || canvas).addEventListener('mousemove', handleMouse);
    (section || canvas).addEventListener('mouseleave', handleLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      (section || canvas).removeEventListener('mousemove', handleMouse);
      (section || canvas).removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}
