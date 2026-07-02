/**
 * Nav.jsx — Fixed nav with GSAP mobile drawer and Theme Toggle Switcher.
 * Desktop: Works · Albums · Pricing · Theme Toggle · WhatsApp icon
 * Mobile drawer: Works · Albums · Pricing · onemark.digital
 */
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const NAV_WA = `https://wa.me/918331978532?text=${encodeURIComponent("Hi OneMark Stories! I'd love to get started.")}`;

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [theme, setTheme] = useState("dark");
  const logoSrc = theme === "light"
    ? "/stories-logo-blue-resized.png"
    : "/stories-logo-white-resized.png";
  
  const drawerRef = useRef(null);
  const link1Ref  = useRef(null);
  const link2Ref  = useRef(null);
  const link3Ref  = useRef(null);
  const link4Ref  = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize theme from localStorage safely on mount (asynchronous to satisfy linter)
  useEffect(() => {
    const stored = localStorage.getItem("onemark-theme") || "dark";
    const timer = setTimeout(() => {
      setTheme(stored);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize body class on state updates
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("onemark-theme", next);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    const links = [link1Ref.current, link2Ref.current, link3Ref.current, link4Ref.current].filter(Boolean);

    if (menuOpen) {
      gsap.set(el, { display: "flex", opacity: 0 });
      gsap.to(el, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(links,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.07, delay: 0.1, duration: 0.45, ease: "power3.out" }
      );
    } else {
      gsap.to(el, {
        opacity: 0, duration: 0.2, ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <Link href="/" className="nav__logo" onClick={close}>
          <Image src={logoSrc} alt="OneMark Stories"
            width={155} height={38} priority
            style={{ objectFit: "contain", objectPosition: "left" }} />
        </Link>

        <div className="nav__right">
          {/* Desktop links */}
          <Link href="/#work"    className="nav__link nav__link--desktop" data-hover>Works</Link>
          <Link href="/albums"   className="nav__link nav__link--desktop" data-hover>Albums</Link>
          <Link href="/#pricing" className="nav__link nav__link--desktop" data-hover>Pricing</Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle light/dark theme"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text)",
              padding: "8px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "4px",
              opacity: 0.85,
              transition: "opacity 0.2s ease"
            }}
            data-hover
          >
            {theme === "dark" ? (
              // Sun icon for dark mode (click to toggle light)
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              // Moon icon for light mode (click to toggle dark)
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* WhatsApp icon — desktop only */}
          <a
            href={NAV_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__wa nav__link--desktop"
            aria-label="Chat on WhatsApp"
            data-hover
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="nav__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            data-hover
            style={{ position: "relative", width: "44px", height: "44px",
              alignItems: "center", justifyContent: "center", gap: 0 }}
          >
            <span style={{ position: "absolute", left: "10px", right: "10px",
              top: menuOpen ? "21px" : "15px",
              transform: menuOpen ? "rotate(45deg)" : "none",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }} />
            <span style={{ position: "absolute", left: "10px", right: "10px",
              top: "21px", opacity: menuOpen ? 0 : 1,
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }} />
            <span style={{ position: "absolute", left: "10px", right: "10px",
              top: menuOpen ? "21px" : "27px",
              transform: menuOpen ? "rotate(-45deg)" : "none",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile drawer */}
      <div ref={drawerRef} className="nav__drawer" role="dialog" aria-modal="true" style={{ display: "none" }}>
        <Link href="/#work"    className="nav__drawer-link" ref={link1Ref} onClick={close} data-hover>Works</Link>
        <Link href="/albums"   className="nav__drawer-link" ref={link2Ref} onClick={close} data-hover>Albums</Link>
        <Link href="/#pricing" className="nav__drawer-link" ref={link3Ref} onClick={close} data-hover>Pricing</Link>
        <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
          className="nav__drawer-link nav__drawer-link--sm" ref={link4Ref} onClick={close} data-hover>
          onemark.digital ↗
        </a>
      </div>
    </>
  );
}
