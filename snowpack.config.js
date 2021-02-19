// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: "/",
    public: "/",
  },
  buildOptions: {
    baseUrl: "",
  },
  packageOptions: {
    // Use the Skypack CDN.
    source: "remote",
  },
  plugins: ["@snowpack/plugin-postcss", "@snowpack/plugin-optimize"],
};
