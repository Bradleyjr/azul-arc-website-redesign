# Visual Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a custom GLSL shader hero, animated SVG section dividers, and glassmorphic floating elements to the Azul Arc homepage.

**Architecture:** Three independent visual layers — (1) a WebGL2 canvas shader replaces the hero dot grid, (2) inline SVG components with CSS-animated gradients bridge section color transitions, (3) CSS glassmorphic shapes replace the about section's flat photo placeholders. No new dependencies.

**Tech Stack:** Raw WebGL2 API, inline SVG, CSS backdrop-filter, motion/react useTransform, Tailwind CSS, TypeScript.

---

### Task 1: Create the WebGL Shader Component

**Files:**
- Create: `src/components/HeroShader.tsx`

This is a self-contained React component that renders a fullscreen WebGL2 canvas with a custom GLSL fragment shader. It accepts mouse position and renders an organic morphing gradient mesh.

**Step 1: Create the shader component file**

Create `src/components/HeroShader.tsx` with the following complete code:

```tsx
import { useEffect, useRef } from 'react';

// --- GLSL Shader Sources ---

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

// --- Simplex 3D Noise (Ashima Arts) ---
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
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.15;

  // Layered noise for organic flow
  float n1 = snoise(vec3(p * 1.2, t * 0.8)) * 0.5 + 0.5;
  float n2 = snoise(vec3(p * 2.4 + 3.0, t * 0.6 + 10.0)) * 0.5 + 0.5;
  float n3 = snoise(vec3(p * 0.8 - 5.0, t * 1.0 + 20.0)) * 0.5 + 0.5;

  // Mouse distortion
  vec2 mouseUV = u_mouse * vec2(aspect, 1.0);
  vec2 pAspect = p;
  float mouseDist = length(pAspect - mouseUV);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.15;
  n1 += mouseInfluence;
  n2 -= mouseInfluence * 0.5;

  // Brand colors
  vec3 navy   = vec3(0.027, 0.251, 0.420);  // #07406B
  vec3 blue   = vec3(0.094, 0.388, 0.863);  // #1863DC
  vec3 sky    = vec3(0.165, 0.655, 0.875);  // #2AA7DF
  vec3 light  = vec3(0.922, 0.957, 1.000);  // #EBF4FF

  // Color mixing — layered blending
  vec3 col = navy;
  col = mix(col, blue, smoothstep(0.3, 0.7, n1));
  col = mix(col, sky, smoothstep(0.5, 0.8, n2) * 0.6);
  col = mix(col, light, smoothstep(0.4, 0.9, n3) * 0.5);

  // Center fade to light (for text readability)
  float centerDist = length(uv - 0.5);
  float centerFade = 1.0 - smoothstep(0.0, 0.6, centerDist);
  col = mix(col, light, centerFade * 0.65);

  // Vignette
  float vignette = smoothstep(0.0, 0.7, centerDist);
  col = mix(col, col * 0.7, vignette * 0.3);

  // Film grain
  float grain = (snoise(vec3(uv * 500.0, t * 50.0)) * 0.5 + 0.5) * 0.03;
  col += grain;

  fragColor = vec4(col, 1.0);
}`;

// --- Component ---

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) return; // WebGL2 not supported — fallback is handled by parent

    // Compile shader
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

    // Fullscreen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    // State
    let animId = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: 0.5, y: 0.5 }; // normalized center
    const smoothMouse = { x: 0.5, y: 0.5 };
    const startTime = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2); // cap at 2x for performance
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function render() {
      const elapsed = (performance.now() - startTime) / 1000;

      // Smooth mouse interpolation
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05;

      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uResolution, width, height);
      gl!.uniform2f(uMouse, smoothMouse.x - 0.5, -(smoothMouse.y - 0.5)); // centered coords
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
```

**Step 2: Verify the file compiles**

Run: `cd "/Users/bradleyyoung/Active Projects/azul-arc-website-redesign" && npx tsc --noEmit`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/HeroShader.tsx
git commit -m "feat: add WebGL2 shader component for hero background"
```

---

