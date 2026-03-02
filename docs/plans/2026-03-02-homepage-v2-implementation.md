# Homepage v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Azul Arc homepage with a clean, editorial Catalis-inspired design system using Bricolage Grotesque + DM Serif Display typography, Hugeicons, and the brand color palette.

**Architecture:** Single-page React app. One main component (`DesignFinal.tsx`) is rewritten with the new design system. Supporting files (`index.css`, `brand.css`, `index.html`) are updated for fonts and color tokens. Dependencies swapped (remove Phosphor/shaders, add Hugeicons).

**Tech Stack:** React 19, Tailwind CSS 4, Vite 6, Motion (framer-motion), Hugeicons, Google Fonts (Bricolage Grotesque, DM Serif Display)

**Design Doc:** `docs/plans/2026-03-02-homepage-v2-design.md`

---

### Task 1: Swap dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Hugeicons**

```bash
cd "/Users/bradleyyoung/Active Projects/azul-arc-website-redesign"
npm install @hugeicons/react @hugeicons/core-free-icons
```

**Step 2: Uninstall old icon/shader packages**

```bash
npm uninstall @phosphor-icons/react @paper-design/shaders-react
```

**Step 3: Verify no build errors**

```bash
# This will fail because DesignFinal.tsx still imports removed packages — that's expected.
# Just confirm package.json is clean.
cat package.json | grep -E "phosphor|paper-design|hugeicons"
```

Expected: Only `@hugeicons/react` and `@hugeicons/core-free-icons` appear.

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap Phosphor/shaders for Hugeicons"
```

---

### Task 2: Update fonts and color tokens

**Files:**
- Modify: `index.html` (add Google Fonts links)
- Modify: `src/index.css` (update Tailwind theme tokens)
- Modify: `src/brand.css` (update CSS custom properties)

**Step 1: Add Google Fonts to index.html**

In `index.html` `<head>`, replace existing font preconnects/links with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

**Step 2: Update src/index.css**

Replace the font imports and `@theme` blocks with:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "DM Serif Display", ui-serif, Georgia, serif;
}

@theme inline {
  --color-brand-primary: #1863DC;
  --color-brand-navy: #07406B;
  --color-brand-sky: #2AA7DF;
  --color-brand-gray: #EBEBEB;
  --color-brand-dark: #212121;
  --color-brand-muted: #808285;
  --color-brand-tint: #EBF4FF;
}
```

Remove the old `@import url(...)` lines for Cabinet Grotesk and Inter. Keep the `.mask-edges` and marquee keyframe animations — they may still be useful.

**Step 3: Update src/brand.css**

```css
:root {
  --color-brand-primary: #1863DC;
  --color-brand-navy: #07406B;
  --color-brand-sky: #2AA7DF;
  --color-brand-gray: #EBEBEB;
  --color-brand-dark: #212121;
  --color-brand-muted: #808285;
  --color-brand-tint: #EBF4FF;
}
```

**Step 4: Commit**

```bash
git add index.html src/index.css src/brand.css
git commit -m "feat: update fonts to Bricolage Grotesque + DM Serif Display, update brand colors"
```

---

### Task 3: Rewrite DesignFinal.tsx — Data layer and imports

**Files:**
- Modify: `src/components/DesignFinal.tsx`

This task replaces the top of the file: imports, animation variants, data constants. The JSX sections come in subsequent tasks.

**Step 1: Replace imports and animation variants (lines 1–18)**

```tsx
import { ArrowRight, ArrowUpRight } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};
```

Note: Hugeicons uses `<HugeiconsIcon icon={IconName} />` pattern. Import specific icons as needed from `@hugeicons/core-free-icons`. The full icon list will be determined as we build each section — add imports as needed.

**Step 2: Replace data constants**

Remove the `HeroBackground` component, `shaderComponents`, `shaderConfigs`, `universalTransform` (already gone from earlier work). Keep all existing data arrays (`navLinks`, `segments`, `challenges`, `capabilities`, `processSteps`, `testimonials`) but update their `icon` fields to use Hugeicons.

For challenges array, replace Phosphor icons:
```tsx
// Find equivalent Hugeicons for each — import at top:
// import { GovernmentIcon, GridViewIcon, ChartBarLineIcon } from '@hugeicons/core-free-icons';
```

For capabilities array, replace Phosphor icons similarly.

For processSteps array, replace Phosphor icons similarly.

