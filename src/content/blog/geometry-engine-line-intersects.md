---

title: Geometry Engine Line Intersects
description: Using ArcGIS Geometry Engine for line intersections
published: true
author: Rene Rubalcava
pubDate: 2023-05-13T10:00:00.000Z
heroImage: '../../assets/blog/geometry-engine-line-intersects/images/cover.jpg'
tags: geodev, javascript
---

## I've been waiting for this one

One cool feature in the ArcGIS Maps SDK for JavaScript that I have been waiting
for is an improved method for finding intersections! Up until recently, you
could use the
[geometry engine](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html)
to help you find _if_ two lines intersected, or shared an edge. But they never
returned a geometry for the intersection location. You could do it manually with
some cuts of geometry, find the ends of the lines, which was kind of a pain. Now
however, this functionality is built in!

## Intersection bliss

There's a function in the geometry engine called
[`intersectLinesToPoints`](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#intersectLinesToPoints)
that does just what it promises. It will take two lines, and return an array of
points where the intersect. How much simpler could it get?

Let's say for example, that I am going to use the
[Sketch widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html)
and want to find the intersections of what I draw against another layer. I could
do something like this.

```js
sketch.on(
  "create",
  debounce(async ({ graphic, state, tool }) => {
    if (tool !== "polyline") return;
    // start
    if (state === "start") {
      ptLayer.removeAll();
      gLayer.removeAll();

      await whenOnce(() => !layerView.updating);

      const query = layer.createQuery();
      query.geometry = view.extent;
      const { features } = await layerView.queryFeatures(query);
      const geometries = features.map(({ geometry }) => geometry);
      unionedGeom = await union(geometries);
    }
    // active
    if (state === "active") {
      const pointGeoms = await intersectLinesToPoints(
        graphic.geometry,
        unionedGeom,
      );

      const ptGraphics = pointGeoms.map((x) => ({
        geometry: x,
        symbol: {
          type: "simple-marker",
          outline: {
            width: 1,
            color: [185, 45, 45, 1],
          },
          color: [240, 120, 50, 1],
        },
      }));

      ptLayer.removeAll();
      ptLayer.addMany(ptGraphics);
    }
  }),
);
```

In this snippet, I'm waiting for the sketch to complete drawing. When it does, I
find the features from a layer in my maps extent. I use those line features as
an input to the geometry engine along with my drawn line to get the points where
they intersect and display them on the map. This is a pretty straight forward
use case for using the `intersectLinesToPoints` method of the geometry engine.
You can utilize this tool in a ton of different ways, it just depends on what
you need. You can find this demo
[here](https://codepen.io/odoe/pen/mdKKagy?editors=0010).

## Summary

The `intersectLinesToPoints` method in the geometry engine is one that I have
been wanting to see for a long time, and I'm sure I'm not the only one. It's
powerful tool that let's you do even more spatial analysis in your web apps. I'm
a fan of anything that let's you do some cool stuff my geometries!

You can see a video of this tool in action below!

<lite-youtube videoid="XW062PwBHZA"></lite-youtube>