### Task 2: Replace Hero Dot Grid with Shader

**Files:**
- Modify: `src/components/DesignFinal.tsx`

Remove the `HeroDotGrid` component, the three floating gradient orb divs, the grain texture div, and the `float1`/`float2`/`float3` keyframes. Import and render `HeroShader` instead. Add a mobile CSS gradient fallback.

**Step 1: Update DesignFinal.tsx**

At the top of the file, add the import (after the motion import, around line 31):

```tsx
import HeroShader from './HeroShader';
```

Delete the entire `HeroDotGrid` function (lines 219-310 approximately — from `function HeroDotGrid()` through its closing `}`).

In the `<style>` block inside the component (around line 492-516), remove the `float1`, `float2`, `float3` keyframes. Keep `gradientPulse` and `underlineGrow`.

The `<style>` block should become:
```tsx
<style>{`
  @keyframes gradientPulse {
    0%, 100% { background-position: 50% 50%; background-size: 200% 200%; }
    25% { background-position: 0% 50%; background-size: 250% 250%; }
    50% { background-position: 100% 50%; background-size: 200% 200%; }
    75% { background-position: 50% 0%; background-size: 250% 250%; }
  }
  @keyframes underlineGrow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
`}</style>
```

In the Hero section (starts around line 607), replace the section's inline style, remove the three gradient orb divs, remove the `<HeroDotGrid />`, remove the grain texture div, and add the shader with mobile fallback.

The hero `<section>` should become:

```tsx
{/* === 2. Hero — GLSL Shader === */}
<section
  ref={heroRef}
  className="min-h-screen flex items-center justify-center relative overflow-hidden"
>
  {/* WebGL shader — desktop only */}
  <div className="hidden md:block absolute inset-0">
    <HeroShader />
  </div>

  {/* Mobile fallback — CSS gradient */}
  <div
    className="md:hidden absolute inset-0"
    style={{
      background: 'radial-gradient(ellipse at 50% 50%, #EBF4FF 0%, #ffffff 40%, #07406B 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradientPulse 12s ease-in-out infinite',
    }}
  />

  {/* Hero content — unchanged */}
  <motion.div
    style={{ scale: heroScale, opacity: heroOpacity }}
    className="max-w-6xl mx-auto px-6 pt-32 pb-32 text-center w-full relative z-10"
  >
    {/* ...keep all headline, subtext, CTA button content exactly as-is... */}
  </motion.div>

  {/* Stats at bottom — unchanged */}
  <motion.div
    ...
    className="absolute bottom-12 left-0 right-0 flex justify-center gap-12 z-10"
  >
    {/* ...keep stats exactly as-is... */}
  </motion.div>
</section>
```

**Step 2: Verify it compiles and renders**

Run: `npx tsc --noEmit`
Expected: No errors.

Visually check http://localhost:3000/ — the hero should show the organic morphing gradient shader on desktop. Moving the mouse should subtly warp the colors.

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: replace hero dot grid with GLSL shader background"
```

---

### Task 3: Create Section Divider Component

**Files:**
- Create: `src/components/SectionDivider.tsx`

A reusable SVG divider component with animated gradient fills.

**Step 1: Create the component**

Create `src/components/SectionDivider.tsx`:

```tsx
interface SectionDividerProps {
  fromColor: string;
  toColor: string;
  /** Unique ID for the SVG gradient — must be unique per divider instance */
  id: string;
  /** Flip vertically for "inverse" curves */
  flip?: boolean;
  /** Height in pixels */
  height?: number;
  /** Use a more dramatic curve (for the Process → Case Study transition) */
  dramatic?: boolean;
}

