# OneMark Stories

> Custom wedding websites & digital experiences — built with love, delivered in days.

Live at **[stories.onemark.co.in](https://stories.onemark.co.in)**

---

## What We Build

Bespoke, cinematic digital experiences for weddings, birthdays, corporate launches, and every moment that deserves more than a WhatsApp forward. One link shared with all your guests — live forever.

**Tiers:** Spark · Bloom · Legacy · **Turnaround:** 3–5 days · **Starting at:** ₹2,999 / $35

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 — Pages Router |
| UI | React 19 |
| Animation | GSAP 3 (ScrollTrigger) |
| Canvas | Pure Canvas API — animated particle field in Hero |
| Styling | Custom CSS design system (`styles/globals.css`) |
| Analytics | Vercel Analytics (`@vercel/analytics`) |
| OG Images | `@vercel/og` — dynamic branded preview cards |
| Fonts | Cormorant Garamond · Inter · DM Sans |
| Hosting | Vercel |

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint check (0 errors)
```

---

## Project Structure

```
onemark-stories/
├── components/
│   ├── Hero/              # Canvas particle animation + GSAP text entrance
│   ├── Showcase/          # Sticky horizontal scroll — one project per viewport
│   ├── StoryReveal.jsx    # Apple-style 4-beat scroll sequence (desktop + mobile)
│   ├── Testimonials.jsx   # Sticky horizontal scroll (desktop) / snap scroll (mobile)
│   ├── HowItWorks.jsx     # 3-step process cards (Send → Build → Share)
│   ├── Pricing.jsx        # 3-tier pricing with analytics tracking
│   ├── About.jsx          # SVG service icons, comparison table, editorial FAQ
│   ├── ClosingCTA.jsx     # Lead capture form + WhatsApp fallback
│   ├── LeadForm.jsx       # 2-field form (name + phone) — saves to localStorage, opens WA
│   ├── ScrollToTop.jsx    # Fixed scroll-to-top button (appears after 400px)
│   ├── HeroErrorBoundary.jsx  # WebGL/canvas error fallback
│   ├── Footer.jsx         # Editorial minimal footer
│   ├── Nav.jsx            # Fixed nav with GSAP mobile drawer
│   ├── Cursor.jsx         # Custom rose cursor (desktop only)
│   ├── Loader.jsx         # Page load animation
│   └── WhatsAppFloat.jsx  # Floating WhatsApp button
├── data/
│   ├── projects.js        # All project entries — ordered by design quality
│   └── socials.js         # Social media links
├── pages/
│   ├── index.jsx          # Homepage — scroll-driven narrative
│   ├── works/[slug].jsx   # Individual project detail pages (SSG)
│   ├── works.jsx          # Standalone portfolio showcase
│   ├── api/og.js          # Dynamic OG image generator (Edge Runtime)
│   ├── _app.jsx           # Vercel Analytics + global trackEvent helper
│   ├── 404.jsx
│   ├── _error.jsx
│   └── maintenance.jsx
└── styles/
    └── globals.css        # Complete design system — 800 lines, no duplicates
```

---

## Page Narrative

The homepage is a scroll-driven story — everything flows:

1. **Hero** — Animated canvas particle field + GSAP word entrance
2. **StoryReveal** — 4 full-screen beats with animated SVG visuals (desktop & mobile)
3. **Showcase** — Sticky horizontal scroll: each project is a full-viewport slide with MacBook + iPhone
4. **About** — SVG service icons, CSS Grid comparison table (mobile: stacked cards), editorial two-column FAQ
5. **Testimonials** — Horizontal scroll (desktop) / native snap scroll (mobile) — 9 testimonials across Wedding, Housewarming, Portfolio, Corporate, Birthday
6. **HowItWorks** — 3 glass cards: Send a message → We build your page → Share one link
7. **Pricing** — Spark / Bloom / Legacy with analytics on every CTA click
8. **ClosingCTA** — 2-field lead capture form (name + phone) + WhatsApp fallback
9. **Footer** — Logo, links, socials

---

## Key Improvements (Apr 2026)

### Performance & SEO
- Dynamic OG image cards via `/api/og` — every page and project gets a rich branded social preview
- Bloom price corrected in JSON-LD structured data (₹6,499, was ₹5,999)
- Sitemap expanded from 2 URLs to 14 — all 9 projects + 3 city landing pages
- Individual project pages at `/works/[slug]` generated via `getStaticPaths`

### Analytics
- Vercel Analytics wired up in `_app.jsx`
- Global `window.trackEvent(name, props)` available in every component
- Events fire on: pricing CTA clicks, showcase opens, testimonials viewed, hero WebGL errors

### Lead Capture
- `LeadForm` embedded in `ClosingCTA` — 2 fields: name + WhatsApp number
- Saves to `localStorage` (ready to swap for a backend/Google Sheet webhook)
- Submitting pre-fills a WhatsApp message and opens it in a new tab

### Hero
- Static SVG ornament replaced with an animated canvas particle field
- Coloured floating dots (rose/gold/cyan) with connecting lines and pulsing glows
- Top labels removed — they overlapped the headline at various zoom levels
- Font size reduced: `clamp(3.8rem, 8vw, 8.5rem)` — all 4 lines always visible

### Showcase
- Completely rewritten: sticky horizontal scroll where each project fills the viewport
- Every slide: info panel (left) + MacBook with live iframe (right) + iPhone overlapping the MacBook corner
- Alternating left/right layout for visual rhythm
- Mobile: MacBook hidden, iPhone centred, stacked layout

### StoryReveal
- Animated SVG visuals now shown on mobile (previously hidden)
- Beat-specific background glows per section
- Visual stacks above text on mobile using CSS `order`

### Testimonials
- Expanded from 5 wedding-only to 8 testimonials (Wedding, Portfolio, Corporate, Birthday)
- Fixed SSR hydration gap bug: JS height only runs on desktop (`window.innerWidth >= 768`)
- Mobile: native CSS snap scroll, `transform: none !important` prevents ghost offset
- `IntersectionObserver` prevents early horizontal movement before section is in view

### About Section
- Emoji icons replaced with purpose-drawn inline SVGs per service
- Comparison table rebuilt as CSS Grid (4 columns) — mobile collapses to stacked feature cards
- FAQ redesigned: editorial two-column layout, numbered items, CSS `grid-template-rows` slide animation

### globals.css
- Cleaned from 3,604 lines → ~850 lines (78% reduction)
- All duplicates, dead rules, and broken selectors removed
- `story-cta__headline` missing `.` fixed
- `line-clamp` standard property added alongside `-webkit-line-clamp`

---

## Design Tokens

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#1A1118` | Page background |
| `--surface` | `#251C30` | Cards, panels |
| `--rose` | `#D4758C` | Primary accent |
| `--gold` | `#C9A96E` | Secondary accent |
| `--cyan` | `#29ABE2` | Brand blue |
| `--text` | `#F5EEF0` | Body text |

---

## Adding a Project

Edit [`data/projects.js`](data/projects.js) — place it in the correct tier based on design quality:

```js
{
  id: 9,
  num: "10",
  title: "Name × Name",
  tag: "Wedding",   // Wedding | Birthday | Corporate | Portfolio | Special
  desc: "Short tagline",
  color: "#D4758C",
  url: "https://your-project.netlify.app",
  about: "1–2 sentence summary.",
  importance: "Why this digital experience matters.",
  features: ["Feature one", "Feature two", "Feature three"],
}
```

The project appears automatically in the homepage Showcase and `/works`, and gets its own SEO page at `/works/your-slug`.

---

## Install Dependencies

```bash
npm install @vercel/analytics @vercel/og
```

---

## Contact

**WhatsApp** [+91 83319 78532](https://wa.me/918331978532) · **Instagram** [@stories.onemark](https://www.instagram.com/stories.onemark) · **Studio** [onemark.digital](https://onemark.digital)

© 2026 [OneMark Digital](https://onemark.digital) — All rights reserved.