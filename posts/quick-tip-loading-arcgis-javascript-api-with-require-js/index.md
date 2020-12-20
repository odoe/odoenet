---
title: "Quick tip: Loading ArcGIS JavaScript API with Require.js"
published: true
author: Rene Rubalcava
date: "2012-05-30"
---

In my previous post on [Getting Modular with the ArcGIS JavaScript API](http://odoe.net/blog/?p=257), I discussed using a loader.js method to load your JavaScript files with Require.js. Mr. Dave Thomas pointed out in the comments about just wrapping third-party libraries using a tool like [volo](https://github.com/volojs/volo). See his examples at [Backbone Boilerplate](http://backboneboilerplate.com/) for more details.

If you have to wrap a library, use the [amdify](https://github.com/volojs/volo/blob/master/vololib/amdify/doc.md) tool in volo or do it manually, it's not difficult. I tried wrapping the ArcGIS JavaScript API by using curl to download it, but it didn't work quite as expected, so now what I do is just load it once, and allow it to add its global variables.

` (function() { // Note, you must use lowercase jquery, as the ADMify'd version of backbone uses // lowercase jquery in it's define method. // If you just use lowercase for all aliases the way I do, // you'll be fine. require.config({ paths: { jquery: 'libs/jquery/jquery-1.7.2.min', jqueryui: 'libs/jqueryui/jquery-ui-1.8.20.custom.min', underscore: 'libs/underscore/underscore-min', backbone: 'libs/backbone/backbone-min', order: 'libs/require/order', text: 'libs/require/text', templates: '../templates' } }); // Load the ArcGIS JavaScript API in this initial require to get your // app started and allow variables to go global. require(['app', 'http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.8compact'], function(App) { console.log('init app'); return App.initialize(); });

}).call(this); `

You can see this example in a project [here](https://github.com/odoe/iLikeItHere/blob/master/static/src/main.js).

I don't know what changes will come when the ArcGIS JS API is converted to use Dojo 1.7. It would be nice to grab just the modules needed as they are required using the [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) method, but this method of loading the API as been working fine for me lately.
