/**
 * components/DuoShowcase.jsx — the section directly under the hero.
 *
 * Replaces the old scroll-driven "story reveal" with a designed two-panel
 * layout that makes the core idea instantly clear: a website BEFORE the day,
 * a flip-through album AFTER it. Entrance uses the shared gsap.context pattern.
 */
import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icon";
import { ALBUMS } from "../data/albums";
import { toSlug } from "../lib/slug";

gsap.registerPlugin(ScrollTrigger);

export default function DuoShowcase() {
  const ref = useRef(null);
  const album = ALBUMS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".duo__reveal",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", toggleActions: "play none none none" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="duo" className="duo" ref={ref}>
      <div className="blob duo__blob" />

      <div className="duo__head">
        <span className="sec-label duo__reveal">Before &amp; after</span>
        <h2 className="duo__heading duo__reveal">
          Two ways to hold onto <span>the day.</span>
        </h2>
        <p className="duo__sub duo__reveal">
          One is for the build-up. One is for the memories. Together they make a
          celebration everyone can be part of — and keep forever.
        </p>
      </div>

      <div className="duo__grid">
        {/* Website — before */}
        <article className="duo__card duo__reveal">
          <div className="duo__card-head">
            <div className="duo__badge">Before the day</div>
            <span className="duo__icon"><Icon name="link" size={24} /></span>
          </div>
          <h3 className="duo__card-title">A personal event website</h3>
          <p className="duo__card-text">
            Share one link and your guests get everything — the countdown, your
            story, the schedule and directions — on any phone.
          </p>

          {/* Mini event-site mockup */}
          <div className="duo__preview duo__site" aria-hidden="true">
            <div className="duo__site-bar">
              <span className="duo__dot" /><span className="duo__dot" /><span className="duo__dot" />
              <span className="duo__site-url">srinu-sai.stories.onemark.co.in</span>
            </div>
            <div className="duo__site-body">
              <span className="duo__site-eyebrow">Save the date</span>
              <span className="duo__site-title">Srinu &amp; Sai</span>
              <div className="duo__site-count">
                <span><b>12</b>days</span>
                <span><b>08</b>hrs</span>
                <span><b>44</b>min</span>
                <span><b>20</b>sec</span>
              </div>
            </div>
          </div>

          <Link href="/works" className="duo__link" data-hover>
            See our work &rarr;
          </Link>
        </article>

        {/* Album — after */}
        <article className="duo__card duo__card--album duo__reveal">
          <div className="duo__card-head">
            <div className="duo__badge duo__badge--gold">After the day</div>
            <span className="duo__icon duo__icon--gold"><Icon name="book" size={24} /></span>
          </div>
          <h3 className="duo__card-title">A flip-through digital album</h3>
          <p className="duo__card-text">
            We turn your printed album into a real, tap-to-turn book — then you
            share the whole keepsake with family and friends anywhere.
          </p>

          {album && (
            <>
              <div className="duo__preview duo__album">
                <Image src={album.coverFront} alt={`${album.title} album cover`} width={320} height={213} sizes="320px" />
              </div>
              <Link
                href={`/albums/${toSlug(album.title)}`}
                className="duo__link"
                data-hover
                aria-label={`Open the ${album.title} album`}
                onClick={() => window.trackEvent?.("duo_album_preview", { title: album.title })}
              >
                See a live album &rarr;
              </Link>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
