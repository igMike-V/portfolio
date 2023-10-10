import type { Config } from 'tailwindcss'

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'aqua': '#0EB6BF',
      'dark': '#2D2E2D',
      'medium': '#8A8A8A',
      'light': '#FFFFFF',
      'translight': '#FFFFFF70',
      'transdark': '#00000070',
      'darkoverlay': '#000000e6',
    },
    fontFamily: {
      'heading': ['cheddar-gothic-serif', 'sans-serif'],
      'text': ['Inconsolata', 'monospace'],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'lgfix': '1190px',
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
  darkMode: 'class'
} satisfies Config