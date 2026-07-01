/**
 * lib/albumSize.js — album size → on-screen geometry.
 *
 * OneMark crafts premium landscape wedding albums. Sizes are quoted as the
 * OPEN album (height × total width, in inches) — e.g. "12x36" is 12″ tall and
 * 36″ wide when open. Each printed sheet is therefore half the open width, so a
 * single page aspect = (width / 2) / height.
 *
 * An album declares either a preset name (see SIZE_PRESETS) or explicit
 * { h, w } inches of the OPEN album. Only the aspect ratio matters for
 * rendering; the numbers also drive the size label.
 */
export const DEFAULT_SIZE = { h: 12, w: 36 }; // 12 × 36 — landscape flagship

/** The album sizes we craft (open dimensions, height × width in inches). */
export const SIZE_PRESETS = {
  "12x36": { h: 12, w: 36 },
  "14x40": { h: 14, w: 40 },
  "15x24": { h: 15, w: 24 },
  "16x24": { h: 16, w: 24 },
  "17x28": { h: 17, w: 28 },
};

/** Pretty list for "sizes we craft" copy. */
export const OFFERED_SIZES = ["12×36", "14×40", "15×24", "16×24", "17×28"];

/**
 * Resolve an album's size to { h, w, aspect }.
 * aspect = single-page aspect ratio = (open width / 2) / height.
 */
export function albumSize(album) {
  let s = album?.size;
  if (typeof s === "string") s = SIZE_PRESETS[s];
  if (!s || !s.w || !s.h) s = DEFAULT_SIZE;
  return { h: s.h, w: s.w, aspect: s.w / 2 / s.h };
}

/** Display label of the open album, e.g. "12 × 36″". */
export function sizeLabel(album) {
  const { h, w } = albumSize(album);
  return `${h} × ${w}″`;
}
