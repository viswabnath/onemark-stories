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
    id:    0,
    num:   "01",
    title: "Anil × Eswari",
    tag:   "Wedding",
    desc:  "Wedding Celebration Site",
    color: "#FF4D6D",
    url:   "https://anil-eswari.netlify.app/",

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
    id:    1,
    num:   "02",
    title: "Nazurul × Sajida",
    tag:   "Wedding",
    desc:  "Elegant Wedding Story",
    color: "#FF4D6D",
    url:   "https://nazurul-sajida.netlify.app/",

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
    id:    2,
    num:   "03",
    title: "Venkat × Nandini",
    tag:   "Wedding",
    desc:  "Interactive Wedding Keepsake",
    color: "#FF4D6D",
    url:   "https://venkat-nandini.netlify.app/",

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
    id:    3,
    num:   "04",
    title: "Valentine Week",
    tag:   "Valentine",
    desc:  "Live Countdown Experience",
    color: "#FFB547",
    url:   "https://mavi-valentine-week.vercel.app/",

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
    id:    4,
    num:   "05",
    title: "Viswanath",
    tag:   "Portfolio",
    desc:  "Personal Portfolio Showcase",
    color: "#00F5FF",
    url:   "https://viswabnath.github.io/portfolio/",

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
    id:    5,
    num:   "06",
    title: "Family Wall",
    tag:   "Community",
    desc:  "Community Memory Platform",
    color: "#00F5FF",
    url:   "https://familywall.in/",

    about:
      "A private digital space where families come together to share memories, milestones, and messages — a living wall that grows with every generation.",

    importance:
      "Photo albums fade. WhatsApp groups get chaotic. Family Wall is a dedicated, beautiful space where your family's most precious moments are preserved forever — accessible to everyone, owned by no one platform.",

    features: [
      "Shared family memory board",
      "Photo & milestone sharing",
      "Private, family-only access",
    ],
  },
];
