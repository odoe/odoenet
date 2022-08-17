---
layout: "../../layouts/BlogPost.astro"
title: "Using non-basemap Vector Tiles"
published: true
author: Rene Rubalcava
pubDate: "2016-06-06"
tags: geodev
coverImage: "vt-package.png"
---

Recently I started having some fun with [ArcGIS Pro](http://pro.arcgis.com/en/pro-app/). I used ArcView 3.x and ArcINFO back in the day and ArcMap for years to make maps, but my time with ArcGIS Pro was really limited.

Yes, I do more web development than anything else, but at the end of the day, I'm still a spatial developer and I think that means even if I am mainly a web developer, I should still keep up to speed with using desktop tools. I want to keep those desktop skills _finely tuned_.

So I decided to mess around with Vector Tiles a bit.

I found this [easy to follow guide](http://ryanruthart.com/using-arcgis-pro-to-create-a-hexbin-grid-and-reshape-polygon-data/) on creating hexbins in ArcGIS Pro. Now, I'm not a fan of hexbins really, but they do make for some nice aggregation and visuals, and I wanted to see what kind of trouble I could get into.

It took a little trial and error, but eventually I got some hexbin data that I was happy with and then I did a spatial join and summed up the data per bin based on US Census Block populations.

Then for the heck of it, I created a [Vector Tile Package](http://pro.arcgis.com/en/pro-app/tool-reference/data-management/create-vector-tile-package.htm) that I uploaded to ArcGIS Online to create a Vector Tile service. I really just wanted to try out creating some background data that wasn't necessarily a basemap that I could use Vector Tiles for.

I show how to upload your Vector Tile package in the following short video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/X65pDlsSxMY" frameborder="0" allowfullscreen></iframe>

Be sure to check out my [Introduction to ArcGIS API for JavaScript 4](https://leanpub.com/arcgis-js-api-4) ebook early access on sale now!

You can also like my page on [Facebook](https://www.facebook.com/odoenetgeo), follow me on [Twitter](https://twitter.com/odoenet) or [add me on SnapChat, username @odoenet](https://www.snapchat.com/add/odoenet).
