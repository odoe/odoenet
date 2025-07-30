---

title: Module Federation in webpack
description: Module federation is a way you can implement code sharing in your apps
published: true
author: Rene Rubalcava
pubDate: 2021-01-15T10:00:00.000Z
heroImage: '../../assets/blog/webpack-module-federation/images/cover.jpg'
tags: geodev
---

## What is Module Federation

[Module federation](https://module-federation.github.io/) was officially
released as part of
[webpack 5](https://webpack.js.org/concepts/module-federation/). It's an
interesting concept that allows you to implement code sharing across multiple
applications. Something that might be used in
[micro-frontends](https://micro-frontends.org/). A typical project layout could
look something like this.

```json
project/
    components/
    app1/
    app2/
    app3/
```

In this scenario, you'd have a sub-project of reusable components, and each of
the apps could use those components. Any dependencies across this project, like
React or Ramda could be shared, even if they are used in the components project.

I'll be honest, I got the gist of it when I first read about it, but getting it
to work, _that was a challenge_.

Most of the samples I saw used [yarn](https://yarnpkg.com/) for its
[workspaces feature](https://yarnpkg.com/features/workspaces) and
[lerna](https://github.com/lerna/lerna) to manage the multiple projects. I don't
really know either, so I was starting from less than zero.

It took me a while, but I think I got it.

![learning webpack module federation](../../assets/blog/webpack-module-federation/images/charlie.gif "learning webpack module federation")

## Federating the ArcGIS JSAPI

Assume I had a suite of apps all using the
[ArcGIS JSAPI](https://developers.arcgis.com/javascript/). It's a fairly large
library that would make a great candidate for module federation.

I have an `api` project that exposes some utility functions to work with maps.

```js
// api/src/index.js
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";

// point to assets used in this federated instance
config.assetsPath = "http://localhost:3001/assets/";

export async function createMap(id, container) {
  const map = new WebMap({
    portalItem: { id },
  });

  const view = new MapView({ map, container });
  return view;
}
```

This is a real basic way to create a map and a view. Now we can expose it for
other apps in the project to use.

```js
// api/webpack.config.js
{
  plugins: [
    new ModuleFederationPlugin({
      name: "arcgis",
      library: { type: "var", name: "arcgis" },
      // federated entry file
      filename: "remoteEntry.js",
      exposes: {
        // expose each component you want
        "./api": "./src/index",
      },
      shared: {
        "@arcgis/core": { singleton: true },
      },
    }),
  ];
}
```

This is how you can configure webpack to federate this project for use in other
applications. I gave it a name of `arcgis` and I'm exposing my `index.js` as
`./api`. This means other apps can reference it like this.

```js
const api = await import("arcgis/api");
```

That's one thing you need to remember with module federation. Everything is
loaded via dynamic imports. Just something to keep in mind as each import
creates at least one bundle file, and the source project could be creating more
chunks. Not really an issue, but I know some will ask about it.

## Eat your own

Now that you have a module exposed, how do you consume it? In your host app, you
need to add a link to the `remoteEntry.js` entry point you created in the shared
module.

```html
<!-- src/app/public/index.html -->
<script src="http://localhost:3001/remoteEntry.js"></script>
```

Now we can set up the webpack config for the host project to reference the
federated module.

```js
// app/webpack.config.js
{
  plugins: [
    new ModuleFederationPlugin({
      name: "app",
      library: { type: "var", name: "app" },
      remotes: {
        arcgis: "arcgis", // name of remote library to expose, could alias if you want
      },
      shared: {
        // this is just an aggressive way of sharing deps across apps
        "@arcgis/core": { singleton: true },
      },
    }),
  ];
}
```

In the config for the host app, we let it know we have a remote library named
`arcgis`. You have the choice at this point to create an alias for it if you
want, but in this example, I just used the original name. You can also configure
any libraries that might be shared across the projects to make sure that code is
not loaded more than once. The host app will run at `http://localhost:3002` and
the shared library will run at `http://localhost:3001`.

Now, I can actually use the exposed module.

```js
// app/src/index.js
export default async function init() {
  const { createMap } = await import("arcgis/api");

  // params
  const id = "d5dda743788a4b0688fe48f43ae7beb9";
  const container = document.getElementById("viewDiv");

  // create my map
  const view = await createMap(id, container);
}

init();
```

In this example, I'm able to get the `createMap` function from the shared
library via `await import('arcgis/api')`. This entry point for this is in the
`remoteEntry.js` file, so it can dynamically loaded.

Because I'm not using yarn or lerna, I need some npm scripts at the root
directory that contains these two projects to run them at the same time.

```json
"scripts": {
  "app": "npm start --prefix app",
  "api": "npm start  --prefix api",
  "start": "npm run app & npm run api"
},
```

These scripts will let me run `npm start` to run the start up scripts for both
of these projects at the same time.

## Summary

That's the gist of it. I don't want to say it's simple, but now that I've
wrapped my head around most of it, it's a little easier to start making
adjustments. I can add more utilities to the shared library and expose them as
needed for my host applications to use. I have not used this in production yet,
so I can't really speak to that. I think the interesting part of this is when
deployed, you can push it to a CDN like
[cloudflare](https://www.cloudflare.com/) and get a nice performance boost for
your shared library across multiple projects.

Check out this video where I get into the weeds of putting this project
together.

<lite-youtube videoid="Gh4qOvjzyAw"></lite-youtube>
