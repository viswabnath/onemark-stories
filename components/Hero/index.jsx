/**
 * Hero — the page as an opened wedding invitation.
 *
 * The signature: a cream card-stock invitation with an engraved gold rule
 * border and corner ornaments, foil-stamped title, and a rotating occasion
 * word set in kumkum red. No dark gradient, no particle field, no gradient
 * text — the invitation itself is the hero.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const WA_NUMBER = "918331978532";
const WA_MSG = encodeURIComponent("Hi OneMark Stories! I'd love a website and digital album for my event. Can we talk?");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const OCCASIONS = ["wedding", "birthday", "housewarming", "anniversary", "celebration"];

/* Line-filigree corner, mirrored per corner via CSS */
function Corner({ where }) {
  return (
    <svg className={`hero__corner hero__corner--${where}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M4 30 C4 15 15 4 30 4" stroke="currentColor" strokeWidth="1" />
      <path d="M4 40 C4 20 20 4 40 4" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      <circle cx="11" cy="11" r="1.8" fill="currentColor" />
      <path d="M4 52 L4 46 M4 4 L10 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const tlRef = useRef(null);
  const [idx, setIdx] = useState(0);

  /* Rotate the occasion word */
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % OCCASIONS.length), 2200);
    return () => clearInterval(t);
  }, []);

  /* Auto-fit the rotating word to its line so long words ("housewarming")
     shrink to fit instead of overflowing. */
  useEffect(() => {
    const fit = () => {
      const head = headlineRef.current;
      const word = head?.querySelector(".hero__rotate-word");
      if (!head || !word) return;
      word.style.fontSize = "";
      const avail = head.clientWidth;
      const natural = word.getBoundingClientRect().width;
      if (natural > avail) {
        const base = parseFloat(getComputedStyle(word).fontSize);
        word.style.fontSize = `${Math.floor(base * (avail / natural) * 0.98)}px`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [idx]);

  /* Entrance — the card settles, then the contents rise */
  useEffect(() => {
    if (tlRef.current) tlRef.current.kill();
    const section = sectionRef.current;
    if (!section) return;
    const card = section.querySelector(".hero__card");
    const items = section.querySelectorAll(".hero__reveal");
    gsap.set(card, { opacity: 0, y: 24, scale: 0.985 });
    gsap.set(items, { opacity: 0, y: 18 });
    const tl = gsap.timeline({ delay: 0.1 });
    tlRef.current = tl;
    tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" })
      .to(items, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }, "-=0.5");
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <article className="hero__card">
        <Corner where="tl" />
        <Corner where="tr" />
        <Corner where="bl" />
        <Corner where="br" />

        <span className="hero__eyebrow hero__reveal">
          <span className="hero__eyebrow-mark">✦</span> The invitation, reimagined
        </span>

        <h1 className="hero__headline hero__reveal" ref={headlineRef}>
          A website &amp; album
          <br />
          for your{" "}
          <span className="hero__rotate">
            <span key={idx} className="hero__rotate-word">{OCCASIONS[idx]}</span>
            <span className="hero__rotate-rule" />
          </span>
        </h1>

        <p className="hero__sub hero__reveal">
          Everything your guests need before the day — and a beautiful,
          flip-through album to relive it after. One link, shared on WhatsApp.
        </p>

        <div className="hero__ctas hero__reveal">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" data-hover>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start on WhatsApp
          </a>
          <Link href="/albums" className="btn-ghost" data-hover>See a live album →</Link>
        </div>

        <div className="hero__meta hero__reveal">
          Website + album &nbsp;·&nbsp; from ₹4,999 &nbsp;·&nbsp; ready in days
        </div>
      </article>
    </section>
  );
}
