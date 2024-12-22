const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/css/tailwind.css'],
  theme: {
    extend: {
      colors: {
        'light': '#d2c6ff',
        'dark': '#342a45',
        'primary': '#6c35de',
        'secondary': '#a364ff',
        'border-dark': '#4d425f'
      },
      screens: {
        'sm': '370px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    addDynamicIconSelectors(),
  ],
}

