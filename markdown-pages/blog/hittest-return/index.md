---
title: "Return of the hitTest"
description: "How to use some of the new features of the hitTest in the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: 2022-07-18T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## Interactive Apps

The [hitTest](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#hitTest) in the ArcGIS API for JavaScript is an incredibly powerful way for you to create interactive web mapping applications. This is because it operates on client-side data, so there are no round-trip requests to source service. This means you can use hitTest to access features visible on the map almost instantly, so it's perfect to use for something like the [pointer-move](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event-pointer-move) event and more!

## Hit them all

Up until a some recent releases, one drawback to the hitTest was that it would only return the topmost graphic per layer. This limitation is no longer in place, meaning the hitTest will return an array of results for all features per layer on the map. This also means you might get many more results than you intend to. This could be especially important for interactive applications that might need to have their data transformed for something like charts or third-party API requests.

You can do one of two things to filter your results.

* Use the `include` option.
* Or use the `exclude` option.

The `include` option is probably the most straightforward. You are most likely only interested in one, maybe two layers when using the hitTest. You can use it as shown the following code snippet.

```js
view.on("click", async (event) => {
    const { results } = await view.hitTest(
        event,
        {
            include: [
                parcelLayer,
                easementLayer
            ]
        }
    );
});
```

This will limit the hitTest results to only two layers I am interested in. However, there might be cases where I want to get the results of all the layers in the map. But you should remember that VectorTileLayers are included in hitTest results, so you probably want to exclude the basemap from the hitTest.

```js
view.on("click", async (event) => {
    const { results } = await view.hitTest(
        event,
        {
            exclude: [
                ...map.basemap.baseLayers,
                ...map.basemap.referenceLayers
            ]
        }
    );
});
```

The above code snippet will return all the results of the layers in the map, excluding the basemap data.

You can view this application here.

<iframe height="500" style="width: 100%;" scrolling="no" title="hitTest returns" src="https://codepen.io/odoe/embed/mdXYmOV?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/odoe/pen/mdXYmOV">
  hitTest returns</a> by Rene Rubalcava (<a href="https://codepen.io/odoe">@odoe</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Summary

Working with client-side data is a powerful feature of the ArcGIS API for JavaScript. It allows you to quickly access the data in the browser, parse it, do any kind of data or spatial manipulation you want with it and reflect that information in your application. This allows you to update charts, alerts, notifications, or other parts of the application smoothly. With the recent improvements in the hitTest functionality it's important you take into account the ability to limit the results to your layers of interest. Give it a shot and I'm sure you'll find it very useful!

You can see more details in the video below!

<iframe width="100%" height="500" src="https://www.youtube.com/embed/UAwX2c0yu2I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
