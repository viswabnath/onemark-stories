/**
 * Footer.jsx — Editorial minimal footer.
 * No CTA banner (handled by ClosingCTA section above).
 */
import Image from "next/image";
import Link from "next/link";
import { MAIN_SOCIALS } from "../data/socials";

function SocialPill({ label, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="social-pill"
      data-hover
    >
      {icon}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__watermark" aria-hidden="true">stories</div>
      <div className="blob footer__blob" />

      <div className="footer__inner">

        {/* Top — logo + social pills */}
        <div className="footer__top">
          <Link href="/" className="footer__logo-link">
            <Image
              src="/stories-logo-blue-resized.png"
              alt="OneMark Stories"
              width={150}
              height={44}
              style={{ objectFit: "contain", objectPosition: "left" }}
            />
          </Link>
          <div className="footer__socials">
            {MAIN_SOCIALS.map((s) => (
              <SocialPill key={s.href} {...s} />
            ))}
          </div>
        </div>

        {/* Mid — tagline + links */}
        <div className="footer__mid">
          <div className="footer__tagline">
            <p>
              Crafting bespoke digital experiences<br />
              for weddings, events, and every moment<br />
              that deserves to be remembered.
            </p>
            <span className="footer__location">
              Kakinada, Andhra Pradesh &middot; India
            </span>
          </div>

          <div className="footer__links">
            <div className="footer__links-col">
              <span className="footer__links-heading">Navigate</span>
              <Link href="/#work" className="footer__link">Our Work</Link>
              <Link href="/#pricing" className="footer__link">Pricing</Link>
              <Link href="/#about" className="footer__link">About</Link>
            </div>
            <div className="footer__links-col">
              <span className="footer__links-heading">Connect</span>
              <a
                href="https://www.instagram.com/stories.onemark"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                @stories.onemark
              </a>
              <a
                href="https://www.instagram.com/onemark.digi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                @onemark.digi
              </a>
              <a
                href="https://onemark.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                onemark.digital ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer__divider" />

        {/* Bottom — copyright */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            &copy; {new Date().getFullYear()} &middot;{" "}
            <a
              href="https://onemark.digital"
              target="_blank"
              rel="noopener noreferrer"
            >
              onemark.digital
            </a>
          </span>
          <span className="footer__domain">stories.onemark.co.in</span>
        </div>
      </div>
    </footer>
  );
}
