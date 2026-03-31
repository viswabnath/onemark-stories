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
| 3D / Canvas | Three.js + React Three Fiber + Drei |
| Animation | GSAP 3 (ScrollTrigger) |
| Styling | Custom CSS design system (`styles/globals.css`) |
| Fonts | Cormorant Garamond · Outfit · DM Sans |
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
│   ├── Hero/              # Scroll-driven hero with Three.js canvas
│   ├── Showcase/          # Live iframe previews in iPhone + MacBook frames
│   ├── StoryReveal.jsx    # Apple-style pinned text sequence (4 beats)
│   ├── Testimonials.jsx   # Full-viewport quote panels
│   ├── Pricing.jsx        # 3-tier pricing (Spark / Bloom / Legacy)
│   ├── About.jsx          # Services, comparison table, process, FAQ
│   ├── ClosingCTA.jsx     # Emotional full-viewport closing section
│   ├── Footer.jsx         # Editorial minimal footer
│   ├── Nav.jsx            # Fixed nav with GSAP mobile drawer
│   ├── Cursor.jsx         # Custom rose cursor (desktop only)
│   ├── Loader.jsx         # Page load animation
│   └── WhatsAppFloat.jsx  # Floating WhatsApp button
├── context/
│   └── ThemeContext.jsx   # Light / Dark mode (localStorage + system pref)
├── data/
│   ├── projects.js        # All project entries
│   └── socials.js         # Social media links
├── pages/
│   ├── index.jsx          # Homepage — scroll-driven narrative
│   ├── works.jsx          # Standalone portfolio showcase
│   ├── 404.jsx
│   ├── _error.jsx
│   └── maintenance.jsx
└── styles/
    └── globals.css        # Full design system
```

---

## Page Narrative

The homepage is a scroll-driven story — everything flows:

1. **Hero** — "Your Story Deserves a Page." + Three.js particle canvas
2. **StoryReveal** — Scroll through 4 full-screen text beats (CSS sticky + GSAP)
3. **Showcase** — Click any project, preview it live in iPhone or MacBook frame
4. **Testimonials** — Full-viewport quote panels, one client at a time
5. **About** — Services, comparison table, 3-step process, FAQ
6. **Pricing** — Spark / Bloom / Legacy tiers
7. **ClosingCTA** — "Your story starts with a message."
8. **Footer** — Logo, links, socials

---

## Design Tokens (dark mode)

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

Edit [`data/projects.js`](data/projects.js):

```js
{
  id: 9,
  num: "10",
  title: "Name × Name",
  tag: "Wedding",   // Wedding | Birthday | Corporate | Portfolio
  desc: "Short tagline",
  color: "#D4758C",
  url: "https://your-project.netlify.app",
  about: "1-2 sentence summary.",
  importance: "Why this digital experience matters.",
  features: ["Feature one", "Feature two", "Feature three"],
}
```

The project appears automatically in the homepage Showcase and `/works`.

---

## Contact

**WhatsApp** [+91 93927 04742](https://wa.me/919392704742) · **Instagram** [@stories.onemark](https://www.instagram.com/stories.onemark) · **Studio** [onemark.digital](https://onemark.digital)

© 2026 [OneMark Digital](https://onemark.digital) — All rights reserved.
