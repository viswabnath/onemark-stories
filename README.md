
# OneMark Stories 🌟

> *"Your Story Deserves a Page."*

The production-grade portfolio and lead-generation site for **OneMark Stories** — the visual arts & interactive event branch of [OneMark Digital](https://www.onemark.digital). We craft bespoke digital experiences for weddings, entertainment launches, corporate galas, and life's most unforgettable milestones.

---

## ✨ Features

- **Mobile-First, Fully Responsive** — Optimised for every screen from 320px phone to 4K desktop. Zero media query hacks; built mobile-first from the ground up.
- **True-to-Life Device Previews** — Live project showcase embeds real client sites inside MacBook and iPhone frames. Uses modern **CSS Container Queries (`cqi`)** to perfectly scale iframes to hardware aspect ratios at any screen size.
- **Zero Inline Styles** — All styling lives in `styles/globals.css` via semantic CSS classes and custom properties. Components are clean JSX with no `style={}` clutter.
- **Premium Dark / Light Mode** — CSS variable-powered theming with a warm ink-on-paper light mode and a deep-space dark mode. Instant toggle, smooth transitions.
- **Interactive 3D Hero** — Three.js particle field + animated torus rings, responsive to mouse movement and theme changes.
- **Fluid Mobile Drawer** — Custom GSAP-animated mobile navigation drawer with a seamless CSS-animated hamburger toggle.
- **Custom Cursor** — Magnetic dot-and-ring cursor with hover and click states (desktop only, hidden on touch devices).
- **WhatsApp Lead Funnel** — Pre-filled `wa.me` links across CTAs to instantly capture high-intent project enquiries.
- **Glass Morphism UI** — Backdrop-blur card surfaces, glow effects, and noise texture overlay for depth.
- **SEO Ready** — `robots.txt`, `sitemap.xml`, and semantic HTML throughout.

---

## 🛠 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | [Next.js](https://nextjs.org) 15 (Pages Router) |
| Styling | Custom CSS (`styles/globals.css`) — design tokens, BEM-ish classes |
| Animation   | [GSAP](https://gsap.com/) + CSS Transitions |
| 3D / Canvas | [Three.js](https://threejs.org) |
| Deployment  | [Vercel](https://vercel.com) |
| Fonts       | [Google Fonts](https://fonts.google.com): Syne · Plus Jakarta Sans · Space Mono |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/onemark-stories.git](https://github.com/your-username/onemark-stories.git)
cd onemark-stories

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

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
│   │   ├── index.jsx          # Hero section — headline, CTAs, scroll indicator
│   │   └── HeroCanvas.jsx     # Three.js 3D canvas (particles + rings)
│   ├── Showcase/
│   │   ├── index.jsx          # Project showcase — mobile + desktop layouts
│   │   ├── ProjectList.jsx    # Desktop project card list with expandable info
│   │   ├── IPhone.jsx         # iPhone 15 Pro frame component
│   │   ├── MacBook.jsx        # MacBook frame component
│   │   ├── IframeScreen.jsx   # Scaled iframe inside device frames
│   │   └── ViewToggle.jsx     # Desktop ↔ Mobile preview toggle
│   ├── About.jsx              # Services, comparison table, and FAQ
│   ├── Cursor.jsx             # Custom magnetic cursor
│   ├── Footer.jsx             # Footer with CTA, links, Instagram cards
│   ├── Loader.jsx             # Logo + progress bar loader
│   └── Nav.jsx                # Sticky nav with GSAP mobile drawer
├── context/
│   └── ThemeContext.jsx       # Dark/light mode context + localStorage persistence
├── data/
│   ├── projects.js            # Live client project data
│   └── socials.js             # Social media links
├── hooks/
│   └── useMousePosition.js    # Mouse position hook
├── pages/
│   ├── _app.jsx               # App wrapper + theme provider + loader
│   ├── _error.jsx             # Custom error page
│   ├── 404.jsx                # Custom 404 page
│   ├── maintenance.jsx        # Maintenance mode page
│   └── index.jsx              # Home page
├── public/                    # Static assets, logos, sitemap, robots
├── styles/
│   └── globals.css            # All styles: tokens, components, container queries
└── README.md

```

---

## 🎨 Styling Architecture

All styles live in **`styles/globals.css`** — no inline `style={}` props on components.

### Design Tokens (CSS Custom Properties)

```css
:root, [data-theme="dark"] {
  --bg: #07080C;
  --cyan: #29ABE2;
  --coral: #FF4D6D;
  /* ... */
}
[data-theme="light"] {
  --bg: #F7F3EE;    /* warm cream */
  --cyan: #0A5FA8;  /* deep ocean blue */
  /* ... */
}

```

### Component Class Pattern

Components use semantic BEM-ish class names:

```jsx
<section className="hero grid-bg">
  <div className="hero__content">
    <h1 className="hero__headline">...</h1>
  </div>
</section>

```

### Responsive Strategy

Mobile-first with three core breakpoints:

* **Base**: mobile (< 640px)
* **`sm` (640px+)**: 3-column process grid, 3-column footer
* **`md` (768px+)**: 2-column about grid, desktop showcase, full nav
* **Container Queries**: Used exclusively for dynamic iframe scaling inside device mockups.

---

## ➕ Adding a New Project

Edit `data/projects.js`:

```js
/**
 * data/projects.js
 * * The live showcase data. 
 * Tags reflect the new, broadened market scope.
 */

export const PROJECTS = [
  {
    id: 0,
    num: "01",
    title: "Venkat × Nandini",
    tag: "Wedding",
    desc: "Interactive Wedding Keepsake",
    color: "#FF4D6D", // Coral
    url: "https://venkat-nandini.onemark.co.in", // Replace with actual URL
    about: "A beautifully crafted, high-performance wedding site capturing their love story, ceremony details, and a live countdown to the big day.",
    importance: "Your wedding is a once-in-a-lifetime event. A dedicated site lets your guests experience the joy before they arrive — no WhatsApp forwards, no confusion. Just one beautiful link shared with everyone you love.",
    features: [
      "Live countdown to the wedding day",
      "Couple's story & interactive photo gallery",
      "One-click Google Maps venue integration"
    ],
  },
  {
    id: 1,
    num: "02",
    title: "Project Nova",
    tag: "Entertainment",
    desc: "Sci-Fi Movie Teaser Launch",
    color: "#FFB547", // Amber
    url: "https://onemark.digital", // Placeholder
    about: "A high-impact, dark-mode landing page designed to handle massive traffic spikes for an exclusive cinematic trailer drop.",
    importance: "Entertainment launches require instant visual impact and flawless performance. We engineered this experience to immerse fans immediately while capturing audience data for the upcoming premiere.",
    features: [
      "Auto-playing cinematic HD background",
      "Enterprise-grade server scalability",
      "Custom WebGL interactive elements"
    ],
  },
  {
    id: 2,
    num: "03",
    title: "Nexus Tech Summit",
    tag: "Corporate",
    desc: "Annual Leadership Gala",
    color: "#29ABE2", // Cyan
    url: "https://onemark.co.in", // Placeholder
    about: "A sleek, branded digital hub for an invite-only corporate summit, featuring live itineraries, speaker profiles, and a secure RSVP system.",
    importance: "Corporate events demand professionalism and frictionless user experiences. This bespoke platform replaced clunky PDF schedules with a real-time, instantly updatable digital guide.",
    features: [
      "Private Google Sheets RSVP routing",
      "Real-time dynamic itinerary updates",
      "Brand-aligned premium typography"
    ],
  },
  {
    id: 3,
    num: "04",
    title: "Viswanath",
    tag: "Portfolio",
    desc: "Senior Engineering Showcase",
    color: "#00E5FF", // Neon Blue
    url: "https://viswabnath.github.io/portfolio", // Adjust to your actual portfolio URL if desired
    about: "A bespoke, highly interactive personal portfolio designed to instantly communicate technical expertise, professional history, and creative vision.",
    importance: "In a competitive industry, a standard PDF resume is easily forgotten. A custom-coded digital showcase acts as a 24/7 advocate for your skills, leaving a lasting impression on clients and recruiters.",
    features: [
      "Smooth GSAP scroll animations",
      "Custom Dark/Light mode architectural UI",
      "Direct WhatsApp lead generation funnel"
    ],
  },
];

```

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

