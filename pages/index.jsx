/**
 * pages/index.jsx — Scroll-driven storytelling landing page.
 */
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Cursor from "../components/Cursor";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import StoryReveal from "../components/StoryReveal";
import ClosingCTA from "../components/ClosingCTA";

const Hero = dynamic(() => import("../components/Hero"), { ssr: true });
const Showcase = dynamic(() => import("../components/Showcase"), { ssr: false });

const DOMAIN = "https://stories.onemark.co.in";
const TITLE  = "OneMark Stories — Moments Told By OneMark";
const DESC   = "Custom wedding websites & digital invitations starting at \u20B92,999. Live countdowns, photo galleries, RSVP — share one beautiful link with all your guests. Built in India, loved worldwide.";

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
        "telephone": "+919392704742",
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
              "@type": "Offer",
              "name": "Bloom",
              "description": "Full wedding website with gallery, RSVP, and cinematic animations.",
              "price": "5999",
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
        "description": DESC,
        "publisher": { "@id": `${DOMAIN}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${DOMAIN}/works`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is OneMark Stories different from Wix or a DIY template?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We don't use drag-and-drop builders. As a premium digital agency, we custom-code your story with high-end animations like 3D effects and fluid scrolling that DIY platforms simply can't do.",
            },
          },
          {
            "@type": "Question",
            "name": "How much does a wedding website cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our packages start at ₹2,999. The Spark plan covers a beautiful digital invitation with countdown and event info. Bloom (₹5,999) adds galleries and RSVP. Legacy (₹9,999) is a fully bespoke cinematic experience with custom domain.",
            },
          },
          {
            "@type": "Question",
            "name": "How long does it take to build a wedding website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard projects take 3–5 days from your first WhatsApp message to your live link. We share previews along the way for your feedback.",
            },
          },
          {
            "@type": "Question",
            "name": "How long does the wedding website stay online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Forever. Long after the celebration, your OneMark Story remains live online as a permanent digital keepsake you can revisit anytime.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I make changes after my wedding website is published?",
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
        <meta name="keywords"            content="wedding website India, custom wedding website, digital wedding invitation, wedding countdown website, online wedding card, wedding website price, digital invitation India, event website, wedding site Hyderabad, wedding site Bangalore, wedding website NRI, OneMark Stories" />
        <meta name="author"              content="OneMark Digital, Kakinada" />
        <meta name="robots"              content="index, follow, max-image-preview:large" />
        <meta name="viewport"            content="width=device-width, initial-scale=1" />
        <link rel="canonical"            href={DOMAIN} />
        <meta name="geo.region"          content="IN-AP" />
        <meta name="geo.placename"       content="Kakinada" />
        <meta property="og:type"         content="website" />
        <meta property="og:url"          content={DOMAIN} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:image"        content={`${DOMAIN}/onemark-logo.png`} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name"    content="OneMark Stories" />
        <meta property="og:locale"       content="en_IN" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={`${DOMAIN}/onemark-logo.png`} />
        <link rel="icon"             href="/favicon.ico" sizes="any" />
        <link rel="icon"             href="/logo-om.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo-om.png" sizes="180x180" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <StoryReveal />
        <Showcase />
        <Testimonials />
        <About />
        <Pricing />
        <ClosingCTA />
        <Footer />
      </main>

      <WhatsAppFloat />
    </>
  );
}
