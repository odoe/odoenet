---

title: Using Calcite Components
description: How to use Calcite Components in your ArcGIS API for JavaScript apps!
published: true
author: Rene Rubalcava
pubDate: 2022-02-12T10:00:00.000Z
heroImage: '../../assets/blog/using-calcite-components/images/cover.jpg'
tags: geodev, javascript
---

## Web Components

I'm a big fan of
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
As a developer, it saves me time in building smaller UI components in my
applications. It's not so much the time it takes to add a button to an
application, but styling that button, defining behavior of various interactive
events, plus making sure it was accessible, those steps can add up. Maybe I'm
building a suite of applications and want to have a consistent look and feel to
them. This is venturing off into the topic of design systems, but at the end of
the day, Web Components make it easier to reuse UI across multiple applications,
and I call that a win!

Esri provides a suite of Web Components as part of the
[Calcite Design System](https://developers.arcgis.com/calcite-design-system/).
If you are building web apps with the ArcGIS API for JavaScript, it is
definitely worth taking a look at for your applications, since the ArcGIS JSAPI
also uses Calcite Components, so you can more easily maintain a similar look and
feel between your UI and the widgets in the JSAPI.

## Calcite for Apps

There is a great
[tutorial](https://developers.arcgis.com/calcite-design-system/tutorials/create-a-mapping-app/)
in the Calcite documentation about building mapping apps with Calcite
Components. I highly recommend it. Using that as a guide, I wanted to do
something to enhance the
[Feature widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html),
to behave more liked a docked Popup, but one I could use anywhere in my
application. Similar to
[this demo](https://developers.arcgis.com/javascript/latest/sample-code/widgets-feature-sidepanel/),
but be able to iterate through graphics.

First thing you want to do is import required styles and JavaScript.

```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@esri/calcite-components@1.0.0-beta.75/dist/calcite/calcite.css" />
<link rel="stylesheet" href="https://js.arcgis.com/next/esri/themes/light/main.css" />
<script src="https://js.arcgis.com/calcite-components/1.0.0-beta.75/calcite.esm.js" type="module">
```

Here is what the HTML of my application looks like.

```html
<main>
    <!-- Sidebar -->
    <div class="container">
        <calcite-card>
            <div id="featureTarget"></div>
            <calcite-button slot="footer-leading" color="neutral" scale="s" icon-start="magnifying-glass-plus" id="btnZoom"></calcite-button>
            <div slot="footer-trailing">
                <span id="infoCount" class="ui-info--count">
                </span>
                <calcite-button id="btnPrevious" color="neutral" icon-start="chevron-left"></calcite-button>
                <calcite-button id="btnNext" color="neutral" icon-start="chevron-right"></calcite-button>
            </div>
        </calcite-card>
    </div>
    <!-- Map -->
    <div id="viewDiv"></div>
</main>
```

For this component, I'm using the
[calcite-card](https://developers.arcgis.com/calcite-design-system/components/card/).
Notice, you can leverage named
[slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) to add
content to the components that will be styled accordingly. At this point, I can
start adding event listeners to these components, and hooking everything up to
the Feature widget.

```js
import ArcGISMap from "https://js.arcgis.com/next/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/next/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/next/@arcgis/core/layers/FeatureLayer.js";
import { whenFalseOnce } from "https://js.arcgis.com/next/@arcgis/core/core/watchUtils.js";
import Feature from "https://js.arcgis.com/next/@arcgis/core/widgets/Feature.js";

const fLayer = new FeatureLayer({
  portalItem: {
    id: "f430d25bf03744edbb1579e18c4bf6b8",
  },
  layerId: 2,
  outFields: ["*"],
});

const map = new ArcGISMap({
  basemap: "gray-vector",
  layers: [fLayer],
});

const view = new MapView({
  container: "viewDiv",
  map,
  center: [-118, 34],
  zoom: 12,
});

// calcite components
const featureTarget = document.getElementById("featureTarget");
const btnZoom = document.getElementById("btnZoom");
const previous = document.getElementById("btnPrevious");
const next = document.getElementById("btnNext");
const info = document.getElementById("infoCount");

const feature = new Feature({
  view,
  container: featureTarget,
});

view.when(async () => {
  let highlight;
  let currIndex = 0;
  let totalCount = 1;
  const layerView = await view.whenLayerView(fLayer);
  await whenFalseOnce(view, "updating");
  const query = fLayer.createQuery();
  query.geometry = view.extent;
  const { features } = await layerView.queryFeatures(query);

  const update = () => {
    if (currIndex < 0) {
      currIndex = features.length - 1;
    } else if (currIndex === features.length) {
      currIndex = 0;
    }

    feature.graphic = features[currIndex];
    info.innerText = `${currIndex + 1} of ${features.length}`;

    // highlight
    highlight && highlight.remove();
    highlight = layerView.highlight(feature.graphic);
  };

  btnPrevious.addEventListener("click", () => {
    currIndex = currIndex - 1;
    update();
  });
  btnNext.addEventListener("click", () => {
    currIndex = currIndex + 1;
    update();
  });

  btnZoom.addEventListener("click", () => {
    view.goTo({
      target: feature.graphic,
    });
  });

  update();
});
```

Without getting into too much detail, I basically have event listeners for the
buttons that will iterate over an array of graphics. I can go to the next or
previous graphic. That graphic is then used to update the Feature widget and now
this sidebar behaves like a Popup outside the map. It even has a zoom button and
will highlight the graphic on the map.

The steps would be a little different if building an application with something
like webpack, but this is a great way to get familiar with composing Calcite
Components into useful interactive components in your application.

Here is a demo of the application in action!

<iframe height="500" style="width: 100%;" scrolling="no" title="Calcite Info Component JSAPI" src="https://codepen.io/odoe/embed/GROZyZX?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/odoe/pen/GROZyZX">
  Calcite Info Component JSAPI</a> by Rene Rubalcava (<a href="https://codepen.io/odoe">@odoe</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

This is just a quick intro on using Calcite Components to enhance your own
applications. You could do so much more with Calcite Components in your own
application, so have fun with it and build something awesome!

You can watch a video on this topic below!

<lite-youtube videoid="8m5ofOYtbZU"></lite-youtube>
