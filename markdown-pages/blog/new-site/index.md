---
title: "New Site, Who Dis?"
published: true
author: Rene Rubalcava
date: "2020-12-29"
tags: geodev, dojo
coverImage: "image.jpg"
---

It's been a _looong_ time coming, but I have finally migrated the old [wordpress site](https://web.archive.org/web/20201101102853/http://odoe.net/) to something easier to maintain and update. I also didn't want to set up a script for ftp publishing and wanted to try and keep everything in a simple work flow.

There were quite a few challenges to this task, but at the end of the day, I'm able to easily update the site, work on small tweaks here and there, and post new content much easier than before. I ran into quite a few issues with the wordpress site.

* Unable to use automatic update, it would just fail with random file copy errors.
* I had to do manual updates and that required a database backup _just in case_.
* Because I couldn't easily update, I became concerned about security.

I just couldn't do it anymore. I also got hung up in all the analytics of setting up wordpress. There were so many things I could do, but at the end of the day, I don't think I need much beyond some Google Analytics to make me feel warm inside.

## The work

So how is this new site built? I learned a lot building [learn-dojo](https://learn-dojo.com/), which is going to benefit from a lot of the work I've done on this site. As you could probably guess, that site, and this one are built with [dojo](https://dojo.io/). I had considered [Gatsby](https://www.gatsbyjs.com/), or [11ty](https://www.11ty.dev/). Of the two, I really liked 11ty, but I wanted to really dig in and have a bit more control over some stuff. Plus, I really like working with Dojo, and in particular its [Build-time rendering](https://dojo.io/learn/building/buildtime-rendering), which is the Dojo way of static site generation.

The most work went into cleaning up the markdown files. There are wordpress plugins for exporting a site to markdown and downloading the images. They work fine, but over the years, I've had code syntax plugins break, and had to change from one to another, so there was quite a mix of ways that code blocks were written. This caused build errors I couldn't track down right and was a major headache. I was able to use [markdownlint](https://github.com/markdownlint/markdownlint) to help me track down major issues, after I flipped a couple of tables.

> If you happen to find an error in a blog post, please make an issue [here](https://github.com/odoe/odoenet/issues), maybe even a PR!

I also wanted to update all the [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype) tooling I was using from the `learn-dojo` site. This was tricky, as remark recently made some updates that required me updating other plugins which may have had some odd issues. Plus, as I was cleaning up markdown, I wasn't aware of some weird markdown breaking something, and it was quite a task to track some of these issues down. I still can't get [remark-frames](https://www.npmjs.com/package/remark-iframes) to work, and _I don't know why_. 🤷

The structure of the site is definitely inspired by Gatsby and [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), and I think I can simplify some of this even more.

What is really great with Dojo, is the ability to use [blocks](https://learn-dojo.com/dojo-from-the-blocks/) for Build-time rendering. This is where I use all the remark/rehype stuff to transform markdown to vdom, pull some meta info out and do all the work of turning markdown to pages. This gives me some fine-grained control to do certain things and I'm a huge fan of these kind of details.

## Workflow

The workflow building and deploying this site is now pretty seemless for me.

1. Publish to [github repo](https://github.com/odoe/odoenet)
2. Deploy to [vercel](https://vercel.com) from github
3. Proxied through [cloudflare](https://www.cloudflare.com/)

So I get all the benefits of vercel builds and cloudflare CDN and more. _It's amazing!_

I have to give a shout out to [hosting trends](http://hostingtrends.com/), which have hosted my site since [around 2003](https://web.archive.org/web/20030524051651/http://odoe.net/) when it was just for shitposting. It's a small shop, but the customer service has been superb. I stuck with them for almost 20 years for a reason.

## Thank you

The upcoming content will still include plenty of geodev and [ArcGIS JSAPI](https://developers.arcgis.com/javascript/), but I'll be including some more web dev and TypeScript content as well. So stay tuned for more. It's so easy to post now!

If you want to keep up to date, you can subscribe to the [rss](https://odoe.net/atom.xml). You could even sign up for the newsletter below. Emails should start going out again once I make some mailchimp updates.




