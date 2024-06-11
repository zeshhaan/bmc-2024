/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#9B62E0",
        black: "#222222",
        secondary: "#FDEFBE",
      },
    },
  },
  plugins: [],
};
