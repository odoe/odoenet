---
title: "Quick Tip - fromJSON() in ArcGIS JS API"
published: true
author: Rene Rubalcava
date: "2015-08-10"
tags: geodev
coverImage: "esrijs-convert.jpg"
---

I just wanted to give you a quick tip on a new little feature in the [ArcGIS API for JavaScript 4.beta1](https://developers.arcgis.com/javascript/beta/) that may have gone unnoticed if you haven't gotten too deep into the beta.

That would be the [fromJSON](https://developers.arcgis.com/javascript/beta/api-reference/esri-geometry-Geometry.html#fromJSON) method that you'll find sprinkled throughout the API. Any modules that has a _fromJSON_ method can simply take a JSON representation of that module and create a new one. This isn't exactly the same as constructor, but it is a bit of a shortcut to work into your development. Now, are some jsonUtils in the 3.xx API, like for [geometry](https://developers.arcgis.com/javascript/jsapi/esri.geometry.jsonutils-amd.html) or [renderers](https://developers.arcgis.com/javascript/jsapi/esri.renderers.jsonutils-amd.html). But now they are part of the actual modules.

Let's look over the samples real quick. If you look at the [2D Overview sample](http://developers.arcgis.com/javascript/beta/sample-code/sandbox/sandbox.html?sample=sample-code/source-code/3d/2d-overview-map/index.html), you may notice in that viewPoint is simply passed as an object to the SceneView.

```js
view3d = new SceneView({
  container: "view3dDiv",
  map: map3d,
  viewpoint: {
    center: [7, 46],
    scale: 200000,
    heading: 35,
    tilt: 60
  }
});
```

Although, [ViewPoint is a module](https://developers.arcgis.com/javascript/beta/api-reference/esri-Viewpoint.html). In this particular case it is taking advantage [Accessors](https://odoe.net/blog/arcgis-js-api-4-0beta1-accessors/), where the viewpoint behavior is defined via the Accessor. But this is part of a larger effort to simplify the API for developers.

The examples also show how a [Camera](https://developers.arcgis.com/javascript/beta/api-reference/esri-Camera.html) uses a [fromJSON](https://developers.arcgis.com/javascript/beta/api-reference/esri-Camera.html#fromJSON) method to create the Camera. This even works on symbols.

## Easy GeoJSON parsing

So maybe you've used something like [Terraformer](http://terraformer.io/) to parse and display [GeoJSON](http://geojson.org/) data in your ArcGIS JS apps. _What would you say if I told you you can do this directly in the ArcGIS 4.0beta1?_ (Watch your language). This isn't some complicated process, nor do I need to worry about using [webMercatorUtils](https://developers.arcgis.com/javascript/beta/api-reference/esri-geometry-support-webMercatorUtils.html). I just need to create the [Graphic](https://developers.arcgis.com/javascript/beta/api-reference/esri-Graphic.html). **Why?** Because if we look at the [Point](https://developers.arcgis.com/javascript/beta/api-reference/esri-geometry-Point.html) geometry, you may notice that it has properties for latitude, longitude, x, y and has a note: _"The blah blah of the point if the spatial reference is Web Mercator (wkid: 3857) or WGS-84 (wkid: 4326)."_ This means you can just pass the GeoJSON properties in the correct format directly to the Graphic.

That would look something like this.

```js
Graphic.fromJSON({
  geometry: {
    x: coordinates[0],
    y: coordinates[1],
    spatialReference: { wkid: 4326 }
  },
  symbol: markerSymbol,
  attributes: x.properties
});
```

Look at that. _Look at it!_ No fuss, GeoJSON in your ArcGIS API apps.

You can see a demo of this application here. [Basic 3D map - 4.0 beta 1 on jsbin.com](http://jsbin.com/ferope/3/embed?js,output)

The _fromJSON_ method sprinkled throughout the API provide even more flexibility to you as a developer to [simplify](https://developers.arcgis.com/javascript/beta/guide/discover/#simpleAPI) it's use for your everyday work. So _JSON the hell out of your code!_
