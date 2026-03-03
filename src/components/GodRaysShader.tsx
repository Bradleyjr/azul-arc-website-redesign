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

// Simplex noise for organic variation
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

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time * 0.12;

  // Light source — upper center, slightly left
  vec2 lightPos = vec2(0.95, 1.0);

  // Vector from current pixel to light
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 toLight = p - lightPos;
  float dist = length(toLight);
  float angle = atan(toLight.y, toLight.x);

  // Base navy background
  vec3 navy = vec3(0.027, 0.251, 0.420);     // #07406B
  vec3 deepNavy = vec3(0.015, 0.12, 0.22);
  vec3 col = mix(navy, deepNavy, smoothstep(0.0, 0.8, dist));

  // --- God rays ---
  // Multiple ray layers with different frequencies and speeds
  float rays = 0.0;

  // Layer 1: broad rays
  float n1 = snoise(vec3(angle * 3.0, dist * 0.5, t * 0.7));
  float ray1 = smoothstep(0.1, 0.6, sin(angle * 5.0 + t * 0.3 + n1 * 1.5) * 0.5 + 0.5);
  ray1 *= smoothstep(2.0, 0.0, dist) * 0.6;
  rays += ray1;

  // Layer 2: tighter rays
  float n2 = snoise(vec3(angle * 5.0 + 10.0, dist * 0.8, t * 0.5 + 5.0));
  float ray2 = smoothstep(0.2, 0.7, sin(angle * 9.0 - t * 0.2 + n2 * 2.0) * 0.5 + 0.5);
  ray2 *= smoothstep(1.8, 0.0, dist) * 0.35;
  rays += ray2;

  // Layer 3: fine shimmer rays
  float n3 = snoise(vec3(angle * 8.0 - 5.0, dist * 1.2, t * 0.9 + 15.0));
  float ray3 = smoothstep(0.3, 0.8, sin(angle * 16.0 + t * 0.15 + n3 * 1.8) * 0.5 + 0.5);
  ray3 *= smoothstep(1.4, 0.0, dist) * 0.2;
  rays += ray3;

  // Noise-driven intensity variation across rays
  float intensityNoise = snoise(vec3(angle * 2.0, t * 0.3, 0.0)) * 0.5 + 0.5;
  rays *= 0.7 + intensityNoise * 0.3;

  // Color the rays — mix of brand blue and sky blue
  vec3 brandBlue = vec3(0.094, 0.388, 0.863);  // #1863DC
  vec3 accentSky = vec3(0.165, 0.655, 0.875);  // #2AA7DF
  vec3 rayColor = mix(brandBlue, accentSky, snoise(vec3(angle * 3.0, dist, t * 0.4)) * 0.5 + 0.5);

  col += rayColor * rays;

  // Soft glow at the light source
  float glow = smoothstep(0.8, 0.0, dist) * 0.15;
  col += mix(brandBlue, accentSky, 0.5) * glow;

  // Subtle vignette — darken edges
  float vignette = smoothstep(0.6, 1.8, dist);
  col = mix(col, deepNavy * 0.7, vignette * 0.4);

  // Film grain
  float grain = (snoise(vec3(uv * 400.0, t * 40.0)) * 0.5 + 0.5) * 0.015;
  col += grain - 0.0075;

  // Ordered dithering (4x4 Bayer matrix) to break color banding
  int bx = int(mod(gl_FragCoord.x, 4.0));
  int by = int(mod(gl_FragCoord.y, 4.0));
  int idx = bx + by * 4;
  float bayer;
  if      (idx ==  0) bayer =  0.0/16.0;
  else if (idx ==  1) bayer =  8.0/16.0;
  else if (idx ==  2) bayer =  2.0/16.0;
  else if (idx ==  3) bayer = 10.0/16.0;
  else if (idx ==  4) bayer = 12.0/16.0;
  else if (idx ==  5) bayer =  4.0/16.0;
  else if (idx ==  6) bayer = 14.0/16.0;
  else if (idx ==  7) bayer =  6.0/16.0;
  else if (idx ==  8) bayer =  3.0/16.0;
  else if (idx ==  9) bayer = 11.0/16.0;
  else if (idx == 10) bayer =  1.0/16.0;
  else if (idx == 11) bayer =  9.0/16.0;
  else if (idx == 12) bayer = 15.0/16.0;
  else if (idx == 13) bayer =  7.0/16.0;
  else if (idx == 14) bayer = 13.0/16.0;
  else                bayer =  5.0/16.0;
  col += (bayer - 0.5) / 24.0;

  fragColor = vec4(col, 1.0);
}`;

export default function GodRaysShader() {
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

    let animId = 0;
    let width = 0;
    let height = 0;
    const startTime = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // cap for performance
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function render() {
      const elapsed = (performance.now() - startTime) / 1000;
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uResolution, width, height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    resize();
    animId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
