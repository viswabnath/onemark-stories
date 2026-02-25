/**
 * context/ThemeContext.jsx
 *
 * Global light/dark mode provider.
 * - Reads from localStorage on first load
 * - Falls back to system preference (prefers-color-scheme)
 * - Writes class "dark" or "light" to <html> element
 * - Exposes { theme, toggleTheme } to any component via useTheme()
 */

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved preference, or detect system preference
    const saved = localStorage.getItem("om-theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = saved || system;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("om-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  // Prevent flash of wrong theme
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
