// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'custom-340': '340px', // Add custom width
      },
      height: {
        'custom-350': '350px', // Add custom height
      },
      colors: {
        'custom-bg': '#1f2641',
      },
      fontFamily: {
        Catamaran: ['Catamaran', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

