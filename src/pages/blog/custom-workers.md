---
layout: "../../layouts/BlogPost.astro"
title: "Custom workers in ArcGIS JSAPI"
description: "Learn to build your own custom workers for use in the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: 2021-07-01T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

You ever working on an application and you find yourself doing some heavy work that blocks the UI on your page? You know what I'm talking about, some code is churning in the background causing some weird jank in your app and you're just throwing your hands in the air. Maybe...just maybe, you could benefit from using [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

Using web workers involves a lot of event listening, sending messages back and forth. I'm not saying it's complicated, but could benefit from a simpler API on top of it, something promise based maybe... something like the [worker framework included in the ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-workers.html). This lightweight API is used extensively under the hood to request and parse features and map data. When you open a worker, you are given a [connection](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-workers-Connection.html). You can use that connection to invoke methods of the worker using a promise based API.

## Creating and Consuming the worker

Say for example, I want to build an application that does some [spatial joins](https://codepen.io/odoe/pen/vYxYxXm). I wrote about this process [here](https://odoe.net/blog/spatial-joins). Spatial joins is the type of operation that will grow exponentially, with the potential to bring the browser to its knees. This is the prefect opportunity to offload the heavy lifting to a web worker so you don't piss off your users. The cool part is you can use any modules from the ArcGIS API for JavaScript you want inside your workers. What you want to do is export a function from your worker that can be invoked by your application.

```js
// spatial-join-worker.js
import Graphic from "@arcgis/core/Graphic";

export function doSpatialJoin([f1, f2]) {
  const features1 = f1.map((a) => Graphic.fromJSON(a));
  const features2 = f2.map((a) => Graphic.fromJSON(a));
  const features = [];
  let temp = [...features1];
  let temp2 = [];
  for (let feat of features2) {
    const graphic = feat.clone();
    graphic.attributes.count = 0;
    temp2 = [...temp];
    for (let i = 0; i < temp2.length; i++) {
      const x = temp[i];
      if (x && graphic.geometry && x.geometry && graphic.geometry.contains(x.geometry)) {
        graphic.attributes.count++;
        temp.splice(i, 1);
      }
    }
    features.push(graphic.toJSON());
  }
  return features;
}
```

There are still some rules you need to follow when using workers. You can only pass native JavaScript objects back and forth to workers and the main thread. So no passing instances of a layers or graphics. Luckily, many classes in the API provide toJSON/fromJSON methods to simplify this. With a worker in hand, you can now consume the worker.

```js
// index.js
import config from "@arcgis/core/config";

config.workers.workerPath = "./RemoteClient.js";
config.workers.loaderUrl = "https://cdn.jsdelivr.net/npm/systemjs@6.10.0/dist/s.min.js";

// open the worker
const spatialJoin = await workers.open(new URL("./SpatialJoin.js", document.baseURI).href);
// invoke a worker method and parse the results
const jsonFeatures = await spatialJoin.invoke("doSpatialJoin", [features1, features2]);
const features = jsonFeatures.map(a => Graphic.fromJSON(a));
```

When building workers locally, you need to provide a loader. This could be an AMD loader or something like SystemJS, something that can load the worker files. Writing and consuming the custom workers is probably the _easier_ part of this set up. The main thing to remember is using native JavaScript types between the worker and the main thread. The next step could be a little trickier depending on your build environment.

## Building custom workers

Normally, when you build an app using `@arcgis/core` it loads static assets, including workers from the CDN. You could copy them locally if you like, maybe for a sandboxed environment or custom css build, the choice is yours. But when you decide to use custom workers using the API worker utilities, you need to do a custom build yourself. There are couple of ways you can do this. Webpack supports [multiple targets](https://webpack.js.org/concepts/targets/), meaning one of those build targets could be [webworker](https://webpack.js.org/configuration/target/). Another option is to incorporate [rollup](https://www.rollupjs.org/) to build the workers for you. I typically prefer rollup for this kind of task, because it's well suited for building these type of utility libraries, which is basically what you're doing.

```js
// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: {
    // RemoteClient is the entry point for workers used
    // by the ArcGIS API for JavaScript
    RemoteClient: "@arcgis/core/core/workers/RemoteClient.js",
    // Custom worker file
    SpatialJoin: "./src/spatial-join-worker.js"
  },
  output: {
    chunkFileNames: "chunks/worker/[name]-[hash].js",
    dir: "dist",
    format: "system",
    exports: "named"
  },
  plugins: [resolve(), commonjs(), production && terser()],
  preserveEntrySignatures: "allow-extension"
};
```

As you can see, this is a fairly simple rollup config. It's going to create the `RemoteClient`, which is the API entry point for the workers, and our custom `SpatialJoin` worker file. If you are using a cli-based build tool like create-react-app, this allows you to inject this rollup build into your workflow without having to get crazy with the underlying webpack build.

## Summary

Web workers are amazing tools in your toolbox as a web developer. It doesn't mean you always need them, but it's nice to know you have the option, just in case. I don't use them in apps very often, unless I come across a use case like the spatial join that can just wreck a user experience by blocking the main thread. You can find the source code for this demo [on github](https://github.com/Esri/jsapi-resources/tree/master/esm-samples/jsapi-custom-workers) and you can watch me build this app in the video below!

<lite-youtube videoid="EaAM_QaeERE"></lite-youtube>