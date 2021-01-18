---
title: "Using Node with ArcGIS JSAPI"
description: "Node works with some part of the ArcGIS JSAPI, not everything, but the useful parts do!"
published: true
author: Rene Rubalcava
date: 2021-01-18T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Getting to Node you

I'll be the first to tell you that the [ArcGIS JSAPI](https://developers.arcgis.com/javascript/) isn't built as a Node library. It's a mapping library that's meant to display maps and work with data. That being said, there are some non-DOM parts of the API that could work inside a Node environment, especially now that there is an [esm release](https://odoe.net/blog/esm-for-arcgis-js-api).

The bits that will work in Node are some of the core modules that are not responsible for displaying data. This means things like queries, statistics, projection, and more.

Let's get this party started.

```bash
npm i @arcgis/core cross-fetch abort-controller
```

We need to install [@arcgis/core](https://www.npmjs.com/package/@arcgis/core) along with some polyfills. We need [cross-fetch](https://www.npmjs.com/package/cross-fetch), because Node don't play like that. We also need [abort-controller](https://www.npmjs.com/package/abort-controller), as the API uses it extensively under the hood to cancel promises and requests, but once again, not native to Node.

## ESM your face off

With that done, we can create a `query.mjs` file. This `.mjs` extension is how Node recognizes we are writing [ECMAScript Modules](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules).

The first thing we need to do is import our polyfills.

```js
// app/query.mjs
import 'cross-fetch/dist/node-polyfill.js';
import 'abort-controller/polyfill.js';
```

Next, we are going to import the modules for [configuration](https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html) and loading [FeatureLayers](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html). The reason we need the config is because the JSAPI automatically handles authentication under the hood for you, but it's browser based authentication, which, for some dumb reason doesn't work in Node... _I know right_. You can [disable this](https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#request) in the configuration for the API.

```js
// app/query.mjs
import config from '@arcgis/core/config.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';

config.request.useIdentity = false;
```

At this point, we can create an instance of a FeatureLayer, and an async function to query that layer.

```js
// app/query.mjs
const layer = new FeatureLayer({
	portalItem: {
		id: 'b234a118ab6b4c91908a1cf677941702'
	}
});
async function queryLayer(term) {
    // wait for the layer to load
	await layer.load();
    // create query from layer
	const query = layer.createQuery();
	query.outFields = ['NAME', 'STATE_NAME', 'VACANT', 'HSE_UNITS'];
	query.returnGeometry = false;
	query.where = term;

    // query the layer and display the results
	const { features } = await layer.queryFeatures(query);
	console.log(JSON.stringify(features, null, 2));
}

// send a query to our function
queryLayer('HSE_UNITS > 1000');
```

In the code above, we wait for the layer to load and then [create a query](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#createQuery) from the layer. This is useful as it will create a [Query](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html) instance that will have all the layer information populated, including any filters. We define the fields we want. We can set it so that we don't get geometries, and then pass it our search term. Finally we grab the features from the query result and display those results.

We get results that look similar to this.

```bash
[
    ...
    {
        "geometry": null,
        "symbol": null,
        "attributes": {
            "NAME": "Freestone",
            "STATE_NAME": "Texas",
            "VACANT": 2006,
            "HSE_UNITS": 9265
        },
        "popupTemplate": null
    }
]
```

And there you go! You have successfully used the ArcGIS JSAPI in Node. If you want to see more examples, you can check them out on [github](https://github.com/Esri/jsapi-resources/tree/master/esm-samples/jsapi-node), including how to use [Rollup](https://rollupjs.org/) if you don't want to use native ESM.

You can also check out this video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/f3kfswbNf9Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
