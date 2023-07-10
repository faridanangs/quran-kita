/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        'hindi-siliguri': ['Hind Siliguri', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif'],
        'arabic': ['Noto Sans Arabic', 'sans-serif'],
        'Lateef': ['Lateef', 'serif'],
      },
      
    },
  },
  darkMode: 'class',
  plugins: [],
}

