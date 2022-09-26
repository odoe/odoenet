---
layout: "../../layouts/BlogPost.astro"
title: "Use TypeScript Typings with AMD for CDN"
description: "How to leverage TypeScript typings in your JavaScript AMD CDN apps"
published: true
author: Rene Rubalcava
pubDate: 2022-09-26T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## This ones for you

It can get a little daunting keeping up with the latest and greatest in Web Development on a regular basis. There's TypeScript, which I'm a huge fan of, various frameworks, a plethora of build tooling and platforms deploying your applications. But sometimes, you just need a basic application. You don't need all the fancy build tooling, but you would like to take advantage of TypeScript typings in your JavaScript apps.

You have a few needs:

* Want to just write JavaScript
* Want TypeScript typings
* Want to use the [ArcGIS JSAPI](https://developers.arcgis.com/javascript/latest/) CDN

Ok. No problem, we can do this.

> You can find the source code for this post on [github](https://github.com/odoe/jsapi-js-with-tsc).

## What do you need

The first thing you want to do is install TypeScript in your project.

```sh
npm install --save-dev typescript
```

Next thing you to do, is install the ArcGIS JSAPI Typings.

```sh
npm install --save-dev @types/arcgis-js-api
```

This certain situation is the only time you will want to install these typings. They are provided by default with [`@arcgis/core`](https://www.npmjs.com/package/@arcgis/core). But since we are going to use the CDN, we don't need a local install of the API.

Here is a very basic `tsconfig.json` for your application.

```json
{
  "compilerOptions": {
    "module": "amd",
    "allowJs": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "lib": ["DOM", "ES2020"],
    "target": "es5",
    "experimentalDecorators": true,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true,
    "moduleResolution": "node",
    "outDir": "app"
  },
  "include": ["./src/*"],
  "exclude": ["node_modules"]
}
```

Key here is the [`allowJs`](https://www.typescriptlang.org/tsconfig#allowJs) and [`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop) options. The first, allows JavaScript imports, but `esModuleInterop` treats AMD as ESM, so you can write your code as ESM, and it will be output to AMD files via the `module` setting.   

## Write your app

Now we can move on to writing some code.

```js
import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";

const map = new EsriMap({
  basemap: "streets-vector",
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 12,
});
```

Notice we are importing from the `esri/` namespace. The `@types/arcgis-js-api` typings have this namespace defined so you write your code appropriately. This will just display a basic map.

We can set this up in our html page like this.

```html
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
  <title>TypeScript Typings Demo with ArcGIS API for JavaScript</title>
  <style>
    html,
    body,
    #viewDiv {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
  </style>
  <link rel="stylesheet" href="https://js.arcgis.com/4.24/esri/themes/light/main.css">
  <script>
    var locationPath = location.pathname.replace(/\/[^/]*$/, "");
    window.dojoConfig = {
      packages: [
        {
          name: "app",
          location: locationPath + "/app"
        }
      ]
    };
  </script>
  <script src="https://js.arcgis.com/4.24"></script>
</head>
<body>
  <div id="viewDiv"></div>
  <script>require(["app/main"])</script>
</body>
</html>
```

We need to set up a global `dojoConfig` to consume our local AMD files. Remember, we set up TypeScript to compile our ESM to AMD in our project.

## Put it all together

At this point, you can let the TypeScript compiler do all the work for you.

```json
{
  ...
  "scripts": {
    "dev": "tsc -w",
    "build": "tsc"
  },
  ...
}
```

The only build tooling type of feature you won't get here is minification. But honestly, if your app isn't very complicated and you want to use the AMD CDN, you probably don't need to minify your code. If you want to though, you can add a step to run your output through [terser](https://github.com/terser/terser). But you should be just fine with this set up.

## Summary

I'm a huge fan of build tooling, ESM, and trying to optimize edge cases, but that's part of my job. I also realize not everyone _needs_ that. The simplest solution is usually the best, and if you don't need to scale this application with a number of features, routing, and more, this could be a great way for you to build your apps!

You can see a walkthrough of this application in the video below!

<lite-youtube videoid="tCGIrLh-mcU"></lite-youtube>