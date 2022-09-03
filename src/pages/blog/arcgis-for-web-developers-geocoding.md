---
layout: "../../layouts/BlogPost.astro"
title: "ArcGIS for Web Developers: Geocoding"
published: true
author: Rene Rubalcava
pubDate: "2019-07-30"
tags: geodev
coverImage: "arcgis-webdev-2.png"
---

- [ArcGIS for Web Developers: Part 1](https://odoe.net/blog/arcgis-for-web-developers-part-1/)

In this edition to ArcGIS fo Web Developers, we're going to take a look at one of the most common tasks you may do with maps in your apps... _[geocoding](https://developers.arcgis.com/features/geocoding/)_!

Geocoding can help you accomplish a few different tasks.

- Search for the location of an address
- Search for the address of a location
- Search for places
- Search for intersections

## Simple Start

A simple starting point with geocoding using the ArcGIS API for JavaScript is going to be to just use the out-of-the-box [Search widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html). The Search widget provides a very basic user interface to do all the tasks above.

This is how you can add the Search widget to your application.

```js
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search"
], function(ArcGISMap, MapView, Search) {
  const map = new ArcGISMap({
    basemap: "streets"
  });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118, 34],
    scale: 100000
  });
  // initialize search widget
  const search = new Search({ view });
  // add widget to UI
  view.ui.add(search, "top-right");
});
```

You will have an application that looks like this.

```js
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search"
], function(ArcGISMap, MapView, Search) {
  const map = new ArcGISMap({
    basemap: "streets"
  });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118, 34],
    scale: 100000
  });
  const search = new Search({ view });
  view.ui.add(search, "top-right");
});
```

Now you can search for an address, a restaurant, a city, or any other random place. The Search widget will then zoom you to the location of what you searched for and provide a popup with information about the result or other results.

Maybe, just maybe, you want something a little bit more low level, with a little more control over what and how you search.

## Search View Model

Out-of-the-box widgets in the ArcGIS API for JavaScript are all built so that the widget is just a user interface for a View Model. It's the View Models for these widgets that handle all the business logic. As a result of this, you can use the [SearchViewModel](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search-SearchViewModel.html#) to perform the same search functions of the Search widget, but have a little more control over how to handle the results or perform the searches. _You could build a completely new interface if you wanted to!_

Maybe you want to allow the user to click on the map and get back an address for where they click. You could do something like this.

```js
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search/SearchViewModel"
], function(
   ArcGISMap,
   MapView,
   SearchViewModel
  ) {

  const map = new ArcGISMap({
    basemap: "streets"
  });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118, 34],
    scale: 100000
  });
  const searchVM = new SearchViewModel({ view });
  
  view.on("click", (event) => {
    // the view will display a
    // popup of the result
    searchVM.search(event.mapPoint)
      .then((response) => {
        console.log(response);
    });
  });
});
```

Because you initialize the SearchViewModel with the map view, it will display a marker and a popup where users click on the map. Go ahead, try it out here!

```js
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search/SearchViewModel"
], function(
   ArcGISMap,
   MapView,
   SearchViewModel
  ) {
  const map = new ArcGISMap({
    basemap: "streets"
  });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118, 34],
    scale: 100000
  });
  const searchVM = new SearchViewModel({ view });
  
  view.on("click", (event) =&gt; {
    // the view will display a
    // popup of the result
    searchVM.search(event.mapPoint)
      .then((response) =&gt; {
        console.log(response);
    });
  });
});
```

You have to admit, that's pretty cool!

## Summary

Geocoding is a fantastic tool you can use with the ArcGIS API for JavaScript. The Search widget and SearchViewModel provide the simplest entry points for you to bring geocoding into your applications. However, if you really want to get low-level with address and place searching, you can look at the [Locator](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-Locator.html) in the API. The Locator is what powers the Search capabilities of the Search widget and view model. If you need some fine-grained search capabilities, definitely check it out!

We have covered the basics of geocoding in the ArcGIS API for JavaScript, and now you can go forth and build some awesome applications that can use it! Happy geohacking!
