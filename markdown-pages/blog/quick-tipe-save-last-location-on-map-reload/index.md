---
title: "Quick Tip: Save last location on map reload"
published: true
author: Rene Rubalcava
date: "2014-06-03"
---

## I'd like to...

I recently had a need in an [ArcGIS JS](https://developers.arcgis.com/javascript/) project to save a maps last location when the user closed the browser so that it would return that location when they returned to the application. After a little trial and error, I think I came up with a pretty good solution.

## Quick rundown

Basically you'll want to use [localStorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage) to store the map center and zoom level. Then when the map reloads, read from localStorage and use the maps [centerAndZoom](https://developers.arcgis.com/javascript/jsapi/map-amd.html#centerandzoom) method to return to that location. You can capture the page close and refresh using [window.onbeforeunload](https://developer.mozilla.org/en-US/docs/Web/API/Window.onbeforeunload) or since you're already using Dojo, use [dojo/\_base/unload](http://dojotoolkit.org/reference-guide/1.9/dojo/_base/unload.html).

## Sample

I put together a JSBIN example for this. [Simple Map](http://jsbin.com/vexib/2/embed?js,output)


Pan around the map and refresh the page. You should be returned to the last known location. This is coming in pretty handy so far. You can modify this to add more options and the ability to disable it, but I'll leave those details up to you.

> **Uppublished: true
author: Rene Rubalcava
date:** I updated the sample to sniff the device and use the [extent-change](https://developers.arcgis.com/javascript/jsapi/map-amd.html#event-extent-change) event if on an iOS device, since it seems that the window.onbeforeunload event [doesn't behave as expected](http://stackoverflow.com/questions/3239834/window-onbeforeunload-not-working-on-the-ipad) on iOS devices.

I've incorporated this into my [map-widget](https://github.com/odoe/esri-map-widget) library and put together a [demo](http://www.odoe.net/thelab/js/esrijs/) from my [esri-js-starterkit](https://github.com/odoe/esri-js-starterkit) with this feature enabled.
