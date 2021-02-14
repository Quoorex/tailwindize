import { tailwindColors } from "./tailwindColors";
import nearestColorLib from "nearest-color";
const nearestColor = nearestColorLib.from(tailwindColors);

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
}

function main() {
  // Farbe aus ColorPicker auslesen
  var theInput = document.getElementById("kb_selected_color");
  var theColor = theInput.value;
  theInput.addEventListener("input", function () {
    // Farcode (Hex) schreiben
    document.getElementById("hex").innerHTML = theInput.value;
    // Farbvariable schreiben
    document.documentElement.style.setProperty("--kb-color", theInput.value);

    let tailwindColor = nearestColor(theInput.value);
    changeColor(tailwindColor.value);
    document.getElementById("color_name").innerHTML = tailwindColor.name;
  });
}

main();
