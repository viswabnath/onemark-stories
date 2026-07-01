/**
 * pages/albums/index.jsx — Digital Albums landing + gallery.
 *
 * Explains the service (digitise the printed album of ANY function),
 * shows the live demo album, how it works, page-based plans, and a CTA.
 */
import Head from "next/head";
import Link from "next/link";
import Nav    from "../../components/Nav";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { ALBUMS } from "../../data/albums";
import { toSlug } from "../../lib/slug";
import { albumSize, sizeLabel, OFFERED_SIZES } from "../../lib/albumSize";

const DOMAIN = "https://stories.onemark.co.in";
const TITLE  = "Digital Albums — OneMark Stories";
const DESC   = "Turn any printed album — wedding, birthday, housewarming, any celebration — into a living book you flip with a tap and share with one link.";
const OG_IMAGE = `${DOMAIN}/api/og?title=${encodeURIComponent("Digital Albums")}&tag=${encodeURIComponent("Digital Album")}&desc=${encodeURIComponent(DESC)}`;

const WA = `https://wa.me/918331978532?text=${encodeURIComponent(
  "Hi OneMark Stories! 👋 I'd like to turn my album into a digital flipbook. Can we talk?"
)}`;

const OCCASIONS = [
  { emoji: "💍", label: "Weddings" },
  { emoji: "💐", label: "Engagements" },
  { emoji: "🎂", label: "Birthdays" },
  { emoji: "🏡", label: "Housewarming" },
  { emoji: "👶", label: "Naming Ceremony" },
  { emoji: "🍼", label: "Baby Shower" },
  { emoji: "❤️", label: "Anniversaries" },
  { emoji: "🎉", label: "Any Function" },
];

const STEPS = [
  { n: "01", title: "Send us your sheets", text: "Share the print-ready spreads your photographer or designer made — in any of our sizes." },
  { n: "02", title: "We digitise it", text: "We rebuild it as a realistic, tap-to-flip book — front & back covers, every page in order." },
  { n: "03", title: "Share one link", text: "You get a single link to send on WhatsApp. Family and friends flip through it from anywhere." },
];

/* Page allowances per plan — mirrors the tiers in the homepage Pricing section. */
const PLANS = [
  { name: "Spark",  pages: "Up to 15 pages", color: "#C9A96E" },
  { name: "Bloom",  pages: "Up to 30 pages", color: "#29ABE2" },
  { name: "Legacy", pages: "Up to 60 pages", color: "#D4758C" },
  { name: "Custom", pages: "More pages? We tailor it", color: "#B8A0B8" },
];

export default function AlbumsPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${DOMAIN}/albums`} />

        <meta property="og:type"         content="website" />
        <meta property="og:url"          content={`${DOMAIN}/albums`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:image"        content={OG_IMAGE} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={OG_IMAGE} />
        <meta name="viewport"            content="width=device-width, initial-scale=1" />
      </Head>

      <Cursor />
      <Nav />

      <main style={{ paddingTop: "7rem", minHeight: "100vh" }}>
        <section className="albums-index">
          <div className="albums-index__inner">

            {/* Intro */}
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span className="sec-label">Keepsakes</span>
              <h1 className="albums-index__heading">
                Digital <span>Albums</span>
              </h1>
              <p className="albums-index__sub">{DESC}</p>
              <p className="albums-index__sizes">Crafted in {OFFERED_SIZES.join(" · ")}</p>
            </div>

            {/* Occasions */}
            <div className="albums-block">
              <h2 className="albums-block__heading">For every celebration</h2>
              <p className="albums-block__sub">
                If it was worth printing, it&rsquo;s worth sharing. We digitise albums for any occasion.
              </p>
              <div className="albums-occasions">
                {OCCASIONS.map((o) => (
                  <div key={o.label} className="occasion-chip">
                    <span className="occasion-chip__emoji" aria-hidden="true">{o.emoji}</span>
                    <span className="occasion-chip__label">{o.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live demo */}
            <div className="albums-block">
              <h2 className="albums-block__heading">See it in action</h2>
              <p className="albums-block__sub">Open the demo and flip through it — tap the cover, or drag a corner.</p>
              <div className="albums-index__grid">
                {ALBUMS.map((album) => {
                  const { aspect } = albumSize(album);
                  return (
                    <Link
                      key={album.id}
                      href={`/albums/${toSlug(album.title)}`}
                      className="album-card"
                      data-hover
                      onClick={() => window.trackEvent?.("album_card_click", { title: album.title })}
                    >
                      <div className="album-card__cover" style={{ aspectRatio: String(aspect) }}>
                        <img src={album.coverFront} alt={`${album.title} — cover`} className="album-card__img" />
                        <span className="album-card__spine" style={{ background: album.color }} />
                      </div>
                      <div className="album-card__meta">
                        <span className="album-card__tag" style={{ color: album.color }}>{album.tag} · {sizeLabel(album)}</span>
                        <h3 className="album-card__title">{album.title}</h3>
                        <p className="album-card__desc">{album.desc}</p>
                        <span className="album-card__open">Open the book →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* How it works */}
            <div className="albums-block">
              <h2 className="albums-block__heading">How it works</h2>
              <div className="albums-how">
                {STEPS.map((s) => (
                  <div key={s.n} className="album-step">
                    <span className="album-step__num">{s.n}</span>
                    <h3 className="album-step__title">{s.title}</h3>
                    <p className="album-step__text">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Plans / pages */}
            <div className="albums-block">
              <h2 className="albums-block__heading">Pages &amp; pricing</h2>
              <p className="albums-block__sub">
                You choose how many pages to digitise — the more spreads, the richer the book. Each
                plan includes a page allowance, and we can always add more.
              </p>
              <div className="albums-plans">
                {PLANS.map((p) => (
                  <div key={p.name} className="plan-chip">
                    <span className="plan-chip__name" style={{ color: p.color }}>{p.name}</span>
                    <span className="plan-chip__pages">{p.pages}</span>
                  </div>
                ))}
              </div>
              <p className="albums-block__note">
                See full details in{" "}
                <Link href="/#pricing" style={{ color: "var(--cyan)" }} data-hover>pricing</Link>.
              </p>
            </div>

            {/* CTA */}
            <div className="albums-cta">
              <h2 className="albums-cta__heading">Have an album ready to bring to life?</h2>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                data-hover
                onClick={() => window.trackEvent?.("albums_page_wa_cta")}
              >
                Start on WhatsApp
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
