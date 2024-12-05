const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/css/tailwind.css'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    addDynamicIconSelectors(),
  ],
}

