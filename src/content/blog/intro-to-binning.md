---

title: Intro to Binning with ArcGIS JavaScript
description: Binning in the ArcGIS API for JavaScript is a great way to
  visualize your data! Let's get binful!
published: true
author: Rene Rubalcava
pubDate: 2022-09-09T10:00:00.000Z
heroImage: '../../assets/blog/intro-to-binning/images/cover.jpg'
tags: geodev, javascript
---

## What the bin?

There's an option for layers in the ArcGIS API for JavaScript called
[featureReduction](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#featureReduction).
Up until recently, you could use it to define
[clusters](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html)
of features in your application. FeatureReduction is a way to summarize data
visually on the map. For clusters, this means the amount of features in the
cluster determine how large the cluster is. Recently, the API introduced the
ability use
[binning for FeatureReduction](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionBinning.html).
For more details on binning, I highly recommend you read
[this blog post](https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/binning-now-available-in-the-arcgis-api-for-javascript/)!

> Here is a [codepen](https://codepen.io/odoe/pen/dymxOjN?editors=0010) of the
> sample used in this post.

## Adding binning to my features

I have
[this webmap](https://jsapi.maps.arcgis.com/home/item.html?id=6853cf2b3f4346378f6b884af457b8e5)
that I like to use when I want to demonstrate using a large amount of features.
The service over 2 million points, so it's a pretty good test map and layer. The
first thing to do is define a bin level.

```js
const layer = new FeatureLayer({
  portalItem,
  featureReduction: {
    type: "binning",
    fixedBinLevel: 4,
  },
});
```

The
[`fixedBinLevel`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionBinning.html#fixedBinLevel)
will keep the bins the same size regardless of how much you zoom in and out.
Depending on your dataset, and the scale you plan to use, this could take some
tweaking, but once you've found a good level, you are all set.

## FeatureReduction Renderer

One of the first things you would normally do is set up your
[aggregateFields](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionBinning.html#fields),
where you can set up the statistics for your bins. My service doesn't have a
numeric field I could really use, so I won't set it up, but this is a great way
to aggregate your data for visualizations. By default, bins will have an
`aggregateCount` field I can use.

```js
const layer = new FeatureLayer({
  portalItem,
  featureReduction: {
    type: "binning",
    fixedBinLevel: 4,
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [0, 255, 71, 1],
        outline: null,
        outline: {
          color: "rgba(153, 31, 23, 0.3)",
          width: 0.3,
        },
      },
      visualVariables: [
        {
          type: "color",
          field: "aggregateCount",
          legendOptions: {
            title: "Number of Places",
          },
          stops: [
            { value: 0, color: "#d7e1ee" },
            { value: 25, color: "#cbd6e4" },
            { value: 75, color: "#b3bfd1" },
            { value: 200, color: "#c86558" },
            { value: 300, color: "#991f17" },
          ],
        },
      ],
    },
  },
});
```

Ok, so in this renderer, I set up some
[visual variables](https://developers.arcgis.com/javascript/latest/visualization/data-driven-styles/visual-variables/)
that will define bin colors based on the amount of features in the bin. Notice
that all these properties are part of the `featureReduction` of the layer, not
the root of the layer itself.

## Adding Labels

Not only can define a renderer for the bins, you can define labels! I'll admit
though, this might be something you want to toggle, because it can get busy. I
would say, use bin labels cautiously.

```js
labelingInfo: [
  new LabelClass({
    minScale: 0,
    maxScale: 0,
    deconflictionStrategy: "none",
    symbol: {
      type: "text",
      color: "white",
      font: {
        family: "Noto Sans",
        size: 10,
      },
      haloColor: "gray",
      haloSize: 0.5,
    },
    labelExpressionInfo: {
      expression: "Text($feature.aggregateCount, '#,###')",
    },
  }),
];
```

Notice we can use an arcade expression for the aggregate fields
`"Text($feature.aggregateCount, '#,###')",` for labels. When it comes to arcade,
`$feature` refers to the binned feature. not any of the source features.

## Color Ramps

I want to touch on a pretty cool feature in the documentation for the ArcGIS API
for JavaScript. That would be the
[Esri Color Ramps](https://developers.arcgis.com/javascript/latest/visualization/symbols-color-ramps/esri-color-ramps/).
I don't know about you, but I don't exactly have the skill set to be creating
hand crafted artisanal color ramps for my visual variables. What's great is you
can browse the color ramps, filter them by type and color scheme, then they
provide a nice copy button for hex values. The best part? The copy button adds a
JavaScript snippet to your clipboard you can paste right into you applications!

```js
// #48385f|#995375|#db4a5b|#fc9a59|#fee086
const colors = ["#48385f", "#995375", "#db4a5b", "#fc9a59", "#fee086"];
```

Now, I can update my visual variables to use them!

```js
visualVariables: [
    {
        type: "color",
        field: "aggregateCount",
        legendOptions: {
            title: "Number of Places",
        },
        stops: [
            { value: 0, color: colors[4] },
            { value: 25, color: colors[3] },
            { value: 75, color: colors[2] },
            { value: 200, color: colors[1] },
            { value: 500, color: colors[0] },
        ],
    },
],
```

Look at that! Have more stops? Less stops? You can filter the color ramps to
find what suits your needs!

## Summary

Using bins for feature reduction and aggregating data is a great way to
visualize your larger datasets. Visually, a large amount of points may not tell
the story you want. Tools like binning and clusters, especially with aggregate
fields can help you make the maps and apps that make your data shine!

You can watch a video on this topic below!

<lite-youtube videoid="A0iKUlENQP0"></lite-youtube>
