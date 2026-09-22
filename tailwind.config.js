/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        },
        ube: {
          DEFAULT: '#733878',
          light: '#8E4D94',
          dark: '#532457',
          soft: '#F5ECF7',
          solid: '#733878',
        },
        cacao: {
          DEFAULT: '#4A2E1B',
          light: '#6E472D',
          dark: '#301C10',
          soft: '#F7F2EE',
          solid: '#4A2E1B',
        },
        calamansi: {
          DEFAULT: '#8DAA36',
          light: '#A6C643',
          dark: '#6C8426',
          soft: '#F3F7E6',
          solid: '#8DAA36',
        },
        caramel: {
          DEFAULT: '#C87D32',
          light: '#DD974E',
          dark: '#9A5A1E',
          soft: '#FAF1E6',
          solid: '#C87D32',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
