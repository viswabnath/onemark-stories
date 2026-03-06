/**
 * data/projects.js
 *
 * Each project now carries:
 *   - desc      : short tag line (shown in the card list)
 *   - about     : 1-2 sentence summary of the project
 *   - importance: why having this digital experience matters
 *   - features  : 3 quick bullet points of what it includes
 */

export const PROJECTS = [
  {
    id: 0,
    num: "01",
    title: "Vijay × Rashmika",
    tag: "Wedding",
    desc: "Wedding Celebration Site",
    color: "#FF4D6D",
    url: "https://vijay-rashmika.netlify.app/",

    about:
      "A bespoke, interactive digital experience for Vijay & Rashmika. Crafted with modern web technologies and fluid animations, it transforms standard event details into an immersive, cinematic journey for their guests.",

    importance:
      "Modern weddings require more than a paper invite. With guests traveling from across the globe, a centralized, high-performance web platform ensures seamless access to itineraries, locations, and updates—all while building anticipation for the big day.",

    features: [
      "Dynamic, real-time wedding countdown",
      "Silky smooth scroll animations and cinematic UI",
      "Interactive event itinerary and venue navigation",
      "High-performance, responsive design for all mobile devices",
      "Optimized for seamless sharing across WhatsApp & Instagram",
    ],
  },
  {
    id: 1,
    num: "02",
    title: "Anil × Eswari",
    tag: "Wedding",
    desc: "Wedding Celebration Site",
    color: "#FF4D6D",
    url: "https://anil-eswari.netlify.app/",

    about:
      "A vibrant celebration site for Anil & Eswari — bringing together their ceremony schedule, family message, and wedding memories in one joyful experience.",

    importance:
      "Families are spread across cities and countries. A website becomes the central hub — your out-of-town guests know exactly where to go, what to wear, and when to arrive.",

    features: [
      "Live countdown to the wedding day",
      "Family greeting section",
      "Shareable across WhatsApp & Instagram",
    ],
  },
  {
    id: 2,
    num: "03",
    title: "Nazurul × Sajida",
    tag: "Wedding",
    desc: "Elegant Wedding Story",
    color: "#FF4D6D",
    url: "https://nazurul-sajida.netlify.app/",

    about:
      "An elegant digital invitation for Nazurul & Sajida — warm, intimate, and deeply personal, designed to make every guest feel genuinely welcomed.",

    importance:
      "Paper invitations get lost. Digital ones travel instantly and can be opened again and again. Give your guests a page they'll revisit — not a message they'll scroll past.",

    features: [
      "Animated digital invitation",
      "RSVP-ready design",
      "Mobile-first for easy sharing",
    ],
  },
  {
    id: 3,
    num: "04",
    title: "Venkat × Nandini",
    tag: "Wedding",
    desc: "Interactive Wedding Keepsake",
    color: "#FF4D6D",
    url: "https://venkat-nandini.netlify.app/",

    about:
      "A beautifully crafted wedding site for Venkat & Nandini — capturing their love story, ceremony details, and a live countdown to the big day.",

    importance:
      "Your wedding is a once-in-a-lifetime event. A dedicated site lets your guests experience the joy before they arrive — no WhatsApp forwards, no confusion. Just one beautiful link shared with everyone you love.",

    features: [
      "Live countdown to the wedding day",
      "Couple's story & photo gallery",
      "Venue info & event timeline",
    ],
  },

  {
    id: 4,
    num: "05",
    title: "Valentine Week",
    tag: "Valentine",
    desc: "Live Countdown Experience",
    color: "#FFB547",
    url: "https://mavi-valentine-week.vercel.app/",

    about:
      "A lively, animated Valentine Week countdown page that builds anticipation day-by-day — a digital surprise that makes love feel like a celebration.",

    importance:
      "Saying 'I love you' with a custom-built page hits different than a text message. This is a gesture that shows effort — something they'll screenshot, share, and remember long after Valentine's Day ends.",

    features: [
      "Day-by-day Valentine countdown",
      "Animated love messages",
      "Shareable surprise link",
    ],
  },
  {
    id: 5,
    num: "06",
    title: "Viswanath",
    tag: "Portfolio",
    desc: "Personal Portfolio Showcase",
    color: "#00F5FF",
    url: "https://viswabnath.github.io/portfolio/",

    about:
      "A sleek personal portfolio for Viswanath — showcasing his work, skills, and story in a way that makes recruiters and clients stop scrolling and start reading.",

    importance:
      "Your LinkedIn profile is one of thousands. A personal portfolio site is yours alone — your design, your story, your rules. It's the difference between being seen and being remembered.",

    features: [
      "Projects & skills showcase",
      "Custom animations & interactions",
      "Optimised for recruiters & clients",
    ],
  },
  {
    id: 6,
    num: "07",
    title: "Srinu × Sai",
    tag: "Wedding",
    desc: "An Uptime Love Story",
    color: "#FF4D6D",
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
  {
    id: 7,
    num: "08",
    title: "Ganesh × Srija",
    tag: "Wedding",
    desc: "A Wedding Story Kept Alive",
    color: "#FF4D6D",
    url: "https://ganesh-srija.netlify.app",
    about:
  "A premium digital wedding invitation for Ganesh Reddy & Srija — capturing their sacred Telugu union in Bhadrachalam with an interactive countdown to their Muhurtham.",
importance:
  "Their sacred union deserved more than a standard WhatsApp forward. This digital invitation acts as a permanent keepsake, featuring rich social previews, installable PWA capabilities, and interactive elements that let every guest feel the magic of the celebration.",
features: [
  "Dynamic 4-state live timer (Countdown to Count-up) anchored to the Muhurth on 12 March 2026",
  "Triggered digital fireworks and celebration sparks tied exactly to the wedding time",
  "Progressive Web App (PWA) support for native home screen installation on mobile",
  "Fully optimized SEO & Open Graph data for rich, beautiful WhatsApp and social media previews",
  "Smooth GSAP scroll animations and interactive lightbox photo galleries"
],
  },
];
