/**
 * pages/works/[slug].jsx — Individual project case-study pages.
 *
 * Routes: /works/vijay-rashmika, /works/ganesh-srija, etc.
 * Slugs are auto-derived from project titles in data/projects.js.
 *
 * Each page gets:
 *  - Its own <title> and <meta description>
 *  - A dynamic OG image card via /api/og?...
 *  - Full project details (about, importance, features)
 *  - A CTA to enquire via WhatsApp
 *  - A link back to all works
 *
 * Adding a new project to data/projects.js automatically creates its page.
 */
import Head   from "next/head";
import Link   from "next/link";
import Nav    from "../../components/Nav";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { PROJECTS } from "../../data/projects";

const DOMAIN = "https://stories.onemark.co.in";

/** Convert "Vijay × Rashmika" → "vijay-rashmika" */
function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[×x]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getStaticPaths() {
  const paths = PROJECTS.map((p) => ({
    params: { slug: toSlug(p.title) },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = PROJECTS.find((p) => toSlug(p.title) === params.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
}

const WA_NUMBER = "918331978532";

export default function ProjectPage({ project }) {
  const waText = encodeURIComponent(
    `Hi OneMark Stories! I saw the ${project.title} project and I'd love something similar. Can we talk?`
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  const ogImage = `${DOMAIN}/api/og?title=${encodeURIComponent(project.title)}&tag=${encodeURIComponent(project.tag)}&desc=${encodeURIComponent(project.about)}&num=${encodeURIComponent(project.num)}&accent=${encodeURIComponent(project.color)}`;
  const ogAlt = `${project.title} — ${project.tag} · OneMark Stories`;

  return (
    <>
      <Head>
        <title>{`${project.title} — OneMark Stories`}</title>
        <meta name="description" content={project.about} />
        <meta name="robots"      content="index, follow" />
        <link rel="canonical"    href={`${DOMAIN}/works/${toSlug(project.title)}`} />

        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="OneMark Stories" />
        <meta property="og:url"         content={`${DOMAIN}/works/${toSlug(project.title)}`} />
        <meta property="og:title"       content={`${project.title} — OneMark Stories`} />
        <meta property="og:description" content={project.about} />
        <meta property="og:image"       content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height"content="630" />
        <meta property="og:image:alt"   content={ogAlt} />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`${project.title} — OneMark Stories`} />
        <meta name="twitter:description" content={project.about} />
        <meta name="twitter:image"       content={ogImage} />
        <meta name="twitter:image:alt"   content={ogAlt} />
        <meta name="viewport"            content="width=device-width, initial-scale=1" />
      </Head>

      <Cursor />
      <Nav />

      <main style={{ paddingTop: "6rem", minHeight: "100vh" }}>
        <article className="project-page">
          <div className="project-page__inner">

            {/* Back link */}
            <Link href="/works" className="project-page__back" data-hover>
              ← All works
            </Link>

            {/* Header */}
            <header className="project-page__header">
              <div className="project-page__meta">
                <span className="project-card__tag" style={{ color: project.color, fontSize: "12px", letterSpacing: "0.15em" }}>
                  {project.tag}
                </span>
                <span className="project-card__num">{project.num}</span>
              </div>
              <h1 className="project-page__title">{project.title}</h1>
              <p className="project-page__tagline">{project.desc}</p>
            </header>

            {/* About */}
            <section className="project-page__section">
              <h2 className="project-page__section-title">About this project</h2>
              <p className="project-page__body">{project.about}</p>
            </section>

            {/* Why it matters */}
            <section className="project-page__section project-page__section--accent" style={{ borderLeftColor: project.color }}>
              <div className="project-card-importance__label" style={{ color: project.color }}>Why it matters</div>
              <p className="project-page__body">{project.importance}</p>
            </section>

            {/* Features */}
            <section className="project-page__section">
              <h2 className="project-page__section-title">What&rsquo;s included</h2>
              <ul className="project-page__features">
                {project.features.map((f) => (
                  <li key={f} className="feature-pill" style={{ fontSize: "13px" }}>
                    ✦ {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* CTAs */}
            <div className="project-page__ctas">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mag-btn"
                data-hover
                onClick={() => window.trackEvent?.("project_live_site_click", { title: project.title })}
              >
                Open live site ↗
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                data-hover
                onClick={() => window.trackEvent?.("project_wa_enquiry", { title: project.title })}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                I want something like this
              </a>
            </div>

          </div>
        </article>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}