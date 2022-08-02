---
title: "Intro to Calcite with Svelte"
description: "How to use Svelte to build apps with Calcite Components"
published: true
author: Rene Rubalcava
date: 2022-08-02T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## Web Components

If you have been building web apps for any amount of time, you have probably come across [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Web Components have a lot to offer. They let you build a set of common components that can be used anywhere, regardless of the framework that you use. I won't go into detail on on this, but want to highlight that you can use a library of Web Components, like [Calcite Components](https://developers.arcgis.com/calcite-design-system/) in your own applications. Today, it is easier to use Web Components in some frameworks than in others. One of the friendliest ones is [Svelte](https://svelte.dev/).

For this post, we are going to follow [this Calcite Components tutorial](https://developers.arcgis.com/calcite-design-system/tutorials/create-a-mapping-app/) to build a mapping app, but using Svelte!

> _The source code for the demo in this blog post is on [github](https://github.com/odoe/svelte-calcite)._

## Getting started

_You can read a great intro on using Svelte with the ArcGIS API for JavaScript on the [Esri blog](https://www.esri.com/arcgis-blog/products/js-api-arcgis/developers/using-svelte-with-the-arcgis-api-for-javascript/)._

We can start building a Svelte app by using [Vite](https://vitejs.dev/), and yes, I use Vite for just about everything these days.

```
npm init @vitejs/app svelte-calcite
cd svelte-calcite
npm install @arcgis/core
```

Once installed, we can install the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/). The Calcite Components library will be installed with it. At this point we can empty the css and .svelte files in the scaffold application. We can add some basic CSS to get started.

```css
/** app.css **/
@import "https://js.arcgis.com/calcite-components/1.0.0-beta.86/calcite.css";
@import "https://js.arcgis.com/4.24/esri/themes/light/main.css";

html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
```

## Making a mapping app

We can then start updating our `App.svelte` component, following the mapping tutorial. We can just start with the HTML skeleton of the app.

```jsx
<calcite-shell content-behind>
    <h2 id="header-title" slot="header">
    <!-- Dynamically populated -->
    </h2>
    <calcite-shell-panel slot="primary-panel" detached>
    </calcite-shell-panel>
    <div class="viewDiv"></div>
</calcite-shell>
```

This provides the basic shell for the app, but we still need to hook this up to some other pieces to display a map.

```jsx
<script>
  // calcite components
  import "@esri/calcite-components/dist/components/calcite-shell";
  import "@esri/calcite-components/dist/components/calcite-shell-panel";

  // arcgis js api
  import config from "@arcgis/core/config";
  import WebMap from "@arcgis/core/WebMap";
  import MapView from "@arcgis/core/views/MapView";

  import { onMount } from "svelte";

  config.apiKey = import.meta.env.VITE_API_KEY;

  let viewContainer;

  let item = {};

  onMount(() => {
    const map = new WebMap({
      portalItem: {
        id: "cc3bd744b9a44feaa493dd867a1d48dd",
      },
    });
    const view = new MapView({
      container: viewContainer,
      map,
      padding: {
        left: 49,
      },
    });

    view.ui.move("zoom", "bottom-right");

    map.when(() => {
      item = map.portalItem;
    });
  });
</script>
```

We are doing a few things here to start. First, we are importing the modules from Calcite Components that we are using in our app so far. If we don't, they don't register as custom elements and won't be displayed. Then we define a couple of variables that ca be referenced in the page. Svelte has a very clear way of binding variables and [making them reactive](https://svelte.dev/docs#component-format-script-2-assignments-are-reactive). This is a breath of fresh air coming from some other frameworks. The `viewContainer` will be used a reference to the element we can display our map at, and the `item` object can referenced to display some text for us.

```jsx
<calcite-shell content-behind>
    <h2 id="header-title" slot="header">
    {item.title || "...loading"}
    </h2>
    <calcite-shell-panel slot="primary-panel" detached>
    </calcite-shell-panel>
    <div class="viewDiv" bind:this={viewContainer} />
</calcite-shell>
```

Notice that we just reference the `item.title` and when we updates that variable, it will be reflected in our page. We are using the [`bind:this`](https://svelte.dev/docs#template-syntax-element-directives-bind-this) syntax to bind the `viewContainer` variable to the div element. The `this` refers to the element you are using the `bind:` syntax on. I really dig that API.

The next step in the tutorial is to set up the action bar and panels where the widget goes.

```jsx
<calcite-shell content-behind>
  <h2 id="header-title" slot="header">
    {item.title || "...loading"}
  </h2>
  <calcite-shell-panel slot="primary-panel" detached>
    <calcite-action-bar slot="action-bar">
      <calcite-action data-action-id="layers" icon="layers" text="Layers" />
      <calcite-action
        data-action-id="basemaps"
        icon="basemap"
        text="Basemaps"
      />
      <calcite-action data-action-id="legend" icon="legend" text="Legend" />
      <calcite-action
        data-action-id="bookmarks"
        icon="bookmark"
        text="Bookmarks"
      />
      <calcite-action data-action-id="print" icon="print" text="Print" />
      <calcite-action
        data-action-id="information"
        icon="information"
        text="Information"
      />
    </calcite-action-bar>

    <calcite-panel
      heading="Layers"
      height-scale="l"
      data-panel-id="layers"
      hidden
    >
      <div id="layers-container" bind:this={layerListContainer} />
    </calcite-panel>
    <calcite-panel
      heading="Basemaps"
      height-scale="l"
      data-panel-id="basemaps"
      hidden
    >
      <div id="basemaps-container" bind:this={bmgContainer} />
    </calcite-panel>
    <calcite-panel
      heading="Legend"
      height-scale="l"
      data-panel-id="legend"
      hidden
    >
      <div id="legend-container" bind:this={legendContainer} />
    </calcite-panel>
    <calcite-panel
      heading="Bookmarks"
      height-scale="l"
      data-panel-id="bookmarks"
      hidden
    >
      <div id="bookmarks-container" bind:this={bookmarksContainer} />
    </calcite-panel>
    <calcite-panel
      heading="Print"
      height-scale="l"
      data-panel-id="print"
      hidden
    >
      <div id="print-container" bind:this={printContainer} />
    </calcite-panel>
    <!-- Info panel (populates with info from the web map) -->
    <calcite-panel heading="Details" data-panel-id="information" hidden>
      <div id="info-content">
        <img
          id="item-thumbnail"
          alt="webmap thumbnail"
          src={item.thumbnailUrl}
        />
        <div id="item-description">
          <!-- Dynamically populated -->
          {item.description}
        </div>
        <calcite-label layout="inline">
          <b>Rating:</b>
          <calcite-rating id="item-rating" read-only>
            <!-- Dynamically populated -->
            {item.avgRating}
          </calcite-rating>
        </calcite-label>
      </div>
    </calcite-panel>
  </calcite-shell-panel>
  <div class="viewDiv" bind:this={viewContainer} />
</calcite-shell>
```

Ok, we added a lot now. We have some more components and an [action bar](https://developers.arcgis.com/calcite-design-system/components/action-bar/) that let's us add buttons and toggle the visibility of some widgets. We are using the same `bind:this` syntax we used earlier. Since we added more components, we need to import some more modules, plus we can start initializing our widgets.

```jsx
<script>
  // calcite components
  import "@esri/calcite-components/dist/components/calcite-shell";
  import "@esri/calcite-components/dist/components/calcite-shell-panel";
  import "@esri/calcite-components/dist/components/calcite-action";
  import "@esri/calcite-components/dist/components/calcite-action-bar";
  import "@esri/calcite-components/dist/components/calcite-panel";
  import "@esri/calcite-components/dist/components/calcite-label";
  import "@esri/calcite-components/dist/components/calcite-rating";

  // arcgis js api
  import config from "@arcgis/core/config";
  import WebMap from "@arcgis/core/WebMap";
  import MapView from "@arcgis/core/views/MapView";
  import Bookmarks from "@arcgis/core/widgets/Bookmarks";
  import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
  import LayerList from "@arcgis/core/widgets/LayerList";
  import Legend from "@arcgis/core/widgets/Legend";
  import Print from "@arcgis/core/widgets/Print";
  import { onMount } from "svelte";

  config.apiKey = import.meta.env.VITE_API_KEY;

  let viewContainer;

  let bookmarksContainer;
  let bmgContainer;
  let layerListContainer;
  let legendContainer;
  let printContainer;

  let item = {};

  onMount(() => {
    const map = new WebMap({
      portalItem: {
        id: "cc3bd744b9a44feaa493dd867a1d48dd",
      },
    });
    const view = new MapView({
      container: viewContainer,
      map,
      padding: {
        left: 49,
      },
    });

    view.ui.move("zoom", "bottom-right");

    const basemaps = new BasemapGallery({
      view,
      container: bmgContainer,
    });
    const bookmarks = new Bookmarks({
      view,
      container: bookmarksContainer,
    });
    const layerList = new LayerList({
      view,
      selectionEnabled: true,
      container: layerListContainer,
    });
    const legend = new Legend({
      view,
      container: legendContainer,
    });
    const print = new Print({
      view,
      container: printContainer,
    });

    map.when(() => {
      item = map.portalItem;
    });
  });
</script>
```

At this point, our application is nearly complete. Except we have no way to toggle the widgets yet. The mapping tutorial has this code syntax we can reuse exactly as-is.

```js
let activeWidget;

const handleActionBarClick = ({ target }) => {
if (target.tagName !== "CALCITE-ACTION") {
    return;
}

if (activeWidget) {
    document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
    document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
}

const nextWidget = target.dataset.actionId;
if (nextWidget !== activeWidget) {
    document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
    document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
    activeWidget = nextWidget;
} else {
    activeWidget = null;
}
};
```

We just need to add the event listener to our action bar.

```jsx
<calcite-action-bar slot="action-bar" on:click={handleActionBarClick}>
...
</calcite-action-bar>
```

The [`on:eventname`](https://svelte.dev/docs#template-syntax-element-directives-on-eventname) syntax is how you can add event listeners in Svelte.

Now our application is complete and you should be able to view the map, and toggle the widgets.

## Summary

I'm not a Svelte power-user, but it is quickly growing on me. Any framework that can make it easier for me to use Web Components I am a fan of. Calcite Components is also a great Web Component library for building ArcGIS Platform apps.

You can watch this video for more information!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/lDj8TVxfrCg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
