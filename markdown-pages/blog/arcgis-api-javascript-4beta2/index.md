---
title: "ArcGIS API for JavaScript 4.0 Beta2"
published: true
author: Rene Rubalcava
date: "2015-11-23"
tags: geodev
coverImage: "esrijs-beta2-release.png"
---

Last week, Esri announced the release of the [ArcGIS JS API 4.0 Beta 2](http://blogs.esri.com/esri/arcgis/2015/11/19/arcgis-api-for-javascript-4-0-beta-2-released/).

I've talked a lot [about the 4.0 beta](https://odoe.net/blog/tag/esrijs4beta/) and a lot of the new features available with it. It's not just the 3D functionality, which is cool, but also much of the core of the API such as [Accessor](https://odoe.net/blog/?s=accessor), [Collections](https://odoe.net/blog/quick-tip-collections-in-esrijs-beta-4/), [Promises](https://odoe.net/blog/arcgis-javascript-promises/), and how [Maps and Views work](https://odoe.net/blog/maps-and-views-in-arcgis-js-api/).

So what do we get with the Beta 2 release?

## Popup

To start with, there is a [new Popup](https://developers.arcgis.com/javascript/beta/api-reference/esri-PopupTemplate.html), not just that, it's a [_dockable Popup_](https://developers.arcgis.com/javascript/beta/sample-code/popup-docking/index.html). That's a sweet new feature of the Popup.

## 3D Treats

There's also some new 3D goodness with [WebScenes](https://developers.arcgis.com/javascript/beta/api-reference/esri-WebScene.html) and [Local Scenes](https://developers.arcgis.com/javascript/beta/sample-code/scene-local/index.html). I know you oil and gas nuts are going to dig the Local Scenes.

## Vector Tiles

We also get [Vector Tiles](https://developers.arcgis.com/javascript/beta/api-reference/esri-layers-VectorTileLayer.html) in this beta release. This implements the [Vector Tile spec](https://github.com/mapbox/vector-tile-spec) and [style spec](https://www.mapbox.com/mapbox-gl-style-spec/) from Mapbox, to use Vector Tiles in the ArcGIS JS API. There is a [pending pull-request](https://github.com/mapbox/mapbox-gl-js/pull/1377) in the Mapbox repo on some of the updates that were made to implement this in the API. You can read more about it [here](https://gist.github.com/odoe/ce6a150658526901ef27#file-vector-tile-pr-md).

## Loadable

There is also a new pattern introduced in the API that some may find useful. This is the loadable pattern. This pattern is inspired from other ArcGIS SDKs, such as the [Android SDK, which you can read more about here](https://developers.arcgis.com/android/beta/guide/loadable-pattern.htm).

Basically, the map and layers are on only minimally loaded to start. This lazy loading allows you, for example, to build up a list of layers without making numerous network requests up front. You just need to call the _[load](https://developers.arcgis.com/javascript/beta/api-reference/esri-layers-Layer.html#load)_ method on each item to fully load them. You will not normally need to know about this pattern because the [included Views](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-View.html) will handle loading everything to draw the map for you. But if you are doing some fine-grained work that requires prepping the layers ahead of time, this could be some very useful functionality for you.

I'll be covering various parts of the 4.0 beta 2 release in the coming weeks, so keep an eye out.

I'm also working on a new book on the ArcGIS API for JavaScript 4. [You can read more about it here](https://leanpub.com/arcgis-js-api-4). I'll be publishing the first couple of chapters soon and updates will continue until the final release and probably a bit after. Stay tuned.
