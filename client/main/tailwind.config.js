// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS and TS files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
