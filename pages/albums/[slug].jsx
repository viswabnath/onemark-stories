/**
 * pages/albums/[slug].jsx — immersive digital-album flipbook viewer.
 *
 * Routes: /albums/bride-groom, etc. Slugs auto-derived from album titles.
 * The flipbook is loaded client-side only (react-pageflip needs the DOM).
 *
 * Adding an album to data/albums.js automatically creates its page.
 */
import Head    from "next/head";
import dynamic from "next/dynamic";
import Cursor  from "../../components/Cursor";
import { ALBUMS } from "../../data/albums";
import { toSlug } from "../../lib/slug";

const Flipbook = dynamic(() => import("../../components/Flipbook"), { ssr: false });

const DOMAIN = "https://stories.onemark.co.in";

export async function getStaticPaths() {
  const paths = ALBUMS.map((a) => ({ params: { slug: toSlug(a.title) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const album = ALBUMS.find((a) => toSlug(a.title) === params.slug);
  if (!album) return { notFound: true };
  return { props: { album } };
}

export default function AlbumPage({ album }) {
  const slug = toSlug(album.title);
  const url  = `${DOMAIN}/albums/${slug}`;
  const ogImage = `${DOMAIN}/api/og?title=${encodeURIComponent(album.title)}&tag=${encodeURIComponent(album.tag)}&desc=${encodeURIComponent(album.about)}&num=${encodeURIComponent(album.num)}&accent=${encodeURIComponent(album.color)}`;
  const ogAlt = `${album.title} — ${album.tag} · OneMark Stories`;

  return (
    <>
      <Head>
        <title>{`${album.title} — Digital Album · OneMark Stories`}</title>
        <meta name="description" content={album.about} />
        <meta name="robots"      content="index, follow" />
        <link rel="canonical"    href={url} />

        <meta property="og:type"         content="website" />
        <meta property="og:site_name"    content="OneMark Stories" />
        <meta property="og:url"          content={url} />
        <meta property="og:title"        content={`${album.title} — Digital Album`} />
        <meta property="og:description"  content={album.about} />
        <meta property="og:image"        content={ogImage} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"    content={ogAlt} />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`${album.title} — Digital Album`} />
        <meta name="twitter:description" content={album.about} />
        <meta name="twitter:image"       content={ogImage} />
        <meta name="twitter:image:alt"   content={ogAlt} />
        <meta name="viewport"            content="width=device-width, initial-scale=1" />
      </Head>

      <Cursor />
      <main className="album-viewer">
        <Flipbook album={album} />
      </main>
    </>
  );
}
