/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'] },
      colors: { paper: '#f3f6ef', night: '#0f160d', nightcard: '#18221a', leaf: '#14532d', marigold: '#f2a900', wa: '#1faa59' },
    },
  },
  plugins: [],
}
