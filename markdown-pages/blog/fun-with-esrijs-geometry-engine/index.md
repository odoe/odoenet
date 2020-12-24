---
title: "Fun with EsriJS Geometry Engine"
published: true
author: Rene Rubalcava
date: "2015-04-13"
tags: geodev
coverImage: "cateyes.gif"
---

The release of version 3.13 of the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) introduced the beta version of the [Geometry Engine](https://developers.arcgis.com/javascript/jsapi/esri.geometry.geometryengine-amd.html). Since this is still considered beta, there are probably some missing features, maybe a few bugs here and there, so _use with caution_.

### What the hell is it?

The Geometry Engine is analogous to [Turf](http://turfjs.org/). I'm a [big fan of Turf](https://odoe.net/blog/exploring-new-turf/) even converting my ArcGIS Features to GeoJSON to use it when needed, so I was pretty excited to see this additional functionality. There's a sample up on how to [buffer](https://developers.arcgis.com/javascript/jssamples/ge_geodesic_buffers.html), which is classic. We always want to buffer. I showed how it can be used to measure distances pretty easily in [this blog post on GeoNet](https://geonet.esri.com/people/odoe/blog/2015/04/01/esrijs-with-reactjs-updated) and there's tons of other really cool stuff you can do with it.

### Dumb stuff to do dumb stuff

So the following examples are in no way intended to be useful whatsoever. They are however examples of what you can do if you just wanted to play with the Geometry Engine. If you look at [the docs](https://developers.arcgis.com/javascript/jsapi/esri.geometry.geometryengine-amd.html), all the basics are there. You can clip, buffer, intersect, union, find nearest points, check if one geometry is another, blah blah blah. You could also say screw that noise and just rotate the shit out of stuff. [Fun with Geometry Engine](http://jsbin.com/ziwegefote/1/embed?output)


Or maybe you want to turn California into an island! [Fun with Geometry Engine](http://jsbin.com/ziwegefote/2/embed?output)


Or you want to make it dance. [Fun with Geometry Engine](http://jsbin.com/ziwegefote/3/embed?output)


Ok, that's just some silly stuff you could do with the Geometry Engine. If you are doing some more complex work, like buffering lots of points, clipping some complez features, or more, you may want to use the [async version of Geometry Engine](https://developers.arcgis.com/javascript/jsapi/esri.geometry.geometryengineasync-amd.html) which will start using [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to handle some of the load.

### Enough fooling around

Take the Geometry Engine start seeing if it can fill some gaps in your workflow. Composed together, you can forego some requests to a Geometry Service and do a lot of this work in the browser now. I like Turf for my non-esri projects and I'm glad that I have a cool option in the ArcGIS API for JavaScript now.
