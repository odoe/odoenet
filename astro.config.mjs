import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  outDir: "./output/dist",
  site: "https://odoe.net",
  integrations: [sitemap()],
});
