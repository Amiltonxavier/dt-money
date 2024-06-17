/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-202024': '#202024',
        'gray-121214': '#121214',
      }
    },
  },
  plugins: [],
}