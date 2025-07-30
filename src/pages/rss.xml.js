import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  const post = posts[0];
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .sort(
        (a, b) =>
          new Date(b.data.pubDate).valueOf() -
          new Date(a.data.pubDate).valueOf(),
      )
      .slice(0, 10) // only get first 10
      .map((post) => ({
        link: `/blog/${post.id}/`,
        title: post.data.title,
        pubDate: post.data.pubDate,
      })),
  });
}
