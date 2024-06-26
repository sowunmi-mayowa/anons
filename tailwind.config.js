/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif']
      },
      colors:{
        anonRed: "#E65050",
        anonBlue: "#009CBB",
        anonLightBlue: "#D7E3EC"
      }
    },
  },
  plugins: [],
}

