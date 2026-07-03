/**
 * pages/sitemap.xml.js — dynamic sitemap.
 *
 * Generated from PROJECTS + ALBUMS so it never goes stale. Served at
 * /sitemap.xml. (The old static public/sitemap.xml was removed so this
 * route isn't shadowed.)
 */
import { PROJECTS } from "../data/projects";
import { ALBUMS } from "../data/albums";
import { toSlug } from "../lib/slug";

const DOMAIN = "https://stories.onemark.co.in";

function url(loc, { priority = "0.7", changefreq = "monthly", lastmod }) {
  return `  <url>
    <loc>${DOMAIN}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSiteMap() {
  const today = new Date().toISOString().slice(0, 10);

  const staticPages = [
    url("/", { priority: "1.0", changefreq: "weekly", lastmod: today }),
    url("/works", { priority: "0.8", changefreq: "weekly", lastmod: today }),
    url("/albums", { priority: "0.9", changefreq: "weekly", lastmod: today }),
  ];

  const projectPages = PROJECTS.map((p) =>
    url(`/works/${toSlug(p.title)}`, { priority: "0.6" })
  );

  const albumPages = ALBUMS.map((a) =>
    url(`/albums/${toSlug(a.title)}`, { priority: "0.7" })
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...projectPages, ...albumPages].join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(generateSiteMap());
  res.end();
  return { props: {} };
}

export default function SiteMap() {
  return null;
}
