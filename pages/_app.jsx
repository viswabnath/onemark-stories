/**
 * pages/_app.jsx
 *
 * Next.js custom App — wraps every page.
 *
 * IMPORTANT: Global CSS must be imported HERE (Next.js rule).
 * We import from styles/globals.css — NOT from app/globals.css.
 * The app/globals.css is intentionally empty to avoid conflicts.
 */

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
