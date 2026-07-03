/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#D95D39',
          light: '#E57D5D',
          dark: '#B84524',
          solid: '#D95D39',
        },
        saffron: {
          DEFAULT: '#F2B824',
          light: '#F6C852',
          dark: '#C49010',
          solid: '#F2B824',
        },
        bananaleaf: {
          DEFAULT: '#2C5E3B',
          light: '#3C7F50',
          dark: '#1B3D25',
          solid: '#2C5E3B',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          dark: '#F3EFE9',
          surface: '#FFFFFF',
        },
        charcoal: {
          DEFAULT: '#232321',
          light: '#42423F',
          dark: '#161615',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
