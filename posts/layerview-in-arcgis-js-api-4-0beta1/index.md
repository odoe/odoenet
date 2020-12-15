---
title: "LayerView in ArcGIS JS API 4.0beta1"
published: true
author: Rene Rubalcava
date: "2015-08-31"
tags: geodev
coverImage: "esrijs-views1.jpg"
---

One of things I've seen people struggle with when using the [ArcGIS API for JavaScript 4.0beta1](https://developers.arcgis.com/javascript/beta/) is still the concept of the map and the views. I covered the general concepts in an [earlier blog post](http://odoe.net/blog/maps-and-views-in-arcgis-js-api/), but I wanted to address a specific issues I see people trying to do. _Get the graphics from a FeatureLayer_.

Getting the graphics from a FeatureLayer is one of those things that we have been doing for ages in the ArcGIS API for JavaScript, but you may have tried that with the 4.0beta1 and found yourself hurling multiple insults at your computer screen. They're just not there.

[gist id=7ea64986c1a6d07219ca]

When you try this, depending on where in the lifecycle of your application you do this, you either get an error about graphics being undefined or that graphics has a length of **0**. **_But what the hell, you can see them on the screen damnit, don't lie to me!_**

Relax, this comes back to the whole idea of separating the map from the view. The map doesn't draw anything, so in turn, the layers do not draw anything, meaning they do not generate graphics. As was shown in [this previous post](http://odoe.net/blog/maps-and-views-in-arcgis-js-api/) a map can be the source for multiple views, meaning a layer can be displayed in multiple views. I hope you see where this is going, _how can a layer give you a graphic count if it's shown in multiple views with different graphics visible?_

There. Feel better? Cool.

So how would you get the graphics displayed in the view? You ask the view. You can use the [LayerView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-layers-LayerView.html) from a view. You ask the view for the layerView that is the visual representation of the layer in the view. _That's some [Inception](http://www.imdb.com/title/tt1375666/) level shit right there_. But once you have the LayerView, you can access the graphics.

[gist id=0d1aea794b20d719e31e]

_There you go_, that's how get the graphics shown in the view. **Almost**. Notice the _surprise!_ comment. Right now, a view loads all the features in the service as graphics. The data is just sitting there ready to go. This might change during the beta, but right now, this doesn't help you if you want to know the count of the all the graphics displayed in the view, because you get stuff currently not displayed. _But_, this isn't too difficult to do on your own.

[gist id=01e603d5259f3337d847]

Aaah, that's much better. You can use the [extent](https://developers.arcgis.com/javascript/beta/api-reference/esri-geometry-Extent.html) of the view to check if it [contains](https://developers.arcgis.com/javascript/beta/api-reference/esri-geometry-Extent.html#contains) the geometry of a graphic in the layer and you can filter your results this way.

I updated an older sample to use this method you can see below.

[JS Bin on jsbin.com](http://jsbin.com/perovey/8/embed?js,output)
<script src="http://static.jsbin.com/js/embed.min.js?3.34.2"></script>

There is one caveat to this though and that is currently, the graphics of a LayerView are only available in a 2D [MapView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-MapView.html) and not a [SceneView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-SceneView.html). I'm guessing because 3D gets complicated and my default answer for these cases... **beta**.

But you get the idea. Maps are data, Views are the visual representation of that data. If you want info on what is visually available, look to the View. There are lots of places this comes in really handy that I'll talk about in an upcoming post. For now, go forth and have fun with the [ArcGIS API for JavaScript 4.0beta1](https://developers.arcgis.com/javascript/beta/guide/)!
