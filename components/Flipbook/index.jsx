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

/* ── Web Audio API Page-Turn Sound Synthesizer ──────────────────────── */
let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch (e) {
    console.warn("Failed to initialize Web Audio API:", e);
  }
  return audioCtx;
}

function playPageTurnSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Create noise buffer (white noise) for paper sliding friction
  const bufferSize = ctx.sampleRate * 0.4; // 0.4 seconds duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  // Create noise source
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  // Create bandpass filter to shape the noise into paper sliding frequency
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(900, now);
  // Animate the frequency slightly downwards to mimic the deceleration of a turning page
  filter.frequency.exponentialRampToValueAtTime(380, now + 0.4);
  filter.Q.setValueAtTime(2.2, now);

  // Create a lowpass filter to remove harsh high-frequencies
  const lpFilter = ctx.createBiquadFilter();
  lpFilter.type = "lowpass";
  lpFilter.frequency.setValueAtTime(2200, now);

  // Gain envelope to control volume over time
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, now);
  // Quick ramp up to audible level
  gainNode.gain.linearRampToValueAtTime(0.35, now + 0.07);
  // Slow ramp down to 0
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  // Connect node graph
  noiseSource.connect(filter);
  filter.connect(lpFilter);
  lpFilter.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Synthesize a thud/flap effect at the end
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(70, now + 0.32);
  osc.frequency.exponentialRampToValueAtTime(35, now + 0.39);
  
  oscGain.gain.setValueAtTime(0, now);
  oscGain.gain.setValueAtTime(0, now + 0.32);
  oscGain.gain.linearRampToValueAtTime(0.22, now + 0.34);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  // Start & Stop
  noiseSource.start(now);
  noiseSource.stop(now + 0.4);
  
  osc.start(now + 0.32);
  osc.stop(now + 0.4);
}

let bgAudio = null;

function startBackgroundMusic() {
  if (typeof window === "undefined") return;
  if (bgAudio) return; // Already playing

  bgAudio = new Audio("/audio/bg-music.mp3");
  bgAudio.loop = true;
  bgAudio.volume = 0.0; // Start at 0 volume for smooth fade-in

  bgAudio.play().then(() => {
    // Fade in volume over 1.5 seconds
    let vol = 0;
    const interval = setInterval(() => {
      if (!bgAudio) {
        clearInterval(interval);
        return;
      }
      vol += 0.04;
      if (vol >= 0.35) {
        bgAudio.volume = 0.35;
        clearInterval(interval);
      } else {
        bgAudio.volume = vol;
      }
    }, 150);
  }).catch((err) => {
    console.warn("Failed to play background music (audio file not loaded or gesture required):", err);
  });
}

function stopBackgroundMusic() {
  if (!bgAudio) return;
  const audioToStop = bgAudio;
  bgAudio = null;

  // Fade out volume over 1.0 second
  let vol = audioToStop.volume;
  const interval = setInterval(() => {
    vol -= 0.05;
    if (vol <= 0) {
      audioToStop.volume = 0;
      audioToStop.pause();
      clearInterval(interval);
    } else {
      audioToStop.volume = vol;
    }
  }, 100);
}

const CanvasParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.6 + 0.1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Detect light mode dynamically
      const isLight = document.body.classList.contains("light");

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        ctx.fillStyle = isLight
          ? `rgba(168, 63, 82, ${p.alpha * 0.4})` // rose/brown dust
          : `rgba(229, 197, 131, ${p.alpha})`;    // champagne gold dust
          
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="flipbook__canvas"
    />
  );
};

