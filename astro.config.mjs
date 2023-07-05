import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import UnoCSS from "unocss/astro";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), UnoCSS({ injectReset: true })],
  adapter: vercel(),
});
