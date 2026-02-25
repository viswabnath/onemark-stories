/**
 * pages/index.jsx — Perf optimised: lazy canvas, no full block on loader
 */
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Cursor   from "../components/Cursor";
import Loader   from "../components/Loader";
import Nav      from "../components/Nav";
import About    from "../components/About";
import Footer   from "../components/Footer";

// Lazy load heavy components
const Hero     = dynamic(() => import("../components/Hero"),     { ssr: false });
const Showcase = dynamic(() => import("../components/Showcase"), { ssr: false });

const DOMAIN = "https://stories.onemark.co.in";
const TITLE  = "OneMark Stories — Moments Told By OneMark";
const DESC   = "We craft bespoke digital experiences for weddings, events, and special occasions. Custom wedding sites, live countdown pages, event timelines — built in Kakinada, India.";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${DOMAIN}/#organization`, "name": "OneMark Stories", "url": DOMAIN,
        "logo": `${DOMAIN}/logo-om.png`, "description": DESC,
        "address": { "@type": "PostalAddress", "addressLocality": "Kakinada", "addressRegion": "Andhra Pradesh", "addressCountry": "IN" },
        "sameAs": ["https://www.instagram.com/stories.onemark","https://onemark.digital","https://onemark.digital"] },
      { "@type": "WebSite", "@id": `${DOMAIN}/#website`, "url": DOMAIN, "name": "OneMark Stories", "description": DESC,
        "publisher": { "@id": `${DOMAIN}/#organization` } },
    ],
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content="wedding website, wedding countdown, event website, digital invitation, Kakinada, OneMark, stories onemark" />
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
        {/* Favicon — proper sizes */}
        <link rel="icon"             href="/favicon.ico" sizes="any" />
        <link rel="icon"             href="/logo-om.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo-om.png" sizes="180x180" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <Loader onDone={() => setLoaded(true)} />
      <Cursor />

      {/* Show nav immediately — don't block on loader */}
      <Nav />

      {loaded && (
        <main>
          <Hero />
          <Showcase />
          <About />
          <Footer />
        </main>
      )}
    </>
  );
}
