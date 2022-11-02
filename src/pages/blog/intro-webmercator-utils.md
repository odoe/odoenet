---
layout: "../../layouts/BlogPost.astro"
title: "Intro to WebMercatorUtils"
description: "A look at how to use WebMercatorUtils in your apps"
published: true
author: Rene Rubalcava
pubDate: 2022-11-02T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript
---

## Mercator Rules the Maps

If you are working with maps on the web, no doubt you have come across issues with having to work various projections. You might work somewhere like a local government agency that works in in [NAD83](https://en.wikipedia.org/wiki/North_American_Datum). Then you find when you publish some data for use on the web, the default is _usually_ to publish that data in [Web Mercator](https://en.wikipedia.org/wiki/Web_Mercator_projection). _Thanks Google._ However, you might get data in regular old [Geographic WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System), like with a GPS device. You might find yourself in a situation when you have to convert back and forth. That's when the [webMercatorUtils](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-support-webMercatorUtils.html) can be very useful.

## Who stole my projection

Let me lay the ground work for a possible scenario. You have some data from a third-party API that is simply a collection of latitude and longitude coordinates. It's not even GeoJSON, just coordinates that you need to parse into lines and polygons. As if that wasn't enough of a pain, you need to do some work with [geometryEngine](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html) and maybe use those results to display some info to the user, maybe use the results as inputs to add features to a layer. Awesome.

You can use the [Sketch](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html) widget to move your features around as needed, maybe overlap them and do a union so you can create a single feature. But when you use the geometry engine to union them, you get no result. What happened?

Ok, a couple of things happened here. Currently, the Sketch widget only works for Web Mercator geometries. So when you provide regular Geographic geometries, it will convert them. So when you use the geometry engine methods, like union, at least one of those geometries will be in Web Mercator, and the others in Geographic coordinates. _But_ the geometry engine [requires that all geometries be in the same spatial reference](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#union).

Something like this.

```js
// get the graphics after using the Sketch Widget to move at
// least one on the map
const geoms = graphicsLayer.graphics.map((g) => g.geometry).toArray();
const unioned = geometryEngine.union(geoms);
// unioned is null
```

In the end, we have no geometries to work with. How sad.

## We can fix this

No worries, we can get this to work. The `webMercatorUtils` have a couple of methods we can use.

* [geographicToWebMercator](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-support-webMercatorUtils.html#geographicToWebMercator)
* [webMercatorToGeographic](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-support-webMercatorUtils.html#webMercatorToGeographic)

There are others, but we can use either of these in this particular situation.

```js
const geometries = [];
const geoms = graphicsLayer.graphics.map((g) => g.geometry).toArray();
for (let g of geoms) {
    // if the geometry is Geographic
    // convert to Web Mercator
    if (g.spatialReference.wkid === 4326) {
        geometries.push(
            webMercatorUtils.geographicToWebMercator(g)
        );
    }
    else {
        geometries.push(g);
    }
}

const unioned = geometryEngine.union(geometries);
graphicsLayer.removeAll();
graphicsLayer.add({
    geometry: unioned,
    symbol: {
        type: "simple-fill",
        color: [227, 139, 255],
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    }
});
```

What we can do here is check if the geometries we want to use in our analysis are Geographic, and convert them to WebMercator with [geographicToWebMercator](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-support-webMercatorUtils.html#geographicToWebMercator). Once we've done this, we can safely use them in the geometry engine. You probably have not used this workflow with geometry engine because you have lived in the happy land of common coordinates in your applications. Technically, you should probably be running some kind of check on geometries from different sources to validate they are in the same spatial reference. If they are the results of a query to a Feature service or Map service, they should be. But any other random data should be checked.

You can find a demo of this [here](https://codepen.io/odoe/pen/VwxVvVR?editors=1010).

## Summary

The `webMercatorUtils` is one of those handy utilities in the ArcGIS API for JavaScript you probably don't use very often, _until you need it_. It's great for going from Geographic to Web Mercator, or the other way, because the math to do so isn't that bad. However, if you find yourself in a spot where you need to covert some other projection like UTM or NAD to some common projection, you need to bust out the [projection engine](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-projection.html). It works great, built with Web Assembly, and does all the heavy lifting for you! Just be aware, there can be times in your application that you need to convert coordinates, and be assured the ArcGIS API for JavaScript has you covered!

You can check out more info in this video below!

<lite-youtube videoid="BTp4bvk9hg4"></lite-youtube>
