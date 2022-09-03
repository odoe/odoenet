---
layout: "../../layouts/BlogPost.astro"
title: "Using FeatureCollection with EsriJS 4"
published: true
author: Rene Rubalcava
pubDate: "2016-05-30"
tags: geodev
coverImage: "featurecollection.jpg"
---

When working with FeatureLayers, sometimes you don't want to work directly with a FeatureService, but simply work with graphics and take advantage of characteristics of a [FeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) like the renderer.

This is simple enough to do using the [source](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#source) property of a FeatureLayer to update the graphics. You can even update the source during runtime to update your data as needed.

<lite-youtube videoid="HnBrAvsUUww"></lite-youtube>

[gist](https://gist.github.com/odoe/a07b766354bf786f7ec17bc28f5860a3.js)
