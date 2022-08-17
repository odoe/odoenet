---
layout: "../../layouts/BlogPost.astro"
title: "Clustering in ArcGIS JSAPI"
description: "You can control how you want to cluster and how query your clusters in your apps!"
published: true
author: Rene Rubalcava
pubDate: 2021-02-17T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Clustering

The ArcGIS API for JavaScript supports displaying large amounts of features. Points on points on points, for days. That's cool and all, but depending on how dense the data is, it might not make much sense. You might not even be able to discern many patterns in large amounts of data just sprawled out on a map. But if you enable clustering on your data, sometimes you can make things pop. You could determine where most of the data is clustered, even what dominant attributes might exist in those clusters in a quick visual representation.

Probably the easiest way to get started is to [enable clustering in the online MapViewer](https://doc.arcgis.com/en/arcgis-online/create-maps/configure-clustering.htm). But you're not limited to that. You can enable clustering on features in your apps using [featureReduction](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html). Even if you bring in a hosted dataset with a defined visualization, you can still enable it. Maybe don't use firefly symbols when you do though, just speaking from experience.

```js
const layer = new FeatureLayer({
    portalItem: {
        id: itemId
    },
    featureReduction: {
        type: 'cluster',
        clusterRadius: 100
    }
});
```

## Make them useful

You're not limited to just visually displaying clusters. Sometimes you want to interact with them, maybe find all the features that make up the clustered feature. You can use [`query.aggregateIds`](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html#aggregateIds). This is like an `objectId`, but for clusters. When you use it with a query, it will return all the child features that comprise the clustered feature.

```js
const ids = graphic.getObjectId();
query.aggregateIds = [ id ];
const { features } = await layerView.queryFeatures(query);
```

Once you have all the features, you can do something with them, display them or maybe run them through [`geometryEngine`](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html). You can display a [convexHull](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#convexHull) of the features, but first you need to [union](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#union) all the geometries.

```js
const geometries = features.map((x) => x.geometry);
const geometry = union(geometries);
const hull = convexHull(geometry);
```

Now you can display the convexHull of the clustered features, use them for some sort of an analysis, the possibilities on endless. Maybe not endless, but you do what you gotta do.

For more details, check out the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/WZ1TQan6YrY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
