/**
 * Nav.jsx — Single theme toggle, clean desktop/mobile, GSAP drawer
 */
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const { theme, toggleTheme }      = useTheme();
  const drawerRef  = useRef(null);
  const link1Ref   = useRef(null);
  const link2Ref   = useRef(null);
  const link3Ref   = useRef(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Animate drawer
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    const links = [link1Ref.current, link2Ref.current, link3Ref.current].filter(Boolean);

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
        onComplete: () => gsap.set(el, { display: "none" })
      });
    }
  }, [menuOpen]);

  const logoSrc = theme === "light"
    ? "/stories-logo-blue-resized.png"
    : "/stories-logo-white-resized.png";

  const close = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        {/* Logo — always left */}
        <Link href="/" className="nav__logo" onClick={close}>
          <Image src={logoSrc} alt="OneMark Stories" width={130} height={32} priority
            style={{ objectFit: "contain", objectPosition: "left" }} />
        </Link>

        {/* Right cluster */}
        <div className="nav__right">
          <a href="#work"  className="nav__link nav__link--desktop" data-hover>Work</a>
          <a href="#about" className="nav__link nav__link--desktop" data-hover>About</a>

          <button onClick={toggleTheme} className="nav__toggle" aria-label="Toggle theme" data-hover>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Animated Hamburger acts as BOTH open and close */}
          <button
            className="nav__burger"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            data-hover
            style={{
              position: "relative",
              width: "24px",
              height: "24px",
              gap: 0 // Overrides the global CSS gap so absolute positioning works
            }}
          >
            <span style={{
              position: "absolute", left: 0, right: 0, 
              top: menuOpen ? "11px" : "5px",
              transform: menuOpen ? "rotate(45deg)" : "none", 
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }} />
            <span style={{
              position: "absolute", left: 0, right: 0, 
              top: "11px",
              opacity: menuOpen ? 0 : 1, 
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }} />
            <span style={{
              position: "absolute", left: 0, right: 0, 
              top: menuOpen ? "11px" : "17px",
              transform: menuOpen ? "rotate(-45deg)" : "none", 
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile drawer */}
      <div ref={drawerRef} className="nav__drawer" role="dialog" aria-modal="true" style={{ display: "none" }}>
        
        {/* NOTE: The separate close button (<button className="nav__drawer-close">) has been removed from here! */}
        
        <a href="#work"  className="nav__drawer-link" ref={link1Ref} onClick={close} data-hover>Work</a>
        <a href="#about" className="nav__drawer-link" ref={link2Ref} onClick={close} data-hover>About</a>
        <a href="https://onemark.digital" target="_blank" rel="noopener noreferrer"
          className="nav__drawer-link nav__drawer-link--sm" ref={link3Ref} onClick={close} data-hover>
          onemark.digital ↗
        </a>
      </div>
    </>
  );
}