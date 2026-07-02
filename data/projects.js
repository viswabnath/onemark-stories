/**
 * data/projects.js
 *
 * Ordered for impact + variety — the strongest, most distinctive builds come
 * first, and non-wedding occasions (birthday, housewarming, surprise) are
 * interleaved early so visitors see the full range rather than a wall of
 * wedding countdowns.
 */

export const PROJECTS = [
  // ── 1. FLAGSHIP WEDDING — cinematic, best quality ─────────────────
  {
    id: 0,
    num: "01",
    title: "Vijay × Rashmika",
    tag: "Wedding",
    desc: "A Cinematic Union",
    color: "#D4758C",
    url: "https://vijay-rashmika.netlify.app/",
    about:
      "A bespoke, interactive digital experience for Vijay & Rashmika. Crafted with modern web technologies and fluid animations, it transforms standard event details into an immersive, cinematic journey for their guests.",
    importance:
      "Modern weddings require more than a paper invite. With guests traveling from across the globe, a centralised, high-performance web platform ensures seamless access to itineraries, locations, and updates — all while building anticipation for the big day.",
    features: [
      "Dynamic, real-time wedding countdown",
      "Silky smooth scroll animations and cinematic UI",
      "Interactive event itinerary and venue navigation",
      "High-performance, responsive design for all mobile devices",
      "Optimised for seamless sharing across WhatsApp & Instagram",
    ],
  },

  // ── 2. BIRTHDAY — premium personal gift, shows we do more than weddings
  {
    id: 1,
    num: "02",
    title: "Manojna",
    tag: "Birthday",
    desc: "A Birthday, Unwrapped",
    color: "#C9A96E",
    url: "https://manojna.digital/",
    about:
      "A cinematic, chapter-by-chapter birthday greeting made just for Manojna — an envelope that opens into a heartfelt story, floating petals, its own soundtrack, and a personal message that unwraps as you scroll, all on a custom .digital domain.",
    importance:
      "Some people deserve more than a WhatsApp message. A personal birthday website turns 'happy birthday' into an experience they open, scroll through, and keep forever — a one-of-a-kind gift with their name on the door.",
    features: [
      "Cinematic 'open your story' envelope intro",
      "Chapter-by-chapter story that unwraps as you scroll",
      "Background music with a live audio player",
      "Custom domain (manojna.digital) — a gift with its own address",
    ],
  },

  // ── 3. WEDDING — technically impressive (PWA, fireworks) ──────────
  {
    id: 2,
    num: "03",
    title: "Ganesh × Srija",
    tag: "Wedding",
    desc: "A Wedding Story Kept Alive",
    color: "#D4758C",
    url: "https://ganesh-srija.netlify.app",
    about:
      "A premium digital wedding invitation for Ganesh Reddy & Srija — capturing their sacred Telugu union in Bhadrachalam with an interactive countdown to their Muhurtham.",
    importance:
      "Their sacred union deserved more than a standard WhatsApp forward. This digital invitation acts as a permanent keepsake, featuring rich social previews, installable PWA capabilities, and interactive elements that let every guest feel the magic.",
    features: [
      "Dynamic 4-state live timer (Countdown to Count-up) anchored to the Muhurtham",
      "Triggered digital fireworks and celebration sparks tied to the wedding time",
      "Progressive Web App (PWA) — installs on the home screen like a native app",
      "Fully optimised SEO & Open Graph for beautiful WhatsApp and social previews",
      "GSAP scroll animations and interactive lightbox photo galleries",
    ],
  },

  // ── 4. HOUSEWARMING — different event type ────────────────────────
  {
    id: 3,
    num: "04",
    title: "Yadlapalli Gruha Pravesam",
    tag: "Housewarming",
    desc: "A Sacred New Beginning",
    color: "#C9A96E",
    url: "https://yadlapalli-gruhapravesam.vercel.app",
    about:
      "A beautiful digital invitation for the Yadlapalli family's Gruha Pravesam — capturing the sanctity and joy of stepping into a new home with an elegant, shareable web experience.",
    importance:
      "A housewarming is a once-in-a-lifetime milestone. A dedicated digital invitation ensures every guest — near or far — arrives with the right details, the right spirit, and a moment to cherish forever.",
    features: [
      "Elegant event details and ceremony schedule",
      "Live countdown to the Gruha Pravesam moment",
      "Shareable across WhatsApp & Instagram",
    ],
  },

  // ── 5. WEDDING — creative / genre-bending concept ─────────────────
  {
    id: 4,
    num: "05",
    title: "Nazurul × Sajida",
    tag: "Wedding",
    desc: "Tech Meets Tradition",
    color: "#C9A96E",
    url: "https://nazurul-sajida.netlify.app/",
    about:
      "A bold, genre-bending wedding invitation where two IT professionals — from House Nazurul and House Sajida — unite their worlds in a Game of Thrones meets Silicon Valley narrative.",
    importance:
      "Paper invitations get lost. Digital ones travel instantly and can be opened again and again. Give your guests a page they'll revisit — not a message they'll scroll past.",
    features: [
      "House-vs-House narrative with character cards",
      "Animated timeline from birth to wedding day",
      "RSVP-ready design, mobile-first for easy sharing",
    ],
  },

  // ── 6. WEDDING — unique uptime concept (also our album demo couple) ─
  {
    id: 5,
    num: "06",
    title: "Srinu × Sai",
    tag: "Wedding",
    desc: "An Uptime Love Story",
    color: "#D4758C",
    url: "https://srinu-sree.netlify.app",
    about:
      "A cinematic wedding story for Srinu & Sai — their entire journey from engagement to wedding told as a live system uptime log, chapter by chapter.",
    importance:
      "Their story deserved more than a WhatsApp forward. This page lives forever, plays like a film, and lets every guest relive the magic — anytime, anywhere.",
    features: [
      "Live uptime counter since 18 Feb 2024",
      "Full chapter journey: Engagement → Haldi → Marriage → Reception → Post-wedding",
      "Cinematic photo galleries with captions",
    ],
  },

  // ── 7. SURPRISE — fun / different audience ────────────────────────
  {
    id: 6,
    num: "07",
    title: "Valentine Week",
    tag: "Surprise",
    desc: "Live Countdown Experience",
    color: "#C9A96E",
    url: "https://mavi-valentine-week.vercel.app/",
    about:
      "A lively, animated Valentine Week countdown page that builds anticipation day-by-day — a digital surprise that makes love feel like a celebration.",
    importance:
      "Saying 'I love you' with a custom-built page hits different than a text message. This is a gesture that shows effort — something they'll screenshot, share, and remember.",
    features: [
      "Day-by-day Valentine countdown",
      "Animated love messages",
      "Shareable surprise link",
    ],
  },

  // ── 8. WEDDING — cross-continental story ──────────────────────────
  {
    id: 7,
    num: "08",
    title: "Arun × Spandana",
    tag: "Wedding",
    desc: "A Global Love Story",
    color: "#D4758C",
    url: "https://arun-spandana.netlify.app",
    about:
      "From the peaks of Ladakh to the streets of London — an immersive digital experience capturing the cross-continental love story of Arun & Spandana.",
    importance:
      "A modern, interactive narrative that allows guests to journey through their story before arriving at the celebration, ensuring the magic begins long before the wedding day.",
    features: [
      "Cinematic cross-continental storytelling",
      "Beautiful timeline and journey mapping",
      "Seamless mobile and desktop experience",
    ],
  },

  // ── 9. WEDDING — full love story ──────────────────────────────────
  {
    id: 8,
    num: "09",
    title: "Anil × Eswari",
    tag: "Wedding",
    desc: "A Love Story in Full",
    color: "#D4758C",
    url: "https://anil-eswari.netlify.app/",
    about:
      "A vibrant celebration site for Anil & Eswari — bringing together their love story timeline, ceremony schedule, family message, and wedding memories in one joyful experience.",
    importance:
      "Families are spread across cities and countries. A website becomes the central hub — your out-of-town guests know exactly where to go, what to wear, and when to arrive.",
    features: [
      "Full love story timeline with real photos",
      "Live countdown to the wedding day",
      "Shareable across WhatsApp & Instagram",
    ],
  },

  // ── 10. WEDDING — classic / keepsake ─────────────────────────────
  {
    id: 9,
    num: "10",
    title: "Venkat × Nandini",
    tag: "Wedding",
    desc: "Interactive Wedding Keepsake",
    color: "#D4758C",
    url: "https://venkat-nandini.netlify.app/",
    about:
      "A beautifully crafted wedding site for Venkat & Nandini — capturing their ceremony details and a live countdown to the big day.",
    importance:
      "Your wedding is a once-in-a-lifetime event. A dedicated site lets your guests experience the joy before they arrive — no WhatsApp forwards, no confusion.",
    features: [
      "Live countdown to the wedding day",
      "Venue info & event timeline",
      "Traditional Telugu wedding details",
    ],
  },
];
