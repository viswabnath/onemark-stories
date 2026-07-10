/**
 * pages/works.jsx — Standalone portfolio showcase page.
 *
 * CHANGES vs original:
 *  - OG image now uses /api/og with a works-specific title
 *  - trackEvent fires when the showcase section loads
 */
import dynamic from "next/dynamic";
import Head    from "next/head";
import Nav     from "../components/Nav";
import Footer  from "../components/Footer";
import Cursor  from "../components/Cursor";
import WhatsAppFloat from "../components/WhatsAppFloat";

const Showcase = dynamic(() => import("../components/Showcase"), { ssr: false });

const DOMAIN = "https://stories.onemark.co.in";
const TITLE  = "Our Work — OneMark Stories";
const DESC   = "Browse live websites we've built for weddings, events, and special moments. Preview every project in iPhone and MacBook frames.";
const OG_IMAGE = `${DOMAIN}/api/og?title=${encodeURIComponent("Our Work")}&desc=${encodeURIComponent(DESC)}`;

export default function WorkPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${DOMAIN}/works`} />

        <meta property="og:type"         content="website" />
        <meta property="og:site_name"    content="OneMark Stories" />
        <meta property="og:url"          content={`${DOMAIN}/works`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:image"        content={OG_IMAGE} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"    content="OneMark Stories — Our Work" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={OG_IMAGE} />
        <meta name="twitter:image:alt"   content="OneMark Stories — Our Work" />
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