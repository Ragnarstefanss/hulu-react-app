module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens:{
        "3xl":"200px",
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  mode:"jit",
}
