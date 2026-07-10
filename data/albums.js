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
 *   Drop optimized WebP into public/albums/<slug>/ and reference them as
 *   absolute /public paths. Each `pages[]` entry is a FULL double-page spread
 *   (the viewer splits it into left/right halves); `coverFront`/`coverBack` are
 *   single pages. Every image must already be at the exact aspect (object-fit
 *   is `fill`). See public/albums/README.md for the geometry rules.
 *
 * Background music (optional, per album):
 *   Every album plays a soft background track while open. Set `music` to give
 *   an album its own tune — drop the file in public/audio/ and reference it,
 *   e.g. music: "/audio/geetha.mp3". If omitted it falls back to the shared
 *   default track (public/audio/bg-music.mp3).
 */
export const ALBUMS = [
  {
    id: 0,
    num: "01",
    title: "Srinu × Sai",
    tag: "Wedding Album",
    desc: "A 12×36 panoramic wedding album",
    color: "#D4758C",
    date: "March 2026",
    size: "12x36", // landscape flagship
    about:
      "A hand-designed 12×36 landscape wedding album, reimagined as a living book — turn each spread the way you would the printed keepsake, then share the whole story with one link.",
    coverFront: "/albums/srinu-sai/cover-front.webp",
    coverBack: "/albums/srinu-sai/cover-back.webp",
    pages: [
      "/albums/srinu-sai/p01.webp",
      "/albums/srinu-sai/p02.webp",
      "/albums/srinu-sai/p03.webp",
      "/albums/srinu-sai/p04.webp",
      "/albums/srinu-sai/p05.webp",
      "/albums/srinu-sai/p06.webp",
      "/albums/srinu-sai/p07.webp",
      "/albums/srinu-sai/p08.webp",
      "/albums/srinu-sai/p09.webp",
      "/albums/srinu-sai/p10.webp",
    ],
  },
  {
    id: 1,
    num: "02",
    title: "Geetha Sree",
    tag: "Turning One",
    desc: "A 15×24 first-birthday album",
    color: "#E0992B",
    date: "January 2018",
    size: "15x24", // portrait-page birthday album
    music: "/audio/birthday.mp3",
    about:
      "Geetha Sree's first birthday — the toys, the cake, the giggles — rebuilt spread by spread into a living book you turn and share the way you would the printed album.",
    coverFront: "/albums/geetha-sree/cover-front.webp",
    coverBack: "/albums/geetha-sree/cover-back.webp",
    pages: [
      "/albums/geetha-sree/p01.webp",
      "/albums/geetha-sree/p02.webp",
      "/albums/geetha-sree/p03.webp",
      "/albums/geetha-sree/p04.webp",
      "/albums/geetha-sree/p05.webp",
      "/albums/geetha-sree/p06.webp",
      "/albums/geetha-sree/p07.webp",
      "/albums/geetha-sree/p08.webp",
      "/albums/geetha-sree/p09.webp",
      "/albums/geetha-sree/p10.webp",
      "/albums/geetha-sree/p11.webp",
      "/albums/geetha-sree/p12.webp",
    ],
  },
  {
    id: 2,
    num: "03",
    title: "Roshini",
    tag: "Half-Saree Album",
    desc: "A 12×30 half-saree album",
    color: "#C0397A",
    date: "March 2018",
    size: { h: 12, w: 30 }, // custom 2.5 open ratio
    music: "/audio/halfsaree.mp3",
    about:
      "Roshini's half-saree ceremony, page by page — a landscape album reimagined as a living book you flip with a tap and share with one link.",
    coverFront: "/albums/roshini/cover-front.webp",
    coverBack: "/albums/roshini/cover-back.webp",
    pages: [
      "/albums/roshini/p01.webp",
      "/albums/roshini/p02.webp",
      "/albums/roshini/p03.webp",
      "/albums/roshini/p04.webp",
      "/albums/roshini/p05.webp",
      "/albums/roshini/p06.webp",
      "/albums/roshini/p07.webp",
      "/albums/roshini/p08.webp",
      "/albums/roshini/p09.webp",
      "/albums/roshini/p10.webp",
      "/albums/roshini/p11.webp",
      "/albums/roshini/p12.webp",
    ],
  },
];