export default function SectionDivider({
  fromColor,
  toColor,
  id,
  flip = false,
  height = 120,
  dramatic = false,
}: SectionDividerProps) {
  const animId = `divider-gradient-${id}`;
  const path = dramatic
    ? 'M0,0 C360,120 720,20 1080,100 S1440,40 1440,0 L1440,120 L0,120 Z'
    : 'M0,0 C480,100 960,10 1440,0 L1440,120 L0,120 Z';

  return (
    <div
      className="relative w-full pointer-events-none select-none"
      style={{
        marginTop: `-${height / 2}px`,
        marginBottom: `-${height / 2}px`,
        height: `${height}px`,
        transform: flip ? 'scaleY(-1)' : undefined,
        zIndex: 5,
      }}
    >
      <style>{`
        @keyframes ${animId} {
          0%, 100% {
            stop-color: ${fromColor};
          }
          50% {
            stop-color: ${toColor};
          }
        }
        @keyframes ${animId}-end {
          0%, 100% {
            stop-color: ${toColor};
          }
          50% {
            stop-color: ${fromColor};
          }
        }
      `}</style>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={animId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{
                stopColor: fromColor,
                animation: `${animId} 8s ease-in-out infinite`,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: toColor,
                animation: `${animId}-end 8s ease-in-out infinite`,
              }}
            />
          </linearGradient>
        </defs>
        <path d={path} fill={`url(#${animId})`} />
      </svg>
    </div>
  );
}
```

**Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/SectionDivider.tsx
git commit -m "feat: add reusable animated SVG section divider component"
```

---

### Task 4: Add Section Dividers to the Page

**Files:**
- Modify: `src/components/DesignFinal.tsx`

Import and place 5 `SectionDivider` instances between sections.

**Step 1: Add import**

At the top of DesignFinal.tsx, add:
```tsx
import SectionDivider from './SectionDivider';
```

**Step 2: Place dividers between sections**

Insert these dividers in the JSX between the corresponding section closing/opening tags. Each divider goes between two sections, overlapping both via negative margins.

**After the Hero section closing `</section>`, before the About section:**
```tsx
<SectionDivider id="hero-about" fromColor="#ffffff" toColor="#F8FAFC" />
```

**After the Industries section closing `</section>`, before the Capabilities section:**
```tsx
<SectionDivider id="industries-caps" fromColor="#ffffff" toColor="#F8FAFC" />
```

**After the Capabilities section closing `</section>`, before the Process section:**
```tsx
<SectionDivider id="caps-process" fromColor="#F8FAFC" toColor="#ffffff" flip />
```

**After the Process section closing `</section>`, before the Case Study section:**
```tsx
<SectionDivider id="process-casestudy" fromColor="#ffffff" toColor="#07406B" dramatic height={160} />
```

**After the Case Study section closing `</section>`, before the Booking section:**
```tsx
<SectionDivider id="casestudy-booking" fromColor="#07406B" toColor="#F8FAFC" flip height={140} />
```

**Step 3: Verify it compiles and renders**

Run: `npx tsc --noEmit`
Expected: No errors.

Visually check http://localhost:3000/ — scroll through the page and verify curved gradient dividers appear between sections. The Process → Case Study divider should be the most dramatic.

**Step 4: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: add animated gradient dividers between all major sections"
```

---

### Task 5: Replace About Section Photo Placeholders with Glassmorphic Elements

**Files:**
- Modify: `src/components/DesignFinal.tsx`

Replace the 4 flat tint `<div>` photo placeholders in the About section's desktop sticky scroll with glassmorphic floating shapes.

**Step 1: Add glass keyframe to the style block**

In the `<style>` block inside the component, add after the `underlineGrow` keyframe:

```css
@keyframes glassRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**Step 2: Replace the 4 photo placeholder motion.divs**

In the About section's desktop block (inside the `sticky top-0 h-screen` div), replace ALL FOUR photo `<motion.div>` blocks with these glassmorphic elements:

