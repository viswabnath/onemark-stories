/**
 * components/HeroErrorBoundary.jsx
 *
 * Wraps the Three.js Hero in a React error boundary.
 * On low-end Android or browsers without WebGL, R3F throws —
 * this catches it silently and renders a CSS-only fallback ornament
 * so the rest of the page is unaffected.
 *
 * Usage in pages/index.jsx:
 *   import HeroErrorBoundary from "../components/HeroErrorBoundary";
 *   // replace:  <Hero />
 *   // with:     <HeroErrorBoundary />
 */
import { Component } from "react";
import dynamic from "next/dynamic";

// Dynamically import Hero so SSR doesn't try to run Three.js server-side
const Hero = dynamic(() => import("./Hero"), { ssr: false });

function HeroFallback() {
  return (
    <section
      id="hero"
      className="hero"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* CSS-only ornament — same design as the SVG in Hero/index.jsx */}
      <svg
        className="hero__bg-ornament"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="210" cy="250" r="168" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="290" cy="250" r="168" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="210" cy="250" r="126" stroke="currentColor" strokeWidth="0.6" strokeDasharray="5 14" />
        <circle cx="290" cy="250" r="126" stroke="currentColor" strokeWidth="0.6" strokeDasharray="5 14" />
        <circle cx="250" cy="215" r="6" fill="currentColor" fillOpacity="0.6" />
        <circle cx="250" cy="285" r="6" fill="currentColor" fillOpacity="0.6" />
      </svg>

      <div className="blob hero__blob" />

      <div className="hero__content">
        <div className="hero__headline-wrap">
          <div className="hero__word-wrap">
            <span className="hero__word">Your</span>
          </div>
          <div className="hero__word-wrap">
            <span className="hero__word hero__word--outline">Story</span>
          </div>
          <div className="hero__word-wrap">
            <span className="hero__word">Deserves</span>
          </div>
          <div className="hero__word-wrap">
            <span className="hero__word hero__word--gradient">a Page.</span>
          </div>
        </div>

        <div className="hero__bottom-row">
          <p className="hero__sub">
            Planning an event? We build a beautiful custom website just for you —
            your guests open one link and feel the magic before the day even arrives.
          </p>
          <div className="hero__ctas">
            <a
              href="https://wa.me/919392704742?text=Hi%20OneMark%20Stories!%20👋"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              Start Your Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default class HeroErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log to analytics if available
    if (typeof window !== "undefined") {
      window.trackEvent?.("hero_webgl_error", {
        message: error?.message ?? "unknown",
      });
    }
    console.warn("[HeroErrorBoundary] WebGL/Three.js failed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <HeroFallback />;
    }
    return <Hero {...this.props} />;
  }
}