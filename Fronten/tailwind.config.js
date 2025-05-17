// tailwind.config.js
module.exports = {
  darkMode: 'class', // ⬅️ THIS IS IMPORTANT!
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       fontFamily: {
        roobert: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
