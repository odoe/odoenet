---
title: "Put ArcGIS JS API into your webpack"
published: true
author: Rene Rubalcava
date: "2018-05-23"
tags: geodev
coverImage: "webpack-plugin.jpg"
---

Recently, it was [announced](https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/using-the-new-webpack-plugin-for-the-arcgis-api-for-javascript/) that there is a new [@arcgis/webpack-plugin](https://github.com/esri/arcgis-webpack-plugin).

The plugin makes it easier for you to integrate the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/guide/index.html) into your modern developer workflow.

Basically, what it does is use a lightweight AMD loader during the webpack build process to feed the modules in the ArcGIS API for JavaScript into the webpack pipeline. This makes it so you can bundle the API into your application bundle.

Since it processes the entire API, you did end up with a few dozen bundles from the JSAPI, but you will realistically only use a handful of those for any deployed application. But with the ability to integrate into webpack, you can take advantage of all the webpack tooling that comes along with it.

This means you can more easily use third-party libraries like [ramda](https://ramdajs.com/), [lodash](https://lodash.com/), or [React](https://reactjs.org/) pretty easily. You just start using them like you would with any other React project and it just works.

You can install it into your project like this:

```bash
npm install -save-dev @arcgis/webpack-plugin
```

Now you can add it to your webpack configuration.

```js
// webpack.config.js

plugins: [
 new ArcGISPlugin(),
 ...
]
```

The plugin will manage the bulk of the heavy lifting for you.

Now you can just work with the JSAPI in your application without any further configuration.

```js
import FeatureLayer from "esri/layers/FeatureLayer";
import WebMap from "esri/WebMap";

import React from "react";
import ReactDOM from "react-dom";
```

A couple of things still need some work, such as integration with some of the framework clis out there. Most clis require you to eject the application so you can't use the cli with it any more in order to update the provided webpack configuration. But some clis, like [create-react-app](https://github.com/facebook/create-react-app) and [angular-cli](https://cli.angular.io/) have plugins that conflict with the webpack-plugin. In the Angular case, they have their own TypeScript loader which does some _magic involving their decorators I don't quite understand_.

But aside from cli integration, it's never been easier than ever to get up and running using the ArcGIS API for JavaScript with webpack than before.

You can check out the demo application [here](https://github.com/Esri/jsapi-resources/tree/master/4.x/webpack/demo) to get an idea of how to get started.

Be sure to also check out my video below on using the plugin!

Happy hacking!

<iframe width="560" height="315" src="https://www.youtube.com/embed/gTFZgLYegDY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
