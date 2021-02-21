// Syntax highlighting for the config example
import hljs from "https://cdn.skypack.dev/highlight.js/lib/core";
import javascript from "https://cdn.skypack.dev/highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

// Borrowed from Zhigang Fang
// https://github.com/zhigang1992/nearestTailwindColor/blob/master/index.js

import colors from "https://cdn.skypack.dev/tailwindcss/colors";
const tailwindColors = {};

for (let colorsKey in colors) {
  if (typeof colors[colorsKey] === "string") {
    tailwindColors[colorsKey] = colors[colorsKey];
  } else {
    for (let nestedKey in colors[colorsKey]) {
      tailwindColors[`${colorsKey}-${nestedKey}`] =
        colors[colorsKey][nestedKey];
    }
  }
}

// Source: https://github.com/edjw/find-nearest-tailwind-colour/blob/master/src/components/tailwindResult.svelte

const defaultTailwindColors = [
  "black",
  "white",
  "coolGray", // Aliased to gray
  "red",
  "amber", // Aliased to yellow
  "emerald", // Aliased to green
  "blue",
  "indigo",
  "violet", // Aliased to purple
  "pink",
];

const defaultTailwindAliases = {
  black: "black",
  white: "white",
  gray: "coolGray", // aliased away
  red: "red",
  yellow: "amber", // aliased away
  green: "emerald", // aliased away
  blue: "blue",
  indigo: "indigo",
  purple: "violet", // aliased away
  pink: "pink",
};

const aliasedAwayColors = {
  coolGray: "gray",
  amber: "yellow",
  emerald: "green",
  violet: "purple",
};

/*
Checks if the color is already included
in the default Tailwind config.
If not, a text will be displayed on the site.
@param {String} tailwindColorName
*/
function nonDefaultColorAlert(tailwindColorName) {
  // Remove the shade from the color name
  // (indigo-900 -> indigo)
  // Ignore colors such as 'black' or 'white' -> no '-' present
  if (tailwindColorName.includes("-")) {
    tailwindColorName = tailwindColorName.slice(0, -4);
  }

  const alertSection = document.getElementById("non-default-color-section");

  if (defaultTailwindColors.includes(tailwindColorName) === false) {
    // TODO: Handle colors like gray and yellow, which are by default only aliases

    // Insert the config preview
    document.getElementById(
      "config-preview"
    ).innerText = generateTailwindConfig(tailwindColorName);
    // Highlight the code
    hljs.highlightAll();

    // Display the alert section
    alertSection.style.display = "block";
  } else {
    // Hide the alert section
    alertSection.style.display = "none";
  }
}

/*
Generates an example Tailwind config file
for including a custom color.
*/
function generateTailwindConfig(tailwindColorName) {
  return `const colors = require("tailwindcss/colors");
module.exports = {
  theme: {
    extend: {
      colors: {
        ${tailwindColorName}: colors.${tailwindColorName}
      }
    }
  }
};`;
}

export { tailwindColors, nonDefaultColorAlert };
