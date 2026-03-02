# Azul Arc Homepage v3 — Design Document

## Overview

Full creative rethink of the homepage on `design-concept-v2`. Bold and dynamic — big type, scroll-triggered reveals, horizontal scroll, full-bleed dark sections, interactive tabs, and a mocked calendar booking flow. No holds barred.

## Typography

**Single font: Bricolage Grotesque** (Google Fonts, variable, opsz 12-96, wght 200-800)

No accent serif font. Contrast comes from weight variation:
- Hero headline: 800 weight, 72-96px desktop, tight tracking
- Section headlines: 600-700 weight, 40-56px
- Body: 400 weight, 16-18px
- Badges/labels: 600 weight, 12px, uppercase, tracked
- Stats/numbers: 700 weight, large sizes

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| brand-primary | #1863DC | CTAs, active states, highlights |
| brand-navy | #07406B | Headlines, dark sections |
| brand-sky | #2AA7DF | Secondary accent |
| brand-gray | #EBEBEB | Borders, tracks, dividers |
| brand-dark | #212121 | Body text |
| brand-muted | #808285 | Captions, muted text |
| brand-tint | #EBF4FF | Light backgrounds, placeholders |

## Icons

Hugeicons (free tier, stroke rounded). Used sparingly.

## Page Flow

### 1. Navigation
- Fixed top, `bg-white/80 backdrop-blur-xl border-b border-brand-gray`
- Logo left, nav links center (simple text, no dropdowns), CTA pill button right
- Mobile: hamburger slide-down

### 2. Hero
- Full viewport (`min-h-screen flex items-center`)
- Single massive headline filling 60-70% of viewport: "We build the software that runs your business."
- Bricolage Grotesque 800 weight, clamped 48px-96px+, tight letter-spacing, `text-brand-navy`
- "runs" highlighted with animated underline or brand-primary color
- Below headline: one-line subtext + single CTA button
- Background: subtle animated CSS gradient (brand-tint to white, slow shift)
- Stats at bottom of viewport (small confident numbers)
- On scroll: headline scales down slightly and fades (parallax via useScroll + useTransform)

### 3. About / Positioning Statement
- Badge: "✦ ABOUT US"
- Large centered statement (28-36px, font-medium, text-brand-navy, max-w-4xl)
- Below: 3-4 photo placeholder frames in asymmetric collage layout
  - Different sizes, slight rotation (-2deg, 1deg, -1deg), overlapping
  - Scroll-triggered: each photo translates from `y: 100` to `y: 0` with staggered delays (0.1s apart)
  - `whileInView`, `viewport: { once: true }`, duration ~0.8s per photo
  - `rounded-2xl`, subtle shadow
- Background: white or `bg-[#F8FAFC]`

### 4. Industries / Who We Serve
- Badge: "✦ WHO WE SERVE"
- Large headline, left-aligned
- 3 horizontal tabs (pill toggles or underlined text): Government & Courts / Manufacturing / Growth-Stage
- Tab content: full-width panel with industry problem (large type), description, CTA link
- AnimatePresence mode="wait" for smooth transitions between tabs
- Active tab: brand-primary underline or fill
- Cuts visible content by 66% — progressive disclosure

### 5. Capabilities — Horizontal Scroll
- Badge + headline at top (normal vertical flow)
- Sticky horizontal scroll container:
  - As user scrolls vertically, capabilities cards scroll horizontally
  - Uses `useScroll` on container ref + `useTransform` to map scrollYProgress to translateX
  - Container has enough vertical height to allow full horizontal traversal
- 8 capability cards, each ~400px wide, with icon + title + description
- Cards have hover interaction (lift + border color)
- Left/right fade edges
- Mobile fallback: normal vertical card stack

### 6. Process — Vertical Zigzag Timeline
- Badge + headline at top
- Vertical line down center (desktop) or left edge (mobile)
- 5 steps alternate left/right of the line (zigzag)
- Each step: number badge sitting on the line + card extending to one side
- Card: title, description, duration
- Scroll-triggered: each step fades in from its side (`x: -40` left, `x: 40` right) with `whileInView`
- The vertical line uses `scaleY` animation tied to scroll progress — draws itself as you scroll
- Number badges pulse brand-primary on viewport entry
- Mobile: single column, left-aligned, line on left edge

