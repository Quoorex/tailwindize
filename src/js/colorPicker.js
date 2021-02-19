import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/classic.min.css";

export function initColorPicker() {
  return Pickr.create({
    el: ".color-picker",
    theme: "classic",
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
        hsla: true,
        hsva: true,
        input: true,
        save: true,
      },
    },
  });
}
