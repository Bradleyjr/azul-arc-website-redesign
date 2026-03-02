# Visual Polish — Design Document

## Overview

Add immersive visual depth to the homepage on `design-concept-v2`. Three areas of focus: a custom GLSL shader hero background, animated SVG section dividers, and glassmorphic floating elements in the about section. Direction: organic + alive meets premium + dimensional. Immersive and bold.

## 1. Hero: Custom GLSL Shader Background

Replace the interactive dot grid and gradient orbs with a single full-viewport `<canvas>` running a custom WebGL2 fragment shader.

### Visual
- Organic morphing gradient mesh — liquid color that breathes
- Brand navy (#07406B), brand primary (#1863DC), and brand sky (#2AA7DF) flow into each other via simplex noise distortion
- Slow, continuous animation — no jarring movement
- Vignette darkens edges, fades to near-white at center for headline readability

### Interactivity
- Mouse position passed as a uniform (`u_mouse`)
- Cursor creates subtle gravitational pull — colors warp toward mouse with soft, delayed response (lerp toward target, ~0.05 factor)
- Not aggressive, just alive

### Depth Layer
- Film grain composited inside the shader (noise function at high frequency, low amplitude)
- Subtle — `opacity ~0.03` equivalent

### Colors in Shader
| Uniform | Hex | Role |
|---|---|---|
| color1 | #07406B | Dominant dark base |
| color2 | #1863DC | Flowing accent |
| color3 | #2AA7DF | Highlight peaks |
| color4 | #EBF4FF | Light fade center |

### Performance
- Raw WebGL2, no library
- One fullscreen quad, one fragment shader
- 60fps on integrated GPUs
- Mobile fallback: static CSS gradient (no canvas), retain floating orbs via CSS keyframes

### Tech
- `WebGLShader` helper component (~80 lines): creates GL context, compiles vertex + fragment shaders, manages uniforms, runs render loop with `requestAnimationFrame`
- Fragment shader: simplex noise (3D), color mixing with `smoothstep`, mouse distortion, grain, vignette
- Canvas sits at z-[1], pointer-events-none
- Hero content at z-10

### What Gets Removed
- `HeroDotGrid` canvas component (entire function)
- Three floating gradient orb divs
- Grain texture SVG div
- `float1`, `float2`, `float3` keyframes

## 2. Section Transitions: Animated Gradient Dividers

Curved SVG paths between sections replace hard color cuts.

### Shape
- Asymmetric organic curves — each divider unique
- `viewBox="0 0 1440 120"` (or similar), `preserveAspectRatio="none"`, `width="100%"`
- Positioned with negative margin to overlap section boundaries

### Gradient Animation
- SVG `<linearGradient>` with animated `stop-color` values
- CSS `@keyframes` shift gradient stops over 8-10 second loops
- Ambient motion — subconscious, not distracting

### Placement

| Location | From → To | Intensity |
|---|---|---|
| Hero → About | White → #F8FAFC | Subtle, gentle curve |
| Industries → Capabilities | White → #F8FAFC | Gentle wave |
| Capabilities → Process | #F8FAFC → White | Inverse curve |
| Process → Case Study | White → #07406B | Dramatic — large curve, brand-primary gradient bleeds into navy. Signature moment. |
| Case Study → Booking | #07406B → #F8FAFC | Navy bleeding back to light |

### Tech
- Inline SVG components (one per divider, or a reusable `<SectionDivider>` with props for colors/path)
- CSS `@keyframes` for gradient animation — defined in `<style>` block or index.css
- Zero JS overhead
- `pointer-events-none`, `select-none`

## 3. About Section: Glassmorphic Floating Elements

Replace flat tint photo placeholders with abstract, dimensional floating shapes.

### Elements (4-5 shapes)
- **Glass orbs**: Rounded shapes with `backdrop-blur-xl`, semi-transparent white/blue fills (`bg-white/20`, `bg-brand-primary/10`), subtle top-edge border highlight (`border-t border-white/30`)
- **Gradient discs**: Soft `radial-gradient` fills in brand colors, blurred edges (`blur-2xl` or `blur-3xl`), bokeh/out-of-focus light effect
- **Geometric accents**: Thin outlined shapes (ring via `border-2`, rounded square) in brand-primary at low opacity (`opacity-20`), rotating slowly via CSS `@keyframes` (360deg over 30-40s)

### Scroll Behavior
- Same `useTransform` approach as current photos — tied to `aboutProgress`
- Each shape starts below viewport, translates upward past the sticky text
- Different speeds per element (same staggered Y ranges)

### Layering
| Z-index | Elements |
|---|---|
| z-10 | Glass orbs, gradient discs (behind text) |
| z-20 | Centered quote text |
| z-30 | 1-2 geometric accents (in front, very low opacity) |

### Depth Cues
- Larger + blurrier shapes = farther away
- Smaller + sharper shapes = closer
- Creates parallax depth illusion within the sticky viewport

### Mobile
- 2-3 static glass shapes around the text
- Gentle CSS float animation (keyframes, no scroll tracking)
- No scroll-driven transforms

### Tech
- Pure CSS/Tailwind + motion `useTransform`
- No canvas or WebGL (hero owns GPU budget)
- `backdrop-filter: blur()` for glass effect

## Dependencies

**Add:** None. Raw WebGL2 API, CSS, inline SVG.

**Keep:** Everything current — react, motion, tailwindcss, vite, hugeicons.

## Performance Budget

- Hero shader: ~1-2ms per frame on GPU (trivial for a fullscreen quad)
- SVG dividers: CSS-only animation, no JS per frame
- Glassmorphic shapes: `backdrop-blur` can be expensive with many layers — limit to 4-5 elements max, avoid overlapping blurred elements
- Mobile: no WebGL, reduced glass elements
