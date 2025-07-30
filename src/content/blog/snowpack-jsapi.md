---

title: Snowpack with the ArcGIS JSAPI
description: Snowpack is a great tool for building apps, especially the ArcGIS JSAPI
published: true
author: Rene Rubalcava
pubDate: 2021-02-01T10:00:00.000Z
heroImage: '../../assets/blog/snowpack-jsapi/images/cover.jpg'
tags: geodev, javascript
---

## Out in the Snow

The land of build tools is growing, and one that has become pretty popular is
[snowpack](https://www.snowpack.dev/). What makes snowpack neat is that it
really leverages ESM out of the box. Most other build tools work with ESM, but
might rely on some transforms for commonjs or others. Plus, Snowpack is fast.

Let's assume I have a basic
[ArcGIS JSAPI app](https://developers.arcgis.com/javascript/latest/), that just
displays a map. I'm going to use the ESM deployment with
[`@arcgis/core`](https://www.npmjs.com/package/@arcgis/core), to really take
advantage of that ESM goodness.

```js
// src/index.js
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";

const map = new ArcGISMap({
  basemap: "topo-vector",
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 10,
  center: [-118, 34],
});

const search = new Search({ view });

view.ui.add(search, "top-right");
```

The only other step needed is to set up
[copying the static assets](https://github.com/Esri/jsapi-resources/tree/master/esm-samples#copy-assets)
for the API.

I'll admit, coming from a background of setting up webpack and rollup to build
apps, the set up for Snowpack is petty straightforward. It will see an
`index.html` and any files it references to do its build. This is similar to how
[Parcel](https://parceljs.org/) works, but I do like the little bit of config I
can do with Snowpack.

Snowpack has a [mount](https://www.snowpack.dev/reference/configuration#mount)
property that I can use to map my assets folder to the build folder. I also need
it because I have a `src` folder, instead of an `index.html` in the root of my
project.

```js
// snowpack.config.js
module.exports = {
  mount: {
    "node_modules/@arcgis/core/assets": {
      url: "/assets",
      static: true,
      resolve: false,
    },
    "src": "/",
  },
};
```

That's some minimal configuration for an application. Basically, we're telling
Snowpack that our assets folder is static, so please do not try to bundle any
code in there. _Do not touch_. I also set up the `src` folder as the root for my
application.

At this point, I need to do _one more thing_. I need to set some
[`browser`](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#browser)
config in my `package.json`.

```json
## package.json
{
  "browser": {
    "fs": false,
    "path": false
  },
}
```

This will keep Snowpack from throwing errors when it hits some of the web
assembly files in the API.

## Do you want to build a Snowman

At this point, I can add a script to run a build, either in dev mode or prod.

```json
## package.json
{
  "scripts": {
    "start": "snowpack dev"
  },
}
```

I can now run my build and everything works great! But it's not optimized.
Snowpack is just going to load everything in ESM, when unbuilt, can be a couple
of hundred files. Not really ideal. Even if I were to run this in `prod` mod, it
still wouldn't be optimized. I can use
[`@snowpack/plugin-webpack`](https://www.npmjs.com/package/@snowpack/plugin-webpack)
to accomplish this.

```js
// snowpack.config.js
module.exports = {
  mount: {
    "node_modules/@arcgis/core/assets": {
      url: "/assets",
      static: true,
      resolve: false,
    },
    "src": "/",
  },
  plugins: [["@snowpack/plugin-webpack"]],
};
```

But, there is one more thing I need to do. I need to add a script to copy the
assets for a production build.

```json
## package.json
{
  "scripts": {
    "start": "snowpack dev",
    "build": "snowpack build && npm run copy",
    "copy": "ncp ./node_modules/@arcgis/core/assets ./build//assets"
  },
}
```

But wait, didn't I add the `mount` for the assets in my `snowpack.config.js`?
Yes, yes I did. But this doesn't seem to work in production. It looks like an
issue with Snowpack at the moment, but looking at issues, it's known and being
worked on. No big deal.

Now, with everything done, I can do a production build of my application!

## Summary

For a while there, I was flipping tables trying to get Snowpack to work with the
JSAPI. But recently, and in particular
[version 3](https://www.snowpack.dev/posts/2021-01-13-snowpack-3-0), it seems to
have gotten a bit easier. Configuration is minimal, which I really like, and it
works great! I might be switching to Snowpack for my projects moving forward,
I'm liking it that much. The fact that it will just load ESM for dev mode makes
it really fast and that is very appealing.

You can find a [dmeo repo here](https://github.com/odoe/snowpack-jsapi), and
check out the video below for more details!

<lite-youtube videoid="fEkJDV2KXDA"></lite-youtube>
