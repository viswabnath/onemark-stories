/**
 * components/Cursor.jsx
 *
 * Custom magnetic cursor.
 *
 * How it works:
 * ─────────────
 * • Two elements: a small `dot` (updates instantly) + a `ring` (lerps behind).
 * • Lerp = "linear interpolate" — the ring moves toward the dot a little each
 *   animation frame, creating that smooth trailing effect.
 * • We use `useEffect` to attach mouse + RAF events, and `useRef` to avoid
 *   React re-renders on every mouse move (would cause jank at 60fps).
 *
 * Body class states (applied by JS, styled in globals.css):
 * ─────────────────
 *   body.cursor-hovered   → ring expands, dot turns coral
 *   body.cursor-clicking  → dot shrinks
 *
 * Which elements trigger hover state?
 * ─────────────────────────────────────
 * Any element with [data-hover] attribute, or <a> / <button> tags.
 * Add data-hover to any custom element you want to trigger the hover effect.
 */

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  // These refs hold current positions without triggering re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos  = useRef({ x: 0, y: 0 });
  const rafId    = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── 1. Track mouse, update dot instantly ──────────────────────────────────
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Dot moves at full speed — no lag
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
    };

    // ── 2. Track click state ──────────────────────────────────────────────────
    const onMouseDown = () => document.body.classList.add("cursor-clicking");
    const onMouseUp   = () => document.body.classList.remove("cursor-clicking");

    // ── 3. RAF loop — lerp the ring toward the mouse ──────────────────────────
    const LERP_FACTOR = 0.12; // lower = more lag (0.05 = very slow, 0.3 = snappy)

    const lerpRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP_FACTOR;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP_FACTOR;

      ring.style.left = ringPos.current.x + "px";
      ring.style.top  = ringPos.current.y + "px";

      rafId.current = requestAnimationFrame(lerpRing);
    };
    rafId.current = requestAnimationFrame(lerpRing);

    // ── 4. Hover state — watch for hover-able elements ────────────────────────
    const addHoverListeners = (el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hovered"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hovered"));
    };

    // Apply to existing elements
    const hoverTargets = document.querySelectorAll("a, button, [data-hover]");
    hoverTargets.forEach(addHoverListeners);

    // Watch for new elements added to the DOM (e.g., after loading)
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-hover]").forEach(addHoverListeners);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Attach global listeners
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup",   onMouseUp);

    // ── Cleanup on unmount ────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup",   onMouseUp);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Instant dot — styled in globals.css as .cursor-dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />

      {/* Lerped trailing ring — styled in globals.css as .cursor-ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
      />
    </>
  );
}
