/**
 * data/albums.js
 *
 * Single source of truth for the interactive Digital Albums.
 *
 * A Digital Album is one of our printed landscape wedding albums reimagined as
 * a flippable book you can share with one link. Adding an entry here creates:
 *   - a card on the /albums gallery
 *   - an immersive flipbook at /albums/<slug> (slug auto-derived from title)
 *
 * Sizes:
 *   We craft landscape albums in 12×36, 14×40, 15×24, 16×24 and 17×28 (open,
 *   height × width in inches). Set `size` per album — a preset name or explicit
 *   { h, w }. See lib/albumSize.js. On the landing page we showcase ONE
 *   landscape album so visitors get the feel; we don't list every size.
 *
 * Image handling (built from code for now; a self-serve portal comes later):
 *   Drop the exported sheets into  public/albums/<slug>/ and reference them as
 *   absolute /public paths. Each sheet is one landscape page (half the open
 *   width); shown two-up as an open-book spread on desktop, one page on mobile.
 *
 * The .svg files under public/albums/arun-spandana/ are placeholders — replace
 * them with the real designed sheets (see public/albums/README.md).
 */
export const ALBUMS = [
  {
    id: 0,
    num: "01",
    title: "Arun × Spandana",
    tag: "Wedding Album",
    desc: "A 12×36 panoramic wedding album",
    color: "#D4758C",
    date: "March 2026",
    size: "12x36", // landscape flagship
    about:
      "A hand-designed 12×36 landscape wedding album, reimagined as a living book — turn each spread the way you would the printed keepsake, then share the whole story with one link.",
    coverFront: "/albums/arun-spandana/cover-front.svg",
    coverBack: "/albums/arun-spandana/cover-back.svg",
    pages: [
      "/albums/arun-spandana/p01.svg",
      "/albums/arun-spandana/p02.svg",
      "/albums/arun-spandana/p03.svg",
      "/albums/arun-spandana/p04.svg",
      "/albums/arun-spandana/p05.svg",
      "/albums/arun-spandana/p06.svg",
      "/albums/arun-spandana/p07.svg",
      "/albums/arun-spandana/p08.svg",
    ],
  },
];
