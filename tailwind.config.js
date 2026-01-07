/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#9b59b6',
          DEFAULT: '#8e44ad',
          dark: '#6c3483',
        },
        secondary: '#f1c40f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '1rem',
        xl: '2rem',
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
