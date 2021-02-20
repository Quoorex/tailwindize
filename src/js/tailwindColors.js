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

export { tailwindColors };
