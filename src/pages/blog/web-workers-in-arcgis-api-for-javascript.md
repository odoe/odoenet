---
layout: "../../layouts/BlogPost.astro"
title: "Web Workers in ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: "2017-05-24"
tags: geodev
coverImage: "esrijs-workers.jpg"
---

Recently there [was a thread on GeoNet](https://geonet.esri.com/thread/195045-accessing-the-js-api-via-a-web-worker) about how to use workers in the ArcGIS API for JavaScript. This brought up the discussion about the small worker framework that ships with the ArcGIS API 4 for JavaScript. The user was able to figure it out enough to get a [cool demo app together](https://www.youtube.com/watch?v=zGEDFZNoWQw).

You can look over the [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-workers.html) and check out some of the options that are available.

I just wanted to put together a video to show how you might use the workers to offload some processing. In the demo app, I create a series of concentric buffers in the worker and send the geometries back to the client and display them on the map.

[gist](https://gist.github.com/odoe/d99766ce24cd0487923eb5182e840ee7)

It's a fairly simple idea, but I think it demonstrates the basics of using the workers in the API. I'm sure you can find a creative use of the worker framework in your own application development!

<lite-youtube videoid="MOsB9CF4XXU"></lite-youtube>
