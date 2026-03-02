# Azul Arc Homepage v2 — Design Document

## Overview

Redesign the Azul Arc homepage on the `design-concept-v2` branch. Restyle all existing content into a clean, editorial layout inspired by the Catalis website reference. The current section content and copy remain; the visual system, layout flow, and component design change entirely.

---

## Typography

### Primary: Bricolage Grotesque (Google Fonts)
- Used for all headings and body text
- Variable font with optical sizing — gives character without being distracting
- Weights: 400 (body), 500 (subheads), 600 (section heads), 700 (hero headline)

### Accent: DM Serif Display Italic (Google Fonts)
- Applied to select keywords within headlines to create mixed-type contrast
- Examples: "Who We *Serve*", "How We *Work*", "Simple, transparent *pricing*"
- Always italic, never used for full sentences

### Scale
| Element | Size (desktop) | Size (mobile) | Weight |
|---|---|---|---|
| Hero headline | 56–64px | 36–40px | 700 + DM Serif accent |
| Positioning statement | 32–40px | 24–28px | 500 |
| Section headline | 40–48px | 28–32px | 600 + DM Serif accent |
| Card title | 20–24px | 18–20px | 600 |
| Body text | 16–18px | 16px | 400 |
| Section badge | 12–13px | 12px | 600, uppercase, tracked |

---

## Color Palette

### Brand Colors
| Name | Hex | Usage |
|---|---|---|
| Primary Blue | `#1863DC` | Buttons, links, badges, active states |
| Deep Navy | `#07406B` | Headlines, dark text, dark sections |
| Sky Blue | `#2AA7DF` | Secondary accent, hover states, gradients |
| Light Gray | `#EBEBEB` | Borders, dividers, subtle backgrounds |
| Near Black | `#212121` | Body text |
| Mid Gray | `#808285` | Captions, muted text, placeholders |

### Extended Palette
| Name | Hex | Usage |
|---|---|---|
| White | `#FFFFFF` | Primary background |
| Off-White | `#F8FAFC` | Alternating section background |
| Light Blue Tint | `#EBF4FF` | Subtle card backgrounds, badge backgrounds |
| Blue Gradient Start | `#07406B` | Pricing / CTA section gradient |
| Blue Gradient End | `#1863DC` | Pricing / CTA section gradient |

---

## Icons

### Library: Hugeicons (Free Tier — Stroke Rounded)
- Package: `@hugeicons/react` + `@hugeicons/core-free-icons`
- Style: Stroke Rounded (free tier default)
- Usage: Sparingly — feature cards, process steps, capability highlights
- Sizing: 20px (inline), 24px (cards), 32px (feature highlights)
- Color: Inherits text color or brand blue

---

## Photography

### Style: Documentary Editorial Realism
Follows the Azul Arc photography style guide. All images should feel:
- **Candid and authentic** — real people, natural imperfections
- **Warm and inviting** — natural light, warm color grading
- **Story-driven** — every image communicates collaboration, craft, or human connection

### Image Treatments
- Rounded corners (`rounded-2xl`) on all photos
- No heavy filters or overlays
- Subtle warm tone correction to match brand warmth
- Photos used in: hero (right side illustration/visual), about/positioning section, case study, blog cards, testimonials

### Subject Matter
- Team collaboration (brainstorming, whiteboard sessions)
- Candid work moments (focus, laughter, conversation)
- Creative process (wireframes, sticky notes, prototypes)
- Client interactions (meetings, shared screens)
- Workspace details (natural light, plants, desk items)

---

## Section Layout

### 1. Navigation
- Fixed top, white background with blur backdrop
- Logo left, nav links center, CTA button right
- Mobile: hamburger menu
- Clean and minimal — no dropdowns in v2

### 2. Hero
- **Left side** (60%): Section badge ("WEB PARTNER OF CHOICE"), large headline with DM Serif accent words, body paragraph, two CTAs (primary solid, secondary outline), stats row below (2-3 metrics with bold numbers)
- **Right side** (40%): Abstract illustration or curated photography composition
- Background: clean white or very subtle off-white
- No shader background

