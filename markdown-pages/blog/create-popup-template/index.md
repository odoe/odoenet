---
title: "Create Popup Template"
description: "Quickly create popup templates for your layers in the ArcGIS JSAPI"
published: true
author: Rene Rubalcava
date: 2022-01-10T12:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Create Popup Template

The [Popup](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Popup.html) is a key feature of working with the ArcGIS API for JavaScript. It lets users quickly see the data associated with a location. Ideally, you would author your popup content in [the online map viewer](https://doc.arcgis.com/en/arcgis-online/create-maps/configure-pop-ups-mv.htm). But sometimes, you don't have that option. You might be working a layer you are unfamiliar with, or maybe just need to make sure there are popups for any layers a user might add to your app dynamically.

That's why the [`createPopupTemplate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#createPopupTemplate) method on various layers is available. This method is available on a number of layers, like FeatureLayer, CSVLayer, Sublayer, which are used in the MapImageLayer.

```js
const popupTemplate = featureLayer.createPopupTemplate();
featureLayer.popupTemplate = popupTemplate;
```

I kind of wish it was more complicated, so I could make this post incredibly insightful. But it's not. This will return a basic popup template that displays all the visible fields of the layer. This is really useful if you want to add popups for all the sublayers of a MapImageLayer.

```js
await mapImageLayer.loadAll();
for (let sublayer of mapImageLayer.allSublayers) {
    sublayer.popupTemplate = sublayer.createPopupTemplate();
}
```

If you want to clean up the popups a bit, there are some [options](https://developers.arcgis.com/javascript/latest/api-reference/esri-support-popupUtils.html#CreatePopupTemplateOptions) you can use to ignore shape or guid fields, or set some visible fields.

That's all there is to it. Simple, and incredible useful!

You can check out this video below for more information!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/Z2S9wwAJ7CI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
