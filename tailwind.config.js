/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    extend: { colors: { light: "#79A9AE" } },
    fontFamily: {
      sans: ["GmarketSansMedium"],
    },
  },
  plugins: [require("daisyui"), "twin.macro"],
  daisyui: { themes: [{ mytheme: { primary: "#3B6A5C" } }] },
};
