---
title: "Drawing all the things in ArcGIS API JS Beta"
published: true
author: Rene Rubalcava
date: "2015-10-12"
tags: geodev
coverImage: "esri-draw.jpg"
---

# DIY Drawing in the ArcGIS API for JavaScript 4.0 Beta

I've talked [a lot](http://odoe.net/blog/tag/esrijs4beta/) about the [ArcGIS API for JavaScript 4.0beta](https://developers.arcgis.com/javascript/beta/). It has some really cool features and lots of neat stuff still to come.

One of the things currently not finished yet in the beta API is a drawing tool. I talked about [DIY editing](http://odoe.net/blog/quick-tip-tools-for-arcgis-jsapi-4-0beta1/), but you can also DIY the drawing tools you may want to use for editing.

So let's think about the steps needed to draw something on the map.

You will have the following steps to draw a line:

1. Click on the map.
2. Draw a line while the mouse hovers over the map.
3. Finish drawing the line when you click on the map again.

That's pretty basic. But remember, when we talk about DOM events and all the goodness that comes with them, we're talking about the [View](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-View.html). You can read more about the distinction [here](http://odoe.net/blog/maps-and-views-in-arcgis-js-api/).

There are a couple of things we need to keep in mind. You can listen for "click" events on the View, but it doesn't have "mousemove" events yet, so we need to get a little creative on this one, but it's no big deal, all the tools we need to mimic it are right there in the API.

[gist id=cab517b82bcb67366ff6]

The way we can work around the missing "mousemove" event is to listen for the native "mousemove" of the Views container and convert screen points to map points. There should be little more math here usually to take into consideration padding and margins, but this isn't a math lesson.

**view.toMap(evt.offsetX, evt.offsetY, mp2)**

The logic to draw a line is pretty simple. You can expand this even further to draw a polygon and even use these results to edit your data on the map.

Here is a sample of this in action. [Draw Lines on jsbin.com](http://jsbin.com/museyuc/2/embed?js,output)
<script src="http://static.jsbin.com/js/embed.min.js?3.35.0"></script>

As you can see, beta is beta, but that doesn't mean you can't apply a little elbow grease and get stuff done.
