---
title: "ArcGIS JSAPI Build Tips"
description: "A few tips for building the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: 2021-08-02T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

I do a lot of work on testing out local builds of the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/). No joke. I do this a lot. I get asked about this a lot. So here are a few tips and comparisons for you.

## Things to consider

There are a few things to consider when making a local build of the API. You have runtime size and deployed size.

Runtime size is the amount of JavaScript loaded when the application is in use. This is probably the most important number to look at when building an application. I've discussed this before, but loading a map, visualizations, maybe a couple of widgets, you can get the API load size to about 1.2mb to 1.5mb. Considering what you get, this is pretty good. You can get under 600kb for a simple map and no additional widgets.

Deployed size is how large the built files are on disk. This can vary a bit, but you can get a deployed build size of between 6mb to 7mb. Why such a discrepancy between the runtime size and the deployed size? _Dynamic imports_. The API is designed to dynamically import modules based on their need. So throughout the API, there will be some code similar to this.

```js
if (layer.type === "feature") {
    return import("../layers/FeatureLayer");
}
```

So there will be bundles in your deployed code that will probably never be loaded, but depending on the conditions and the way your application is used, they _could_ be loaded. There are some things you can do to try to mitigate this though.

## Build tips

Up until this recent release, you would only want to use the [`@arcgis/webpack-plugin`](https://github.com/Esri/arcgis-webpack-plugin) if you want to copy the assets locally. This would add about 25mb to your deployed build size. This includes the workers, styles, images, and localization files. If you did not want to copy them locally and just let them load from the CDN, you didn't need this plugin with webpack at all.

In the latest release, this has been updated to make it a little more useful for local builds. You can now specify that you do not want the plugin to copy assets, but maybe you are not using 3d capabilities. The plugin will use the [null-loader](https://webpack.js.org/loaders/null-loader/) on some 3d modules. Also, if you _know_ your application will not use certain layers, you can specify them via the `userDefinedExcludes` property. This will help minimize the deployed build size for you.

```js
// webpack.config.js
plugins: [
      new ArcGISPlugin({
        // do not copy assets
        copyAssets: false,
        // exclude 3D modules from build
        features: {
          "3d": false
        },
        userDefinedExcludes: [
          // ignore these layers
          "@arcgis/core/layers/AreaMeasurementLayer",
          "@arcgis/core/layers/BuildingSceneLayer",
          "@arcgis/core/layers/BingMapsLayer",
          "@arcgis/core/layers/CSVLayer",
          "@arcgis/core/layers/DirectLineMeasurementLayer",
          "@arcgis/core/layers/GeoRSSLayer",
          "@arcgis/core/layers/GroupLayer",
          "@arcgis/core/layers/ImageryLayer",
          "@arcgis/core/layers/ImageryTileLayer",
          "@arcgis/core/layers/IntegratedMeshLayer",
          "@arcgis/core/layers/KMLLayer",
          "@arcgis/core/layers/MapImageLayer",
          "@arcgis/core/layers/MapNotesLayer",
          "@arcgis/core/layers/OGCFeatureLayer",
          "@arcgis/core/layers/OpenStreetMapLayer",
          "@arcgis/core/layers/StreamLayer",
          "@arcgis/core/layers/SubtypeGroupLayer",
          "@arcgis/core/layers/WFSLayer",
          "@arcgis/core/layers/WMSLayer",
          "@arcgis/core/layers/WMTSLayer",
          "@arcgis/core/layers/WebTileLayer",

          // identity
          "@arcgis/core/identity"
        ]
      }),
]
```

In this snippet, we are also ignoring `@arcgis/core/identity`. If you do this, you need to disable identity via [`esriConfig.request.useIdentity = false`](https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#request). This will disable authentication for your application. Be careful though, if any services require authentication, this simply won't work anymore. You won't get a popup to login like you normally would, so this is a way to squeeze some bits out of your build.

You don't need to try and exclude widgets for your build. Build tools will take care of that via tree-shaking. This will probably save you about 1mb of deployed build size, so about 6.4mb versus 7.4mb without it. As you can see, it's a minimal difference.

Using these build tips and tweaks, the sample application shown [here](https://github.com/Esri/jsapi-resources/tree/master/esm-samples/webpack) is about 710kb  of JavaScript at runtime, and it has some widgets and custom visualizations in it. I'm pretty happy with that.

## Build tools

You may notice, all these tips use webpack. You might be able to implement something similar to `null-loader` with rollup, but I haven't found out how yet. This also requires you to be able to extend the webpack config if you use a cli build tool. Angular and Vue cli make this a little easier to do, but create-react-app will require another package to do something similar.

But what if I use something simple like [ViteJS](https://vitejs.dev/)? I'm a big fan of ViteJS, and like it quite a bit. The benefit here is you can run it without a single config file. Here are the stats of using ViteJS versus webpack for a custom build.

| | webpack | vite |
--- | --- | ---
|deployed|6.2mb|6.9mb|
|runtime|707kb|713kb|

As you can see, there is not a drastic difference in sizes here. For the amount of work and tweaking needed for using webpack, I'm not sure it's entirely worth it over using ViteJS. However, there are other advantages to using webpack if you are using other plugins for styling or something else. ViteJs does have a [plugin](https://vitejs.dev/plugins/) system using rollup, so you might be able to find what you need there. Again, this is just my opinion, you do what you got to do.

## Summary

I put a repo together [here](https://github.com/odoe/arcgis-js-build-experiments) of these two build scenarios if you want to try it out yourself. At the end of the day, if you really need to squeeze out every last kb from your deployed and runtime size, you can use webpack to get there. If you want simplicity, I think ViteJS is a great choice. It all depends on your circumstances. You can also watch me walk though this in the video below.

<iframe width="100%" height="350" src="https://www.youtube.com/embed/VmzjaGfBRyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
