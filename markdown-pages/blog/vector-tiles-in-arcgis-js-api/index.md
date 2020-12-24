---
title: "Vector Tiles in ArcGIS JS API"
published: true
author: Rene Rubalcava
date: "2015-11-30"
tags: geodev
coverImage: "esri-vector-tiles.png"
---

Esri has had a slew of releases recently and part of those releases has included Vector Tiles for basemaps.

The latest [ArcGIS Online](http://blogs.esri.com/esri/arcgis/2015/11/19/whats-new-in-arcgis-online-november-2015/) release and [ArcGIS JS Beta 2](http://blogs.esri.com/esri/arcgis/2015/11/19/arcgis-api-for-javascript-4-0-beta-2-released/) has introduced [Esri Vector Tile basemaps](http://blogs.esri.com/esri/arcgis/2015/11/18/introducing-esri-vector-basemaps-beta/) for users and developers.

## What are Vector Tiles?

Vector tiles are a specification introduced by [Mapbox](https://github.com/mapbox/vector-tile-spec) to generate tiled data. What really makes this powerful is that unlike the tiles you may be used to, these are not raster tile images stitched together to make a map. These tiles contain geometry data that can be used client-side to draw vector graphics and produce cleaner and more customizable basemaps. It's still encoded data that has to be processed ahead of time to generate this vector tile data, but once it is, it can be fast and relatively small.

There is the possibility of storing an entire basemap of vector tiles on your device in a few gigs of storage, depending on how much you wanted to keep.

Esri released a couple of guides on [customizing vector basemaps](http://blogs.esri.com/esri/arcgis/2015/11/19/how-to-customize-esri-vector-basemaps/) and [customizing boundaries and labels](http://blogs.esri.com/esri/arcgis/2015/11/23/customize-esri-vector-basemap-boundaries-and-labels/). There will probably be some more information about customizing vector basemaps in the near future.

Vector tiles are drawn using [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API). This means you need to have a [compatible browser](http://caniuse.com/#search=webgl) that can support WebGL. You may also find that WebGL is going to [need a decent graphics card](https://support.mozilla.org/en-US/kb/upgrade-graphics-drivers-use-hardware-acceleration). It doesn't need to be a hardcore gaming graphics card, but it is something to take into consideration.

You can read more [considerations here](http://blogs.esri.com/esri/supportcenter/2015/11/18/considerations-for-using-vector-tile-layers-in-arcgis-online/).

Esri currently has an [open pull-request](https://github.com/mapbox/mapbox-gl-js/pull/1377) for the [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js) library that is used to draw the vector tiles. You can read more about the [purpose of the PR here](https://gist.github.com/odoe/ce6a150658526901ef27#file-vector-tile-pr-md) to provide indexed vector tiles to reduce cooking time and file sizes for basemap data.

## How can I use them?

Let's take a look at the sample from the documentation for 4.0 beta 2.

[Vector tiles - 4.0beta2 on jsbin.com](http://jsbin.com/jolume/1/embed?output)

You can rotate the map by holding down the right mouse button and panning the map. Notice as you rotate that the labels for location stay horizontal and street labels will adjust so they are never totally upside down. Crisp and clear label placement alone is a huge benefit of using vector basemaps in your application. _You can't do that with normal image tiles_.

The vector basemaps are still in beta, but they provide a very rich user experience for your maps that you can start using today.
