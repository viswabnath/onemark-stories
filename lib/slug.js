/**
 * lib/slug.js — shared slug helper.
 *
 * Converts a human title into a URL-safe slug. Used by both the works
 * pages and the album pages so the derivation stays consistent.
 *
 *   toSlug("Vijay × Rashmika") → "vijay-rashmika"
 */
export function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[×x]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