```tsx
{/* Glass orb — far left */}
<motion.div style={{ y: photo1Y }} className="absolute left-[6%] z-10">
  <div className="w-52 h-52 rounded-full bg-white/20 backdrop-blur-xl shadow-2xl border-t border-white/30 flex items-center justify-center">
    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-sky/20 blur-sm" />
  </div>
</motion.div>

{/* Gradient disc — far right */}
<motion.div style={{ y: photo2Y }} className="absolute right-[8%] z-10">
  <div className="w-64 h-64 rounded-full bg-gradient-radial from-brand-sky/15 via-brand-primary/10 to-transparent blur-2xl" />
</motion.div>

{/* Glass card — left-center */}
<motion.div style={{ y: photo3Y }} className="absolute left-[20%] z-10">
  <div className="w-44 h-56 rounded-3xl bg-white/15 backdrop-blur-lg shadow-xl border border-white/20 rotate-3" />
</motion.div>

{/* Geometric ring accent — right-center, passes in FRONT of text */}
<motion.div style={{ y: photo4Y }} className="absolute right-[16%] z-30 opacity-20">
  <div
    className="w-48 h-48 rounded-full border-2 border-brand-primary"
    style={{ animation: 'glassRotate 40s linear infinite' }}
  />
</motion.div>
```

Note: `bg-gradient-radial` may not exist in Tailwind by default. Use an inline style instead for the gradient disc:
```tsx
<div className="w-64 h-64 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(42,167,223,0.15), rgba(24,99,220,0.1), transparent)' }} />
```

**Step 3: Update the mobile fallback**

In the mobile About section (`<div className="md:hidden ..."`), replace the 4 photo grid items with simplified glass shapes:

```tsx
<div className="flex justify-center gap-4 flex-wrap">
  <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-xl shadow-lg border-t border-white/20" style={{ animation: 'float1 15s ease-in-out infinite' }} />
  <div className="w-32 h-32 rounded-full blur-xl" style={{ background: 'radial-gradient(circle, rgba(42,167,223,0.15), transparent)' }} />
  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-lg shadow-md border border-white/15 rotate-12" />
</div>
```

Wait — the `float1` keyframe was removed in Task 2. Add a simpler CSS float animation to the `<style>` block:

```css
@keyframes gentleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

Then use `animation: 'gentleFloat 6s ease-in-out infinite'` on mobile glass shapes.

**Step 4: Verify it compiles and renders**

Run: `npx tsc --noEmit`
Expected: No errors.

Visually check http://localhost:3000/ — scroll through the About section. The glassmorphic shapes should float upward past the centered text. The geometric ring accent should pass in front of the text at low opacity.

**Step 5: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: replace about photo placeholders with glassmorphic floating elements"
```

---

### Task 6: Final Visual Tuning Pass

**Files:**
- Modify: `src/components/DesignFinal.tsx`
- Modify: `src/components/HeroShader.tsx` (if shader needs color/speed tuning)

**Step 1: Visual QA checklist**

Open http://localhost:3000/ and check each item:

- [ ] Hero shader renders smoothly, no flickering
- [ ] Hero shader responds to mouse movement
- [ ] Hero text is readable over the shader (center should be light)
- [ ] Hero → About divider curve is visible and gradient animates
- [ ] About glassmorphic shapes float upward on scroll
- [ ] About text stays readable as shapes pass behind it
- [ ] Industries → Capabilities divider is visible
- [ ] Capabilities → Process divider (flipped) is visible
- [ ] Process → Case Study dramatic divider looks impactful
- [ ] Case Study → Booking divider transitions navy back to light
- [ ] No horizontal scrollbar anywhere
- [ ] Mobile: hero shows CSS gradient fallback (no shader)
- [ ] Mobile: about shows static glass shapes

**Step 2: Adjust shader parameters if needed**

If the center isn't light enough for text readability, increase `centerFade` multiplier in `HeroShader.tsx` fragment source (currently `0.65`, try `0.75` or `0.8`).

If the animation is too fast, decrease the `u_time * 0.15` multiplier (try `0.10`).

If mouse effect is too strong/weak, adjust the `mouseInfluence` multiplier (currently `0.15`).

**Step 3: Adjust divider heights/curves if needed**

If any divider feels too tall or short, change the `height` prop on that `SectionDivider` instance.

If the dramatic divider path doesn't look right, edit the `path` string in `SectionDivider.tsx`.

**Step 4: Commit final tuning**

```bash
git add -A
git commit -m "polish: tune shader parameters, divider curves, and glass element sizing"
```
