import { defineConfig, presetTypography } from "unocss";
import presetWind from "@unocss/preset-wind";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
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
