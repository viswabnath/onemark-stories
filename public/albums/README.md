# Digital Album assets

Each album lives in its own folder here:

```
public/albums/<slug>/
  cover-front.webp   # front cover — a single page (hard)
  cover-back.webp    # back cover  — a single page (hard)
  p01.webp           # inner spreads, in reading order
  p02.webp
  ...
```

`<slug>` is auto-derived from the album `title` in `data/albums.js` via
`lib/slug.js` (e.g. `"Geetha Sree"` → `geetha-sree`).

## Image geometry (important)

The viewer (`components/Flipbook`) treats the two kinds of image differently:

- **`pages[]` images are full double-page spreads** — the whole open book. The
  viewer splits each one into a left and right half. So a spread's aspect =
  `openWidth / openHeight` (e.g. a 12×36 album → **3.0**; Srinu `p01` is
  3000×1000).
- **Covers are single pages** — aspect = `openWidth / 2 / openHeight` (e.g. a
  12×36 album → **1.5**; Srinu `cover-front` is 3000×2000).

`.flipbook__img` uses `object-fit: fill`, so **every image must already be at
the exact aspect** or it distorts. Pre-optimize to WebP, long edge ~3000px,
quality ~80 (a few hundred KB each). They're served statically with long-lived
cache headers.

If a photographer only delivered a **wraparound** cover (back-left | front-right
in one file), split it into `cover-back` (left half) and `cover-front` (right
half). If the cover art is landscape but the album's page is portrait, letterbox
it onto a portrait canvas rather than squashing it.

## Sizes

Landscape albums are quoted by their **open** size (height × width, inches):
**12×36, 14×40, 15×24, 16×24, 17×28**. Set `size` on the album in
`data/albums.js` to a preset (`"12x36"`, `"15x24"`, …) or explicit
`{ h, w }` open inches — see `lib/albumSize.js`.

## Optional per-album music

Albums play a soft background track while open. Set `music` on the album to give
it its own tune — drop the file in `public/audio/` and reference it, e.g.
`music: "/audio/birthday.mp3"`. If omitted it falls back to the shared default
(`public/audio/bg-music.mp3`).

## Adding a real album

1. Create the folder `public/albums/<slug>/`.
2. Add the optimized spreads (`p01…pNN.webp`) in reading order, plus
   `cover-front.webp` / `cover-back.webp`, matching the aspects above.
3. Add an entry to `ALBUMS` in `data/albums.js` with the right `size`, `color`,
   optional `music`, and the `coverFront` / `coverBack` / `pages[]` paths.

The route `/albums/<slug>`, the `/albums` gallery card, the sitemap entry, and
the OG card are all generated automatically from that entry.
