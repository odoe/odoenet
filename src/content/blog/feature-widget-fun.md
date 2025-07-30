---

title: Feature Widget Fun
published: true
author: Rene Rubalcava
pubDate: 2018-09-10
tags: geodev
heroImage: '../../assets/blog/feature-widget-fun/images/feature-widget.jpg'
description: There's an interesting widget in the ArcGIS API for JavaScript that
  you may not be too familiar with. That is the Feature widget. What makes the
  Feature widget so interesting it that it can let you access the content of
  your Popups to graphics without having to really touch the Popup.
---

There's an interesting widget in the
[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/index.html)
that you may not be too familiar with. That is the
[Feature widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html).
What makes the Feature widget so interesting it that it can let you access the
content of your Popups to graphics without having to really touch the Popup.

A popular use case is that someone may want to display the content of the Popup
outside the Popup itself, maybe a side panel or in a small window when a user
mouses over the map. There are some DOM tricks you could do to grab the content
of a Popup and you could try to get all creative and hacky about it... or you
could use the Feaute widget to make your life easier.

For my use case, maybe I want to display some information about a graphic as I
hover my mouse over the map. I don't need it to be too fancy, just the
information I would normally see in the Popup content itself.

First off, let me create a dummy graphic for the Feature widget, I'm not even
going to display it on the map.

```js
const graphic = {
  geometry: view.center,
  popupTemplate: {
    title: "what",
    content: "Mouse over features to show details...",
  },
};
const feature = new Feature({
  graphic,
  view,
});
view.ui.add(feature, "top-right");
```

This dummy graphic will contain instructions for my users on how to use my
simple little application.

The next step is going to be to listen for the `pointer-move` event of my view,
and the perform a `hitTest` on the view to find my graphic. Once I have my
graphic, I can update the Feature widget with it.

```js
view.on("pointer-move", (event) => {
  view.hitTest(event).then(({ results }) => {
    const result = results[0];
    if (result) {
      feature.graphic = result.graphic;
    } else {
      feature.graphic = graphic;
    }
  });
});
```

Awesome!

At this point, I can move my mouse around my map and the Feature widget will
update with the contents of the
[PopupTemplate](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html)
that is defined for that graphic. But let me take this one step further, and use
the LayerViews
[highlight](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight)
method to highlight the graphic on the map.

```js
view.whenLayerView(fLayer).then((layerView) => {
  let highlight;
  view.on("pointer-move", (event) => {
    view.hitTest(event).then(({ results }) => {
      const result = results[0];
      highlight && highlight.remove();
      if (result) {
        feature.graphic = result.graphic;
        highlight = layerView.highlight(result.graphic);
      } else {
        feature.graphic = graphic;
      }
    });
  });
});
```

Now that is an _application_.

You can see the full demo in action here.

<iframe height="500" style="width: 100%;" scrolling="no" title="Feature Widget Fun" src="https://codepen.io/odoe/embed/XPgeyg?height=500&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/XPgeyg'>Feature Widget Fun</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

There you have it, you can take advantage of displaying Popup content however
you want in your application without having to rely on the Popup itself!

Happy geohacking!
