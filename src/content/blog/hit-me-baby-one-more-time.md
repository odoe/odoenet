---

title: Hit me baby one more time!
published: true
author: Rene Rubalcava
pubDate: 2018-08-22
tags: geodev
heroImage: '../../assets/blog/hit-me-baby-one-more-time/images/hitmebaby.jpg'
description: I love when people ask me some interesting questions about how to
  use the ArcGIS API for JavaScript. Sometimes, they are use cases I never
  really thought about before, although I use the API daily, everyone has
  different needs. So when I get a question that makes me go _hmmm_, I get
  excited.
---

I love when people ask me some interesting questions about how to use the
[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/).
Sometimes, they are use cases I never really thought about before, although I
use the API daily, everyone has different needs. So when I get a question that
makes me go _hmmm_, I get excited.

I was recently asked about how could you sync a
[`hitTest`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#hitTest)
across multiple map views. That's interesting, as I never really thought about
it. I've seen people want to sync the
[viewpoitns of multiple views](https://developers.arcgis.com/javascript/latest/sample-code/views-synchronize/index.html),
but a `hitTest`, which is a click across multiple views got me thinking.

The first thing that comes to mind is that a `hitTest` takes a
[`screenPoint`](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-ScreenPoint.html),
which is the x and y location relative the top-left corner of the view.
Normally, that's cool, but if you have two map views in your app, the
`screenPoint` of the first map view is not the same as the `screenPoint` of the
second map view since they are in different locations in the browser window.

Luckily, there are a couple of helper methods on the view that can help with
this. There is
[`toMap`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#toMap)
and
[`toScreen`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#toScreen).
What you can do, is take convert the `screenPoint` to a `mapPoint`, then with
the second view, convert the `mapPoint` to a new `screenPoint` and now you can
use that `screenPoint` for the `hitTest` of your second view.

Follow?

Here are the steps.

1. Click on view 1
2. Perform `hitTest` on view 1
3. Convert `sreenPoint` to `mapPoint`
4. Convert `mapPoint` to new `screenPoint`
5. Perform `hitTest` on view 2

You can do this by making a couple of generic functions.

```js
function hitView(mapPoint, view, layer) {
  const sp = view.toScreen(mapPoint);
  view.hitTest(sp)
    .then((result) => {
      view.whenLayerView(layer).then((lview) => {
        const gs = result.results.map((x) => x.graphic);
        lview.highlight(gs);
      });
    });
}
```

This first function performs a `hiTest` on a given view and layer by converting
the `mapPoint` to a `screenPoint`. Then it goes throught the steps of
highlighting the feature on the map.

Now you need to add some click events to your views, so let me write a generic
function for that.

```js
function onClick(v1, v2, lyr1, lyr2) {
  v1.on("click", (event) => {
    event.stopPropagation();
    hitView(event.mapPoint, v1, lyr1);
    hitView(event.mapPoint, v2, lyr2);
  });
}
```

This second method takes two sets of views and layers. It then calls
`event.stopPopagation()` to the popup doesn't show up, and passes the
`mapPoint`, views, and layers to the `hitView` method we just created.

Now we just needd to apply this method to our current views and layers.

```js
onClick(view1, view2, flayer1, flayer2);
onClick(view2, view1, flayer2, flayer1);
```

This will now keep the `hitTest` synced across two different map views.

You can see this sample in action here.

<iframe height="500" scrolling="no" title="Multi view hitTest" src="//codepen.io/odoe/embed/wEwYgz/?height=500&amp;theme-id=dark&amp;default-tab=js,result&amp;embed-version=2" frameborder="no" allowtransparency="true" allowfullscreen="true" style="width: 100%;">See the Pen <a href='https://codepen.io/odoe/pen/wEwYgz/'>Multi view hitTest</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>. </iframe>

You can also watch a video where I cover this code sample step by step.

<iframe width="560" height="315" src="https://www.youtube.com/embed/uJQAa-1HxPE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

You'll notice I've refactored the code in the sample above a bit from the video,
but I like it much better now!

Go forth and geohack my friends!

If you like this post, don't forget to
[subscibe!](https://odoe.net/blog/sign-up/)
