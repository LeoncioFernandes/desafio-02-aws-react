/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sofiasans: ['Sofia Sans', 'sans-serif']
      },
      lineHeight: {
        130: "130%"
      },
      colors: {
        primary: "#FAFFFD",
        secondary: "#FF8100",
        secondary2: "#FFE2C3",
        tertiary: "#272635",
        blackText: "#0C0C0C",
        gray: {
          light: "#F3F3F3",
          dark: "#BABABA",
        },
      }
    },
  },
  plugins: [],
}

