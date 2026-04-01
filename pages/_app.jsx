/**
 * pages/_app.jsx
 *
 * CHANGES vs original (if you had a bare _app or none):
 *  1. Wraps the app in <Analytics /> from @vercel/analytics — zero-config,
 *     works automatically on Vercel deployments.
 *  2. Exposes a global `window.trackEvent(name, props)` helper so any
 *     component can fire analytics events without importing the library.
 *  3. Fires page-view events on route changes for SPAs.
 *
 * INSTALL:
 *   npm install @vercel/analytics
 *
 * If you later want Google Analytics instead, swap <Analytics /> for
 * the gtag script in pages/_document.jsx and update trackEvent to call
 * window.gtag('event', name, props).
 */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Analytics, track } from "@vercel/analytics/react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Expose a global helper so any component can track without imports:
    // window.trackEvent("pricing_click", { tier: "Bloom" })
    window.trackEvent = (name, props = {}) => {
      try {
        track(name, props);
      } catch (_) { /* graceful no-op if analytics blocked */ }
    };

    // Track route changes as page views
    const handleRouteChange = (url) => {
      window.trackEvent?.("page_view", { url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
      {/* Vercel Analytics — automatically active on vercel.com deployments */}
      <Analytics />
    </>
  );
}