/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      aspectRatio: {
        'card': '38 / 58'
      }
    },
  },
  plugins: [],
}
