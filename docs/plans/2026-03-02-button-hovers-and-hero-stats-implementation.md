# Button Hover Interactions & Hero Stats Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add elastic morph + particle burst button hovers and a counting odometer hero stats treatment to the Azul Arc homepage.

**Architecture:** Two new reusable components (`ElasticButton` and `OdometerStats`) plus modifications to DesignFinal.tsx to swap in the new components. ElasticButton wraps any CTA with hover tracking, elastic transform, text flip, and click particles. OdometerStats replaces the static hero stats with a flip-clock counter. All animation via Motion library (already installed as `motion/react`).

**Tech Stack:** React 19, TypeScript, Motion (`motion/react`), Tailwind CSS 4

**Key files for context:**
- `src/components/DesignFinal.tsx` — main homepage component, all buttons and stats live here
- `src/index.css` — global styles, Tailwind theme with brand colors
- Brand colors: `--color-brand-primary: #1863DC`, `--color-brand-navy: #07406B`, `--color-brand-sky: #2AA7DF`
- Motion imports already in DesignFinal.tsx: `motion, AnimatePresence, useScroll, useTransform, useMotionValue, useInView, animate`

---

### Task 1: Create ElasticButton Component

**Files:**
- Create: `src/components/ElasticButton.tsx`

**Context:** This component wraps button/anchor content with elastic morph (button warps toward cursor), text flip on hover, arrow overshoot, and particle burst on click. It needs to work as both `<a>` and `<button>` elements.

**Step 1: Create the component file with full implementation**

```tsx
// src/components/ElasticButton.tsx
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useState, useRef, useCallback, type ReactNode, type MouseEvent } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

interface ElasticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const PARTICLE_COLORS = ['#1863DC', '#2AA7DF', '#07406B', '#1863DC', '#2AA7DF'];

export default function ElasticButton({
  children,
  href,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
}: ElasticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  // --- Elastic morph: track cursor offset from button center ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 15, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 15, stiffness: 300 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Offset capped to subtle range
      mouseX.set((e.clientX - centerX) * 0.08);
      mouseY.set((e.clientY - centerY) * 0.12);
    },
    [mouseX, mouseY],
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // --- Particle burst on click ---
  const spawnParticles = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = variant === 'primary' ? 10 : 5;
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleId.current++,
        x,
        y,
        angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8,
        distance: 30 + Math.random() * 40,
        size: 3 + Math.random() * 3,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    // Clean up after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 500);
  }, [variant]);

  const handleClick = (e: MouseEvent) => {
    spawnParticles(e);
    onClick?.();
  };

  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { disabled };

  // --- Border draw for secondary variant ---
  const showBorderDraw = variant === 'secondary' && isHovered;

  return (
    <div ref={ref} className="relative inline-flex">
      <motion.div
        style={{ x: springX, y: springY }}
        whileHover={{ scale: variant === 'primary' ? 1.03 : 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative"
      >
        <Tag {...tagProps} className={className}>
          {/* Text flip wrapper */}
          <span className="relative inline-flex items-center gap-2 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={isHovered ? 'hovered' : 'idle'}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="inline-flex items-center gap-2"
              >
                {children}
              </motion.span>
            </AnimatePresence>
          </span>
        </Tag>

        {/* Secondary: animated border underline */}
        {variant === 'secondary' && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showBorderDraw ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      {/* Particle burst layer */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: p.x - p.size / 2,
              top: p.y - p.size / 2,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(p.angle) * p.distance,
              y: Math.sin(p.angle) * p.distance + 15, // gravity
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
```

**Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ElasticButton.tsx
git commit -m "feat: add ElasticButton component with elastic morph, text flip, and particle burst"
```

---

### Task 2: Create OdometerStats Component

**Files:**
- Create: `src/components/OdometerStats.tsx`

**Context:** Mechanical split-flap odometer that counts up on load. Each character flips independently with staggered timing. Three stat groups separated by vertical dividers.

**Step 1: Create the component file with full implementation**

```tsx
// src/components/OdometerStats.tsx
import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

interface Stat {
  value: string;    // e.g. "40%", "12+", "4mo"
  label: string;    // e.g. "Faster Processing"
}

const stats: Stat[] = [
  { value: '40%', label: 'Faster Processing' },
  { value: '12+', label: 'Platforms Shipped' },
  { value: '4mo', label: 'Average ROI' },
];

// Mobile shows fewer stats
const mobileStats: Stat[] = [
  { value: '40%', label: 'Faster Processing' },
  { value: '4mo', label: 'Average ROI' },
];

