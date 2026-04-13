import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Display", "Inter", "sans-serif"],
      },
      colors: {
        brand: {
          heading: "#2d2d2d",
          body: "#5a5a5a",
          caption: "#777777",
          paragraph: "#959595",
          strong: "#171717",
          dark: "#1f1f1f",
          primary: "#335cff",
          green: "#16681e",
          "green-bg": "#e7f6e8",
        },
        surface: {
          stroke: "#eaeaea",
          overlay: "#3c3c3c",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
