/**
 * components/ClosingCTA.jsx — Emotional full-viewport closing CTA.
 *
 * UPDATED: LeadForm is now embedded below the headline so visitors
 * can submit their details without leaving the page.
 * The bare WhatsApp button is kept as a secondary fallback link.
 */
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LeadForm from "./LeadForm";

gsap.registerPlugin(ScrollTrigger);

const WA_LINK = `https://wa.me/919392704742?text=${encodeURIComponent("Hi OneMark Stories! 👋 I'm ready to start my story. Can we discuss?")}`;

export default function ClosingCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-cta__content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="story-cta" ref={ref}>
      <div className="blob story-cta__blob-1" />
      <div className="blob story-cta__blob-2" />

      <div className="story-cta__content" style={{ maxWidth: "680px", width: "100%" }}>
        <span className="sec-label">Start Today</span>

        <h2 className="story-cta__headline">
          Your story starts<br />
          with a <span>message.</span>
        </h2>

        <p className="story-cta__sub" style={{ marginBottom: "2.5rem" }}>
          Tell us about your event and we&rsquo;ll get back to you within hours.
        </p>

        {/* ── Embedded lead-capture form ───────────────────────── */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "1.5rem",
          textAlign: "left",
        }}>
          <LeadForm />
        </div>

        {/* Fallback — prefer WhatsApp directly */}
        <p className="story-cta__note">
          Or just{" "}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cyan)", textDecoration: "underline" }}
            onClick={() => window.trackEvent?.("closing_wa_direct_click")}
          >
            message us on WhatsApp
          </a>{" "}
          directly. · Ready in 3 days · Lives forever · One-time cost
        </p>
      </div>
    </section>
  );
}