/**
 * components/AlbumsTeaser.jsx — homepage section advertising Digital Albums.
 *
 * A short pitch + a fanned book preview that links through to /albums.
 * Entrance animation follows the ClosingCTA gsap.context()/ScrollTrigger pattern.
 */
import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ALBUMS } from "../data/albums";
import { toSlug } from "../lib/slug";
import { albumSize } from "../lib/albumSize";

gsap.registerPlugin(ScrollTrigger);

export default function AlbumsTeaser() {
  const ref = useRef(null);
  const featured = ALBUMS[0];
  const { aspect } = albumSize(featured || {});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".albums-teaser__reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!featured) return null;

  return (
    <section id="albums" className="albums-teaser" ref={ref}>
      <div className="blob albums-teaser__blob" />
      <div className="albums-teaser__inner">
        <div className="albums-teaser__copy">
          <span className="sec-label albums-teaser__reveal">After the day</span>
          <h2 className="albums-teaser__heading albums-teaser__reveal">
            Your wedding album, <span>alive</span> in a link.
          </h2>
          <p className="albums-teaser__sub albums-teaser__reveal">
            We take the landscape spreads designed for your printed album and turn
            them into an interactive book — flip every page with a tap, and share
            the whole keepsake with family and friends anywhere in the world.
          </p>
          <div className="albums-teaser__reveal">
            <Link
              href="/albums"
              className="mag-btn"
              data-hover
              onClick={() => window.trackEvent?.("albums_teaser_cta")}
            >
              Explore Digital Albums →
            </Link>
          </div>
        </div>

        <Link
          href={`/albums/${toSlug(featured.title)}`}
          className="albums-teaser__preview albums-teaser__reveal"
          style={{ aspectRatio: String(aspect) }}
          data-hover
          aria-label={`Open the ${featured.title} album`}
          onClick={() => window.trackEvent?.("albums_teaser_preview", { title: featured.title })}
        >
          <img src={featured.pages[1] || featured.coverFront} alt="" className="albums-teaser__leaf albums-teaser__leaf--back" />
          <img src={featured.coverFront} alt={`${featured.title} album cover`} className="albums-teaser__leaf albums-teaser__leaf--front" />
          <span className="albums-teaser__badge" style={{ background: featured.color }}>Tap to open</span>
        </Link>
      </div>
    </section>
  );
}
