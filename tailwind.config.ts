import type { Config } from 'tailwindcss'

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'aqua': '#0EB6BF',
      'dark': '#2D2E2D',
      'light': '#E6E6E6',
      'translight': '#FFFFFF70',
      'transdark': '#00000070',
    },
    fontFamily: {
      'heading': ['cheddar-gothic-serif', 'sans-serif'],
      'text': ['Inconsolata', 'monospace'],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
  darkMode: 'class'
} satisfies Config