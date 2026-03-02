# Button Hover Interactions & Hero Stats — Design Document

## Overview

Two micro-interaction systems to add delight: elastic morph + particle burst button hovers across the site, and a counting odometer treatment for hero stats. Direction: playful, surprising, memorable.

## 1. Button Hovers: Elastic Morph + Particle Burst

### Primary CTAs

Applies to: Hero "Book a Discovery Call", Final CTA, Case Study CTA, Header "Book a Call", Footer "Subscribe".

**Hover entry:**
- Button shape warps subtly toward cursor — `scale(1.03)` with slight skew toward mouse position, spring easing (damping ~15, stiffness ~300)
- Background shifts brand-primary → brand-navy smoothly
- Text does a quick vertical flip — current text slides up and out, same text slides up from below (150ms, ease-out)
- Arrow icon overshoots right ~6px then springs back to +3px offset (elastic easing)

**On click:**
- 8-12 small particles (3-5px circles, brand-blue + sky-blue) burst outward from click point
- Randomized velocity, slight gravity pull downward, fade out over 400ms
- Button does a quick scale punch: `scale(0.97)` → `scale(1.0)` (100ms, spring)

**Hover exit:**
- Everything springs back to resting state, gentle easing (300ms)

### Secondary Buttons

Applies to: Industry tab buttons, Process step nav buttons, Calendar time/date buttons.

**Hover entry:**
- Border draws itself on — pseudo-element animates `scaleX(0)` → `scaleX(1)`, origin left (250ms, ease-out)
- Subtle elastic scale bounce: `1.0` → `1.02` → `1.0` (200ms)

**On click:**
- Smaller particle burst — 4-6 particles, tighter radius

### Text Link CTAs

Applies to: Industries "See How We..." links, footer links.

- Text gets brief `translateX(2px)` nudge right with spring easing
- Arrow icon does elastic overshoot (same as primary CTA arrow)
- Keep existing gap-increase behavior

### Tech

- Elastic morph: Motion `useMotionValue` + `useSpring` tracking cursor position relative to button center
- Particle burst: DOM-based — spawn absolute-positioned divs on click, animate with Motion, remove after animation
- Text flip: `AnimatePresence` with `mode="popLayout"`
- No external dependencies

## 2. Hero Stats: Counting Odometer

### Content

| Value | Label |
|---|---|
| 40% | Faster Processing |
| 12+ | Platforms Shipped |
| 4mo | Average ROI |

### Visual

- Each character in its own slot — mechanical split-flap display feel
- Slot has subtle inset shadow (`box-shadow: inset 0 2px 4px rgba(0,0,0,0.06)`)
- Digits: `text-4xl` / `text-5xl` desktop, bold, brand-navy
- Labels: `text-xs`, uppercase, `tracking-wide`, brand-muted — appear after digits land
- Separators: `w-px h-12 bg-brand-gray/40` between stat groups
- Layout: centered row, `gap-10` to `gap-14`, positioned `bottom-12` of hero

### Animation

- Triggers on hero load after 0.8s delay
- Each digit flips independently: vertical Y-axis rotation (`rotateX`) from top with 3D perspective
- Left-to-right stagger: ~80ms between characters
- Total duration: ~1.2s
- Easing: decelerate (fast start, slow settle)
- Labels fade in + slide up 200ms after last digit lands

### Mobile

- Two stats only (drop "Platforms Shipped")
- Smaller digits (`text-3xl`), tighter gaps
- Same flip animation, faster (0.8s)

### Tech

- Each digit slot: `overflow-hidden` container with `perspective`
- Outgoing digit: `rotateX(-90deg)` + fade
- Incoming digit: `rotateX(90deg)` → `rotateX(0deg)`
- Stagger via `setTimeout` or Motion `staggerChildren`
- Motion library only, no external deps

## Performance

- Particle burst: max 12 DOM elements, removed after 400ms — negligible
- Odometer: one-time animation on load, no ongoing cost
- Elastic morph: `useSpring` per button instance, only active on hover — lightweight
- All animations use `transform` and `opacity` only (GPU-composited)
