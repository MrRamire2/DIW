/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary": "#495F41",
        "secondary": "#FF5666",
      },
      spacing: {
        0.75: "6px",
      }
    },
  },
  plugins: [],
}

