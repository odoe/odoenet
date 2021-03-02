---
title: "Vite with ArcGIS"
description: "Using Vite with the ArcGIS JSAPI"
published: true
author: Rene Rubalcava
date: 2021-03-02T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Stand on your Vite

One of the newer build tools out there is [Vite](https://vitejs.dev/).What makes Vite interesting is that it leverages native ES modules for faster performance. This is especially noticeable in a development environment. It's one of the reasons [I really like Snowpack](https://odoe.net/blog/snowpack-jsapi). In development mode, the Hot Module Replacement (HMR) is done via native ESM, this means app updates are wicked fast. Working with some other build tools that do a quick bundles between edits, I can tell you, _this is such a pleasant experience_.

So how do you get started? Let's walk through it.

```bash
npm init @vitejs/app
```

From here you can pick from a handful of app templates. I recommend the vanilla project just to get started.

Once you do that, you install the ArcGIS JSAPI into your project. Let's use the `next` release of the API for fun!

```bash
npm install @arcgis/core@next
```

Now you can modify the `main.js` file to use the API.

```js
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';

import './style.css';

const webmap = new WebMap({
  portalItem: {
    id: 'f2e9b762544945f390ca4ac3671cfa72'
  }
});

const view = new MapView({
  map: webmap,
  container: 'viewDiv'
});

view.when(() => console.log('view ready'));
```

Update the css.
```css
@import url('https://js.arcgis.com/4.18/esri/themes/dark/main.css');
html,
body,
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background: rgba(50, 50, 50);
}
```

You should add a div element with an id of `viewDiv` to your index.html too.

## The tricky part

At this point, things can be a little tricky. The Vite template has a command called `dev` you can run. So here is what you do.

```bash
npm run dev
```

Look, I told you, it's all ESM and at this point, the ArcGIS API for JavaScript just works. No fancy configs to set up anymore. No plugins. I'm serious here. _It just works_. I'm going to run out of material here.

Give it a shot if you don't believe me. Here is a video where cover these steps in more detail.

<iframe width="100%" height="350" src="https://www.youtube.com/embed/RF_q0tuMyic" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
