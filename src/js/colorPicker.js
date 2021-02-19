import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/nano.min.css";

export function initColorPicker() {
  return Pickr.create({
    el: ".color-picker",
    theme: "nano",
    swatches: [],
    closeOnScroll: true,
    components: {
      // Main components
      preview: true,
      hue: true,
      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        input: true,
        save: true,
      },
    },
  });
}
