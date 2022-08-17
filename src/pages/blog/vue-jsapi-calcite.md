---
layout: "../../layouts/BlogPost.astro"
title: "Vue, ArcGIS JSAPI, Calcite"
description: "How to use Vue with ArcGIS JSAPI and Calcite"
published: true
author: Rene Rubalcava
pubDate: 2021-08-06T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

I'm a fan of [VueJS](https://vuejs.org/). I've used it for a handful of projects and although I wasn't a big fan of the js/css/html `.vue` files at first, it's grown on me. Besides, I don't _need_ to keep the html in the same file, but I don't hate it. Recently I had some questions about how to use [calcite-components](https://github.com/Esri/calcite-components) with VueJS and the [ArcGIS JSAPI](https://developers.arcgis.com/javascript/latest/). Not just that, but also how to use all that with [sass](https://sass-lang.com/). My head about exploded!

I've talked about using VueJS before, [here](https://odoe.net/blog/using-vuejs-arcgis-api-javascript) and [here](https://odoe.net/blog/arcgis-api-4-for-js-with-vue-cli-and-nuxt). This was with the old AMD build of the ArcGIS JSAPI, so I figured it was worth updating how to use it with the [ESM](https://www.npmjs.com/package/@arcgis/core) build. _Spoilers_, it is waaaaay easier. Admittedly, I don't use calcite very often, so I am far from an expert, but I do know how to integrate it into your builds. I am also not a sass expert, but I know enough to pretend. I suppose I'm not much of an expert at much, but that hasn't stopped me so far.

## First steps

Getting started with VueJS is simple enough using [vue-cli](https://cli.vuejs.org/). Once you do that, you can install the following packages.

```bash
npm i @arcgis/core @esri/calcite-components copy-webpack-plugin sass sass-loader resolve-url-loader
```

We'll get into why you need some of these when get to the configuration. For now, let's make a component.

Since we want to do some custom sass, we are going to need to copy assets locally for the ArcGIS API for JavaScript. Normally we could just load the styles and assets from the CDN, but we are going to trim that down a bit. I usually recommend handling ArcGIS JSAPI bits in their own modules, like a `data/map.js` file.

```js
// src/data/map.js
import config from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Expand from '@arcgis/core/widgets/Expand';
import Legend from '@arcgis/core/widgets/Legend';

config.assetsPath = './assets';

export const webmap = new WebMap({
    portalItem: {
        id: 'f2e9b762544945f390ca4ac3671cfa72'
    }
});

export const view = new MapView({
    container: 'viewDiv',
    map: webmap
});

export const legend = new Expand({
    content: new Legend({
        view,
        style: 'card'
    }),
    view,
    expanded: true
});
view.ui.add(legend, 'bottom-left');

/**
 * Assigns the container element to the View
 * @param container
 */
export const initialize = (container) => {
    view.container = container;
    view.when()
        .then(() => {
            console.log('Map and View are ready');
        })
        .catch(error => {
            console.warn('An error in creating the map occurred:', error);
        });
};
```

This is pretty standard for what I would use with any framework. I expose an `initialize()` method that takes an element that will be used to display the map. Then I can consume this module inside a VueJS component.

```js
// src/components/WebMap.vue
<template>
    <div class="map-div"></div>
</template>

<script>
export default {
    name: 'WebMap',
    async mounted() {
        const app = await import('../data/map');
        app.initialize(this.$el);
    }
};
</script>

<style lang="scss">
</style>
```

Again, there's not a lot going on here. I have an element in my VueJS component and I'm going to use that element to display my map. Look how clean this is!

## Sassy

Now the fun stuff, we can mess around with some sass. The cool part about building your own custom sass is you can decide what parts of the sass you want for your application. Each widget in the ArcGIS JSAPI comes with it's own sass file. There is also a series of flags you can set to determine if those files should be included in your build. Meaning that if you are not using a widget, you can exclude it's styles from your build css. Check this out.

```js
// src/components/WebMap.vue
<style lang="scss">
// Widgets (sorted alphabetically)
$include_AreaMeasurement2D: false !default;
$include_AreaMeasurement3D: false !default;
$include_Attachments: false !default;
$include_BasemapGallery: false !default;
$include_BasemapLayerList: false !default;
$include_BasemapToggle: false !default;
$include_BinaryColorSizeSlider: false !default;
$include_Bookmarks: false !default;
$include_BuildingExplorer: false !default;
$include_ButtonMenu: false !default;
$include_ClassedColorSlider: false !default;
$include_ClassedSizeSlider: false !default;
$include_Compass: false !default;
$include_ColorPicker: false !default;
$include_ColorSizeSlider: false !default;
$include_ColorSlider: false !default;
$include_CoordinateConversion: false !default;
$include_DatePicker: false !default;
$include_Daylight: false !default;
$include_Directions: false !default;
$include_DirectLineMeasurement3D: false !default;
$include_DistanceMeasurement2D: false !default;
$include_Editor: false !default;
$include_ElevationProfile: false !default;
$include_Feature: false !default;
$include_FeatureContent: false !default;
$include_FeatureMedia: false !default;
$include_FeatureForm: false !default;
$include_FeatureTable: false !default;
$include_FeatureTemplates: false !default;
$include_FloorFilter: false !default;
$include_Grid: false !default;
$include_HeatmapSlider: false !default;
$include_Histogram: false !default;
$include_HistogramRangeSlider: false !default;
$include_IdentityForm: false !default;
$include_IdentityModal: false !default;
$include_ItemList: false !default;
$include_LayerList: false !default;
$include_LineOfSight: false !default;
$include_Measurement: false !default;
$include_NavigationToggle: false !default;
$include_OpacitySlider: false !default;
$include_Print: false !default;
$include_ScaleBar: false !default;
$include_ScaleRangeSlider: false !default;
$include_Search: false !default;
$include_ShadowAccumulation: false !default;
$include_SizeSlider: false !default;
$include_Sketch: false !default;
$include_Slice: false !default;
$include_Slider: false !default;
$include_SnappingControls: false !default;
$include_Spinner: false !default;
$include_Swipe: false !default;
$include_TableList: false !default;
$include_TimePicker: false !default;
$include_TimeSlider: false !default;
$icomoon-font-path: "./assets/esri/themes/base/icons/fonts" !default;
$calcite-fonts-path: "./assets/esri/themes/base/fonts/fonts/" !default;
@import "~@arcgis/core/assets/esri/themes/light/main.scss";
.map-div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>
```

As you can see, there are a lot of widgets in the API. Some other key variables are listed here. These specify where to look for fonts once they are copied over.

```css
$icomoon-font-path: "./assets/esri/themes/base/icons/fonts" !default;
$calcite-fonts-path: "./assets/esri/themes/base/fonts/fonts/" !default;
```

Now we can use this component in another component. This component will use some calcite layout components and wrap our map. That's a lot of components.

```js
<template>
  <calcite-shell>
    <slot name="shell-header">
      <header class="header">
        <calcite-icon icon="beaker" scale="m" aria-hidden="true"></calcite-icon>
        <h2 class="heading">ArcGIS Vue and Calcite</h2>
      </header>
    </slot>
    <WebMap />
  </calcite-shell>
</template>

<script>
import {
  applyPolyfills,
  defineCustomElements
} from "@esri/calcite-components/dist/loader";
import WebMap from './components/WebMap.vue'

applyPolyfills().then(() => {
  defineCustomElements(window);
});

export default {
  name: 'App',
  components: {
    WebMap
  }
}
</script>
<style lang="scss">
@import "~@esri/calcite-colors/dist/colors"; // calcite colors
</style>
```

One thing to note is that VueJS doesn't like the `slot` attribute, but you can treat slots like elements. Since calcite-components are web components built with [Stencil](https://stenciljs.com/), there are some polyfills and a loader you can use to load them. I didn't add all the sass styles here, but if you want to use the calcite sass variables, you can import the color variables.

That's pretty much it for using VueJS with the ArcGIS JSAPI, and calcite. You would think that would be it, but there is a little more configuration for copying and building all the sass correctly.

## The build

VueJS uses webpack under the hood. Unlike some other cli tooling, they provide a way to hook into the webpack build and extend it [via a config](https://cli.vuejs.org/config/), which I can tell you, comes in very handy for situations like this.

```js
// vue.config.js
const CopyPlugin = require('copy-webpack-plugin');

const jsapi = '@arcgis/core';

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          // calcite assets
          {
            context: 'node_modules',
            from: '@esri/calcite-components/dist/calcite',
            to: './',
          },
        // arcgis assets
        {
          context: 'node_modules',
          from: `${jsapi}/assets`,
          to: './assets',
          globOptions: {
            // ignore the webscene spec folder, sass files,
            ignore: ['**/webscene/spec/**', '**/*.scss', '**/*.css'],
          },
        },
        ]
      }),
    ]
  },
  chainWebpack: (config) => {
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((rule) => {
      config.module
        .rule('scss')
        .oneOf(rule)
        .use("resolve-url-loader")
        .loader("resolve-url-loader")
        .options({
          sourceMap: true,
          // eslint-disable-next-line no-unused-vars
          join: (_rul_uri, _rul_base) => {
            // args must be included
            return (arg) => {
              return arg.bases.value.includes("@arcgis/core")
                ? arg.uri.replace("../", "./assets/esri/themes/")
                : arg.uri;
            };
          },
        })
        .before("sass-loader")
        .end()
        .use("sass-loader")
        .loader("sass-loader")
        .tap((options) => ({ ...options, sourceMap: true }))
        .end()
        .use('css-loader')
        .loader('css-loader')
        .tap((options) => ({ ...options, url: false, importLoaders: 2 }))
        .end()
    });
  },
  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: '[name].css',
    },
  },
};
```
Ok, let's break this down. Any additional webpack plugins you want to use can be added via [configureWebpack](https://cli.vuejs.org/config/#configurewebpack). This will be very familiar for anyone that has used webpack before. If you want to start extending the rules, that requires a little spice! Not going to lie, this took a bit of research on my part, some stuff wasn't 100% clear in the doc and I found myself in the deep end of github issues. I knew I wanted the [chainWebpack](https://cli.vuejs.org/config/#chainwebpack) option, but wasn't quite sure how to add all the loaders needed for sass.

```js
  chainWebpack: (config) => {
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((rule) => {
      config.module
        .rule('scss')
        .oneOf(rule)
        .use("resolve-url-loader")
        .loader("resolve-url-loader")
        .options({
          sourceMap: true,
          // eslint-disable-next-line no-unused-vars
          join: (_rul_uri, _rul_base) => {
            // args must be included
            return (arg) => {
              return arg.bases.value.includes("@arcgis/core")
                ? arg.uri.replace("../", "./assets/esri/themes/")
                : arg.uri;
            };
          },
        })
        .before("sass-loader")
        .end()
        .use("sass-loader")
        .loader("sass-loader")
        .tap((options) => ({ ...options, sourceMap: true }))
        .end()
        .use('css-loader')
        .loader('css-loader')
        .tap((options) => ({ ...options, url: false, importLoaders: 2 }))
        .end()
    });
  },
```

I like the fluent API here, but took me a while to find the right order to do everything. The resolve-url-loader API has changed a bit since I last used it, so took me a while to figure out the renames/redirects for looking for files. But once I got this down, it was smooth sailing... well, as smooth as working on something like this could be. This isn't the fault of VueJS, more of just trying to optimize for a sass build. These cli tools are great for simplicity sake, until you need to do just a bit more. But I'll hand it to vue-cli, they make extensibility pretty easy.

## Summary

I have to admit, this was a very specific combination of tooling I was asked about. It took a little elbow grease for me to figure it all out, but hopefully, if you find yourself working with these tools, this will help you out.

I put a repo of this project together [here](https://github.com/odoe/vue-jsapi-calcite). You can watch a video on the subject below.

<iframe width="100%" height="350" src="https://www.youtube.com/embed/os1BvdRo6Hk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
