---
title: "Esri ClusterFeatureLayer"
published: true
author: Rene Rubalcava
date: "2014-02-11"
---

## Too many damn points

If you have ever worked with a somewhat large amount of points in a web mapping application, in particular with the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/), you know the pain points it can take to display that much data on a map. It could be five-thousand, fifty-thousand or a one-thousand, depending on the density of the points and scale of your map, but plenty of times you wish you could just cluster them to make them easier to deal with.

## No love for the JS API

The other Esri Web APIs have had really nice client-side clustering for a while. Look at [Flex](https://developers.arcgis.com/flex/sample-code/clustering.htm) and [Silverlight](https://developers.arcgis.com/silverlight/guide/working-with-clustering.htm). Everyone loves that damn FlareCluster. But the JavaScript API has been left out in the cold. There is a [ClusterLayer example](https://developers.arcgis.com/javascript/jssamples/layers_point_clustering.html) provided, but it is not part of the core API and it wasn't really designed to work with Features, just pseudo point data. One of the reasons is, parsing the data and computing the clusters be a little expensive, but other libraries like [Google](http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/examples/simple_example.html) and [Leaflet](https://github.com/Leaflet/Leaflet.markercluster) have plugins that can handle clustering pretty fast and they look real nice. Clustering is one of the reasons I have been using and contributing to the [Esri-Leaflet plugin](https://github.com/Esri/esri-leaflet). Of course, the ideal solution would be to implement [clustering server side](http://blog.davebouwman.com/2012/03/24/server-side-clustering-why-you-need-it/) (thanks D. Bouwman), but not every dev has access to extend ArcGIS Server services, nor do I feel like having to do add this to every service I may want to use this on.

## Make it work

This left me with a little dilemma. I have a couple of existing ArcGIS JS API projects that could really benefit from this. That [ClusterLayer](https://developers.arcgis.com/javascript/jssamples/layers_point_clustering.html) example does most of the work (thanks Esri!), but it would be really cool if I could just feed it a URL to a FeatureService or MapService of points and have it work. So... I tweaked it to make a [ClusterFeatureLayer](https://github.com/odoe/esri-clusterfeaturelayer) that works similar to a [FeatureLayer](https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html).

## Caveats

There are a couple of things lacking in this ClusterFeatureLayer.

- [_No Vector Tiling_](https://developers.arcgis.com/javascript/jshelp/best_practices_feature_layers.html), although with points, I don't think it matters. A better route is probably to send the requests for objectIds in chunks and when all requests done, display clusters.
- _No manual cache_. I was thinking maybe performance could be improved with a local cache, but lookup might negate that benefit. Could warrant some testing. I have added a cache for clustered features.

_\*Uppublished: true
author: Rene Rubalcava
date:_ I recently updated this ClusterFeatureLayer to use [dojo/promise/all](http://dojotoolkit.org/reference-guide/1.9/dojo/promise/all.html) to send multiple requests if more than 1000 objectIds are in view. I also added an optional where clause to refine the queries. I've also added a cache to limit the number of requests and included a clearCache() method.

But it works and that's what counts.

**You can view a demo of the ClusterFeatureLayer [here](http://odoe.github.io/esri-clusterfeaturelayer/)**. How to use it is similar to the original shown [here](https://github.com/odoe/esri-clusterfeaturelayer/blob/master/index.html). Again, big thanks to the Esri JS devs for the original [ClusterLayer](https://developers.arcgis.com/javascript/jssamples/layers_point_clustering.html) example this is built on.

If you can make some performance improvements, please [fork and pull](https://github.com/odoe/esri-clusterfeaturelayer) as usual.

For more ArcGIS Web Dev goodness, check out [a book I am working on with Manning Publications](http://www.manning.com/rubalcava/).
