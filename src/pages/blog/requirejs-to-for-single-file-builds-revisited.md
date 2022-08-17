---
layout: "../../layouts/BlogPost.astro"
title: "RequireJS for single-file builds: revisited."
published: true
author: Rene Rubalcava
pubDate: "2013-12-16"
---

Someone recently started a [github repo](https://github.com/robertd/esri-jsapi-rjs-example) using RequireJS to build their [ArcGIS JavaScript](https://developers.arcgis.com/en/javascript/) applications. This piqued my interest as it's something I had [done in the past](https://odoe.net/blog/?p=345), but at some point r.js or node didn't work properly together anymore with my build file. Rather than fuss with it, I moved on to using [Grunt](http://gruntjs.com/) to do my compile/minify/copy of files for production and testing.

So when I saw someone got r.js working with the ArcGIS JS API, I was drawn to it like a kid to an ice cream truck. The Dojo build tools have something against me, as every time I have tackled them, they just kick me in the nads and steal my lunch money. I really admire the [AGRC guys](https://github.com/agrc/AGRCJavaScriptProjectBoilerPlate) for tackling Dojo build tools for the ArcGIS JS API, but it was just not my thing.

The [base project](https://github.com/robertd/esri-jsapi-rjs-example) so far does a real good job of showing how to build out minified files with just [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs), but I wanted to actually get the mythical single file build working somehow. With some tweaking and some tears, [I was able to wrangle the outputted single-file to work as expected](https://github.com/robertd/esri-jsapi-rjs-example/pull/6). This of course, does not include the Esri/Dojo CDN bits, but it works and it even includes turning templates into their own modules to include them in the single file.

I like this. I like this a lot. I think I may try this on a couple of current projects to test it out. I might even include this trick in my [ArcGIS Web Development](http://www.manning.com/rubalcava/) book.

I'm not totally sold on a single file build as the Esri CDN is still making multiple calls to the server to download files as needed. So my single file build is a drop in the bucket of HTTP requests being made There will apparently be some news about custom builds coming out early next year, I'm guessing around [Developer Summit](http://www.esri.com/events/devsummit) time.

Still, this is pretty neat stuff, using RequireJS to optimize my Dojo code.
