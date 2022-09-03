---
layout: "../../layouts/BlogPost.astro"
title: "DIY KML in ArcGIS JS API 4 Beta"
published: true
author: Rene Rubalcava
pubDate: "2015-12-15"
tags: geodev
coverImage: "esrijs4-diy.png"
---

People have a lot of [KML](https://developers.google.com/kml/) files sitting around out there.

The [ArcGIS API for JavaScript 4.0 beta](https://developers.arcgis.com/javascript/beta/index.html) isn't quite feature-complete, although it does provide a lot of new features over 3.x.

One of the features users have been wondering about is the [KMLLayer](https://developers.arcgis.com/javascript/jssamples/layers_kml.html) that is available in the 3.x version of the API. Now, I realize there are still a lot of KML files out there, remnants of the Google Earth API that [leaves this world this week](http://googlegeodevelopers.blogspot.com.au/2014/12/announcing-deprecation-of-google-earth.html), so many developers have orphan KML files that they would like to use with the ArcGIS API for JavaScript, in particular in the 4.0 beta to use them in 3D.

## DIY

_Note - this only really works with 2D KML, 3D doesn't get extruded_

So the ArcGIS JS API 4.0 beta doesn't have a KMLLayer yet. _You're a developer_. Are you going to whine about it or do something about it. Use the tools you have at your disposal.

If you check out the [3.x sample](http://developers.arcgis.com/javascript/samples/layers_kml/) and look at the network traffic, you'll see it's actually using an online service to parse the URL. Specifically it's using [this one](http://utility.arcgis.com/sharing/kml). The [docs](https://developers.arcgis.com/javascript/jsapi/kmllayer-amd.html) show you can change this if you want.

Let's use this to our advantage here. We'll just pass the KML url to the KML parse service and voila, _magic_.

[gist](https://gist.github.com/odoe/4b88ff6a3b928eb0a51d)

The response from the KML service is FeatureCollection of layers that make up the KML file. We're going to use the [GroupLayer](https://developers.arcgis.com/javascript/beta/api-reference/esri-layers-GroupLayer.html) in the 4.0beta to load the FeatureCollections into FeatureLayers.

This gets us close.

This doesn't take into account [network links](https://www.google.com/earth/outreach/tutorials/network_link.html) or [KML models](https://developers.google.com/kml/documentation/models?hl=en). I imagine getting the 3D models to work will take some time and elbow grease in the 4.0beta.

[Live demo](http://www.odoe.net/apps/diykml/)

But, if you have some basic KML you want to use in the ArcGIS JS 4.0beta, these are the basic steps you can use to do it yourself until KML support comes to the 4.0beta.

Don't let something like official support hold you back. If you think there's a way to implement a feature you need that isn't supported yet, try it out and see if you can make it work. Sometimes, you need to get your hands dirty to get the job done.
