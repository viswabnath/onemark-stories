/**
 * pages/_app.jsx
 * Wraps entire app with ThemeProvider for light/dark mode.
 */
import "../styles/globals.css";
import { ThemeProvider } from "../context/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
