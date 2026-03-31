/**
 * Hero — Editorial bottom-left layout. Cormorant Garamond display type.
 * Text is SSR'd for SEO. Decorative wedding-ring ornament in background.
 */
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const WA_NUMBER = "919392704742";
const WA_MSG = encodeURIComponent("Hi OneMark Stories! 👋 I'd love to get a custom digital experience made. Can we talk?");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export default function Hero() {
  const sectionRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (tlRef.current) tlRef.current.kill();
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll(".hero__word");
    const top = section.querySelector(".hero__top");
    const sub = section.querySelector(".hero__sub");
    const btns = section.querySelectorAll(".hero__ctas > *");
    const scroll = section.querySelector(".hero__scroll");

    gsap.set([top, sub, btns, scroll], { opacity: 0, y: 16 });
    gsap.set(words, { yPercent: 115 });

    const tl = gsap.timeline({ delay: 0.1 });
    tlRef.current = tl;

    tl
      .to(top, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(words, { yPercent: 0, stagger: 0.13, duration: 1.1, ease: "power4.out" }, "-=0.3")
      .to(sub, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .to(btns, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.4")
      .to(scroll, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>

      {/* Decorative wedding-ring ornament — elegant, on-brand, no Three.js */}
      <svg className="hero__bg-ornament" viewBox="0 0 500 500" fill="none" aria-hidden="true">
        <circle cx="210" cy="250" r="168" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="290" cy="250" r="168" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="210" cy="250" r="126" stroke="currentColor" strokeWidth="0.6" strokeDasharray="5 14" />
        <circle cx="290" cy="250" r="126" stroke="currentColor" strokeWidth="0.6" strokeDasharray="5 14" />
        <circle cx="250" cy="215" r="6" fill="currentColor" fillOpacity="0.6" />
        <circle cx="250" cy="285" r="6" fill="currentColor" fillOpacity="0.6" />
      </svg>

      <div className="blob hero__blob-tl" />
      <div className="blob hero__blob-br" />

      {/* Top bar — label left, index right */}
      <div className="hero__top">
        <div className="sec-label hero__label">Moments Told By OneMark</div>
        <span className="hero__index">01 / WEB EXPERIENCES</span>
      </div>

      {/* Editorial content — bottom-left anchored */}
      <div className="hero__content">
        <h1 className="hero__headline">
          <div className="hero__line">
            <span className="hero__word">Your</span>
          </div>
          <div className="hero__line">
            <span className="hero__word hero__word--outline">Story</span>
          </div>
          <div className="hero__line">
            <span className="hero__word">Deserves</span>
          </div>
          <div className="hero__line">
            <span className="hero__word hero__word--gradient">a Page.</span>
          </div>
        </h1>

        <div className="hero__bottom-row">
          <p className="hero__sub">
            Getting married? Planning an event? We build a beautiful custom website just for you —
            your guests open one link and feel the magic before the day even arrives.
          </p>
          <div className="hero__ctas">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="whatsapp-btn" data-hover>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Start Your Story
            </a>
            <Link href="/#work" className="mag-btn" data-hover>
              See Our Works
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Vertical scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">SCROLL</span>
      </div>
    </section>
  );
}
