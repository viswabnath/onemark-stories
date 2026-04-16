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
- `pages/api/og.js` — Edge Runtime dynamic OG image generator (Satori/`@vercel/og`)
- `pages/_app.jsx` — global layout: injects Vercel Analytics + SpeedInsights, exposes `window.trackEvent(name, props)` globally

**Data layer:** `data/projects.js` exports `PROJECTS` array — the single source of truth for all project content. Slugs are auto-derived from `title` field using the `toSlug()` function in `[slug].jsx`. Adding an entry here automatically creates a Showcase card, a `/works` entry, and a `/works/[slug]` page.

**Styling:** Single CSS file at `styles/globals.css` (~850 lines). No Tailwind utility classes are used — all styles use custom CSS classes with design tokens defined as CSS variables. Key tokens: `--bg`, `--surface`, `--rose`, `--gold`, `--cyan`, `--text`.

**Animations:**
- GSAP 3 with ScrollTrigger — used in `Hero`, `Showcase`, `Testimonials`, `Nav`, `StoryReveal`
- `Showcase` uses sticky horizontal scroll (one project per viewport pinned section)
- `Testimonials` uses horizontal scroll on desktop, CSS snap scroll on mobile
- Canvas particle field in `Hero` (pure Canvas API — no library)
- `HeroErrorBoundary.jsx` wraps Hero to catch WebGL/canvas failures gracefully

**Analytics:** `window.trackEvent(name, props)` is available in every component without imports. Events fire on pricing CTA clicks, showcase opens, WhatsApp enquiry links, and hero errors.

**Lead capture:** `LeadForm` (embedded in `ClosingCTA`) — 2-field form (name + WhatsApp number), saves to `localStorage`, opens a pre-filled WhatsApp deep link to `+91 93927 04742`.

**Nav:** Fixed nav with GSAP mobile drawer. Desktop shows: Works · Pricing · WhatsApp icon. Mobile drawer shows: Works · Pricing · onemark.digital link.

**OG Images:** Dynamic cards generated at `/api/og?title=...&tag=...&desc=...&num=...` on Vercel's Edge Runtime. Every page and project page passes its own query params to this endpoint.

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
