import Pickr from "https://cdn.skypack.dev/@simonwep/pickr@^1";

export function initColorPicker() {
  return Pickr.create({
    el: ".color-picker",
    theme: "classic",
    swatches: [],
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
    default: "#FFFFFF",
  });
}
