---
title: "Quick Tip - Clone in ArcGIS JSAPI"
published: true
author: Rene Rubalcava
date: "2017-01-19"
tags: geodev
coverImage: "clone.jpg"
---

The [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/latest/index.html) is a very powerful evolution of the API. A lot of the work under the hood in [Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html) and the ability to [Autocast](https://developers.arcgis.com/javascript/latest/guide/autocasting/index.html) properties which helps to simplify the API, make the JSAPI a very robust tool.

There's still a few little gems in the API and things you probably are not aware of unless you hit some roadblock or odd situation in your development.

One of those oddities is this method called **clone()** on various objects. This **clone()** method pretty much does exactly what you think it would do, but _why and when should you use it?_

Search for _clone_ in the [documentation](https://developers.arcgis.com/javascript/latest/api-reference/index.html) and you'll see all the different places it's available.

A good rule of thumb, is to use **clone()** when you want to modify an object in some way. For example, let's look at updating the geometry of a Graphic in the MapView.

```
view.on("pointer-move", function(event) {
    var mapPoint = view.toMap({
        x: event.x,
        y: event.y
    });
    pointGraphic.geometry = mapPoint;
});
```

[Get started with graphics - 4.2 on jsbin.com](http://jsbin.com/narasewone/2/embed?html,output)
<script src="http://static.jsbin.com/js/embed.min.js?3.40.3"></script>

Nothing happens. I have a point on the map, but it's not changing. But I updated the geometry? _A current limitation is that the graphic isn't automatically updated in the View. You can get around this by using **graphic.clone()**._

```
view.on("pointer-move", function(event) {
    var mapPoint = view.toMap({
        x: event.x,
        y: event.y
    });
    var graphic = pointGraphic.clone();
    graphic.geometry = mapPoint;
    view.graphics.removeAll();
    view.graphics.add(graphic);
});
```

[Get started with graphics - 4.2 on jsbin.com](http://jsbin.com/kahasamafe/1/embed?html,output)
<script src="http://static.jsbin.com/js/embed.min.js?3.40.3"></script>

In this case, I clone the Graphic, update the geometry, remove the old graphic and add the cloned one. This way I can maintain the symbology and attributes as I just change the geometry.

This method can come in real handy if you want to display some GPS data on the map or maybe work with a real-time API that also provide coordinates at varying intervals.

The **clone()** method isn't exactly new in the API. We talked about this way back on [4.0beta1](http://odoe.net/blog/fun-with-accessors-in-arcgis-js-4beta1/) using **camera.clone()** so we could store the state of the Views camera and replay it almost like an animation.

So if during your development, you are trying to modify properties of an object, in particular Graphics, Camera, ViewPoint, or Symbols, try using the **clone()** method to see if that helps you out.

The ArcGIS API 4 for JavaScript has a rich suite of tools built-in, and the more you use it, the more you will learn!
