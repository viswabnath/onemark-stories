/**
 * components/ScrollToTop.jsx
 *
 * Floating scroll-to-top button.
 * Appears once the user has scrolled 400px down.
 * Sits above the WhatsApp float button (bottom: 96px).
 *
 * Add to pages/index.jsx:
 *   import ScrollToTop from "../components/ScrollToTop";
 *   // inside <main> or after </main>:
 *   <ScrollToTop />
 */
import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="scroll-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      data-hover
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}