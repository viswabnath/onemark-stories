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
| Digital Albums | `react-pageflip` (StPageFlip) — realistic tap-to-flip books |
| Fonts | Fraunces · Hanken Grotesk · Courier Prime |
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
│   ├── Flipbook/          # Interactive digital-album viewer (react-pageflip)
│   └── AlbumsTeaser.jsx   # Homepage teaser linking to /albums
├── data/
│   ├── projects.js        # All project entries — ordered by design quality
│   ├── albums.js          # All digital-album entries (source of truth)
│   └── socials.js         # Social media links
├── lib/
│   ├── slug.js            # Shared title → URL slug helper
│   └── albumSize.js       # Album size preset → on-screen page aspect
├── pages/
│   ├── index.jsx          # Homepage — scroll-driven narrative
│   ├── works/[slug].jsx   # Individual project detail pages (SSG)
│   ├── works.jsx          # Standalone portfolio showcase
│   ├── albums/index.jsx   # Digital Albums landing + gallery
│   ├── albums/[slug].jsx  # Immersive flipbook viewer (SSG)
│   ├── api/og.js          # Dynamic OG image generator (Edge Runtime)
│   ├── sitemap.xml.js     # Dynamic sitemap (projects + albums)
│   ├── _document.jsx      # <html lang="en">
│   ├── _app.jsx           # Vercel Analytics + global trackEvent helper
│   ├── 404.jsx
│   ├── _error.jsx
│   └── maintenance.jsx
├── public/
│   ├── albums/            # Per-album WebP assets (see albums/README.md)
│   └── audio/             # Background music tracks
└── styles/
    └── globals.css        # Complete design system (custom CSS, no Tailwind)
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

Printed-invitation editorial theme — ivory card stock, kumkum red, marigold gold.

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#F4ECDB` | Ivory card stock (page bg) |
| `--surface` | `#FBF6E9` | Raised cards, panels |
| `--rose` / `--kumkum` | `#96222B` | Kumkum red — primary accent |
| `--gold` / `--marigold` | `#B9832B` | Marigold gold — foil accent |
| `--cyan` | `#145A50` | Peacock green — links / secondary |
| `--ink` / `--text` | `#3A1016` | Maroon-black ink (body text) |

Type roles: `--font-display` Fraunces · `--font-body` Hanken Grotesk · `--font-mono` Courier Prime.

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

## Digital Albums

A second product lives alongside the marketing site: printed landscape albums reimagined as realistic, tap-to-flip books shared with one link.

- **Viewer:** `components/Flipbook` (`react-pageflip` / StPageFlip), loaded client-side only and wrapped in an error boundary that degrades to a plain gallery.
- **Data:** `data/albums.js` — one entry auto-creates an `/albums` card, an `/albums/[slug]` viewer, a sitemap entry, and an OG card.
- **Assets:** `public/albums/<slug>/` — each `pXX.webp` is a **full double-page spread** (the viewer splits it into halves); covers are single pages. Because `.flipbook__img` is `object-fit: fill`, every image must sit at the exact album aspect. Optional per-album `music` (in `public/audio/`).

See [`public/albums/README.md`](public/albums/README.md) for the geometry rules and [`CLAUDE.md`](CLAUDE.md) for the "Adding an Album" walkthrough.

> **Note:** never run `npm run build` while `npm run dev` is running — they share `.next` and the build rewrites chunk hashes the dev server still references, which 404s the CSS and renders the site unstyled.

---

## Install Dependencies

```bash
npm install @vercel/analytics @vercel/speed-insights @vercel/og react-pageflip
```

---

## Contact

**WhatsApp** [+91 83319 78532](https://wa.me/918331978532) · **Instagram** [@stories.onemark](https://www.instagram.com/stories.onemark) · **Studio** [onemark.digital](https://onemark.digital)

© 2026 [OneMark Digital](https://onemark.digital) — All rights reserved.