/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "rich-black": "#041A1F",
        "ecru": "#BFA473",
        "dun": "#DED1B7",
        "baby-powder": "#FDFEFA",
      },
      spacing: {
        0.75: "6px",
      },
      backgroundImage: {
        'background': "url('./src/UD3/images/fondo2.gif')",
      }
    },
  },
  plugins: [],
}

