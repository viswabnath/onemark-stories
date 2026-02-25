# OneMark Stories 🌟

> *"Your Story Deserves a Page."*

The production-grade portfolio and lead-generation site for **OneMark Stories** — the visual arts & interactive event branch of [OneMark Digital](https://www.onemark.digital). We craft bespoke digital experiences for weddings, entertainment launches, corporate galas, and life's most unforgettable milestones.

---

## ✨ Features

- **Mobile-First, Fully Responsive** — Optimised for every screen from 320px phone to 4K desktop. Zero media query hacks; built mobile-first from the ground up.
- **True-to-Life Device Previews** — Live project showcase embeds real client sites inside MacBook and iPhone frames. Uses a `ResizeObserver`-based scaling engine to compute the exact `transform: scale()` at runtime — reliable across every browser, layout, and screen size.
- **Zero Inline Styles** — All styling lives in `styles/globals.css` via semantic CSS classes and custom properties. The only inline styles are GSAP animation targets and dynamically computed iframe scale values.
- **Premium Dark / Light Mode** — CSS variable-powered theming with a warm ink-on-paper light mode and a deep-space dark mode. Instant toggle, smooth transitions.
- **GSAP Animations Throughout** — Scroll-triggered reveals on every section (Hero, About, Showcase, Footer, Loader) using GSAP timelines and `ScrollTrigger`. Hero headline words animate in via a per-word clip-reveal (`overflow: hidden` + `yPercent`).
- **Interactive 3D Hero** — Three.js particle field + animated torus rings, responsive to mouse movement and theme changes. Particle count and renderer settings tuned for mobile performance.
- **Single Theme Toggle** — One toggle in the nav, always. Clean `nav__right` architecture keeps desktop links and mobile hamburger in one flex row — no duplicate UI elements.
- **GSAP Mobile Drawer** — Full-screen navigation drawer animated open/close with GSAP. Hamburger shown only on mobile; desktop links shown only on desktop — mutually exclusive via CSS, not JS.
- **Custom Cursor** — Magnetic dot-and-ring cursor with hover and click states. Automatically hidden on touch devices via CSS.
- **WhatsApp Lead Funnel** — Pre-filled `wa.me` links across CTAs to instantly capture high-intent project enquiries.
- **Glass Morphism UI** — Backdrop-blur card surfaces, glow effects, and noise texture overlay for depth.
- **SEO Ready** — `robots.txt`, `sitemap.xml`, and semantic HTML throughout.

---

## 🛠 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | [Next.js](https://nextjs.org) 16 (Pages Router) |
| Styling     | Custom CSS (`styles/globals.css`) — design tokens, BEM-ish classes, no Tailwind runtime |
| Animation   | [GSAP](https://gsap.com/) 3 + ScrollTrigger |
| 3D / Canvas | [Three.js](https://threejs.org) |
| Deployment  | [Vercel](https://vercel.com) |
| Fonts       | [Google Fonts](https://fonts.google.com): Syne · DM Sans · Space Mono |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/onemark-stories.git
cd onemark-stories

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```text
onemark-stories/
├── components/
│   ├── Hero/
│   │   ├── index.jsx          # Hero section — GSAP word-reveal, CTAs, scroll indicator
│   │   └── HeroCanvas.jsx     # Three.js 3D canvas (particles + rings), perf-optimised
│   ├── Showcase/
│   │   ├── index.jsx          # Project showcase — mobile + desktop layouts
│   │   ├── IPhone.jsx         # iPhone 15 Pro frame shell (no inline sizing)
│   │   ├── MacBook.jsx        # MacBook frame shell (no inline sizing)
│   │   ├── IframeScreen.jsx   # ResizeObserver-scaled iframe — works in all browsers
│   │   ├── ViewToggle.jsx     # Desktop ↔ Mobile preview toggle
│   │   └── ProjectList.jsx    # Desktop project card list with expandable info
│   ├── About.jsx              # Services, process steps — GSAP scroll reveals
│   ├── Cursor.jsx             # Custom magnetic cursor (desktop only)
│   ├── Footer.jsx             # Footer with CTA, links, GSAP scroll animations
│   ├── Loader.jsx             # Logo + GSAP-animated progress bar loader
│   └── Nav.jsx                # Sticky nav — single toggle, GSAP mobile drawer
├── context/
│   └── ThemeContext.jsx       # Dark/light mode context + localStorage persistence
├── data/
│   ├── projects.js            # Live client project data (6 real projects)
│   └── socials.js             # Social media links
├── hooks/
│   └── useMousePosition.js    # Mouse position hook for cursor
├── pages/
│   ├── _app.jsx               # App wrapper + theme provider + loader
│   ├── _error.jsx             # Custom error page
│   ├── 404.jsx                # Custom 404 page
│   ├── maintenance.jsx        # Maintenance mode page
│   └── index.jsx              # Home page (Hero + About + Showcase + Footer)
├── public/                    # Static assets, logos, sitemap, robots
├── styles/
│   └── globals.css            # Single source of truth — all tokens, components, responsive
└── README.md
```

---

## 🎨 Styling Architecture

All styles live in **`styles/globals.css`** — no inline `style={}` props on components (except GSAP animation targets and the dynamically computed iframe scale).

### Design Tokens (CSS Custom Properties)

```css
:root, [data-theme="dark"] {
  --bg:      #07080C;
  --surface: #0F1017;
  --cyan:    #29ABE2;
  --coral:   #FF4D6D;
  /* ... */
}
[data-theme="light"] {
  --bg:      #F4F6FB;
  --cyan:    #0A5FA8;
  /* ... */
}
```

### Component Class Pattern

BEM-ish semantic class names throughout:

```jsx
<section className="hero grid-bg">
  <div className="hero__content">
    <div className="hero__line">
      <span className="hero__word hero__word--gradient">a Page.</span>
    </div>
  </div>
</section>
```

### Responsive Strategy

Mobile-first with three core breakpoints:

- **Base**: mobile (< 640px)
- **`sm` (640px+)**: 3-column process grid, 3-column footer
- **`md` (768px+)**: 2-column about grid, desktop showcase layout, full nav links

### Nav Architecture

Single `nav__right` flex row contains: desktop text links (hidden on mobile via CSS) + one theme toggle + hamburger (hidden on desktop via CSS). No duplicate elements, no JS toggling display.

---

## 📱 Iframe Scaling — How It Works

Previous approaches using CSS container queries (`container-type: inline-size` + `100cqi`) failed because `cqi` resolves incorrectly on `position: absolute` children in some browsers.

**Current approach in `IframeScreen.jsx`:**

1. A wrapper `div` with `width: 100%` and `paddingBottom: (nativeHeight / nativeWidth * 100)%` establishes the correct aspect ratio without any CSS `aspect-ratio` property
2. A `ResizeObserver` measures the wrapper's actual rendered pixel width
3. `scale = containerWidth / nativeWidth` is computed as a real number
4. Applied as `transform: scale(${scale})` on the iframe — always pixel-perfect

```jsx
// IframeScreen — simplified
const ro = new ResizeObserver(entries => {
  const w = entries[0]?.contentRect.width;
  if (w > 0) setScale(w / nativeWidth);   // e.g. 256 / 390 = 0.656
});
```

This works for both the iPhone preview (390 × 844) and the MacBook preview (1440 × 900).

---

## 🎬 GSAP Animations

Every section has scroll-triggered entrance animations:

| Section   | Animation |
|-----------|-----------|
| Loader    | Logo + progress bar fade up on mount, fade out on complete |
| Hero      | Per-word headline clip-reveal (`yPercent: 110 → 0`), label/sub/CTAs stagger in |
| About     | Text, CTA buttons, service cards, process steps — scroll reveal with stagger |
| Showcase  | Header, project cards slide in from left; device column slides from right |
| Footer    | CTA banner, grid columns, social pills — stagger scroll reveals |

Hero words use `overflow: hidden` on `.hero__line` as the clip container, so words animate up from below without any layout shift.

---

## ➕ Adding a New Project

Edit `data/projects.js`:

```js
export const PROJECTS = [
  {
    id:         6,                                    // increment from last
    num:        "07",
    title:      "Client Name",
    tag:        "Wedding",                            // Wedding / Portfolio / Valentine / Community
    desc:       "Short tagline for the card",
    color:      "#FF4D6D",                            // tag accent colour
    url:        "https://your-client-site.com/",
    about:      "1–2 sentence project summary.",
    importance: "Why this digital experience matters to them.",
    features:   ["Feature one", "Feature two", "Feature three"],
  },
];
```

The showcase automatically picks it up — no other changes needed.

---

## 🌐 Deployment

This project is deployed on **Vercel** and linked to `stories.onemark.co.in`.

Pushing to `main` triggers an automatic production build.

```bash
# Manual deploy via Vercel CLI
npx vercel --prod
```

---

## 📄 License

Private — © 2026 [OneMark Digital](https://www.onemark.digital). All rights reserved.

---

Built with ❤️ by **Viswanath Bodasakurthi** — Co-Founder, [OneMark](https://www.onemark.digital)