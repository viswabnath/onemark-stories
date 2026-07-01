# Digital Album assets

Each album lives in its own folder here:

```
public/albums/<slug>/
  cover-front.<ext>   # front cover (hard page)
  cover-back.<ext>    # back cover (hard page)
  p01.<ext>           # inner sheets, in reading order
  p02.<ext>
  ...
```

`<slug>` is auto-derived from the album `title` in `data/albums.js`
(e.g. `"Arun × Spandana"` → `arun-spandana`).

## Sizes

We craft landscape wedding albums, quoted by their **open** size
(height × width, inches): **12×36, 14×40, 15×24, 16×24, 17×28**.

Each printed **sheet** is one page = half the open width. So a 12×36 album has
18×12 sheets (aspect 1.5). Set `size` on the album in `data/albums.js` to a
preset (`"12x36"`, `"14x40"`, …) or explicit `{ h, w }` open inches — see
`lib/albumSize.js`. The images you drop in should match the single-sheet aspect.

## Adding a real album

1. Create the folder `public/albums/<slug>/`.
2. Drop the photographer's exported sheets in reading order, one landscape
   sheet per file. Pre-optimize to web sizes (`.webp`/`.jpg`, long edge
   ~1800px). They're served statically with long-lived cache headers.
3. Add an entry to `ALBUMS` in `data/albums.js` with the right `size` and the
   `coverFront`, `coverBack`, and `pages[]` paths.

The `arun-spandana/*.svg` files are throwaway placeholders — replace them with
real photos and update the file extensions in `data/albums.js`.
