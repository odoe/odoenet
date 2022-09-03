---
layout: "../../layouts/BlogPost.astro"
title: "Using ES Modules with the ArcGIS JSAPI"
description: "ES Modules allow you to quickly add the ArcGIS JS API to your modern JavaScript apps"
published: true
author: Rene Rubalcava
pubDate: 2021-01-05T12:00:00.000Z
coverImage: "image.jpg"
tags: geodev
---

## What are ES Modules and Why should you care

[EcmaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) or ES Modules allow you to load JavaScript as needed and on-demand in your applications. Sound familiar? [**cough, cough**](https://requirejs.org/docs/whyamd.html). _I'm just saying_. ES Modules are a modern way of building web applications. They're supported in most [modern browsers](https://caniuse.com/es6-module) and a variety of build tooling such as [webpack](https://webpack.js.org/) and [rollup](https://rollupjs.org/guide/en/).

## What this means for the ArcGIS JSAPI

The [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) has a lot of features. Like _a lot_. It not only supports the [ArcGIS Platform](https://www.esri.com/en-us/arcgis/about-arcgis/overview), but includes a multitude of visualization options, even 3D! All from a single library. This means, the whole of the library is pretty large. Historically, to make this fast for developers, the API has used AMD and AMD build tooling to optimize its use. Combine this optimized build with a cached CDN and it is already plenty fast and performant. The drawback is that it can become difficult to integrate the API with other frameworks and build tools. This is why the old version of the [`@arcgis/webpack-plugin`](https://github.com/Esri/arcgis-webpack-plugin/blob/96c60c8d469e4976d1b62ec30b4c9838e4d74480/README.md) and [esri-loader](https://github.com/Esri/esri-loader) exist.

Now that the API is being released with and ES Modules options via [`@arcgis/core`](https://www.npmjs.com/package/@arcgis/core), you don't _need_ those other options integrate the API with your React or Angular project anymore. You can `npm install @arcgis/core` and start using it right away. This is huge for current and new ArcGIS web developers.

## Show me the goods

There are a variety of [samples using ES Modules](https://github.com/Esri/jsapi-resources/tree/master/esm-samples) you can explore. In your project, once the API is installed, you can begin adding some awesome Maps to your application.

```js
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';

const map = new WebMap({
    portalItem: {
        id: 'myfavoritemap'
    }
});

const view = new MapView({
    map,
    container: 'viewDiv'
});
```

There's no need for a plugin or special loader. It just works. There is one thing you need to do in your app. You need to copy the `@arcgis/core/assets` folder to your build directory for your application. This `assets` folder has all the fonts, images, styles, and worker files used by the API. This is where the latest release of the [`@arcgis/webpack-plugin`](https://github.com/Esri/arcgis-webpack-plugin) can be useful. It will handle copying the assets folder, and even filter out some files not needed at runtime, like `sass` files and few more. You can even filter our language files you might not need in your application. However, I typically always recommend you just copy all the language files over. Even if _your app_ doesn't support multiple locales, _the API does_, so it can still display the proper language for your users.

Maybe you want to lazy-load some modules in your application. This is useful if you don't need to display a map right away.

```js
async function loadMap() {
    const [
        { default: WebMap },
        { default: MapView }
    ] = Promise.all([
        await import(`@arcgis/core/WebMap`);
        await import(`@arcgis/core/views/MapView`);
    ]);
    const map = new WebMap({
        portalItem: {
            id: 'myfavoritemap'
        }
    });
    const view = new MapView({
        map,
        container: 'viewDiv'
    });
}
```

This `loadMap` function will [dynamically load](https://v8.dev/features/dynamic-import) the modules needed to display the map. Talk about _modern JavaScript_!

You can watch me fumble through a demo below if you like!

<iframe width="100%" height="400" src="https://www.youtube.com/embed/C-8im8eEUPQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>