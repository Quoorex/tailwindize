// Syntax highlighting for the config example
import hljs from "https://cdn.skypack.dev/highlight.js/lib/core";
import javascript from "https://cdn.skypack.dev/highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

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

const aliasedAwayColors = {
  coolGray: "gray",
  amber: "yellow",
  emerald: "green",
  violet: "purple",
};

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

/*
Removes '-900' and so on from the name
of a Tailwind color using a regular expression.
@param {String} tailwindColorName
*/
function removeColorShade(tailwindColorName) {
  return tailwindColorName.replace(/-[0-9]*/, "");
}

/*
Returns a string used for displaying the color name.
This includes additional hints regarding default aliases.
@param {String} tailwindColorName
*/
function getColorDisplayName(tailwindColorName) {
  // TODO: Present color hints in a separate text box
  const noShadeColorName = removeColorShade(tailwindColorName);
  if (aliasedAwayColors.hasOwnProperty(noShadeColorName)) {
    const aliasColor = aliasedAwayColors[noShadeColorName];
    return `${tailwindColorName} (aliased to '${aliasColor}' by default)`;
  } else if (Object.values(aliasedAwayColors).includes(noShadeColorName)) {
    return `${tailwindColorName} (not the same as the default color of the same name)`;
  } else {
    return tailwindColorName;
  }
}

/*
Checks if the color is already included
in the default Tailwind config.
If not, a text will be displayed on the site.
@param {String} tailwindColorName
*/
function nonDefaultColorAlert(tailwindColorName) {
  tailwindColorName = removeColorShade(tailwindColorName);

  const alertSection = document.getElementById("non-default-color-section");
  const configPreview = document.getElementById("config-preview");
  const configPreviewText = document.getElementById("config-preview-text");

  if (defaultTailwindColors.includes(tailwindColorName) === false) {
    // Generate and insert the config preview data
    configPreviewText.innerText = generateConfigDescription(tailwindColorName);
    configPreview.innerText = generateTailwindConfig(tailwindColorName);
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
Generates the text describing the generated
example config file.
@param {String} tailwindColorName
*/
function generateConfigDescription(tailwindColorName) {
  return `The color ${tailwindColorName} is not included in the default Tailwind color palette and has
  to be manually enabled in your tailwind.config.js.`;
}

/*
Generates an example Tailwind config file
for including a custom color.
@param {String} tailwindColorName
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

export { tailwindColors, nonDefaultColorAlert, getColorDisplayName };
