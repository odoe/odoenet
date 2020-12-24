---
title: "CartoDB with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2015-02-23"
tags: geodev
coverImage: "esri-cartodb.png"
---

When it comes to storing spatial data in the cloud, you have a handul of options. If you're using Esri tech, there's [ArcGIS Online](http://www.arcgis.com/features/). Or maybe you're rolling your own [PostGIS](http://postgis.net/) on [AWS](https://aws.amazon.com/) or [OpenShift](https://www.openshift.com/) or elsewhere. If you're a fan of PostGIS, I'd highly recommend [CartoDB](http://cartodb.com/).

CartoDB is great for storing data in a cloud-based (yeah, I said it) PostGIS service. You can upload data, query and edit, everything you'd expect. CartoDB really shines in the tools it provides that let you easily [visualize your data](http://cartodb.com/gallery/web-mobile). You don't need to be a geo-expert to use it to make data-driven maps.

### Sticking CartoDB in the ArcGIS API for JavaScript

You may be presented with a scenario where you need to get some data out of CartoDB and use it with your ArcGIS API for JavaScript application. A perfect tool for this would be to use [Terraformer](http://terraformer.io/) to convert the GeoJSON to ArcGIS Features for use in your application. If you have the resources, you may even want to create a web service in Node to proxy the requests and do the conversions for you. But if you need to stick with doing this in the browser, you can accomplish this by extending the [GraphicsLayer](https://developers.arcgis.com/javascript/jsapi/graphicslayer-amd.html) to handle CartoDB data for you.

To do this, you'll want to essentially have a method that does the query of the CartoDB table, parse the GeoJSON results and add the graphics the GraphicsLayer to be displayed on the map. You can accomplish that with the code below.

[gist](https://gist.github.com/odoe/9cbb76e1a08ef1a7aa3b)

If you review the code, you can see it dependent on having [Terraformer](http://terraformer.io/) with the [ArcGIS Parser](http://terraformer.io/arcgis-parser/) loaded on your page. Terraformer is unfortunately not AMD compatible at the moment. Once the GeoJSON is parsed, each feature is converted to a [Graphic](https://developers.arcgis.com/javascript/jsapi/graphic-amd.html) and added to the layer.

You can see a demo of the CartoDBLayer [here](http://www.odoe.net/apps/arccartodb/sample/).

### Cooking up geo-goodness

Just because you may need to work with different spatial technologies doesn't mean you can't get them to play well together. Because of tools like Terraformer, we can easily consume services that provide GeoJSON data and use them in our ArcGIS applications. As I mentioned earlier, you may even parse the results in a web service for your application. Maybe you'll want to work some [koop](https://github.com/Esri/koop) magic while your're at it.

My point is the resources are out there and available for you to cook up as you wish the prepare a delicious geo-meal. You just may need to hack it together, but that's okay.
