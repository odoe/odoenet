---
title: "Maps and Views in ArcGIS JS API"
published: true
author: Rene Rubalcava
date: "2015-07-27"
tags: geodev
coverImage: "esrijs-views.jpg"
---

Imagine for a moment that you have a clear box that you can hold in the palm of your hands. Now imagine that you place little cut out figures in the box, _maybe an astronaut fighting a dragon_, that would be pretty cool, swords and mountain cut outs included. You can place the box on your desk and admire your sci-fi dragon creation. Now imagine you placed a light source in the box, maybe a candle and put it in the middle of your room. Now the scene in the box is played out as shadow art flickering off your One Direction posters, or you know, whatever floats your boat. You're just getting a different view of your art, but it's still just paper figures in a box. This is how maps and views relate in the [ArcGIS API for JavaScript 4.0beta1](https://developers.arcgis.com/javascript/beta/).

## Maps are dumb

One big change for developers to realize when using the latest EsriJS beta is that maps don't do very much. If you look at [the docs](https://developers.arcgis.com/javascript/beta/api-reference/esri-Map.html), you'll see that a map is simply a container for data. It essentially just manages layers. It's not even in charge of how things are drawn, that task is left up to the [View](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-View.html). If you want to render information in 2D, you would use a [MapView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-MapView.html), or you can render the same map in 3D using a [SceneView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-SceneView.html). So really, the map is just a container of information, it's up to you do decide how you want to shine the light on it.

## Embrace your Views

If you look at the [events of a Map](https://developers.arcgis.com/javascript/beta/api-reference/esri-Map.html#events), all you get is stuff related to the layers. You don't even get a load o ready event, but this has more to do with [promises in the API](https://developers.arcgis.com/javascript/beta/guide/working-with-promises/) and [Accessors](http://odoe.net/blog/arcgis-js-api-4-0beta1-accessors/) than anything else. But look at the [methods](https://developers.arcgis.com/javascript/beta/api-reference/esri-Map.html#methods) and [properties](https://developers.arcgis.com/javascript/beta/api-reference/esri-Map.html#properties) for the map. There is nothing for navigation or refreshing the map. All these types of operations are now handled in the Views.

So let's say you had a single map and you wanted to display that map in both 2D and 3D... well it's very simple.

\[gist id=abafbc77f32ecae939eb\]

You can see a demo this here. [3D/2D map - 4.0 beta 1 on jsbin.com](http://jsbin.com/hiyanurolo/1/embed?output)
<script src="http://static.jsbin.com/js/embed.min.js?3.34.1"></script>

See, _one map, multiple views_. You could even take advantage of the [Accessors](http://odoe.net/blog/arcgis-js-api-4-0beta1-accessors/) in the API to do some other cool stuff, like a _ghetto overview map_.

\[gist id=ddea10aac0ba4184f687\]

In this case, you are watching for the center to change in one view and sync it to another. You can see a demo of this here. [3D/2D map - 4.0 beta 1 on jsbin.com](http://jsbin.com/yenanidobi/1/embed?output)
<script src="http://static.jsbin.com/js/embed.min.js?3.34.1"></script>

## Maps and Views and Lions, Oh My

Ok, so there's no lions in the API, but I think you get the basic idea that Views are the workers in the _Map-to-View_ relationship. The map is the keeper of the data, the views are the canvas you stick it on or the globe you drape it over. Once you get used to this simple concept in the API, I'm pretty sure you'll be able to go out there and make some awesome applications! Remember, the map is your box of goodies, the views are your looking glass.
