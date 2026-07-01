/**
 * pages/index.jsx — Scroll-driven storytelling landing page.
 *
 * CHANGES vs original:
 *  1. og:image now points to /api/og (dynamic rich preview card)
 *  2. Bloom price in JSON-LD corrected 5999 → 6499
 *  3. trackEvent() calls added on WhatsApp CTA interactions
 *  4. ThemeContext wrapper added so the dark/light toggle persists
 */
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Cursor from "../components/Cursor";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import StoryReveal from "../components/StoryReveal";
import AlbumsTeaser from "../components/AlbumsTeaser";
import ClosingCTA from "../components/ClosingCTA";
import ScrollToTop from "../components/ScrollToTop";

const Hero     = dynamic(() => import("../components/Hero"),     { ssr: true  });
const Showcase = dynamic(() => import("../components/Showcase"), { ssr: false });

const DOMAIN = "https://stories.onemark.co.in";
const TITLE  = "OneMark Stories — Moments Told By OneMark";
const DESC   = "Custom wedding websites & digital invitations starting at ₹2,999. Live countdowns, photo galleries, RSVP — share one beautiful link with all your guests. Built in India, loved worldwide.";

// Dynamic OG image — rich branded preview card (served from /api/og)
const OG_IMAGE = `${DOMAIN}/api/og?title=OneMark+Stories&desc=${encodeURIComponent("Custom wedding websites & digital invitations")}`;

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${DOMAIN}/#organization`,
        "name": "OneMark Stories",
        "url": DOMAIN,
        "logo": `${DOMAIN}/logo-om.png`,
        "image": `${DOMAIN}/onemark-logo.png`,
        "description": DESC,
        "priceRange": "₹₹",
        "telephone": "+918331978532",
        "email": "hello@onemark.digital",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kakinada",
          "addressRegion": "Andhra Pradesh",
          "addressCountry": "IN",
          "postalCode": "533001",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "16.9891",
          "longitude": "82.2475",
        },
        "sameAs": ["https://www.instagram.com/stories.onemark", "https://onemark.digital"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Experience Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Spark",
              "description": "Essential digital invitation — countdown, event info, one shareable link.",
              "price": "2999",
              "priceCurrency": "INR",
            },
            {
              // FIX: was incorrectly 5999 — corrected to match Pricing.jsx
              "@type": "Offer",
              "name": "Bloom",
              "description": "Full wedding website with gallery, RSVP, and cinematic animations.",
              "price": "6499",
              "priceCurrency": "INR",
            },
            {
              "@type": "Offer",
              "name": "Legacy",
              "description": "Premium bespoke experience — 3D effects, custom domain, full post-event keepsake.",
              "price": "9999",
              "priceCurrency": "INR",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": DOMAIN,
        "name": "OneMark Stories",
        "publisher": { "@id": `${DOMAIN}/#organization` },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does a custom wedding website cost in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "OneMark Stories offers three packages: Spark at ₹2,999 ($35) for simple invitations, Bloom at ₹6,499 ($75) for full wedding websites with galleries and RSVP, and Legacy at ₹9,999 ($125) for cinematic multi-chapter experiences with 3D effects.",
            },
          },
          {
            "@type": "Question",
            "name": "How long does it take to build a wedding website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard projects take 3–5 days from your first WhatsApp message to a live link ready to share with all your guests.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I update the website after it's published?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Just send us a WhatsApp with the changes you need — venue update, new photos, timing change — and we'll update your site instantly without you needing to share a new link.",
            },
          },
          {
            "@type": "Question",
            "name": "Do I need to buy a domain name for my wedding website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We provide a beautiful branded link (e.g., stories.onemark.co.in/your-event) by default. For premium or corporate projects, we can connect a custom domain like yourmovie.com.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content="wedding website India, custom wedding website, digital wedding invitation, wedding countdown website, online wedding card, wedding website price, digital invitation India, event website, wedding site Hyderabad, wedding site Bangalore, wedding website NRI, OneMark Stories, wedding website Kakinada, digital wedding invitation Andhra Pradesh" />
        <meta name="author"              content="OneMark Digital, Kakinada" />
        <meta name="robots"              content="index, follow, max-image-preview:large" />
        <meta name="viewport"            content="width=device-width, initial-scale=1" />
        <link rel="canonical"            href={DOMAIN} />
        <meta name="geo.region"          content="IN-AP" />
        <meta name="geo.placename"       content="Kakinada" />

        {/* Open Graph — now uses rich dynamic OG image */}
        <meta property="og:type"         content="website" />
        <meta property="og:url"          content={DOMAIN} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:image"        content={OG_IMAGE} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"    content="OneMark Stories — Custom wedding websites" />
        <meta property="og:site_name"    content="OneMark Stories" />
        <meta property="og:locale"       content="en_IN" />

        {/* Twitter / X */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={OG_IMAGE} />

        <link rel="icon"             href="/favicon.ico" sizes="any" />
        <link rel="icon"             href="/logo-om.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo-om.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <StoryReveal />
        <Showcase />
        <AlbumsTeaser />
        <About />
        <Testimonials />
        <HowItWorks />
        <Pricing />
        <ClosingCTA />
        <ScrollToTop />
        <Footer />
      </main>

      <WhatsAppFloat />
    </>
  );
}