### 3. Positioning Statement
- Full-width centered text block
- Large text (32-40px), Bricolage Grotesque medium weight
- One powerful sentence about Azul Arc's mission/values
- Optional: small photo grid below (2-3 candid team photos, staggered)
- Section badge above (e.g., "ABOUT US")

### 4. Who We Serve (Challenges)
- Section badge + large headline with DM Serif accent
- Body paragraph
- 2x2 card grid (or 3-column on wide screens)
- Each card: icon, title, description, "Learn more" link
- Cards: white, rounded-2xl, shadow-sm, generous padding
- CTA button below grid

### 5. Capabilities
- Split layout: left side has section badge + headline + body text
- Right side: vertically stacked feature cards (3 cards)
- Each card: icon, title, short description, "Learn more" link
- Subtle separator between cards
- Clean, lots of whitespace

### 6. How We Work (Process)
- Keep manual tab selection from current design
- Section badge + headline with DM Serif accent
- Left: clickable step tabs (numbered, with icons)
- Right: active step detail panel (title, description, duration)
- Progress bar retained
- Restyle tabs and panel to match new card system

### 7. Case Study
- Section badge + headline
- Large card or split layout: image left, text right
- Key metrics highlighted
- CTA to read full story
- Photography: candid project shots, warm tone

### 8. Pricing
- Blue gradient background (`#07406B` → `#1863DC`)
- White text headline with DM Serif accent on "pricing"
- 3 white pricing cards, rounded-2xl
- Each card: plan name, price, feature list with checkmarks, CTA button
- Middle card optionally emphasized (popular plan)

### 9. Testimonials
- Light background
- Left side: section badge + headline ("What our *clients* are saying") + body text
- Right side: testimonial cards (quote, author, role, company)
- Warm, editorial feel

### 10. Final CTA
- Full-width blue gradient banner (matches pricing gradient)
- Centered white headline with DM Serif accent
- Body text + single CTA button (white on blue)

### 11. Footer
- Clean multi-column layout
- Logo + tagline left
- Link columns (Pages, Services, etc.)
- Newsletter signup
- Social links (Hugeicons)
- Copyright bar at bottom

---

## Component Specs

### Buttons
- **Primary:** `bg-[#1863DC] text-white rounded-full px-6 py-3 font-medium` with hover darken
- **Secondary:** `border border-[#1863DC] text-[#1863DC] rounded-full px-6 py-3` with hover fill
- **On dark:** White solid or white outline variants

### Cards
- `bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8`
- No visible borders (shadow provides edge definition)
- Hover: subtle lift (`hover:-translate-y-1`)

### Section Badges
- `text-xs font-semibold tracking-[0.2em] uppercase text-[#1863DC]`
- Optional dot prefix: `"* ABOUT US"` or small icon
- Sits above section headline with 12-16px gap

### Section Spacing
- `py-24 md:py-32` between sections
- `max-w-7xl mx-auto px-6` container

### Animations
- Keep motion/framer-motion for fadeUp + stagger
- More subtle than current: shorter duration (0.6s), less travel distance (y: 20px instead of 40px)
- No heavy parallax or scroll-driven animations

---

## Dependencies

### Add
- `@hugeicons/react` + `@hugeicons/core-free-icons`
- Google Fonts: Bricolage Grotesque (variable), DM Serif Display

### Remove
- `@phosphor-icons/react`
- `@paper-design/shaders-react`
- `dialkit` (already removed on main)

### Keep
- `react`, `react-dom`
- `motion` (framer-motion)
- `tailwindcss`, `@tailwindcss/vite`
- `vite`, `typescript`

---

## What Stays From Current Design
- All section copy and content
- Manual tab selection in How We Work
- Motion/framer animation system (restyled)
- Tailwind CSS + Vite stack
- General section order (with positioning statement added after hero)

## What Changes
- Entire visual design system (typography, colors, spacing, components)
- Icon library (Phosphor → Hugeicons)
- Hero background (shader → clean with photography/illustration)
- Layout patterns (more Catalis-inspired split layouts, generous whitespace)
- Add positioning statement section
- Photography integrated per style guide
