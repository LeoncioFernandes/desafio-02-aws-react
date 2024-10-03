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
      },
      keyframes: {
        'open-menu': {
          '0%': { width: '0px'},
          '100%': {width: '12rem'}
        },
        'close-menu': {
          '0%': {width: '12rem'},
          '100%': {width: '0'}
        },
      },
      animation: {
        'to-open': 'open-menu 0.5s forwards',
        'to-close': 'close-menu 0.5s forwards',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements', nocompatible: true }),
  ],
}

