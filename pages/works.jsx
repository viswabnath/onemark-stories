/**
 * pages/works.jsx — Standalone portfolio showcase page.
 * Full-screen interactive preview of all live projects in iPhone / MacBook frames.
 */
import dynamic from "next/dynamic";
import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import WhatsAppFloat from "../components/WhatsAppFloat";

const Showcase = dynamic(() => import("../components/Showcase"), { ssr: false });

const DOMAIN = "https://stories.onemark.co.in";
const TITLE  = "Our Work — OneMark Stories";
const DESC   = "Browse live websites we've built for weddings, events, and special moments. Preview every project in iPhone and MacBook frames.";

export default function WorkPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${DOMAIN}/works`} />
        <meta property="og:type"         content="website" />
        <meta property="og:url"          content={`${DOMAIN}/works`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:image"        content={`${DOMAIN}/onemark-logo.png`} />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={`${DOMAIN}/onemark-logo.png`} />
        <meta name="viewport"            content="width=device-width, initial-scale=1" />
      </Head>

      <Cursor />
      <Nav />

      <main style={{ paddingTop: "5rem" }}>
        <Showcase />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
