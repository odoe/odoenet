---
title: "Using Bower to build ArcGIS API for JavaScript Apps"
published: true
author: Rene Rubalcava
date: "2015-11-16"
tags: geodev
coverImage: "esri-bower-2.png"
---

Esri recently announced the release of a [Bower package for the ArcGIS API for JavaScript](http://blogs.esri.com/esri/arcgis/2015/11/13/using-bower-for-custom-builds-of-arcgis-api-for-javascript/).

The repo for the Bower package can be found [here](https://github.com/Esri/arcgis-js-api). There is also a repo with [examples on how to do local builds using Dojo and RequireJS](https://github.com/Esri/jsapi-resources/tree/master/bower).

## Easy Bower Install

```
bower install --save arcgis-jsp-api
```

This makes it incredibly easy to do custom local builds of your ArcGIS API for JavaScript applications that are highly optimized and easy to deploy.

Using the Bower package to create custom local builds of your ArcGIS JS apps is not a replacement for the [JavaScript Optimizer](https://developers.arcgis.com/javascript/jshelp/inside_web_optimizer.html) which you can use to create a custom build of the ArcGIS API for JavaScript and have it hosted via a CDN specific for your application. If you are comfortable with that workflow, there may not be a need for you to change.

If you've been using the [esrislurp](https://github.com/steveoh/esrislurp) tool to download the ArcGIS JS API from the CDN to your machine, then the Bower package is definitely something you would want to use.

The Bower package has not been run through any build system, just minified. This means you can customize the build as much as you would like. You can read more about the Dojo build process [here](https://dojotoolkit.org/documentation/tutorials/1.10/build/).

For details, watch this video that covers all the steps using both Dojo and RequireJS.

<iframe width="560" height="315" src="https://www.youtube.com/embed/OFZnXACy97Y" frameborder="0" allowfullscreen></iframe>
