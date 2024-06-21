const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5C6AC4",
        greenSemaphore: "#008000",
        yellowSemaphore: "#F3A505",
        redSemaphore: "#CB3234",
        darkGray: "rgb(72,73,76)",
        inputBackground: "#EEEEEE",
        light: "#f0f0f0",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      fontFamily: {
        bebas: ["Bebas", "sans-serif"],
      },
      height: {
        "minus-header": "calc(100vh - 6rem)",
      },
      boxShadow: {
        "custom-light":
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        "custom-medium":
          "0 6px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)",
        "custom-heavy":
          "0 8px 15px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
