---

title: Highlighting Features
description: How to use the highlight to create interactive apps
published: true
author: Rene Rubalcava
pubDate: 2021-03-16T10:00:00.000Z
heroImage: '../../assets/blog/highlight-features/images/cover.jpg'
tags: geodev, javascript
---

## Let there be highlight

When you're building a mapping application, there comes a time when you probably
need to add some interactivity, a little excitement for your users. One of the
quickest ways to do this with the ArcGIS API for JavaScript, is the
[highlight](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight).
The highlight provides a quick, yet effective way to let the user interact with
features in the application. You could take advantage of the
[View events](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#events-summary)
amd use a
[hitTest](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#hitTest)
to quickly find features already drawn in the map. There's a good chance, users
are not interacting with features they can't see. Because they are already
available in the browser, accessing these features is wicked fast!

The pointer events, like
[pointer-move](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event-pointer-move),
don't return a mapPoint, but do return screen points. This is for performance
reasons. Luckily, the hitTest expects screen coordinates, so you can pass it the
event directly, and it will work its magic.

```js
let highlight;

view.when(async () => {
  let layerView = await view.whenLayerView(layer);
  view.on("pointer-move", async (e) => {
    const { results } = await view.hitTest(e);
    const { graphic } = results.find((x) => x.graphic.attributes.OBJECTID);
    if (highlight) {
      highlight.remove();
    }
    highlight = layerView.highlight(graphic);
  });
});
```

One thing to keep in mind, is that the hitTest will return information about the
layer interacted with in vector tiles. This is typically used to for
[layer style updates, like paint properties](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-VectorTileLayer.html#setPaintProperties)
of vector tiles. But in this case above, you only care about features from the
FeatureLayer. So there needs to be some sort of filter in place for this.

## Own that popup

If you really want to impress your ~~mom~~ users, you could add a
[Feature widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html)
to display info that would normally be seen in the popup. I talked more about
the Feature widget [here](https://odoe.net/blog/feature-widget-fun).

```js
view.when(async () => {
  let layerView = await view.whenLayerView(layer);
  view.on("pointer-move", async (e) => {
    const { results } = await view.hitTest(e);
    const { graphic } = results.find((x) => x.graphic.attributes.OBJECTID);
    if (highlight) {
      highlight.remove();
    }
    // pass graphic to widget
    featureWidget.graphic = graphic;
    highlight = layerView.highlight(graphic);
  });
});
```

This is pretty simple. You create a Feature widget, place the DOM element where
you want on your page, and then give it the graphic you get from the hitTest
result. Nothing else for you to really do. It will automatically update based on
the graphic and the PopupTemplate associated with the graphic.

## Summary

There are numerous ways you could provide some form of interactivity to your
mapping applications. I think using highlight is a great way to get started. If
you find your users want something a bit more, like filters and effects,
blending or more, you have a solid start to work from. And maybe, they'll be
happy with this solution. Remember, _simple and done_ is better than _fancy and
late_.

You can see a live demo
[here](https://glitch.com/edit/#!/silent-absorbing-marquis), and watch a video
on this topic below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/No-BGNA3QbY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