### 7. Case Study — Full-Bleed Dark
- Full-width `bg-brand-navy` section (dramatic contrast shift)
- Large photo placeholder: full-width or inset rounded, aspect-ratio 21:9 cinematic
- Headline: "A state court system that hadn't updated since 2003."
- Metrics row: numbers **count up from 0** on viewport entry
  - 40% (Faster Processing), 2M+ (Residents Served), Zero (Downtime), 99.9% (Uptime SLA)
  - Uses motion's `useMotionValue` + `animate` for counting
- Body text + CTA button (white on dark)

### 8. Discovery Call Booking (replaces Pricing)
- White or `bg-[#F8FAFC]` background
- `id="book"` anchor
- Split layout: `grid md:grid-cols-2 gap-16 items-center`
- **Left side:**
  - Headline: "Let's talk about what's slowing you down."
  - Body text: "30 minutes. No pitch. We'll map your biggest operational bottleneck and tell you if we can help."
  - Trust signals: "✓ No commitment" / "✓ Talk to a strategist, not a salesperson" / "✓ Walk away with actionable insight"
- **Right side:** Fully mocked calendar UI
  - Month header with left/right nav arrows (March 2026)
  - 7-column day grid with selectable dates
  - Clicking a date reveals time slots below (9:00 AM, 10:30 AM, 2:00 PM, etc.)
  - Selected state: brand-primary fill
  - "Confirm Booking" button at bottom
  - Interactive but non-functional (demo only)
  - Styled: `rounded-2xl border border-brand-gray bg-white shadow-sm`

### 9. Testimonials — Quote Spotlight
- `bg-brand-navy` dark section
- One large quote at a time (24-28px, white text)
- Large decorative quotation mark element
- Author name + company below quote
- Left/right arrow buttons to cycle, dot indicators
- AnimatePresence for fade transitions
- Auto-advance every 6 seconds, pauses on hover/interaction

### 10. Final CTA
- White background
- Massive centered headline (72px+): "Ready to replace what's holding you back?"
- Subtext: "Book a 30-minute discovery call. No pitch, just strategy."
- Single large CTA button (brand-primary pill) linking to `#book`
- Minimal — headline, subtext, button. Nothing else.

### 11. Footer
- `bg-[#F8FAFC] border-t border-brand-gray`
- 4-column grid: Logo + tagline, Services links, Company links, Connect (social + email)
- Newsletter signup row: inline email input + subscribe button
- Copyright bar at bottom
- Text: `text-brand-muted`, links `hover:text-brand-dark`

## Animations Summary

| Section | Animation | Trigger |
|---|---|---|
| Hero | CSS gradient shift, parallax scale/fade | Continuous + scroll |
| About | Photos rise from below, staggered | whileInView (once) |
| Industries | Tab content fade + slide | Tab click |
| Capabilities | Horizontal scroll mapped to vertical | Scroll position |
| Process | Steps fade in from sides, line draws | whileInView + scroll |
| Case Study | Metric count-up | whileInView (once) |
| Testimonials | Quote fade transitions | Auto + arrows |

## Dependencies

**Keep:** react, react-dom, motion, tailwindcss, @tailwindcss/vite, vite, typescript, @hugeicons/react, @hugeicons/core-free-icons

**Remove:** DM Serif Display font (no longer used — remove from index.html Google Fonts link)

**Add back to imports in DesignFinal.tsx:** `useScroll`, `useTransform`, `useMotionValue` from motion/react (needed for parallax, horizontal scroll, counting metrics)

## Content Sections Covered

- ✓ About (positioning statement)
- ✓ Industries (who we serve)
- ✓ Capabilities (services)
- ✓ Process (how we work)
- ✓ Case study
- ✓ Lead capture (discovery call booking)
- ✓ Social proof (testimonials)
