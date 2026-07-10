# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint check
```

There is no test suite. Verify changes by running the dev server and testing in browser.

## Architecture

**Framework:** Next.js 16 Pages Router with React 19. Deployed on Vercel.

**Routing:**
- `pages/index.jsx` — homepage (scroll-driven narrative)
- `pages/works.jsx` — full portfolio grid
- `pages/works/[slug].jsx` — individual project pages (SSG via `getStaticPaths`)
- `pages/albums/index.jsx` — Digital Albums landing + gallery
- `pages/albums/[slug].jsx` — immersive flipbook viewer (SSG; slug from album title)
- `pages/api/og.js` — Edge Runtime dynamic OG image generator (Satori/`@vercel/og`)
- `pages/sitemap.xml.js` — dynamic sitemap generated from `PROJECTS` + `ALBUMS`
- `pages/_document.jsx` — sets `<html lang="en">` (fonts load via `@import` in globals.css)
- `pages/_app.jsx` — global layout: injects Vercel Analytics + SpeedInsights, exposes `window.trackEvent(name, props)` globally

**Data layer:** Two single-sources-of-truth, both keyed by title-derived slugs (shared `toSlug()` in `lib/slug.js`):
- `data/projects.js` exports `PROJECTS` — adding an entry auto-creates a Showcase card, a `/works` entry, and a `/works/[slug]` page.
- `data/albums.js` exports `ALBUMS` — adding an entry auto-creates an `/albums` gallery card, an `/albums/[slug]` flipbook, a sitemap entry, and an OG card.

**Digital Albums:** `components/Flipbook` renders an album (`react-pageflip` / StPageFlip) as a realistic tap-to-flip book, loaded via `next/dynamic({ ssr: false })` and wrapped in an error boundary that degrades to a plain gallery. Each `album.pages[]` entry is a **full double-page spread** that the viewer splits into left/right halves; covers are single pages. `.flipbook__img` is `object-fit: fill`, so images must be at the exact aspect. `lib/albumSize.js` maps an album's `size` (preset like `"12x36"` or explicit `{ h, w }` open inches) to the single-page aspect. Optional per-album `music` field (falls back to `/audio/bg-music.mp3`). Album assets and geometry rules live in `public/albums/README.md`.

**Styling:** Single CSS file at `styles/globals.css`. No Tailwind — custom classes with CSS-variable design tokens (printed-invitation cream theme). Key tokens: `--bg` (ivory), `--surface`, `--rose`/`--kumkum` (kumkum red), `--gold`/`--marigold` (marigold), `--cyan` (peacock green), `--ink`/`--text`. Fonts: `--font-display` Fraunces, `--font-body` Hanken Grotesk, `--font-mono` Courier Prime.

**Animations:**
- GSAP 3 with ScrollTrigger — used in `Hero`, `Showcase`, `Testimonials`, `Nav`, `StoryReveal`
- `Showcase` uses sticky horizontal scroll (one project per viewport pinned section)
- `Testimonials` uses horizontal scroll on desktop, CSS snap scroll on mobile
- Canvas particle field in `Hero` (pure Canvas API — no library)
- `HeroErrorBoundary.jsx` wraps Hero to catch WebGL/canvas failures gracefully

**Analytics:** `window.trackEvent(name, props)` is available in every component without imports. Events fire on pricing CTA clicks, showcase opens, WhatsApp enquiry links, and hero errors.

**Lead capture:** `LeadForm` (embedded in `ClosingCTA`) — 2-field form (name + WhatsApp number), saves to `localStorage`, opens a pre-filled WhatsApp deep link to `+91 93927 04742`.

**Nav:** Fixed nav with GSAP mobile drawer. Desktop shows: Works · Albums · Pricing · WhatsApp icon. Mobile drawer shows: Works · Albums · Pricing · onemark.digital link.

**OG Images:** Dynamic cards generated at `/api/og?title=...&tag=...&desc=...&num=...&accent=...` on Vercel's Edge Runtime. Every page, project, and album passes its own query params; `accent` (the item's brand hex) tints the card. Note: any element with multiple children must set `display: flex` (Satori requirement) — interpolate multi-part text as a single template string.

**Maintenance mode:** Set `MAINTENANCE_MODE=true` env var to redirect all routes (except `/maintenance`) to `/maintenance` page.

## Adding a Project

Edit `data/projects.js` and add an entry to `PROJECTS`. Place it in the correct tier comment block based on design quality:

```js
{
  id: 9,           // unique, increment from last
  num: "10",       // display number string
  title: "Name × Name",
  tag: "Wedding",  // Wedding | Birthday | Corporate | Portfolio | Special | Housewarming | Surprise
  desc: "Short tagline",
  color: "#D4758C",
  url: "https://your-project.netlify.app",
  about: "1–2 sentence summary.",
  importance: "Why this digital experience matters.",
  features: ["Feature one", "Feature two", "Feature three"],
}
```

The slug is auto-derived: `"Vijay × Rashmika"` → `"vijay-rashmika"`.

## Adding an Album

1. Optimize the sheets to WebP into `public/albums/<slug>/` — `cover-front.webp`,
   `cover-back.webp`, and `p01…pNN.webp` in reading order. Each `pXX` is a **full
   spread**; covers are single pages. Match the exact aspect for the album `size`
   (`object-fit: fill`). See `public/albums/README.md` for geometry, cover-splitting,
   and letterboxing rules.
2. Add an entry to `ALBUMS` in `data/albums.js`:

```js
{
  id: 3,                 // unique, increment from last
  num: "04",             // display number string
  title: "Name",         // slug auto-derived via lib/slug.js
  tag: "Wedding Album",  // shown on card + OG; drives fallback OG accent
  desc: "Short tagline",
  color: "#D4758C",      // brand accent (spine, OG card accent)
  date: "March 2026",
  size: "12x36",         // preset name or explicit { h, w } open inches
  music: "/audio/name.mp3", // optional; omit to use the shared default track
  about: "1–2 sentence intro.",
  coverFront: "/albums/name/cover-front.webp",
  coverBack:  "/albums/name/cover-back.webp",
  pages: ["/albums/name/p01.webp", "/albums/name/p02.webp"],
}
```

The `/albums/<slug>` page, gallery card, sitemap entry, and OG card generate
automatically.

## Gotchas

- **Never run `npm run build` while `npm run dev` is running** — they share `.next`
  and the build rewrites chunk hashes the dev server still references, which 404s
  the CSS and renders the whole site unstyled. Verify via the live dev server; only
  `next build` with the dev server stopped.
