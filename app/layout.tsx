/**
 * app/layout.tsx
 *
 * This file was created by create-next-app.
 * Since we're using the `pages/` router (not App Router),
 * this layout is not used for our pages — but Next.js still
 * requires it to exist if the `app/` directory is present.
 *
 * We import the now-empty app/globals.css to satisfy Next.js.
 * Our actual styles come from styles/globals.css via pages/_app.jsx.
 */

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OneMark Creative",
  description: "Premium digital experiences for life's most memorable moments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
