// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // The default sans-serif font
        sans: ["var(--font-geist-sans)"],
        // The default monospace font
        mono: ["var(--font-geist-mono)"],
        // Your custom Inter font
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};