import alpinejs from "https://cdn.skypack.dev/alpinejs";

import nearestColorLib from "https://cdn.skypack.dev/nearest-color";
const nearestColor = nearestColorLib.from(tailwindColors);

import { initColorPicker } from "./colorPicker.js";
import { tailwindColors } from "./tailwindColors.js";

function changeSVGColor(color) {
  var svg = document.getElementById("hero-svg").contentDocument;
  var elements = svg.getElementsByClassName("primaryColor");
  for (var i = 0; i < elements.length; i++) elements[i].style.fill = color;
}

function changeColor(tailwindColor) {
  const elementIDs = [
    "preview-alert",
    "preview-progress-label",
    "preview-progress-status",
    "preview-user-profile",
    "hero-preview-highlighted-button",
  ];

  // Change the color of all preview elements.
  for (const elementID of elementIDs) {
    var element = document.getElementById(elementID);
    element.style.backgroundColor = tailwindColor;
  }
  changeSVGColor(tailwindColor);
  // TODO: Alert when using non-default Tailwind colors
  // Implement this using AlpineJS
}

function main() {
  const colorPicker = initColorPicker();
  // Wait for color changes.
  colorPicker.on("save", function (color) {
    // Close the color picker.
    colorPicker.hide();
    // Retrieve the color from the color picker.
    color = color.toHEXA().toString();

    // Output the hex value.
    document.getElementById("hex").innerHTML = color;

    // Get the nearest tailwind color and output it.
    let tailwindColor = nearestColor(color);
    changeColor(tailwindColor.value);
    document.getElementById("color_name").innerHTML = tailwindColor.name;
  });
}

main();
