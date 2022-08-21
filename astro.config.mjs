import { defineConfig } from "astro/config";
import image from '@astrojs/image';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  outDir: "./output/dist",
  site: "https://odoe.net",
  integrations: [image(), sitemap()],
});
