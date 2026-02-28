/**
 * components/Hero/index.jsx
 * Hero section — Cinematic Aura Background, removing the tech-agency grid.
 */
import HeroCanvas from "./HeroCanvas";
import { useTheme } from "../../context/ThemeContext";

const WA_NUMBER = "919392704742"; 
const WA_MSG    = encodeURIComponent("Hi OneMark Stories! 👋 I'd love to get a custom digital experience made. Can we talk?");
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const HEADLINE = [
  { text: "Your Story",    delay: "0.15s", gradient: false },
  { text: "Deserves",      delay: "0.27s", gradient: false },
  { text: "a Page.",       delay: "0.39s", gradient: true  },
];

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section id="hero" className="hero-aura-bg" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      {/* Premium film grain overlay */}
      <div className="hero-noise" />
      
      {/* Your interactive 3D particle canvas */}
      <HeroCanvas theme={theme} />

      <div className="hero__content" style={{ position: "relative", zIndex: 10 }}>
        <div className="sec-label hero__label">Moments Told By Onemark</div>

        {/* Headline */}
        <h1 className="hero__headline">
          {HEADLINE.map(({ text, delay, gradient }) => (
            <div key={text} className="hero__line">
              <span className={`hero__word ${gradient ? "hero__word--gradient" : ""}`}
                style={{
                  display: "inline-block",
                  animation: `revealWord 1s cubic-bezier(.16,1,.3,1) ${delay} both`,
                }}>
                {text}
              </span>
            </div>
          ))}
        </h1>

        {/* Sub-headline */}
        <p className="hero__sub" style={{ animation: "fadeUp 1s .5s both" }}>
          Getting married? Planning an event? We build a beautiful custom website just for you — 
          your guests open one link and feel the magic before the day even arrives.
        </p>

        {/* CTAs */}
        <div className="hero__ctas" style={{ animation: "fadeUp 1s .6s both" }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Start Your Story
          </a>
          <a href="#work" className="mag-btn" style={{ padding: "13px 26px" }}>
            See Our Work ↗
          </a>
        </div>
      </div>

      <div className="hero__scroll" style={{ animation: "fadeUp 1s .8s both" }}>
        <div className="hero__scroll-label">SCROLL</div>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}