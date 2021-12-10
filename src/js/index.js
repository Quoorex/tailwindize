// Icons
import featherIcons from "https://cdn.skypack.dev/feather-icons@^4";
featherIcons.replace();

import nearestColorLib from "https://cdn.skypack.dev/nearest-color@^0";
const nearestColor = nearestColorLib.from(tailwindColors);

import { initColorPicker } from "./colorPicker.js";
import {
  tailwindColors,
  nonDefaultColorAlert,
  getColorDisplayName,
} from "./tailwindColors.js";

/*
Inits the copy button next to the
tailwind color name.
*/
function initColorCopyButton(colorOutput) {
  const copy_button = document.getElementById("tailwind-color-copy");
  copy_button.addEventListener("click", async (event) => {
    try {
      await navigator.clipboard.writeText(colorOutput.innerText);
    } catch (error) {
      console.error("clipboard copy failed", error);
    }
  });
}

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
    element.style.backgroundColor = tailwindColor.value;
  }
  changeSVGColor(tailwindColor.value);
  // Alert when using non-default Tailwind colors
  nonDefaultColorAlert(tailwindColor.name);
}

function main() {
  const colorOutput = document.getElementById("tailwind-color-name");

  initColorCopyButton(colorOutput);

  const colorPicker = initColorPicker();
  // Wait for color changes.
  colorPicker.on("save", function (color) {
    // Close the color picker.
    colorPicker.hide();
    // Retrieve the color from the color picker.
    color = color.toHEXA().toString();

    // Get the nearest tailwind color
    let tailwindColor = nearestColor(color);
    changeColor(tailwindColor);
    // Display it
    colorOutput.innerHTML = getColorDisplayName(tailwindColor.name);
    // Output the hex value.
    document.getElementById("tailwind-hex").innerHTML = tailwindColor.value;
  });
}

main();
