/**
 * components/Footer.jsx — Mobile-centered, no section nav on mobile
 */
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MAIN_SOCIALS } from "../data/socials";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WA_NUMBER = "919392704742";
const WA_MSG    = encodeURIComponent("Hi OneMark Stories! 👋 I'd like to start a project. Here's what I have in mind:");
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const IG_ACCOUNTS = [
  { handle: "@stories.onemark", sub: "Behind the build", emoji: "📸", href: "https://www.instagram.com/stories.onemark" },
  { handle: "@onemark.digi",    sub: "Main Studio",      emoji: "🌐", href: "https://www.instagram.com/onemark.digi" },
];

function SocialPill({ label, href, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={label}
      className="social-pill" data-hover>{icon}</a>
  );
}

export default function Footer() {
  const { theme }  = useTheme();
  const ctaRef     = useRef(null);
  const gridRef    = useRef(null);
  const logoSrc    = theme === "light" ? "/stories-logo-blue-resized.png" : "/stories-logo-white-resized.png";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA banner entrance
      gsap.fromTo(".footer__cta",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".footer__cta", start: "top 88%" } }
      );
      // Grid columns stagger
      gsap.fromTo(".footer__col",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".footer__grid", start: "top 88%" } }
      );
      // Social pills pop-in
      gsap.fromTo(".social-pill",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".footer__bottom", start: "top 92%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer">
      <div className="footer__watermark" aria-hidden="true">stories</div>
      <div className="blob footer__blob" />

      <div className="footer__inner">

        {/* ── CTA Banner */}
        <div className="footer__cta" ref={ctaRef}>
          <div className="footer__cta-shimmer" aria-hidden="true" />
          <div className="sec-label footer__cta-label">Ready to Begin?</div>
          <h3 className="footer__cta-heading">
            Let's make your moment<br />
            <span>unforgettable.</span>
          </h3>
          <p className="footer__cta-body">
            Send us a WhatsApp — tell us the date, the occasion, and what you're imagining.
            We'll have a preview ready in days.
          </p>
          <div className="footer__cta-actions">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" data-hover>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start a Project
            </a>
            <a href="https://www.instagram.com/stories.onemark" target="_blank" rel="noopener noreferrer"
              className="mag-btn" data-hover>
              @stories.onemark ↗
            </a>
          </div>
        </div>

        {/* ── Desktop 3-col / Mobile stacked */}
        <div className="footer__grid" ref={gridRef}>

          {/* Col 1 — Brand */}
          <div className="footer__col footer__col--brand">
            <div className="footer__logo-wrap">
              <Image src={logoSrc} alt="OneMark Stories" width={160} height={56}
                style={{ objectFit: "contain", objectPosition: "left" }} />
            </div>
            <p className="footer__brand-desc">
              We craft bespoke digital experiences for weddings, events, and life's most special moments —
              built with love, delivered in days.
            </p>
            <div className="footer__address">
              <span className="footer__address-emoji">📍</span>
              <div>
                <div className="footer__address-sublabel">Based in</div>
                <div className="footer__address-city">Kakinada, Andhra Pradesh</div>
                <div className="footer__address-country">India 🇮🇳</div>
              </div>
            </div>
          </div>

          {/* Col 2 — Desktop-only nav links */}
          <div className="footer__col footer__col--nav footer__col--desktop-only">
            <div className="footer__nav-heading">Navigate</div>
            <div className="footer__nav-links">
              {[
                { label: "Our Work",      href: "#work" },
                { label: "About",         href: "#about" },
                { label: "Studio",        href: "https://onemark.digital", ext: true },
              ].map(({ label, href, ext }) => (
                <a key={href} href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  className="footer__nav-link" data-hover>
                  {label}
                  {ext && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Instagram */}
          <div className="footer__col footer__col--social">
            <div className="footer__nav-heading">Follow Us</div>
            {IG_ACCOUNTS.map(({ handle, sub, emoji, href }) => (
              <a key={handle} href={href} target="_blank" rel="noopener noreferrer"
                className="footer__ig-card" data-hover>
                <div className="footer__ig-card-inner">
                  <div className="footer__ig-card-row">
                    <div className="footer__ig-avatar">{emoji}</div>
                    <div>
                      <div className="footer__ig-name">{handle}</div>
                      <div className="footer__ig-sub">{sub}</div>
                    </div>
                  </div>
                  <div className="footer__ig-cta">Follow →</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Divider */}
        <div className="footer__divider" />

        {/* ── Bottom bar */}
        <div className="footer__bottom">
          <div className="footer__socials">
            {MAIN_SOCIALS.map(s => <SocialPill key={s.href} {...s} />)}
          </div>
          <div className="footer__copyright">
            <div className="footer__copyright-main">
              © {new Date().getFullYear()} ·{" "}
              <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer" data-hover>
                onemark.digital
              </a>
            </div>
            <div className="footer__copyright-sub">stories.onemark.co.in · Kakinada, India</div>
          </div>
          <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
            className="mag-btn footer__studio-link" data-hover>
            onemark.digital ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
