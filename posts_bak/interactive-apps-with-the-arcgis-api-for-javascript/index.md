---
title: "Interactive Apps with the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2019-04-04"
tags: geodev
coverImage: "interactive-jsapi.jpg"
---

With the latest release of the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/), there are a lot of new features that makes it really exciting for building interactive applications. I'm not going to pretend to be an interactive app expert, but let's see if I can help cover a couple of cool new features to help you out.

## Filters and Effects

In this release, I think there are two new additions that make building awesome apps even _awesomer!_ Those are the [FeatureFilter](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html), and the [FeatureEffect](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html). The beauty of these two is that they both work on the LayerViews, meaning they are applied to client side data. This makes them fast and what do you get when things are fast? _Zoom zoom_, you get great performance which lends itself well to interactive apps! Keep up people.

The filters are similar to a definition expression, you provide a [where](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html#where) statement or a geometry with your filter. When you use a geometry, you can define the [spatial relationship](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html#spatialRelationship), which is insane! Have time enabled data, boom, filter on a [time extent](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html#timeExtent).

And what really ties this all together is the FeatureEffect if your looking to get fancy or highly abuse your users. I won't judge. You can provide a filter like above, but now you can decide what kind of effect to provide to the results of the filter and everything else via an [includedEffect](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html#includedEffect) and [excludedEffect](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html#excludedEffect). These filter effects are based on [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter), except for blur and drop-shadow for now. That means that YES, _you can sepia the shit out of your map if you want_.

## Feature Widget

There's plenty of samples in the API on [filter](https://developers.arcgis.com/javascript/latest/sample-code/?search=filter) and [effect](https://developers.arcgis.com/javascript/latest/sample-code/?search=effect). Let's toss this together with something like the [Feature Widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html) and get nuts. It may not be new, but it's still cool.

I'm a big fan of the [Feature Widget](https://odoe.net/blog/feature-widget-fun/). I just think the damn thing is so versatile. Someone recently asked me about a tooltip in the JavaScript API, and there is not a tooltip widget, but _are you going to let that stop you?_ I didn't think so. What is a tooltip other than some HTML that you move around the page. It also makes for a great interactive app experience.

## Custom Tooltips

First we can just add the HTML for our tooltip to the page.

<div id="tooltip" role="tooltip" style="display:none;"></div>
<div id="viewDiv"></div>

Simple enough of a start. I don't want it visible right away, so I'll inline display as none and update it as needed.

I'm going to style up my tooltip to make it look nice and I'm also going to apply a fixed width and height. This is important because I'll need the width and height to properly place the tooltip on the page and follow my mouse. It makes the interactivity easier to do.

#tooltip {
  overflow: auto;
  z-index: 99;
  position: absolute;
  padding: 10px;
  border-radius: 15px;
  background-color: rgba(0,0,0,0.75);
  color: #fff;
  width: 310px; 
  height: 150px;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

Now I can create my Feature Widget, and just make my code clear as to what I'm doing, I'm going to hold a reference the DOM element.

const tooltip = document.getElementById("tooltip");
const featureWidget = new Feature({ view, container: tooltip });
// I could reference that DOM element later on as
// featureWidget.container, but so much typing

And just to simplify my code for demo purposes, I'll have a reference my layer view just sitting around ready to go when I need it.

let layerView;
view.whenLayerView(layer).then(result => layerView = result);

Now what I want to do is listen for the [pointer-move](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event:pointer-move) event of the view. When I get the event, I can use it to do a [hitTest](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#hitTest) on the view and find a feature that my mouse pointer is over. Since I don't know if I have a result or not yet, I'll set the layer view effect to null to remove the effect from my app.

view.on("pointer-move", event => {
  const { x, y } = event;
  view.hitTest(event).then(({ results }) => {
    if (layerView) {
      layerView.effect = null;
    }
    ...
  });
});

Now is where the fun starts. If I have results, I'll want to show my tooltip that is now holding my feature widget content. It's simple to get content in there by just passing the feature to the widget and it displays what you would normally see in your popup content. I'll also update the tooltip DOM element so it's visible and the key is to calculate the top and left positions of the tooltip on the page based on the height and width of the tooltip. This is why they are defined in my CSS.

view.on("pointer-move", event => {
  const { x, y } = event;
  view.hitTest(event).then(({ results }) => {
    if (layerView) {
      layerView.effect = null;
    }
    if (results.length) {
      tooltip.style.display = "block";
      tooltip.style.top = \`${y - 175}px\`;
      tooltip.style.left = \`${x - 310/2}px\`;
      const g = results[0].graphic;
      if (g.geometry) {
        const oid = g.attributes.OBJECTID;
        featureWidget.graphic = g;
        ...
      } else {
        tooltip.style.display = "none";
      }
    } else {
      tooltip.style.display = "none";
    }
  });
});

## Apply Filter and Effect

Finally, what I can do is define the FeatureEffect for the layer view based on the feature my mouse is currently over. You will most likely use opacity and grayscale a lot, those two just fit very well for deemphasizing other features, but I'm sure you can get creative with other filters like invert, hue-rotate and more. I'll use opacity and saturate to deemphasize the excluded results of my filter.

view.on("pointer-move", event => {
  const { x, y } = event;
  view.hitTest(event).then(({ results }) => {
    if (layerView) {
      layerView.effect = null;
    }
    if (results.length) {
      tooltip.style.display = "block";
      tooltip.style.top = \`${y - 175}px\`;
      tooltip.style.left = \`${x - 310/2}px\`;
      const g = results[0].graphic;
      if (g.geometry) {
        const oid = g.attributes.OBJECTID;
        featureWidget.graphic = g;
        if (layerView) {
          layerView.effect = {
            filter: {
              where: \`OBJECTID = ${oid}\`
            },
            excludedEffect: "opacity(20%) saturate(30%)"
          };
        }
      } else {
        tooltip.style.display = "none";
      }
    } else {
      tooltip.style.display = "none";
    }
  });
});

What you end up with is an application that looks something like this.

<p class="codepen" data-height="480" data-theme-id="31222" data-default-tab="result" data-user="odoe" data-slug-hash="eoOvPj" data-preview="true" style="height: 480px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="FeatureView - Tooltip"><span>See the Pen <a href="https://codepen.io/odoe/pen/eoOvPj/">FeatureView - Tooltip</a> by Rene Rubalcava (<a href="https://codepen.io/odoe">@odoe</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

As you can see, this is pretty damn nifty! It's fast, it looks cool, if I do say so myself, and best off all, that's really not a lot of extra code to write. Plus, admit it, it's fun just to play with!

## Summary

We were quickly able to create a custom tooltip using some simple CSS, HTML, and the Feature Widget provided with the API. We even combined that with the new FeatureFilter and FeatureEffect to make the application even more interactive and provide feedback to users. All this with the capabilities already provided by the JavaScript API.

So take the latest release of the ArcGIS API for JavaScript for a spin. There a lot [more new features](https://developers.arcgis.com/javascript/latest/guide/release-notes/) that I didn't even mention that I'm sure you can create some really awesome apps with, so go on, keep making awesome things to make your users awesome!
