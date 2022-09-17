/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {},
      backgroundImage: {
        galaxy: "url('/bg-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 33.08%, #43E7AD 63.94%, #E1D55D 24.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
    },
  },
  plugins: [],
}
