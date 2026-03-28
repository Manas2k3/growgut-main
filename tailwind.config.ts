import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/backend/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f1e7",
        forest: "#173c34",
        moss: "#4f7a61",
        sun: "#e3b65c",
        clay: "#a86f47"
      },
      boxShadow: {
        halo: "0 24px 120px rgba(23, 60, 52, 0.16)"
      },
      fontFamily: {
        sans: [
          "\"Avenir Next\"",
          "\"Helvetica Neue\"",
          "\"Segoe UI\"",
          "sans-serif"
        ],
        serif: [
          "\"Iowan Old Style\"",
          "\"Palatino Linotype\"",
          "\"Book Antiqua\"",
          "Georgia",
          "serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
