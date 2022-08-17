---
layout: "../../layouts/BlogPost.astro"
title: "Edit GeoJSON with the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: "2019-11-14"
tags: geodev
coverImage: "arcgis-geojson.jpg"
---

I recently came across a question about the [GeoJSONLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html) in the ArcGIS API for JavaScript. The question had to with editing and also being able to save those edits somewhere. If you didn't know, the GeoJSONLayer takes a URL to a GeoJSON file and loads it in the API. Not only that, but you get all the benefits that you also get with the FeatureLayer.

- Can use [Smart Mapping, multiple types of renderers, even 3D](https://developers.arcgis.com/javascript/latest/guide/visualization-overview/)
- [Arcade](https://developers.arcgis.com/javascript/latest/guide/arcade/)
- [Queryable](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#queryFeatures), including [statistics](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html#outStatistics)
- [Popups](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#popupTemplate)
- [Definition Expressions](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#definitionExpression)
- [Feature Filters](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html) and [Feature Effects](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html)
- [Feature Templates](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureTemplate.html)
- [Editing](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html)
- and plenty more I'm sure!

This means you can really enhance the use of your GeoJSON directly in the API.

Since the GeoJSON is downloaded to the client, when you use [applyEdits](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#applyEdits), it's editing the data locally. This makes sense when you think about it, because there's no clear way of knowing the behavior of the service the GeoJSON comes from, so there's no way to know what the update API for the GeoJSON might look like, if there even is one.

## Write your own rules

But, of course, this is JavaScript and you can do whatever you want. We can turn back to an old staple when working with GeoJSON with ArcGIS and use [Terraformer](https://esri.github.io/terraformer). Terraformer is great to convert from ArcGIS JSON to GeoJSON and back again.

First off, I want to provide an editing experience for my GeoJSON in my application. I could go all out and provide [templates](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureTemplate.html) for the [Feature Templates widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTemplates.html) to build a custom editing experience or just use the [Editor widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html) by itself.

Let's create our GeoJSONLayer.

```js
const geojsonLayer = new GeoJSONLayer({
  url:
    "https://www.chapelhillopendata.org/api/v2/catalog/datasets/pedestrian-crashes-chapel-hill-region/exports/geojson",
  templates: [
    {
      name: "Crashes",
      description: "Pedestrian crashes in Chapel Hill",
      drawingTool: "point",
      prototype: {
        attributes: {
          ...
        }
      }
    }
  ],
  popupTemplate: {
    title: "{crash_grp}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ambulancer",
            label: "ambulancer"
          },
          {
            fieldName: "county",
            label: "county"
          },
          {
            fieldName: "crash_type",
            label: "crash_type"
          },
          {
            fieldName: "locality",
            label: "locality"
          },
          {
            fieldName: "drvr_age",
            label: "drvr_age"
          }
        ]
      }
    ]
  }
});
```

I can provide Feature Templates with my GeoJSONLayer that will define some default values for fields that I might want when adding new features. Now we can use the GeoJSONLayer as the source of Editor widget.

```js
const editor = new Editor({
  view,
  layerInfos: [
    {
      layer: geojsonLayer,
      fieldConfig: [
        {
          name: "ambulancer",
          label: "ambulancer"
        },
        {
          name: "county",
          label: "county"
        },
        {
          name: "crash_type",
          label: "crash_type"
        },
        {
          name: "locality",
          label: "locality"
        },
        {
          name: "drvr_age",
          label: "drvr_age"
        }
      ]
    }
  ]
});
```

In this case, I'll only expose a few fields to the Editor and not concern myself with the others.

## Editing

At this point, I can edit my data just like a FeatureLayer, but maybe I want to download this edited GeoJSON and upload it to my server for future use. I can add a button to application that when clicked will query all the features in the GeoJSONLayer, convert them to GeoJSON and then I can do whatever I want with them.

```js
geojsonLayer
  .queryFeatures()
  .then(({ features }) => {
    const FeatureCollection = {
      type: "FeatureCollection",
      features: []
    };
    FeatureCollection.features = features.map(
      ({ attributes, geometry }, index) => {
        return {
          id: index,
          properties: attributes,
          geometry: Terraformer.ArcGIS.parse(geometry)
        };
      }
    );
    // Do something with your GeoJSON
    // Download it or send it to an external API
    // to update your existing GeoJSON
    console.log("FeatureCollection", FeatureCollection);
  })
  .catch(error => console.warn(error));
```

And that's it!

Working with GeoJSON in the JavaScript API let's you use simple GeoJSON in a more robust manner and take full advantage of all the tooling you get with the API!

Here is a demo of this application in action.

<iframe height="500" style="width: 100%;" scrolling="no" title="GeoJSONLayer Fun" src="https://codepen.io/odoe/embed/BaaqKQO?height=500&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/BaaqKQO'>GeoJSONLayer Fun</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Summary

As you can see, the ArcGIS API for JavaScript can even take basic GeoJSON, make it editable with rendering and let you download that new edited data. That's awesome! I'm sure you can take full advantage of this yourself in your applications! Happy geohacking!
