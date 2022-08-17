---
layout: "../../layouts/BlogPost.astro"
title: "Smart Mapping for Devs"
published: true
author: Rene Rubalcava
pubDate: "2015-06-08"
tags: geodev
coverImage: "smart-mapping.jpg"
---

It's been about three months now since the latest Esri Dev Summit, but I'm still digging stuff up in my notes that I haven't had a chance to look over yet. One of those items I saw that I thought was pretty cool was the idea of [Smart Mapping](http://www.esri.com/landing-pages/arcgis-online/smart-mapping). In a nutshell, Smart Mapping is a way to simplify how your render your data. I can admit that I am not a great cartographer. I can get by [with a little help](http://www.gretchenpeterson.com/blog/) and I've been lucky enough to work with some folks more skilled than myself.

Maybe you have found yourself using the Renderers in the ArcGIS API for JavaScript and you are just kind of shooting in the dark as to how to display your data in a meaningful way. Maybe you wanted to make sure [you weren't just making things up](http://www.markmonmonier.com/how_to_lie_with_maps_14880.htm).

## What Can I Do?

So what does Smart Mapping actually do for you? Essentially, _it does the math for you_. In it's simplest form, you just tell it [how you want to classify your data](https://developers.arcgis.com/javascript/jssamples/smartmapping_classesbycolor.html) or you actually use to [run the statistics on your data and render for you](https://developers.arcgis.com/javascript/jssamples/smartmapping_bycolor.html). But there's more than that going on. There's a plugin called [FeatureLayerStatistics](https://developers.arcgis.com/javascript/jsapi/featurelayerstatistics-amd.html) that can be used to get the suggested scale range based on your data, create histograms, do statistics on your fields. It's a _statistipalooza_ of functionality. The Smart Mapping renderer can even [use your basemap to determine the color scheme](https://developers.arcgis.com/javascript/jsapi/esri.renderers.smartmapping-amd.html#createcolorrenderer) to display your data for you. That is pretty cool right there.

Here is a sample right from the Esri site, but animated for your viewing pleasure. [US Movie Genres by County](http://jsbin.com/pevaxa/1/embed?output)

This sample demonstrates how the render changes with the basemap.

## What Does This Mean For You?

What this means is you can greatly simplify the workflow of displaying large amounts of data in a meaningful way. This isn't going to do you much good with just a few points on your map, but maybe you want to display information related to the costs of street maintenance for you city over the past 10-20 years or the growth of [Airbnb](https://www.airbnb.com/) rentals across the county and average costs. These Smart Mapping tools could prove really useful in those cases. Personally, I'm thinking there could be some nice uses to [FeatureLayerStatistics](https://developers.arcgis.com/javascript/jsapi/featurelayerstatistics-amd.html) that I haven't explore yet, but that's just me.

For more info, you can check out the official blog posts ([part 1](http://blogs.esri.com/esri/arcgis/2015/03/02/introducing-smart-mapping/) & [part 2](http://blogs.esri.com/esri/arcgis/2015/03/17/smart-mapping-part-2-making-better-size-and-color-maps/)) at Esri.

So give this Smart Mapping stuff a try next time your boss gets on your back about your ugly maps.

_Note - I was going to call this post Smart Mapping for Dummies, but that would mainly apply to my lack of cartographic skills._
