module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}