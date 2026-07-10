/**
 * pages/_document.jsx
 *
 * Sets <html lang="en"> for SEO/accessibility (screen readers + search engines
 * need the document language). Fonts are loaded via @import in globals.css, so
 * this document stays minimal — just the language attribute and the standard
 * Next.js document scaffolding.
 */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