The exact Hugeicons icon names will need to be looked up during implementation. Search the `@hugeicons/core-free-icons` package exports for equivalents. Pattern: `<HugeiconsIcon icon={IconName} size={20} />`.

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: update DesignFinal imports and data layer for new design system"
```

---

### Task 4: Rewrite DesignFinal.tsx — Navigation section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Rewrite the Navigation JSX**

Replace the current `<header>` block. New design:
- Fixed top, `bg-white/80 backdrop-blur-xl`
- Logo left (keep existing `azul-arc-logo.png`)
- Nav links center: simple text links, no dropdown in v2
- CTA button right: pill-shaped, `bg-[#1863DC] text-white rounded-full`
- Mobile: hamburger → slide-down menu
- Remove the `segments` dropdown logic
- Simplify `navLinks` — remove `hasDropdown` field
- Colors: links use `text-[#808285] hover:text-[#212121]`

**Step 2: Verify in browser**

Open http://localhost:3001/ — nav should render with new fonts and colors.

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle navigation with new design system"
```

---

### Task 5: Rewrite DesignFinal.tsx — Hero section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Rewrite the Hero JSX**

Replace current hero section. New design:
- Remove `HeroBackground` component and shader entirely
- White/off-white background
- Two-column layout: `grid md:grid-cols-2 items-center`
- **Left column (content):**
  - Section badge: `✦ WEB PARTNER OF CHOICE` in `text-xs font-semibold tracking-[0.2em] uppercase text-[#1863DC]`
  - Headline: "Build and **Growth** with Scalable Tools" — use `font-sans` for most, `font-serif italic` for accent word. Adapt copy to Azul Arc: e.g., "Build and _scale_ with custom software"
  - Body paragraph: `text-lg text-[#808285]`
  - Two CTAs: primary solid blue pill + secondary outline pill
  - Stats row: 2-3 metrics with large bold numbers + small descriptions
- **Right column (visual):**
  - Placeholder image area (rounded-2xl, aspect-ratio box)
  - Use a placeholder gradient or solid color until real photography is added

**Step 2: Verify in browser**

Hero should show split layout with clean typography.

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle hero section with split layout and new typography"
```

---

### Task 6: Rewrite DesignFinal.tsx — Positioning statement section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Add new Positioning Statement section after Hero**

This is a NEW section (doesn't exist in current design). Insert between Hero and Who We Serve.

```
- Section badge: ✦ ABOUT US
- Large centered text (32-40px, font-medium):
  "We are passionate about empowering mid-market companies to replace legacy systems, automate operations, and achieve their growth goals."
- Optional: 2-3 placeholder photo thumbnails below (rounded, staggered layout)
- Background: white, generous padding (py-24 md:py-32)
```

**Step 2: Verify in browser**

New section visible between hero and who-we-serve.

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: add positioning statement section"
```

---

### Task 7: Rewrite DesignFinal.tsx — Who We Serve section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Rewrite Who We Serve section**

Replace the current accordion layout with a Catalis-style card grid:
- Section badge: `✦ WHO WE SERVE`
- Headline with DM Serif accent: "Make operations easy, simplify your _growth_"
- Body paragraph
- 2x2 card grid (or 3-col on wide): each card has icon, title, description, "Learn more →" link
- Cards: `bg-white rounded-2xl shadow-sm p-8 hover:shadow-md hover:-translate-y-1 transition`
- Remove accordion expand/collapse logic (simplify to static cards)
- Remove `activeCard` state if no longer needed
- CTA button below grid

Keep the same 3 challenges content but display as cards instead of accordions.

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle Who We Serve as card grid"
```

---

### Task 8: Rewrite DesignFinal.tsx — Capabilities section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Rewrite Capabilities section**

Replace marquee layout with Catalis-style split layout:
- Section badge: `✦ OUR CAPABILITIES`
- Left side: headline "Core features that set us apart from the _competition_" + body text
- Right side: 3 vertically stacked feature cards with icon, title, description, "Learn more →"
- Remove marquee animation
- Remove marquee CSS keyframes from index.css if no longer used anywhere else
- Show first 3 capabilities on right, optionally show remaining 5 in a grid below

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle capabilities as split layout with stacked cards"
```

---

### Task 9: Rewrite DesignFinal.tsx — How We Work (Process) section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Restyle the Process section**

Keep manual tab selection logic (already implemented). Restyle visually:
- Change background from `bg-zinc-950` to `bg-white` or `bg-[#F8FAFC]` (light)
- Section badge: `✦ OUR PROCESS`
- Headline with DM Serif accent: "How We _Work_"
- Left tabs: restyle to match new card system — white cards with subtle border, active state uses `border-[#1863DC]` left accent
- Right detail panel: white card with shadow-sm, rounded-2xl
- Progress bar: use `bg-[#1863DC]` fill on `bg-[#EBEBEB]` track
- Text colors: `text-[#212121]` for headings, `text-[#808285]` for body
- Icons: swap to Hugeicons

**Step 2: Verify in browser**

Tab click should still work. Visual style should match new system.

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle process section with light theme and new design system"
```

---

### Task 10: Rewrite DesignFinal.tsx — Case Study section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Restyle the Case Study section**

- Change from dark theme (`bg-zinc-950`) to light theme
- Section badge: `✦ CASE STUDY`
- Split layout: left side image placeholder (rounded-2xl), right side content
- Keep metrics (40%, Zero downtime), stats grid
- Restyle stats as simple large numbers with descriptions below
- Remove ambient gradient blob animation
- CTA: blue pill button
- Photography placeholder for left side

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle case study section with light theme"
```

---

### Task 11: Rewrite DesignFinal.tsx — Pricing section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Restyle the Pricing section**

- Background: blue gradient `bg-gradient-to-br from-[#07406B] to-[#1863DC]`
- White headline with DM Serif accent: "Simple, transparent _pricing_"
- White subtitle text
- Keep 2-card layout (Discovery + Build & Deploy) but restyle:
  - White cards, `rounded-2xl`, generous padding
  - Plan name, price, description, feature list, CTA button
  - Cards get `text-[#212121]` for text on white
  - CTA buttons: `bg-[#1863DC] text-white rounded-full`

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle pricing with blue gradient background"
```

---

### Task 12: Rewrite DesignFinal.tsx — Testimonials section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Restyle the Testimonials section**

- Light background (`bg-white` or `bg-[#F8FAFC]`)
- Left side: section badge `✦ TESTIMONIALS` + headline "What our _clients_ are saying" + body text
- Right side: 2 testimonial cards stacked or carousel
- Cards: `bg-white rounded-2xl shadow-sm p-8` with quote, author name, role
- Remove marquee animation — use static layout or simple 2-card grid
- Swap Phosphor `Quotes` icon for Hugeicons equivalent

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle testimonials with split layout"
```

---

### Task 13: Rewrite DesignFinal.tsx — Final CTA section

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Restyle the Final CTA**

- Full-width blue gradient banner (same gradient as pricing: `from-[#07406B] to-[#1863DC]`)
- Centered white headline with DM Serif accent: "Achieve operational excellence with _Azul Arc_"
- White body text below
- White pill CTA button: `bg-white text-[#1863DC] rounded-full`
- Generous padding `py-24 md:py-32`

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle final CTA with blue gradient banner"
```

---

### Task 14: Rewrite DesignFinal.tsx — Footer

**Files:**
- Modify: `src/components/DesignFinal.tsx`

**Step 1: Restyle the Footer**

- Background: `bg-white` with top border (`border-t border-[#EBEBEB]`)
- Clean multi-column layout (keep existing column structure)
- Logo + tagline left column
- Link columns: Services, Company, Connect
- Add newsletter signup row: email input + subscribe button
- Social icons: swap to Hugeicons (LinkedIn, X/Twitter, Email)
- Copyright bar at bottom
- All text: `text-[#808285]`, links `hover:text-[#212121]`

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add src/components/DesignFinal.tsx
git commit -m "feat: restyle footer with light theme"
```

---

### Task 15: Remove logo scroller and clean up global backgrounds

**Files:**
- Modify: `src/components/DesignFinal.tsx`
- Modify: `src/index.css` (remove unused marquee animations if applicable)

**Step 1: Remove global background layers**

Delete from the component:
- Noise texture SVG filter
- Blueprint grid div
- Ambient gradient blobs
- Logo scroller section (or restyle to match new design)

**Step 2: Clean up index.css**

If marquee animations are no longer used anywhere (after capabilities and testimonials were changed to static layouts), remove:
- `.mask-edges`
- `@keyframes marquee` / `marquee-reverse`
- `.animate-marquee` / `.animate-marquee-reverse` / `.animate-marquee-slow`

**Step 3: Verify in browser**

Full page should render cleanly with no orphaned background elements.

**Step 4: Commit**

```bash
git add src/components/DesignFinal.tsx src/index.css
git commit -m "feat: remove global background layers and clean up unused CSS"
```

---

### Task 16: Final visual polish and browser verification

**Files:**
- Modify: `src/components/DesignFinal.tsx` (minor tweaks)

**Step 1: Full-page review**

Scroll through http://localhost:3001/ and verify:
- [ ] Bricolage Grotesque loads correctly for all text
- [ ] DM Serif Display italic renders on accent words
- [ ] Brand colors (`#1863DC`, `#07406B`, etc.) used consistently
- [ ] Section badges appear above each headline
- [ ] Cards have consistent `rounded-2xl shadow-sm` treatment
- [ ] Blue gradient sections (pricing, final CTA) render correctly
- [ ] Hugeicons render at correct sizes
- [ ] Mobile responsive (check at 375px width)
- [ ] No console errors
- [ ] No leftover references to Phosphor, shaders, or old color tokens

**Step 2: Fix any issues found**

**Step 3: Commit**

```bash
git add -A
git commit -m "polish: final visual adjustments for v2 design"
```
