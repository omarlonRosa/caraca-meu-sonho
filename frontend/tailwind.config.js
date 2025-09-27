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
      'brand-primary': '#0D9488',
      'brand-secondary': '#F97316',
      'brand-dark': '#1E293B',
      'brand-light': '#F1F5F9',
      'brand-gray': '#94A3B8',
    },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
  },
 },
  plugins: [
     require('@tailwindcss/forms'),
  ],
}
