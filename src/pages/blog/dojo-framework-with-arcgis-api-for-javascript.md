---
layout: "../../layouts/BlogPost.astro"
title: "Dojo Framework with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: "2019-03-20"
tags: geodev, dojo, typescript
coverImage: "dojo-esri-loader.png"
---

I've been spending quite a bit of time with the new [Dojo Framework](https://dojo.io/) recently. It's important to note, this isn't the OG Dojo Toolkit you may be familiar with. Modern Dojo is a full blown reactive framework for building applications.

I had been asked a couple of times if I tried using the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) with it yet. As I am known to do, I am something of a JavaScript framework _aficionado_ and try to see how you, as a developer using the ArcGIS API for JavaScript can do your thing with it.

One of the things that makes modern Dojo interesting is they have a powerful command line tool for building apps called the [dojo-cli](https://github.com/dojo/cli). This however does present a challenge as the cli does not expose a webpack config I can easily use the [ArcGIS webpack-plugin](https://github.com/esri/arcgis-webpack-plugin) with. This is similar to any framework cli. I could eject the project and work with the output webpack config, but honestly that's a bit cumbersome and I really like the safety of working within the cli. This is a good use case for using the [esri-loader](https://github.com/Esri/esri-loader).

The esri-loader will essentially sideload the ArcGIS API for JavaScript into your project and doesn't require you to add anything to the webpack configuration. If you're working within the confines of a framework cli, it's a pretty solid tool to integrate the ArcGIS API for JavaScript into your project.

I can inject the ArcGIS API for JavaScript bits into my Dojo project asynchronously as needed. I create an `initializeMap` method to handle this for me. Local state can be manage in Dojo a few ways, in this case I am using a [local context](https://github.com/odoe/dojo-esri-loader/blob/master/src/contexts/MapContext.ts) to manage it for me.

```ts
  initializeMap = async (container: HTMLElement) => {
    loadCss('https://js.arcgis.com/4.10/esri/css/main.css');
    const [MapView, WebMap] = await loadModules(['esri/views/MapView', 'esri/WebMap']);
    // then we load a web map from an id
    const webmap = new WebMap({
      portalItem: {
        id: this.webmapid
      }
    });
    // and we show that map in a container w/ id #viewDiv
    const view = new MapView({
      map: webmap,
      container: container
    });

    view.when().then(() => {
      console.log('map is ready');
      this._invalidator();
    });
  }
```

Then I have a [widget](https://github.com/odoe/dojo-esri-loader/blob/master/src/widgets/Map.tsx) in my Dojo app that I am going to use to display my map where I can call this method to get the whole map party started.

```tsx
export default class Map extends WidgetBase<MapProperties> {
  onAttach() {
    const element = this.meta(HtmlMeta).get("elemRef") as HTMLElement;
    this.properties.initializeMap(element);
  }
  protected render() {
    return <div classes={css.root} key="elemRef" />;
  }
}
```

There is some interesting stuff happening here, but the important part is that we wait for the widget to get rendered and initialize the map and things get all mappy! You can see a **_[demo of this application here](https://dojo-esri-loader.surge.sh)_**.

You can check out the source code for this application on [github](https://github.com/odoe/dojo-esri-loader).

If you want to learn more about Dojo, check the [Dojo docs](https://dojo.io/) and also my [learn-dojo blog](https://learn-dojo.com/)!
