/**
 * hooks/useMousePosition.js
 *
 * A reusable React hook that tracks the mouse position.
 *
 * Returns: { x, y } — normalized values:
 *   - x: -1 (left edge) to +1 (right edge)
 *   - y: -1 (top edge)  to +1 (bottom edge)
 *
 * This normalized form is perfect for Three.js camera parallax
 * and cursor effects — no need to divide by window size elsewhere.
 *
 * Usage:
 *   const { x, y } = useMousePosition();
 *   // x = 0.3 means mouse is 30% right of center
 */

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({
        // Normalize: 0 = center, -1 = left/top, +1 = right/bottom
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2, // flip Y so up = positive
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}

/**
 * useRawMousePosition
 *
 * Returns raw pixel coordinates { x, y }.
 * Used by the Cursor component which needs exact px position.
 */
export function useRawMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}
