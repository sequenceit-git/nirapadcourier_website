/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#006837',
          red: '#C4161C',
          dark: '#013220',
          light: '#f8fafc',
          paper: '#F3F5F0',
          ink: '#0C1A12'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '"Hind Siliguri"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Hind Siliguri"', 'system-ui', 'sans-serif'],
        bengali: ['"Hind Siliguri"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

