# Azul Arc — Page Flow & Information Architecture

**Branch:** `design-concept-v2`
**Last updated:** March 3, 2026

---

## Sitemap

```
Home
├── Industries (1 page, 3 segments)
│   ├── Court Systems
│   ├── Product Manufacturers
│   └── Growth-Stage SMBs
├── What We Do (navbar dropdown)
│   ├── Digital Product Strategy
│   ├── Custom Web Design & Development
│   ├── 3D Visualisation
│   └── Case Management Systems
├── How We Work
├── Work (Portfolio)
│   └── Individual Work Pages
├── Insights & Resources
│   └── Article Pages
├── About
├── Careers
├── Contact
└── Privacy Policy / Legal
```

---

## Navigation

### Desktop
- **Sticky header** with logo, nav links, and "Book a Call" CTA
- **Industries** — mega menu dropdown with 3 image cards (3-column grid)
- **What We Do** — mega menu dropdown with 4 image cards (4-column grid)
- **How We Work, Work, Insights & Resources, About** — direct links

### Mobile
- **Hamburger menu** expands to full-width accordion
- Industries and What We Do have independent collapsible sub-menus
- "Book a Call" CTA pinned at bottom of menu

---

## Page Sections (Top to Bottom)

### 1. Hero
- **Purpose:** First impression, value proposition
- **Content:** Bold headline ("We build the software that runs your business"), subheading, primary CTA ("Book a Discovery Call"), key stats (80% Faster Processing, 99% Client Satisfaction)
- **Visual:** GLSL shader background (desktop), CSS gradient fallback (mobile)
- **Animation:** Parallax scale + opacity fade on scroll, staggered text entrance

### 2. About
- **Purpose:** Establish who Azul Arc is and build trust
- **Content:** Mission statement — "We are passionate about empowering mid-market companies to take control of their operations and achieve their growth goals."
- **Visual:** Sticky scroll section (desktop, 250vh) with 6 floating image cards at varying sizes, rotations, and parallax speeds that drift upward as user scrolls. Text stays centered.
- **Mobile:** Static layout with 3 small tilted image cards and gentle float animations

### 3. Industries (Who We Serve)
- **Purpose:** Show specialization across 3 market segments
- **Layout:** Accordion image panels — one expanded, two collapsed
- **Segments:**
  1. Government & Courts — legacy system modernization
  2. Manufacturing & Distribution — sales visibility platforms
  3. Growth-Stage Companies — operational automation
- **Interaction:** Hover or click to expand a panel; arrow buttons to cycle. Expanded panel shows headline, description, and CTA over a full-bleed image. Collapsed panels show icon + short label.
- **Animation:** Spring-driven panel expansion, content slides in from left with spring physics, image scale shift, animated gradient overlay
- **Mobile:** Stacked full-width image cards with overlay content

### 4. Capabilities
- **Purpose:** Showcase full-service technical capabilities
- **Layout:** Scroll-driven horizontal carousel (desktop, 300vh sticky section)
- **Capabilities (8 cards):**
  1. Custom Platforms
  2. Data & Analytics
  3. System Integrations
  4. Workflow Automation
  5. Legacy Modernization
  6. API & Cloud Infrastructure
  7. UX & Product Design
  8. Mobile Applications
- **Animation:** Scroll-linked horizontal movement, GPU-accelerated (`will-change-transform`), edge fade gradients
- **Mobile:** Vertical card stack

### 5. Our Process (How We Work)
- **Purpose:** Explain the engagement model step-by-step
- **Layout:** Two-column split — interactive step navigator (left) + visual placeholder (right)
- **Steps:**
  1. Discover (2–3 weeks)
  2. Blueprint (2–3 weeks)
  3. Design & Build (3–9 months)
  4. Deploy (2–4 weeks)
  5. Evolve (Ongoing)
- **Interaction:** Click a step to expand it. Previous step smoothly collapses.
- **Animation:** Spring-driven height animation, background/border color fade, opacity with slight delay. Right panel crossfades between step visuals.

### 6. Case Studies (Our Work)
- **Purpose:** Build credibility through project outcomes
- **Layout:** Radial scroll — polaroid-style cards arranged on the circumference of a large invisible circle (2200px radius), scroll-driven rotation
- **Projects (6):**
  1. CaseHub — State Judicial Branch (40% Faster Processing)
  2. Azul Arc — Internal Platform (3x Faster Delivery)
  3. RenderLab — Industrial Manufacturer (85% Quote Time Reduced)
  4. FlowOps — Growth-Stage Logistics (50% Cost Reduction)
  5. DistroSync — National Distribution Co. (99.9% Uptime SLA)
  6. CourtLink — Regional Court System (Zero Downtime Migration)
- **Treatment:** White polaroid frames with 3:4 image, project name, client, and key stat as caption
- **Animation:** Cards orbit along the circle as user scrolls (300vh section). 14° spacing between cards, ±35° total sweep. Each card's x, y, and rotation computed from its angle on the arc.
- **Mobile:** 2-column polaroid grid with alternating rotations

### 7. Discovery Call Booking
- **Purpose:** Primary conversion point
- **Layout:** Two-column — persuasion copy (left) + interactive calendar widget (right)
- **Content:** Headline, 3 trust signals (no commitment, talk to a strategist, actionable insight), calendar with date picker and time slots
- **Animation:** Slide-in from left/right on scroll

### 8. Testimonials
- **Purpose:** Social proof from real clients
- **Layout:** Dual-row infinite marquee (opposite scroll directions)
- **Testimonials (6):** Quotes from court directors, VPs, COOs, CTOs across government, manufacturing, and growth-stage companies
- **Animation:** CSS `@keyframes` marquee for performance, edge fade masks

### 9. Final CTA
- **Purpose:** Last conversion opportunity before footer
- **Content:** "Ready to replace what's holding you back?" + "Book a Discovery Call" button
- **Animation:** Fade-up on scroll

### 10. Footer
- **Columns:**
  - **Brand** — Logo, tagline, email
  - **What We Do** — Digital Product Strategy, Web Design & Development, 3D Visualisation, Case Management Systems
  - **Company** — About, How We Work, Work, Insights & Resources, Careers, Contact
  - **Connect** — LinkedIn, Twitter, Email
- **Newsletter** — Email subscribe input
- **Bottom bar** — Copyright, Privacy Policy / Legal

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `brand-primary` | #1863DC | Primary blue, CTAs, accents |
| `brand-navy` | #07406B | Dark backgrounds, headings |
| `brand-sky` | #2AA7DF | Light blue, stats, highlights |
| `brand-tint` | #EBF4FF | Light blue backgrounds |
| `brand-gray` | #E2E8F0 | Borders, dividers |
| `brand-muted` | #8C9BB5 | Secondary text |
| `brand-dark` | #1E293B | Body text |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Display / Headings | System sans-serif | Extrabold (800) |
| Body | System sans-serif | Regular (400) / Medium (500) |
| Mono / Code | — | Not used in this variant |

### Icons
- **Library:** Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`)
- **Style:** Stroke icons, consistent 16–28px sizing

### Animation Patterns
| Pattern | Implementation |
|---------|---------------|
| Scroll-linked transforms | `useScroll` + `useTransform` from Motion |
| Spring transitions | `type: 'spring'` with stiffness/damping tuning |
| Entrance animations | `whileInView` with fade + translate |
| Accordion expand/collapse | Spring-driven `height: auto/0` |
| Radial positioning | Trigonometric x/y from angle on circle |
| Marquee | CSS `@keyframes` for performance |
