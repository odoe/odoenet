---
layout: "../../layouts/BlogPost.astro"
title: "Fun with GeometryEngine"
published: true
author: Rene Rubalcava
pubDate: "2016-04-12"
tags: geodev
coverImage: "geomengine.jpg"
---

The [GeometryEngine](https://developers.arcgis.com/javascript/beta/api-reference/esri-geometry-geometryEngine.html) in the ArcGIS API for JavaScript is a very cool and powerful feature inside the API. I highly recommend you check out these [series of blog posts](https://blogs.esri.com/esri/arcgis/2015/09/09/geometryengine-part-1-testing-spatial-relationships-and-editing/) on the Esri blogs to check out some of it's uses in an application setting.

I wanted to play around with using the GeometryEngine to see what other kind of interactive stuff I could do with it. I also really like [Ramda](http://ramdajs.com/0.21.0/index.html), so I wanted to play around with that too. If you are not familiar with Ramda, I talked about it [here](https://odoe.net/blog/esrijs-with-ramda/), but it's basically like underscore, but _better_.

So without too much fussing around, let's dive right in to some code.

[JS Bin on jsbin.com](http://jsbin.com/qudalodegi/1/embed?js,output)

First off we are going to grab some methods off Ramda and the GeometryEngine that we plan on using.

[gist](https://gist.github.com/odoe/e3d8671899262cabae8dcd3d24756a63.js)

Next we do some basic stuff like set up a _QueryTask_, _Map_ and _MapView_, along with some symbols and graphics layer.

Now we can do some cool stuff and set up some functions we can use to do the heavy lifting for us.

[gist](https://gist.github.com/odoe/44f7bf743a21cd0f074322b0d0daf532.js)

So, we've basically used methods like **compose** and **map** to create a series of helper methods that can be easily stitched together to build our app.

[gist](https://gist.github.com/odoe/832f463828bb5aa561542ed4b16f9011.js)

Now we put everything to work, we first get all the points in the extent of the view. We can then listen for the **mousemove** event of the view and every time we move the mouse create a buffer of that location and display any points that fall within that buffer on the map.

This is a pretty simple task to show, but it demonstrates how you can use methods like _buffer_ and _intersect_ to do some useful clientside tasks. These barely touch the surface of what you can do with the GeometryEngine, so I encourage you to check out the docs for more info and I'll be posting up some more samples later on.

Plus it's really fun to use Ramda with something like the GeometryEngine to _transform the data_ in a workflow!

You can see a [full demo here](http://output.jsbin.com/qudalodegi)!

Enjoy!
