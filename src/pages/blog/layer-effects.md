---
layout: "../../layouts/BlogPost.astro"
title: "Layer Effects in ArcGIS"
description: "You can do some amazing visualizations in ArcGIS JSAPI with Layer Effects"
published: true
author: Rene Rubalcava
pubDate: 2021-01-25T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Layer Effects

The ArcGIS API for JavaScript has had [layer effects](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html) for a while now. You can do some pretty amazing visualizations with them. The recent release of the API introduced some more effects that you can ~~abuse~~ use wisely.

Let me tell you, when effects were introduced in the API, my excitement level was _Dragon Ball 9000!_  Considering the fact you can apply an effect to features that match a query, as well as features that don't match your query, you can do [some cool stuff to emphasize data](https://codepen.io/odoe/pen/GeoKLB?editors=1000) in your apps! This [demo](https://developers.arcgis.com/javascript/latest/sample-code/featureeffect-geometry/index.html) is a great playground to try stuff out.

## New Stuff

So what's new in effects world? The two effects that were missing, _that I might have gently prodded for_, but are finally here are blur and drop-shadow. We even get bloom, which is insane! Layer effects are based on [css filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter), so you can check that documentation for some ideas on how to use them. I had resorted to some [crazy hacks](https://codepen.io/odoe/pen/eXPLQr) to get similar effects, but pretty sure I could do this much cleaner now.

I can use something like the [Slider widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Slider.html) to create a cool interactive app with the effects. I can use the Slider to grab values I can use to pass to my effects. Most of the time, I don't want to apply the effects directly to my layer, I'll apply them to the [LayerView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html).

When the Slider values update, I can use them to create a [FeatureFilter](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html) with the [FeatureEffect](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html).

```js
view.whenLayerView(layer).then(async (layerView) => {
  await whenFalseOnce(layerView, "updating");
  slider.on("thumb-drag", ({ value }) => {
    label.innerText = `${value}%`;
    if (value > 0) {
      layerView.effect = {
        filter: {
          where: `PctUnemployed_CurrentMonth < ${value}`,
        },
        includedEffect: "bloom(20%) drop-shadow(2px, 2px, 2px)",
        excludedEffect: "blur(7px)",
      };
    } else {
      layerView.effect = null;
    }
  });
});
```

I [wait for the LayerView](https://odoe.net/blog/when-are-layers-done) to finish doing it's thing and now I know I can apply an effect to it. I'm blooming it up with some drop-shadow and blurring faces like I'm hiding something!

I can't tell you how much fun this stuff is.

<iframe height="500" style="width: 100%;" scrolling="no" title="Fun with Layer Effects" src="https://codepen.io/odoe/embed/preview/MWjRyLe?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/MWjRyLe'>Fun with Layer Effects</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

You can watch me go through this in action here!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/jTfQZkRI6vE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
