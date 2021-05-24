---
title: "Spatial Joins"
description: "How you can do spatial joins in the browser"
published: true
author: Rene Rubalcava
date: 2021-05-24T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

The landscape of GIS consists of a variety of spatial analysis tasks you might be asked to perform. I'll be honest with you, yes, there is a lot you can do in the browser, _as JavaScript is pure magic and can do anything_, however, some things are probably best left to the desktop or specific server side scripts... like spatial joins. But I'm not here to talk about Python, like I said, JavaScript can do _anything_.

## The task

Let's look at a common scenario. You have a layer of some cities as polygons. You also have a layer of potentially toxic releasing facilities. The question being asked. _How many facilities are in each city?_ Simple enough right. On the surface it is, but let's think about the steps involved.

* Iterate over each city in the layer.
* For each city, iterate over each point, and check if it's in that city.
* Store results

If I have 10 cities, and 100 points, that's 1,000 iterations in total, and only goes up if one of those values change. 1,000 cities, 1,000 points, 1,000,000 iterations. I think you get the idea. How you can you try to limit this impact? Well, if you know a facility is one city, then it's not in another, so you can remove it from any future iterations. Meaning that each top iteration can remove at least one sub-iteration... right? Ok, enough math, let's write some code.

## The code

In a previous [blog post](https://odoe.net/blog/feature-table-clone), I wrote about how you can create a copy of a FeatureLayer, at least the schema. I'm going to use the same technique here to create a new a layer that will contain a count attribute for the number of facilities in each city. To simplify this a bit, I'm only concerned about the cities and facilities visible on the map, so I can use the LayerView.

```js
// need the geometries
const query = {
    returnGeometry: true
};
const cityResults = await cityLayerView.queryFeatures(query);
const frsResults = await frsLayerView.queryFeatures(query);
// this array will hold my final results
const features = [];
// copy the city features
let temp = [...frsResults.features];
// a temp array that will get smaller over each iteration
let temp2 = [];
for (let feat of cityResults.features) {
    const graphic = feat.clone();
    // start at a count of 0
    graphic.attributes.count = 0;
    temp2 = [...temp];
    // inner iteration
    for (let i = 0; i < temp2.length; i++) {
        const x = temp[i];
        if ((x && graphic.geometry && x.geometry) && graphic.geometry.contains(x.geometry)) {
            // update count
            graphic.attributes.count++;
            // here's the trick
            // remove the current point from the array
            // since it should not be contained
            // in another city, voila!!
            temp.splice(i, 1);
        }
    }
    // save my result for later
    features.push(graphic);
}
```

This is the bulk of it right there. I can then take those results and use them to create a new client-side FeatureLayer. Like I said earlier, this could get performance intensive depending on the number of polygons and points you need to iterate over, so it will block UI interaction. Ideally, you could run this in a web worker, but I'll save that for another day. If you ran it in a worker, it wouldn't block the UI and you would be in a much better spot.

## Summary

This is one of those basic GIS tasks that ust about any GIS tech or analyst would be asked to do, and as I pointed out, should be used cautiously in the browser. If you are using the ArcGIS MapViewer, I think you can use the [Summarize Within](https://doc.arcgis.com/en/arcgis-online/analyze/summarize-within.htm) tool to accomplish this. You could also pre-process this in desktop and publish, or use a Python script. _Pre-process_ will always be faster than dynamic, I don't care how many workers you throw at it.

Here is an demo application in action you can check out.

<iframe height="500" style="width: 100%;" scrolling="no" title="Spatial Join" src="https://codepen.io/odoe/embed/preview/vYxYxXm?height=460&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/vYxYxXm'>Spatial Join</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

And if you are so inclined, you can watch a video where I show you this magnificent tip step by step!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/FWM35IfvjVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>