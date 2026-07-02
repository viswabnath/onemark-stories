/**
 * components/Icon.jsx — small inline line-icon set (stroke = currentColor).
 *
 * Keeps the UI emoji-free. Usage: <Icon name="rings" size={22} />
 */
const PATHS = {
  rings: (
    <>
      <circle cx="9" cy="14" r="6" />
      <circle cx="15" cy="14" r="6" />
      <path d="M7 4l2 3M17 4l-2 3M9 3h6" />
    </>
  ),
  gem: (
    <>
      <path d="M6 3h12l3 5-9 13L3 8z" />
      <path d="M3 8h18M9 3 7.5 8 12 21 16.5 8 15 3" />
    </>
  ),
  cake: (
    <>
      <path d="M4 21h16M5 21v-8h14v8M4 13c1.2 0 1.2-1.5 2.5-1.5S7.8 13 9 13s1.2-1.5 2.5-1.5S12.8 13 14 13s1.2-1.5 2.5-1.5S17.8 13 19 13" />
      <path d="M12 4v3M12 4l-1 1M12 4l1 1" />
    </>
  ),
  house: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12l8-8 10 1 1 10-8 8z" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" />
      <path d="M5 12v9h14v-9M12 8v13" />
      <path d="M12 8S11 3 8.5 3 6 6 12 8zM12 8s1-5 3.5-5S18 6 12 8z" />
    </>
  ),
  heart: (
    <path d="M12 21s-7-4.6-9.5-9C1 9 2.5 5 6 5c2 0 3.2 1.3 4 2.5C10.8 6.3 12 5 14 5c3.5 0 5 4 3.5 7-2.5 4.4-9.5 9-9.5 9z" />
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),
  send: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4z" />
    </>
  ),
  book: (
    <>
      <path d="M12 5c-2-1.4-5-1.4-8-1v14c3-.4 6-.4 8 1 2-1.4 5-1.4 8-1V4c-3-.4-6-.4-8 1z" />
      <path d="M12 5v14" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </>
  ),
};

export default function Icon({ name, size = 22, className = "", strokeWidth = 1.6 }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}
