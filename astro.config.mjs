import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  outDir: "./output/dist",
  site: "https://odoe.net",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: "nofollow" }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "before" }],
    ],
  },
});