/* ── One page (forwardRef is required by react-pageflip) ─────────────── */
const Page = forwardRef(function Page({ src, alt, hard, isLeft, splitSide, page, total }, ref) {
  let shadow = "none";
  if (!hard) {
    if (isLeft) {
      // Left page: stack is thick if page index is high
      const t = total > 0 ? page / total : 0.5;
      const xOffset = -Math.round(2 + t * 8);
      const blur = Math.round(8 + t * 16);
      const opacity = (0.15 + t * 0.15).toFixed(2);
      shadow = `${xOffset}px 8px ${blur}px rgba(0, 0, 0, ${opacity})`;
    } else {
      // Right page: stack is thick if page index is low
      const t = total > 0 ? (total - page) / total : 0.5;
      const xOffset = Math.round(2 + t * 8);
      const blur = Math.round(8 + t * 16);
      const opacity = (0.15 + t * 0.15).toFixed(2);
      shadow = `${xOffset}px 8px ${blur}px rgba(0, 0, 0, ${opacity})`;
    }
  } else {
    // Hard covers
    if (isLeft) {
      // Back cover is on the left
      shadow = "-8px 8px 24px rgba(0,0,0,0.3)";
    } else {
      // Front cover is on the right
      shadow = "8px 8px 24px rgba(0,0,0,0.3)";
    }
  }

  return (
    <div
      className={`flipbook__page${hard ? " flipbook__page--hard" : ""}`}
      ref={ref}
      data-density={hard ? "hard" : "soft"}
    >
      <div
        className="flipbook__page-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          boxShadow: shadow,
          transition: "box-shadow 0.6s ease, transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        {splitSide ? (
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
            <img
              className="flipbook__img"
              src={src}
              alt={alt}
              draggable={false}
              decoding="async"
              style={{
                position: "absolute",
                top: 0,
                left: splitSide === "left" ? 0 : "-100%",
                width: "200%",
                height: "100%",
                maxWidth: "none",
                objectFit: "fill",
              }}
            />
          </div>
        ) : (
          <img className="flipbook__img" src={src} alt={alt} draggable={false} decoding="async" />
        )}
        {!hard && typeof isLeft === "boolean" && (
          <div
            className={`flipbook__page-crease ${
              isLeft ? "flipbook__page-crease--left" : "flipbook__page-crease--right"
            }`}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
});

/* ── The interactive book ───────────────────────────────────────────── */
function FlipViewer({ album }) {
  const bookRef  = useRef(null);
  const stageRef = useRef(null); // whole .flipbook (fullscreen target)
  const viewRef  = useRef(null); // .flipbook__stage — the space the book must fit
  // Each item in album.pages is a double-page landscape spread, so we split it into left/right halves
  const singlePages = [];
  album.pages.forEach((src, idx) => {
    singlePages.push({ src, splitSide: "left", idx });
    singlePages.push({ src, splitSide: "right", idx });
  });
  const total    = singlePages.length + 2; // + front & back covers
  const { aspect } = albumSize(album);      // per-album page aspect (w / h)

  const [page, setPage]     = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [iosFsTip, setIosFsTip] = useState(false);
  const [isFs, setIsFs]     = useState(false);
  const [zoomScale, setZoomScale] = useState(1.0);
  const [isIosFs, setIsIosFs] = useState(false);
  const [box, setBox]       = useState(null); // measured { w, h } of the stage
  const [needRotate, setNeedRotate]     = useState(false); // landscape album on a portrait phone
  const [bypassRotate, setBypassRotate] = useState(false); // user chose "view anyway"
  const [orientation, setOrientation]   = useState("landscape");
  const [pageInputValue, setPageInputValue] = useState("");

  const N = album.pages.length;
  const S = N * 2;
  const middlePage = S / 2;
  const midLeft = middlePage - (middlePage % 2 === 0 ? 1 : 0);
  const middleLabel = orientation === "landscape" 
    ? `Pages ${midLeft}-${midLeft + 1}` 
    : `Page ${middlePage}`;

  const isMiddleActive = orientation === "landscape"
    ? (page > 0 && page < total - 1 && (page - (page % 2 === 0 ? 1 : 0) === midLeft))
    : (page === middlePage);

  // 3D Rotatable closed cover states
  const [rotY, setRotY] = useState(-20);
  const [rotX, setRotX] = useState(15);
  const [isOpening, setIsOpening] = useState(false);
  const [dragging, setDragging]   = useState(false);
  const [show3D, setShow3D]       = useState(true);
  const [isSwingingFront, setIsSwingingFront] = useState(false);
  const [isSwingingBack, setIsSwingingBack]   = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startRotY = useRef(-20);
  const startRotX = useRef(15);
  const openingRef = useRef(false);

  const openBook = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;
    setIsOpening(true);
    const pf = bookRef.current?.pageFlip?.();
    
    // Check which cover is facing the user using the cosine of rotY
    const isFrontFacing = Math.cos(rotY * Math.PI / 180) > 0;

    if (isFrontFacing) {
      // 1. Rotate flat to front cover (closest multiple of 360)
      const closest360 = Math.round(rotY / 360) * 360;
      setRotY(closest360);
      setRotX(0);

      // Trigger 2D pageflip immediately in background so it completes invisibly
      if (pf) {
        pf.flip(1);
      } else {
        setPage(1);
      }

      // 2. Start the swinging animation after it aligns flat
      setTimeout(() => {
        setIsSwingingFront(true);
        // Start the cross-fade slightly after the cover starts swinging
        setTimeout(() => {
          setShow3D(false);
        }, 150);
      }, 200);

      // 3. Complete the transition and release the locks
      setTimeout(() => {
        setIsOpening(false);
        setIsSwingingFront(false);
        openingRef.current = false;
      }, 1050);
    } else {
      // Rotate flat to back cover (closest odd multiple of 180)
      const closest180 = Math.round((rotY - 180) / 360) * 360 + 180;
      setRotY(closest180);
      setRotX(0);

      // Trigger 2D pageflip immediately in background so it completes invisibly
      if (pf) {
        pf.flip(total - 2);
      } else {
        setPage(total - 2);
      }

      setTimeout(() => {
        setIsSwingingBack(true);
        setTimeout(() => {
          setShow3D(false);
        }, 150);
      }, 200);

      setTimeout(() => {
        setIsOpening(false);
        setIsSwingingBack(false);
        openingRef.current = false;
      }, 1050);
    }
  }, [rotY, total]);

  const onCoverPointerDown = (e) => {
    if (isOpening) return;
    isDragging.current = true;
    setDragging(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    startRotY.current = rotY;
    startRotX.current = rotX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onCoverPointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;
    setRotY(startRotY.current + deltaX * 0.5);
    const nextRotX = startRotX.current - deltaY * 0.3;
    setRotX(Math.max(-30, Math.min(30, nextRotX)));
  };

  const onCoverPointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const deltaX = Math.abs(e.clientX - startX.current);
    const deltaY = Math.abs(e.clientY - startY.current);
    if (deltaX < 6 && deltaY < 6) {
      openBook();
    }
  };
  
  // Audio state
  const [muted, setMuted]   = useState(false);
  const mutedRef = useRef(muted);
  const [musicMuted, setMusicMuted] = useState(false);

  // Auto-fade controls state
  const [controlsVisible, setControlsVisible] = useState(true);
  const fadeTimeoutRef = useRef(null);

  const resetControlsTimeout = useCallback(() => {
    setControlsVisible(true);
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
    }
    fadeTimeoutRef.current = setTimeout(() => {
      // Only auto-fade if the book is open (pages are showing)
      const isBookOpen = page > 0 && page < total - 1;
      if (isBookOpen) {
        setControlsVisible(false);
      }
    }, 3500); // 3.5 seconds of inactivity
  }, [page, total]);

  // Trigger visibility reset on page/mode changes
  useEffect(() => {
    resetControlsTimeout();
  }, [page, show3D, resetControlsTimeout]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      try {
        const stored = localStorage.getItem("om_audio_muted");
        if (stored !== null) {
          setMuted(stored === "true");
        }
        const storedMusic = localStorage.getItem("om_music_muted");
        if (storedMusic !== null) {
          setMusicMuted(storedMusic === "true");
        }
      } catch {
        // LocalStorage blocked or unavailable
      }
    });
  }, []);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  // Warm up Web Audio API context on any user interaction (essential for Chrome/Safari autoplay rules)
  useEffect(() => {
    const warmUp = () => {
      getAudioContext();
    };
    window.addEventListener("pointerdown", warmUp);
    window.addEventListener("keydown", warmUp);
    return () => {
      window.removeEventListener("pointerdown", warmUp);
      window.removeEventListener("keydown", warmUp);
    };
  }, []);

  // Handle background music automatic toggle based on page and mute state
  const isOpen = page > 0 && page < total - 1;
  useEffect(() => {
    if (isOpen && !muted && !musicMuted && !show3D) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
    return () => {
      stopBackgroundMusic();
    };
  }, [isOpen, muted, musicMuted, show3D]);

  // Handle tab visibility change (stop background music when user minimizes or switches tabs)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopBackgroundMusic();
      } else {
        // Resume if the book is open, not muted, and not in 3D mode
        if (isOpen && !muted && !musicMuted && !show3D) {
          startBackgroundMusic();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isOpen, muted, musicMuted, show3D]);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("om_audio_muted", String(next));
      } catch {
        // LocalStorage blocked or unavailable
      }
      return next;
    });
    // Warm up the Web Audio context on user gesture
    getAudioContext();
  }, []);

  const toggleMusicMuted = useCallback(() => {
    setMusicMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("om_music_muted", String(next));
      } catch {
        // LocalStorage blocked or unavailable
      }
      return next;
    });
    // Warm up the Web Audio context on user gesture
    getAudioContext();
  }, []);

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
      const pf = bookRef.current?.pageFlip?.();
      if (pf) {
        setOrientation(pf.getOrientation());
      }
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
      const isLandscape = w > h;
      setNeedRotate(aspect > 1.15 && isSmall && isPortrait);

      // Automatically request fullscreen mode on mobile when rotated to landscape
      if (isSmall) {
        const el = stageRef.current;
        if (isLandscape) {
          if (el) {
            if (el.requestFullscreen) {
              if (!document.fullscreenElement) {
                el.requestFullscreen().catch(() => {});
              }
            } else {
              // iOS iPhone Safari Fallback
              setIsIosFs(true);
            }
          }
        } else {
          if (document.fullscreenElement && document.fullscreenElement === el) {
            document.exitFullscreen?.catch(() => {});
          }
          setIsIosFs(false);
          setZoomScale(1.0);
        }
      }
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
    setPage(0); // book (re)mounts on the cover — keep the counter in sync
    const pf = bookRef.current?.pageFlip?.();
    if (pf) {
      setOrientation(pf.getOrientation());
    }
    setShow3D(true);
    openingRef.current = false;
    window.trackEvent?.("album_open", { title: album.title });
  }, [album.title]);

  const onFlip = useCallback((e) => {
    const p = e.data;
    setPage(p);

    if (p === 0) {
      setRotY(-20);
      setRotX(15);
      setShow3D(true);
      openingRef.current = false;
      setIsSwingingFront(false);
    } else if (p === total - 1) {
      setRotY(160);
      setRotX(15);
      setShow3D(true);
      openingRef.current = false;
      setIsSwingingBack(false);
    }

    const pf = bookRef.current?.pageFlip?.();
    if (pf) {
      setOrientation(pf.getOrientation());
    }
    if (!mutedRef.current) {
      playPageTurnSound();
    }
    window.trackEvent?.("album_flip", { title: album.title, page: p });
    if (p >= total - 1) window.trackEvent?.("album_complete", { title: album.title });
  }, [album.title, total]);

  const go = useCallback((dir) => {
    if (show3D) {
      openBook();
      return;
    }
    const pf = bookRef.current?.pageFlip?.();
    if (!pf) return;
    // Warm up AudioContext on click trigger
    getAudioContext();
    if (dir > 0) pf.flipNext(); else pf.flipPrev();
  }, [show3D, openBook]);

  const jumpToPage = useCallback((p) => {
    // Normalize target page to left page in landscape mode
    const targetPage = (orientation === "landscape" && p > 0 && p < total - 1)
      ? p - (p % 2 === 0 ? 1 : 0)
      : p;

    if (page === targetPage) return;
    getAudioContext();
    const pf = bookRef.current?.pageFlip?.();
    if (pf) {
      if (targetPage !== 0 && targetPage !== total - 1 && show3D) {
        setShow3D(false);
        // Delay page flipping slightly to allow HTMLFlipBook DOM element to display and initialize layout
        setTimeout(() => {
          const currentPf = bookRef.current?.pageFlip?.();
          currentPf?.turnToPage(targetPage);
        }, 150);
      } else {
        if (targetPage !== 0 && targetPage !== total - 1) {
          setShow3D(false);
        }
        pf.turnToPage(targetPage);
      }
    } else {
      setPage(targetPage);
      if (targetPage === 0 || targetPage === total - 1) {
        setShow3D(true);
      } else {
        setShow3D(false);
      }
    }
  }, [page, total, orientation, show3D]);

  const handlePageJump = useCallback(() => {
    const p = parseInt(pageInputValue, 10);
    if (!isNaN(p) && p >= 1 && p <= total - 2) {
      jumpToPage(p);
      setPageInputValue("");
    }
  }, [pageInputValue, total, jumpToPage]);

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
    if (el) {
      if (el.requestFullscreen) {
        if (!document.fullscreenElement) {
          el.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      } else {
        // iOS Safari iphone fallback
        setIsIosFs((prev) => {
          const next = !prev;
          if (next) {
            setIosFsTip(true);
            setTimeout(() => setIosFsTip(false), 4500);
          }
          return next;
        });
      }
    }
  }, []);

  const zoomIn = useCallback(() => {
    setZoomScale((prev) => Math.min(prev + 0.1, 1.5));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomScale((prev) => Math.max(prev - 0.1, 0.5));
  }, []);

  const share = useCallback(async () => {
    window.trackEvent?.("album_share", { title: album.title });
    const url = typeof window !== "undefined" ? window.location.href : "";
    const payload = {
      title: `${album.title} — OneMark Stories`,
      text: "Our album — page by page",
      url,
    };
    let shared = false;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(payload);
        shared = true;
      } catch (err) {
        console.log("Web Share API failed or dismissed:", err);
      }
    }
    if (!shared) {
      // Fallback: copy to clipboard
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        } else {
          // Fallback for older browsers / non-secure contexts / WebViews
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed";
          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);
          if (successful) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
          } else {
            throw new Error("execCommand copy failed");
          }
        }
      } catch (err) {
        console.log("Clipboard fallback failed:", err);
        setCopyFailed(true);
        setTimeout(() => setCopyFailed(false), 3000);
      }
    }
  }, [album.title]);

  const atStart = page <= 0;
  const atEnd   = page >= total - 1;
  const label   = atStart ? "Cover" : atEnd ? "Back cover" : `Page ${page} of ${total - 2}`;

  /* Book sizing: ratio fixed by aspect, size capped to the measured stage so
     it always fits the viewport (height-bounded on short screens). */
  const ratioW  = Math.round(1000 * aspect);
  const doubleAspect = aspect * 2;
  let fitW = box ? box.w : Math.round(1000 * doubleAspect);
  let fitH = box ? box.h : 1000;

  if (box) {
    // Leave some margin/padding around the book
    const padW = box.w * 0.95;
    const padH = box.h * 0.95;
    
    if (padW / padH > doubleAspect) {
      // Height-bounded
      fitH = padH;
      fitW = fitH * doubleAspect;
    } else {
      // Width-bounded
      fitW = padW;
      fitH = fitW / doubleAspect;
    }
  }

  const maxW    = Math.round(fitW);
  const maxH    = Math.round(fitH);
  const minW    = Math.min(220, maxW);
  const minH    = Math.min(220, maxH);
  // Re-mount the flip engine only on meaningful size changes (buckets of 24px)
  const bookKey = `${album.id}-${Math.round(maxW / 24)}x${Math.round(maxH / 24)}`;

  // Calculate width and height of the 3D closed book to match standard page size in viewport
  const closedW = maxW / 2;
  const closedH = maxH;

  const showRotate = needRotate && !bypassRotate;

  return (
    <div 
      className={`flipbook${isIosFs ? " flipbook--ios-fs" : ""}${!controlsVisible ? " flipbook--controls-hidden" : ""}`} 
      ref={stageRef} 
      style={{ position: "relative" }}
      onMouseMove={resetControlsTimeout}
      onClick={resetControlsTimeout}
      onTouchStart={resetControlsTimeout}
    >
      {/* Ambient Stardust Canvas & Glow Elements */}
      <CanvasParticles />
      <div className="ambient-glow" style={{ position: "absolute", top: "-10%", right: "-10%", width: "600px", height: "600px", opacity: 0.12, background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div className="ambient-glow" style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "600px", height: "600px", opacity: 0.12, background: "radial-gradient(circle, var(--rose) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Top bar */}
      <div className="flipbook__bar" style={{ position: "relative", zIndex: 2 }}>
        <Link href="/albums" className="flipbook__back" data-hover>← Albums</Link>
        <div className="flipbook__title-wrap">
          <span className="flipbook__tag" style={{ color: album.color }}>{album.tag} · {sizeLabel(album)}</span>
          <span className="flipbook__title">{album.title}</span>
        </div>
        <div className="flipbook__bar-actions flipbook__bar-actions--desktop">
          {/* Music Toggle */}
          <button className="flipbook__icon-btn" onClick={toggleMusicMuted} data-hover aria-label={musicMuted ? "Unmute music" : "Mute music"}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
              {musicMuted && <line x1="3" y1="3" x2="21" y2="21" />}
            </svg>
          </button>
          {/* Mute/Unmute Toggle */}
          <button className="flipbook__icon-btn" onClick={toggleMuted} data-hover aria-label={muted ? "Unmute album" : "Mute album"}>
            {muted ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
          <button className="flipbook__icon-btn" onClick={share} data-hover aria-label="Share album">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
            </svg>
          </button>


          <button className="flipbook__icon-btn flipbook__icon-btn--fs" onClick={toggleFullscreen} data-hover aria-label="Toggle fullscreen">
            {isFs || isIosFs ? (
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
      <div className="flipbook__stage" ref={viewRef} onPointerDown={() => getAudioContext()} style={{ position: "relative", zIndex: 1 }}>
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
          <div
            className="flipbook__zoom-wrapper"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: "center center",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {/* 3D Rotatable Closed Cover with swinging opening sequences */}
            {box && (
              <div
                className="book-3d-stage"
                onPointerDown={onCoverPointerDown}
                onPointerMove={onCoverPointerMove}
                onPointerUp={onCoverPointerUp}
                style={{
                  opacity: show3D ? 1 : 0,
                  pointerEvents: show3D ? "auto" : "none",
                  transition: "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                  position: show3D ? "relative" : "absolute",
                  zIndex: show3D ? 2 : 0,
                }}
              >
                <div
                  className="book-3d-wrapper"
                  style={{
                    "--book-w": `${closedW}px`,
                    "--book-h": `${closedH}px`,
                    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                    transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                >
                  <div className="book-3d">
                    {/* Spine */}
                    <div className="book-3d__spine" />
                    
                    {/* Top, Bottom, Right Page Edges */}
                    <div className="book-3d__pages-right" />
                    <div className="book-3d__pages-top" />
                    <div className="book-3d__pages-bottom" />

                    {/* Back Cover Group (swings open right) */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        transformStyle: "preserve-3d",
                        transformOrigin: "right center",
                        transform: isSwingingBack ? "rotateY(140deg)" : "rotateY(0deg)",
                        transition: "transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
                        zIndex: page === total - 1 ? 10 : 1,
                      }}
                    >
                      {/* Back Cover Outer Face */}
                      <div
                        className="book-3d__face book-3d__back"
                        style={{
                          backgroundImage: `url(${album.coverBack})`,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden"
                        }}
                      />
                      {/* Back Cover Inner Lining */}
                      <div
                        className="book-3d__face"
                        style={{
                          background: "#EBE8E3",
                          boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
                          transform: "translateZ(8.9px)", // visible when swung open
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden"
                        }}
                      />
                    </div>

                    {/* Front Cover Group (swings open left) */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        transformStyle: "preserve-3d",
                        transformOrigin: "left center",
                        transform: isSwingingFront ? "rotateY(-140deg)" : "rotateY(0deg)",
                        transition: "transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
                        zIndex: page === 0 ? 10 : 1,
                      }}
                    >
                      {/* Front Cover Outer Face */}
                      <div
                        className="book-3d__face book-3d__front"
                        style={{
                          backgroundImage: `url(${album.coverFront})`,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden"
                        }}
                      />
                      {/* Front Cover Inner Lining */}
                      <div
                        className="book-3d__face"
                        style={{
                          background: "#EBE8E3",
                          boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
                          transform: "translateZ(-8.9px) rotateY(180deg)", // visible when swung open
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden"
                        }}
                      />
                    </div>

                    {/* First Inner Page (underneath the front cover) */}
                    <div
                      className="book-3d__face"
                      style={{
                        backgroundImage: `url(${singlePages[0].src})`,
                        backgroundSize: "200% 100%",
                        backgroundPosition: "left center",
                        transform: "translateZ(8px)",
                        borderRadius: "2px",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                      }}
                    />

                    {/* Last Inner Page (underneath the back cover) */}
                    <div
                      className="book-3d__face"
                      style={{
                        backgroundImage: `url(${singlePages[singlePages.length - 1].src})`,
                        backgroundSize: "200% 100%",
                        backgroundPosition: "right center",
                        transform: "translateZ(-8px) rotateY(180deg)",
                        borderRadius: "2px",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                      }}
                    />
                  </div>
                </div>
                <div className="book-3d__hint">
                  {page === 0 ? "Drag to rotate · Tap to open" : "Drag to rotate · Tap to reopen"}
                </div>
              </div>
            )}

            {box && (
              <div
                style={{
                  transform: orientation === "landscape"
                    ? (page === 0 ? "translateX(-25%)" : page === total - 1 ? "translateX(25%)" : "translateX(0)")
                    : "translateX(0)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: show3D ? 0 : 1,
                  pointerEvents: show3D ? "none" : "auto",
                  position: show3D ? "absolute" : "relative",
                  zIndex: show3D ? 0 : 2,
                  transition: "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
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
                  <Page hard src={album.coverFront} alt={`${album.title} — front cover`} isLeft={false} page={page} total={total} />
                  {singlePages.map((item, i) => (
                    <Page
                      key={`${item.src}-${item.splitSide}`}
                      src={item.src}
                      splitSide={item.splitSide}
                      alt={`${album.title} — sheet ${item.idx + 1}`}
                      isLeft={i % 2 === 0}
                      page={page}
                      total={total}
                    />
                  ))}
                  <Page hard src={album.coverBack} alt={`${album.title} — back cover`} isLeft={true} page={page} total={total} />
                </HTMLFlipBook>
              </div>
            )}
          </div>
        )}

        {/* Floating Zoom Control (Desktop) */}
        {!showRotate && (
          <div className="flipbook__zoom-control flipbook__zoom-control--desktop">
            <button className="flipbook__zoom-btn" onClick={zoomIn} disabled={zoomScale >= 1.5} aria-label="Zoom in" title="Zoom in">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
                <line x1="11" y1="8" x2="11" y2="14" />
              </svg>
            </button>
            <div className="flipbook__zoom-divider" />
            <button className="flipbook__zoom-btn" onClick={zoomOut} disabled={zoomScale <= 0.5} aria-label="Zoom out" title="Zoom out">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Controls — hidden while prompting to rotate */}
      {!showRotate && (
        <div className="flipbook__controls" style={{ position: "relative", zIndex: 1 }}>
          <div className="flipbook__center-controls">
            <span className="flipbook__counter">{label}</span>
            <span className="flipbook__tap-hint">(Tap pages to turn)</span>
            <div className="flipbook__nav-row">
              <div className="flipbook__quick-jump">
                <button
                  className={`flipbook__jump-btn ${page === 0 ? "active" : ""}`}
                  onClick={() => jumpToPage(0)}
                  data-hover
                  title="Go to front cover"
                >
                  Front
                </button>
                <button
                  className={`flipbook__jump-btn ${isMiddleActive ? "active" : ""}`}
                  onClick={() => jumpToPage(middlePage)}
                  data-hover
                  title={`Go to middle page (${middleLabel})`}
                >
                  Middle
                </button>
                <button
                  className={`flipbook__jump-btn ${page === total - 1 ? "active" : ""}`}
                  onClick={() => jumpToPage(total - 1)}
                  data-hover
                  title="Go to back cover"
                >
                  Back
                </button>
              </div>
              <div className="flipbook__page-jump-form">
                <input
                  type="number"
                  min="1"
                  max={total - 2}
                  value={pageInputValue}
                  onChange={(e) => setPageInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePageJump();
                    }
                  }}
                  placeholder="Pg #"
                  className="flipbook__page-jump-input"
                  aria-label="Jump to page number"
                />
                <button
                  type="button"
                  onClick={handlePageJump}
                  className="flipbook__page-jump-btn"
                  data-hover
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {copied && <div className="flipbook__toast">Link copied ✓</div>}
      {copyFailed && (
        <div className="flipbook__toast" style={{ background: "var(--kumkum, #ef4444)" }}>
          Could not copy link automatically. Please copy the URL from address bar.
        </div>
      )}
      {iosFsTip && (
        <div className="flipbook__toast" style={{ maxWidth: "85%", textAlign: "center", lineHeight: "1.4" }}>
          iPhone browsers don't support native fullscreen. Add to Home Screen to view without the URL bar!
        </div>
      )}

      {/* Unified Mobile Controls Toolbar (visible on portrait mobile) */}
      {!showRotate && (
      <div className="flipbook__mobile-controls">
        {/* Music Toggle */}
        <button className="flipbook__icon-btn" onClick={toggleMusicMuted} data-hover aria-label={musicMuted ? "Unmute music" : "Mute music"}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            {musicMuted && <line x1="3" y1="3" x2="21" y2="21" />}
          </svg>
        </button>
        {/* Mute/Unmute Toggle */}
        <button className="flipbook__icon-btn" onClick={toggleMuted} data-hover aria-label={muted ? "Unmute album" : "Mute album"}>
          {muted ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
        <button className="flipbook__icon-btn" onClick={share} data-hover aria-label="Share album">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
          </svg>
        </button>
        <button className="flipbook__icon-btn" onClick={zoomOut} data-hover aria-label="Zoom out" title="Zoom out" disabled={zoomScale <= 0.5}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button className="flipbook__icon-btn" onClick={zoomIn} data-hover aria-label="Zoom in" title="Zoom in" disabled={zoomScale >= 1.5}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
            <line x1="11" y1="8" x2="11" y2="14" />
          </svg>
        </button>
        <button className="flipbook__icon-btn flipbook__icon-btn--fs" onClick={toggleFullscreen} data-hover aria-label="Toggle fullscreen">
          {isFs || isIosFs ? (
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
      )}
    </div>
  );
}

/* ── Fallback: a plain vertical gallery if the flip engine fails ─────── */
function GalleryFallback({ album }) {
  const singlePages = [];
  album.pages.forEach((src, idx) => {
    singlePages.push({ src, splitSide: "left", idx });
    singlePages.push({ src, splitSide: "right", idx });
  });

  return (
    <div className="flipbook flipbook--fallback">
      <div className="flipbook__bar">
        <Link href="/albums" className="flipbook__back" data-hover>← Albums</Link>
        <span className="flipbook__title">{album.title}</span>
        <span />
      </div>
      <div className="flipbook__gallery" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "2rem 0" }}>
        {/* Front Cover */}
        <img src={album.coverFront} alt={`${album.title} — front cover`} className="flipbook__gallery-img" />

        {/* Inner Pages (Split Spreads) */}
        {singlePages.map((item, i) => (
          <div
            key={`${item.src}-${item.splitSide}`}
            className="flipbook__gallery-img-wrap"
            style={{
              position: "relative",
              width: "min(92vw, 520px)",
              aspectRatio: "1.5",
              borderRadius: "8px",
              border: "1px solid var(--border-2)",
              overflow: "hidden"
            }}
          >
            <img
              src={item.src}
              alt={`${album.title} — page ${i + 1}`}
              style={{
                position: "absolute",
                top: 0,
                left: item.splitSide === "left" ? 0 : "-100%",
                width: "200%",
                height: "100%",
                maxWidth: "none",
                objectFit: "cover"
              }}
            />
          </div>
        ))}

        {/* Back Cover */}
        <img src={album.coverBack} alt={`${album.title} — back cover`} className="flipbook__gallery-img" />
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