function FlipDigit({ char, delay }: { char: string; delay: number }) {
  const [hasFlipped, setHasFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasFlipped(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className="relative inline-block w-[0.65em] h-[1.2em] overflow-hidden"
      style={{
        perspective: '200px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
        borderRadius: '4px',
        background: 'rgba(0,0,0,0.02)',
      }}
    >
      {/* Outgoing (placeholder) digit */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-brand-navy font-bold"
        initial={{ rotateX: 0, opacity: 1 }}
        animate={hasFlipped ? { rotateX: -90, opacity: 0 } : {}}
        transition={{ duration: 0.3, ease: 'easeIn' }}
        style={{ transformOrigin: 'bottom center', backfaceVisibility: 'hidden' }}
      >
        0
      </motion.span>
      {/* Incoming (final) digit */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-brand-navy font-bold"
        initial={{ rotateX: 90, opacity: 0 }}
        animate={hasFlipped ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top center', backfaceVisibility: 'hidden' }}
      >
        {char}
      </motion.span>
    </span>
  );
}

function StatGroup({ stat, baseDelay }: { stat: Stat; baseDelay: number }) {
  const [showLabel, setShowLabel] = useState(false);
  const charCount = stat.value.length;
  const lastCharDelay = baseDelay + charCount * 80;

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), lastCharDelay + 200);
    return () => clearTimeout(timer);
  }, [lastCharDelay]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold tracking-tight flex justify-center">
        {stat.value.split('').map((char, i) => (
          <FlipDigit key={i} char={char} delay={baseDelay + i * 80} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={showLabel ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="text-xs text-brand-muted mt-2 tracking-wide uppercase"
      >
        {stat.label}
      </motion.div>
    </div>
  );
}

export default function OdometerStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Delay to let hero heading + CTA animate first
      const timer = setTimeout(() => setTriggered(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const renderStats = (statList: Stat[]) => {
    let charOffset = 0;
    return statList.map((stat, i) => {
      const baseDelay = charOffset * 80;
      charOffset += stat.value.length + 1; // +1 gap between groups
      return (
        <div key={i} className="contents">
          {i > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={triggered ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-px h-12 bg-brand-gray/40 self-center"
            />
          )}
          {triggered && <StatGroup stat={stat} baseDelay={baseDelay} />}
        </div>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute bottom-12 left-0 right-0 z-10"
    >
      {/* Desktop: 3 stats */}
      <div className="hidden md:flex justify-center items-center gap-10 lg:gap-14">
        {renderStats(stats)}
      </div>
      {/* Mobile: 2 stats */}
      <div className="flex md:hidden justify-center items-center gap-8">
        {renderStats(mobileStats)}
      </div>
    </div>
  );
}
```

**Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/OdometerStats.tsx
git commit -m "feat: add OdometerStats component with flip-digit animation"
```

---

### Task 3: Integrate ElasticButton into Hero and Header CTAs

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Context:** Replace the plain `<a>` and `<motion.a>` CTA buttons with `ElasticButton`. Start with the hero CTA (line ~532) and header button (line ~415). Keep all existing className styling — ElasticButton passes it through.

**Step 1: Add imports at top of DesignFinal.tsx**

At line 32 (after `import HeroShader from './HeroShader';`), add:

```tsx
import ElasticButton from './ElasticButton';
import OdometerStats from './OdometerStats';
```

**Step 2: Replace hero CTA (lines ~528-538)**

Find this block:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.5 }}
>
  <a
    href="#book"
    className="bg-brand-primary text-white rounded-full px-8 py-4 font-semibold text-lg hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
  >
    Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
  </a>
</motion.div>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.5 }}
>
  <ElasticButton
    href="#book"
    variant="primary"
    className="bg-brand-primary text-white rounded-full px-8 py-4 font-semibold text-lg hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
  >
    Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
  </ElasticButton>
</motion.div>
```

**Step 3: Replace header desktop CTA (line ~415)**

Find:
```tsx
<motion.a
  href="#book"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="hidden lg:flex bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-medium items-center gap-2 hover:bg-brand-navy transition-colors"
>
  Book a Call <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
</motion.a>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="hidden lg:flex"
>
  <ElasticButton
    href="#book"
    variant="primary"
    className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-navy transition-colors"
  >
    Book a Call <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
  </ElasticButton>
</motion.div>
```

**Step 4: Verify it compiles and visually test**

Run: `npx tsc --noEmit`
Expected: No errors

Visual check: Open http://localhost:3000, hover over hero CTA and header "Book a Call" — should see elastic morph, text flip, arrow spring. Click should produce particle burst.

**Step 5: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: integrate ElasticButton into hero and header CTAs"
```

---

### Task 4: Integrate ElasticButton into Remaining CTAs

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Context:** Apply ElasticButton to: mobile menu CTA (line ~458), case study CTA (line ~1011), final CTA (line ~1145), footer subscribe button (line ~1234). Each keeps its existing className.

**Step 1: Replace mobile menu CTA (line ~458)**

Find:
```tsx
<a
  href="#book"
  className="w-full bg-brand-primary text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-navy transition-colors"
  onClick={() => setMobileMenuOpen(false)}
>
  Book a Call <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
</a>
```

Replace with:
```tsx
<ElasticButton
  href="#book"
  variant="primary"
  className="w-full bg-brand-primary text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-navy transition-colors"
  onClick={() => setMobileMenuOpen(false)}
>
  Book a Call <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
</ElasticButton>
```

**Step 2: Replace case study CTA (line ~1011)**

Find:
```tsx
<motion.a
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
  href="#"
  className="bg-white text-brand-navy rounded-full px-8 py-3.5 font-semibold hover:bg-brand-tint transition-colors inline-flex items-center gap-2"
>
  Read the Full Story <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
</motion.a>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
>
  <ElasticButton
    href="#"
    variant="primary"
    className="bg-white text-brand-navy rounded-full px-8 py-3.5 font-semibold hover:bg-brand-tint transition-colors inline-flex items-center gap-2"
  >
    Read the Full Story <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
  </ElasticButton>
</motion.div>
```

**Step 3: Replace final section CTA (line ~1145)**

Find:
```tsx
<motion.a
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
  href="#book"
  className="bg-brand-primary text-white rounded-full px-10 py-4 font-semibold text-lg hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
>
  Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
</motion.a>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
>
  <ElasticButton
    href="#book"
    variant="primary"
    className="bg-brand-primary text-white rounded-full px-10 py-4 font-semibold text-lg hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
  >
    Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
  </ElasticButton>
</motion.div>
```

**Step 4: Replace footer subscribe button (line ~1234)**

Find:
```tsx
<button className="bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-navy transition-colors shrink-0">
  Subscribe
</button>
```

Replace with:
```tsx
<ElasticButton
  variant="primary"
  className="bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-navy transition-colors shrink-0"
>
  Subscribe
</ElasticButton>
```

**Step 5: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 6: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: integrate ElasticButton into remaining CTAs (mobile, case study, final, footer)"
```

---

### Task 5: Replace Hero Stats with OdometerStats

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Context:** Replace the static stats block at the bottom of the hero (lines ~541-557) with the OdometerStats component (already imported in Task 3).

**Step 1: Replace the stats block**

Find:
```tsx
{/* Stats at bottom */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.7 }}
  className="absolute bottom-12 left-0 right-0 flex justify-center gap-12 z-10"
>
  <div className="text-center">
    <div className="text-2xl font-bold text-brand-navy">80%</div>
    <div className="text-xs text-brand-muted mt-1 tracking-wide uppercase">Faster Processing</div>
  </div>
  <div className="w-px h-10 bg-brand-gray" />
  <div className="text-center">
    <div className="text-2xl font-bold text-brand-navy">99%</div>
    <div className="text-xs text-brand-muted mt-1 tracking-wide uppercase">Client Satisfaction</div>
  </div>
</motion.div>
```

Replace with:
```tsx
{/* Stats at bottom — odometer counter */}
<OdometerStats />
```

**Step 2: Verify it compiles and visually test**

Run: `npx tsc --noEmit`
Expected: No errors

Visual check: Open http://localhost:3000, scroll to hero. After headline and CTA animate in (~0.8s delay), the three stats should flip from 0 to their final values with staggered character-by-character animation. Labels fade in after digits land.

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: replace static hero stats with OdometerStats counter"
```

---

### Task 6: Visual QA and Polish Pass

**Files:**
- Possibly modify: `src/components/ElasticButton.tsx`, `src/components/OdometerStats.tsx`, `src/components/DesignFinal.tsx`

**Context:** Full visual check of all interactions. Test hover states, click particles, odometer animation timing, mobile responsiveness.

**Step 1: Check all primary CTAs**

Open http://localhost:3000 and test each button:
- Header "Book a Call" — hover should show elastic morph + text flip
- Hero "Book a Discovery Call" — same + click should produce particle burst
- Case Study "Read the Full Story" — same on dark background
- Final "Book a Discovery Call" — same
- Footer "Subscribe" — same

**Step 2: Check mobile layout**

Resize to mobile viewport (~375px). Verify:
- OdometerStats shows 2 stats (not 3)
- Mobile menu CTA works with ElasticButton
- No horizontal overflow from particle effects

**Step 3: Check odometer timing**

Hard refresh the page. Verify:
- Digits start flipping ~0.8s after page load
- Characters flip left-to-right with visible stagger
- Labels appear after digits finish
- Animation only runs once (scroll away and back — should not replay)

**Step 4: Fix any issues found, commit**

```bash
git add -A
git commit -m "fix: visual polish pass for button hovers and odometer stats"
```
