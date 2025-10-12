/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        modrinth: {
          green: '#1bd96a',
          dark: '#0f172a',
          darker: '#0a0f1e',
        }
      }
    },
  },
  plugins: [],
}

