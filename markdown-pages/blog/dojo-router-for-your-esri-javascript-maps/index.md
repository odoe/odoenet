---
title: "dojo router for your Esri JavaScript Maps"
published: true
author: Rene Rubalcava
date: "2014-11-24"
tags: geodev
coverImage: "logo1.png"
---

Part of the rage in building single page applications is the ability to do all your page routing on the client. Angular has the [$routeProvider](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider), Backbone has a [solid router](http://backbonejs.org/#Router), Ember has a great [routing](http://emberjs.com/guides/routing/) system in place, and although React isn't an all-in-one framework, there is a fantastic [routing library](https://github.com/rackt/react-router) available for it.

Now, if you happen to partake in some Dojo goodness and if you're using the ArcGIS API for JavaScript, I know you do, don't fret, Dojo has you covered when it comes to routing with all the cool kids on the playground. The thing to remember is that routing isn't so much about loading new pages on each route, it's really about the state of your application. I've seen some people struggle with this by trying to reload the map on each route. You could use routes in your mapping applications in various ways.

- Zoom to coordinates/location
- Find an address
- Do a query
- Filter the map
- Select features from a layer

This is something you could handle using the [dojo/router](http://dojotoolkit.org/reference-guide/1.10/dojo/router.html). That link provides some good examples of how to use the router, _except for how to actually form the URL_. There is a [SitePen blog post](http://www.sitepen.com/blog/2014/06/18/dojo-faq-does-dojo-have-routing-like-backbone-and-embe/) that does a much better job of showing how to use the router. For reference the URL for a route would look like **//hostname/#/routename**.

Let's take a look at what this might look like. Below is an example that can be used to pass the name of a US state in the URL and perform a search based on that name.

```js
require([
  'esri/map',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/graphicsUtils',
  'dojo/on',
  'dojo/router',
  'dojo/domReady!'
], function (
  Map,
  Query, QueryTask,
  graphicsUtils,
  on, router
) {
  'use strict';

  var URL = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5';
  var graphicsExtent = graphicsUtils.graphicsExtent;
  var queryTask = new QueryTask(URL);
  var query = new Query();
  query.returnGeometry = true;

  var map = new Map('map-div', {
    basemap: 'topo'
  });

  var whenLoaded = function whenLoaded() {
    // define a route for name
    router.register('/:name', function(e) {
      var name = e.params.name;
      query.outSpatialReference = map.spatialReference;
      query.text = name;
      // query the service using the name
      queryTask.execute(query).then(function(featureSet) {
        if (featureSet.features) {
          // zoom to the results
          map.setExtent(graphicsExtent(featureSet.features));
        }
      }, function(err) {
        console.warn('Query Task error: ', err);
      });
    });
    router.startup();
  };

  on.once(map, 'load', whenLoaded);
});
```

Another example would be to have the app function differently based on the route, so you could say, load the [HomeButton](https://developers.arcgis.com/javascript/jsapi/homebutton-amd.html) or [LocateButton](https://developers.arcgis.com/javascript/jsapi/locatebutton-amd.html) based on which route was loaded. That may look something like this.

```js
require([
  'esri/map',
  'dojo/on',
  'dojo/router',
  'esri/dijit/HomeButton',
  'esri/dijit/LocateButton',
  'dojo/domReady!'
], function (
  Map,
  on, router,
  HomeButton, LocateButton
) {
  'use strict';

  var map = new Map('map-div', {
    basemap: 'topo'
  });

  var whenLoaded = function whenLoaded() {
    // define a route for name
    router.register('/:name', function(e) {
      var name = e.params.name;
      if (name === 'home') {
        new HomeButton({ map: map }, 'tool-div').startup();
      }
      if (name === 'locate') {
        new LocateButton({ map: map }, 'tool-div').startup();
      }
    });
    router.startup();
  };

  on.once(map, 'load', whenLoaded);
});
```

You could combine this with the [dojo/io-query](http://dojotoolkit.org/reference-guide/1.10/dojo/io-query.html) module or the Esri provided [esri/urlUtils](https://developers.arcgis.com/javascript/jsapi/esri.urlutils-amd.html) module to extract query parameters from different routes. You could get pretty creative here in how you might implement that. You could pass coordinates to either use to zoom or maybe perform a query on. I'll leave that up to you to play with.

The dojo/router provides an easy to use interface to help you manage routes in your application and gives you some nice fine-grained control in the state of your application based on those routes. Good luck and build some cool stuff.
