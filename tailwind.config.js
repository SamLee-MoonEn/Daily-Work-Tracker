/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./**/*.{ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    extend: {
      colors: { light: "#79A9AE", main: "#3B6A5C" },
      boxShadow: {
        radioInner: "0 0 0 4px white inset",
      },
    },
    fontFamily: {
      sans: ["GmarketSansMedium"],
    },
  },
  plugins: [require("daisyui")],
};
