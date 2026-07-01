/**
 * components/Flipbook/index.jsx — interactive digital album (page-flip book).
 *
 * Renders an album from data/albums.js as a realistic flippable book using
 * react-pageflip (StPageFlip). Front & back covers are hard pages shown
 * single; inner sheets are shown two-up as an open-book spread on desktop and
 * one page at a time on mobile.
 *
 * IMPORTANT: react-pageflip touches the DOM on mount, so this component must be
 * loaded client-side only. Import it with next/dynamic({ ssr: false }) — see
 * pages/albums/[slug].jsx.
 *
 * A class-based error boundary wraps the book so a StPageFlip failure degrades
 * to a plain vertical photo gallery instead of a blank page.
 */
import { Component, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import HTMLFlipBook from "react-pageflip";
import { albumSize, sizeLabel } from "../../lib/albumSize";

/* ── One page (forwardRef is required by react-pageflip) ─────────────── */
const Page = forwardRef(function Page({ src, alt, hard }, ref) {
  return (
    <div
      className={`flipbook__page${hard ? " flipbook__page--hard" : ""}`}
      ref={ref}
      data-density={hard ? "hard" : "soft"}
    >
      {/* Plain <img> (not next/image): pages live inside a JS-measured flip
          container and images may be svg placeholders or pre-optimised webp. */}
      <img className="flipbook__img" src={src} alt={alt} draggable={false} />
    </div>
  );
});

/* ── The interactive book ───────────────────────────────────────────── */
function FlipViewer({ album }) {
  const bookRef  = useRef(null);
  const stageRef = useRef(null); // whole .flipbook (fullscreen target)
  const viewRef  = useRef(null); // .flipbook__stage — the space the book must fit
  const total    = album.pages.length + 2; // + front & back covers
  const { aspect } = albumSize(album);      // per-album page aspect (w / h)

  const [page, setPage]     = useState(0);
  const [ready, setReady]   = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFs, setIsFs]     = useState(false);
  const [box, setBox]       = useState(null); // measured { w, h } of the stage
  const [needRotate, setNeedRotate]     = useState(false); // landscape album on a portrait phone
  const [bypassRotate, setBypassRotate] = useState(false); // user chose "view anyway"

  /* Measure the available stage so the book can be capped to fit the viewport.
     StPageFlip is width-driven (derives height from the aspect ratio), so
     without a height cap a tall page overflows. We feed it maxWidth/maxHeight
     from the measured box and re-key on significant size changes. */
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBox({ w: Math.floor(r.width), h: Math.floor(r.height) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Landscape albums need width. On a small screen held in portrait, the spread
     would be a tiny sliver — so we ask the visitor to turn the phone. */
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const isSmall = Math.min(w, h) < 640; // phone-sized
      const isPortrait = h >= w;
      setNeedRotate(aspect > 1.15 && isSmall && isPortrait);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, [aspect]);

  const onInit = useCallback(() => {
    setReady(true);
    setPage(0); // book (re)mounts on the cover — keep the counter in sync
    window.trackEvent?.("album_open", { title: album.title });
  }, [album.title]);

  const onFlip = useCallback((e) => {
    const p = e.data;
    setPage(p);
    window.trackEvent?.("album_flip", { title: album.title, page: p });
    if (p >= total - 1) window.trackEvent?.("album_complete", { title: album.title });
  }, [album.title, total]);

  const go = useCallback((dir) => {
    const pf = bookRef.current?.pageFlip?.();
    if (!pf) return;
    if (dir > 0) pf.flipNext(); else pf.flipPrev();
  }, []);

  /* Keyboard arrows for desktop */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* Track fullscreen state to swap the icon */
  useEffect(() => {
    const onFsChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = stageRef.current;
    if (!document.fullscreenElement) el?.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  const share = useCallback(async () => {
    window.trackEvent?.("album_share", { title: album.title });
    const url = typeof window !== "undefined" ? window.location.href : "";
    const payload = {
      title: `${album.title} — OneMark Stories`,
      text: "Our album — page by page ✨",
      url,
    };
    try {
      if (navigator.share) { await navigator.share(payload); return; }
    } catch { return; /* user dismissed the share sheet */ }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard unavailable — no-op */ }
  }, [album.title]);

  const atStart = page <= 0;
  const atEnd   = page >= total - 1;
  const label   = atStart ? "Cover" : atEnd ? "Back cover" : `Page ${page} of ${total - 2}`;

  /* Book sizing: ratio fixed by aspect, size capped to the measured stage so
     it always fits the viewport (height-bounded on short screens). */
  const ratioW  = Math.round(1000 * aspect);
  const maxW    = box ? Math.max(200, box.w) : ratioW;
  const maxH    = box ? Math.max(200, box.h) : 1000;
  const minW    = Math.min(220, maxW);
  const minH    = Math.min(220, maxH);
  // Re-mount the flip engine only on meaningful size changes (buckets of 24px)
  const bookKey = `${album.id}-${Math.round(maxW / 24)}x${Math.round(maxH / 24)}`;

  const showRotate = needRotate && !bypassRotate;

  return (
    <div className="flipbook" ref={stageRef}>
      {/* Top bar */}
      <div className="flipbook__bar">
        <Link href="/albums" className="flipbook__back" data-hover>← Albums</Link>
        <div className="flipbook__title-wrap">
          <span className="flipbook__tag" style={{ color: album.color }}>{album.tag} · {sizeLabel(album)}</span>
          <span className="flipbook__title">{album.title}</span>
        </div>
        <div className="flipbook__bar-actions">
          <button className="flipbook__icon-btn" onClick={share} data-hover aria-label="Share album">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
            </svg>
          </button>
          <button className="flipbook__icon-btn flipbook__icon-btn--fs" onClick={toggleFullscreen} data-hover aria-label="Toggle fullscreen">
            {isFs ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* The book stage */}
      <div className="flipbook__stage" ref={viewRef}>
        {showRotate ? (
          <div className="flipbook__rotate">
            <svg className="flipbook__rotate-icon" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <line x1="11" y1="18" x2="13" y2="18" />
              <path d="M2 12a10 10 0 0 1 3-7" />
              <polyline points="2 5 2 9 6 9" transform="translate(-0.5 0)" />
            </svg>
            <p className="flipbook__rotate-title">Turn your phone sideways</p>
            <p className="flipbook__rotate-sub">
              This is a {sizeLabel(album)} landscape album — rotate your phone to open both pages.
            </p>
            <button className="flipbook__rotate-anyway" onClick={() => setBypassRotate(true)} data-hover>
              View in portrait anyway
            </button>
          </div>
        ) : (
          <>
            {box && (
              <HTMLFlipBook
                key={bookKey}
                ref={bookRef}
                className="flipbook__book"
                style={{}}
                width={ratioW}
                height={1000}
                size="stretch"
                minWidth={minW}
                maxWidth={maxW}
                minHeight={minH}
                maxHeight={maxH}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                drawShadow={true}
                flippingTime={800}
                useMouseEvents={true}
                onInit={onInit}
                onFlip={onFlip}
              >
                <Page hard src={album.coverFront} alt={`${album.title} — front cover`} />
                {album.pages.map((src, i) => (
                  <Page key={src} src={src} alt={`${album.title} — sheet ${i + 1}`} />
                ))}
                <Page hard src={album.coverBack} alt={`${album.title} — back cover`} />
              </HTMLFlipBook>
            )}

            {/* "Tap to open" hint — only on the closed cover, non-blocking */}
            {ready && atStart && (
              <div className="flipbook__hint" aria-hidden="true">tap the cover to open ✦</div>
            )}
          </>
        )}
      </div>

      {/* Controls — hidden while prompting to rotate */}
      {!showRotate && (
        <div className="flipbook__controls">
          <button className="flipbook__nav" onClick={() => go(-1)} disabled={atStart} data-hover aria-label="Previous page">←</button>
          <span className="flipbook__counter">{label}</span>
          <button className="flipbook__nav" onClick={() => go(1)} disabled={atEnd} data-hover aria-label="Next page">→</button>
        </div>
      )}

      {copied && <div className="flipbook__toast">Link copied ✓</div>}
    </div>
  );
}

/* ── Fallback: a plain vertical gallery if the flip engine fails ─────── */
function GalleryFallback({ album }) {
  const imgs = [album.coverFront, ...album.pages, album.coverBack];
  return (
    <div className="flipbook flipbook--fallback">
      <div className="flipbook__bar">
        <Link href="/albums" className="flipbook__back" data-hover>← Albums</Link>
        <span className="flipbook__title">{album.title}</span>
        <span />
      </div>
      <div className="flipbook__gallery">
        {imgs.map((src, i) => (
          <img key={src} src={src} alt={`${album.title} — ${i + 1}`} className="flipbook__gallery-img" />
        ))}
      </div>
    </div>
  );
}

/* ── Error boundary (mirrors HeroErrorBoundary pattern) ─────────────── */
export default class Flipbook extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (typeof window !== "undefined") {
      window.trackEvent?.("album_flip_error", { message: error?.message ?? "unknown" });
    }
    console.warn("[Flipbook] page-flip engine failed:", error, info);
  }

  render() {
    if (this.state.hasError) return <GalleryFallback album={this.props.album} />;
    return <FlipViewer album={this.props.album} />;
  }
}
