---

title: ArcGIS JSAPI ESM CDN
description: Using the ESM CDN for the ArcGIS API for JavaScript
published: true
author: Rene Rubalcava
pubDate: 2021-02-08T10:00:00.000Z
heroImage: '../../assets/blog/esm-cdn/images/cover.png'
tags: geodev, javascript
---

The latest version of the
[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/)
introduced the release of the
[ES Modules](https://www.npmjs.com/package/@arcgis/core) for the API. I've been
pretty [excited about it](https://odoe.net/blog/esm-for-arcgis-js-api), mainly
because it makes the API more accessible to developers and makes it easier
[to use](https://odoe.net/blog/create-react-app) in different build
environments.

Another option in using the API is via the
[ESM CDN](https://developers.arcgis.com/javascript/latest/install-and-set-up/#es-modules-via-cdn).

> Before I dive in, let's be very clear. This should only be used for
> prototyping purposes. Test out some ideas, demo them, then take those ideas
> and build a production app in webpack or something. Please. Listen to me.

Ok, so
[ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
can be used across
[all the browsers that count](https://caniuse.com/es6-module). You can use them
by add a script tag with a type of module.

```html
<script type="module"></script>
```

Once you do that, you can now start loading ES Module JavaScript files into you
app.

```html
<script type="module">
    import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
    import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
</script>
```

Notice that you import the `.js` files using ESM natively. And you can load them
directly from the CDN. After that, you can write your code as you normally
would.

```html
<script type="module">
    import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
    import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
    
    const map = new ArcGISMap({
        basemap: "topo-vector"
    });
    
    const view = new MapView({
        map,
        container: "viewDiv",
        zoom: 6,
        center: [-118, 34]
    });
</script>
```

This is a great way to test stuff out. Now, why would you not want to use this
for production? Because this sample app loads over 400 JavaScript files. It's
unbuilt, unoptimized code. When built as a production application, it's only a
handful of files. But it's a great way to get familiar with the API! You can
check out a demo of this project
[here](https://glitch.com/edit/#!/gregarious-proud-marshmallow).

You can check out a video with more detail below!

<lite-youtube videoid="1cIG5MMUFs0"></lite-youtube>
