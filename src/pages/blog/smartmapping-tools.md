---
layout: "../../layouts/BlogPost.astro"
title: "Smart Mapping tools"
description: "How to use Smart Mapping tools in your ArcGIS API for JavaScript apps!"
published: true
author: Rene Rubalcava
pubDate: 2022-01-28T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Smart Mapping Tools

[Smart Mapping](https://www.esri.com/en-us/arcgis/products/mapping/smart-mapping) is an Esri wide tool of the platform. It provides some intuitive ways for you create awesome visualizations for your web mapping apps. I highly recommend that your first stop in your Smart Mapping journey begin in the [Map Viewer](https://doc.arcgis.com/en/arcgis-online/create-maps/apply-styles-mv.htm). When you style your layers, and maps in the Map Viewer, you can save them, and then easily consume them, styles and all, in your own applications.

_However_, you might have to customize some things once in a while. You may be working with CSV, GeoJSON, of unknown various data sources that you want to display in your app. That's where the Smart Mapping tools [in the ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/visualization/) can be useful.

I did a couple of videos on how you can [create popups](https://youtu.be/Z2S9wwAJ7CI) from the layer, and also use the [Smart Mapping popup helpers](https://youtu.be/ROhJNceKFUg) to create popups to go along with your visualization.

However, you can also use various modules together to help you make awesome apps!

* Min/Max Scale
* PopupTemplate
* Renderer

One of the first things you can do is let the Smart Mapping tools help you determine optimal [scale ranges](https://developers.arcgis.com/javascript/latest/api-reference/esri-smartMapping-heuristics-scaleRange.html) for your layers.

```ts
import scaleRange from '@arcgis/core/smartMapping/heuristics/scaleRange';

// determine min/max scales
const { minScale, maxScale } = await scaleRange({
    layer: featureLayer,
    view,
});

// apply scales to layer
featureLayer.minScale = minScale;
featureLayer.maxScale = maxScale;
```

The `scaleRange` method needs the target layer, and the view to determine proper scale ranges. It doesn't always make sense to see data drawn at all scales, so this could be very useful to have a clean mapping experience in your application.

Next we can create a renderer for our layer. In this case, we might be interested in creating a [relationship renderer](https://developers.arcgis.com/javascript/latest/visualization/data-driven-styles/relationship/).

```ts
import { createRenderer } from '@arcgis/core/smartMapping/renderers/relationship';
const { renderer } = await createRenderer({
    layer: featureLayer,
    view,
    field1: {
        field: 'HSE_UNITS',
    },
    field2: {
        field: 'VACANT',
    },
});
featureLayer.renderer = renderer;
```

Per the [documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-smartMapping-renderers-relationship.html) we need to provide the two fields we are interested in visualizing the relationship of. Then we can assign the returned renderer to the layer.

Then finally, we went through all the trouble to determine a good scale and a captivating visualization, we should compliment that with a proper popup!

```ts
import { getTemplates } from '@arcgis/core/smartMapping/popup/templates';

const { primaryTemplate } = await getTemplates({
    layer: featureLayer,
});

featureLayer.popupTemplate = primaryTemplate.value;
featureLayer.popupTemplate.title = primaryTemplate.title;
```

The [templates](https://developers.arcgis.com/javascript/latest/api-reference/esri-smartMapping-popup-templates.html) helper will determine the best format of the popup based on the renderer being used. This is super useful so you can move away from plain table based popups when trying to convey information in your applications!

And there you go! That's a basic, yet effective workflow to help you automate the use of Smart Mapping in your own applications. I look forward to seeing some awesome visualizations in all your mapping apps!

You can see more in the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/8_3hBoOI4Jg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>