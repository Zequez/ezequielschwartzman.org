import { defineConfig, presetTypography } from "unocss";
import presetWind from "@unocss/preset-wind";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  rules: [
    ["text-shadow-light-sm", { "text-shadow": "0 1px 0 #fff" }],
    [
      /^text-shadow-dark-sm(\/([\d]+))?$/,
      ([_1, _2, num]) => ({
        "text-shadow": `0 1px 0 rgba(0,0,0,${num ? parseInt(num) * 0.01 : 1})`,
      }),
    ],
  ],
  theme: {
    breakpoints: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  presets: [
    presetWind(),
    presetTypography({
      selectorName: "markdown",

      cssExtend: {
        code: {
          color: "#8b5cf6",
        },
        "a:hover": {
          color: "#f43f5e",
        },
        "a:visited": {
          color: "#14b8a6",
        },
        "h1, h2, h3, h4, h5": {
          "font-family": "BioRhyme",
        },
        img: {
          margin: "0 auto",
          "border-radius": "0.25rem",
        },
      },
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        serif: "BioRhyme",
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
});
