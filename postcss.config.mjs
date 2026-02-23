// postcss.config.mjs
// This is the CORRECT format for Tailwind v4 with Next.js
// Do NOT use the old { plugins: { tailwindcss: {}, autoprefixer: {} } } format

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
