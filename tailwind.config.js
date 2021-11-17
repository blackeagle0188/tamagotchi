module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    maxHeight: {
      "half": "50vh"
    },
    width: {
      "1/5": "200px"
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
