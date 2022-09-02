import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";

const postImportResult = import.meta.glob("./blog/**/*.md", { eager: true });
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: posts
      .sort(
        (a, b) =>
          new Date(b.frontmatter.pubDate).valueOf() -
          new Date(a.frontmatter.pubDate).valueOf()
      )
      .slice(0, 10) // only get first 10
      .map((post) => ({
        link: post.url,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.pubDate,
      })),
  });
