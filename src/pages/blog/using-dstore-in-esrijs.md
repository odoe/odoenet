---
layout: "../../layouts/BlogPost.astro"
title: "Using dstore in EsriJS"
published: true
author: Rene Rubalcava
pubDate: "2015-11-02"
tags: geodev
coverImage: "dstore-intro.jpg"
---

One of the libraries included with the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) is [dstore](http://dstorejs.io/). I talked about [using dstore with your custom dijits](http://odoe.net/blog/quick-tip-dstore-with-arcgis-api-for-javascript/) not too long ago, but I felt like a little more ground could be covered here.

I haven't really seen people taking advantage of the power that dstore can bring to your application, in particular if you are working with some third-party APIs to integrate into your application.

Let's get serious here.

I'm going to go ahead and use [JSONPlaceholder](http://jsonplaceholder.typicode.com/) to demonstrate how to use dstore for API requests.

Assume you want to work with a [users](http://jsonplaceholder.typicode.com/users) endpoint. Now since you are already using the ArcGIS JS API, you'll want to stick with using [esri/request](https://developers.arcgis.com/javascript/jsapi/esri.request-amd.html) for API calls. It handles proxy and CORS stuff as needed, so it's usually a good idea to stick with it. Let's wrap up the _users_ API with dstore using esri/request.

[gist](https://gist.github.com/odoe/0672b6554346bf95b154)

We're actually going to kind of mimic the [Rest Store](https://github.com/SitePen/dstore#included-stores) included with dstore, but using esri/request.

We have a _get_ method that works on the ids used in the API and a _fetch_ method that simply returns all results. What's that _queryLog_ business all about? Well that is used for when you apply a [filter](https://github.com/SitePen/dstore/blob/21129125823a29c6c18533e7b5a31432cf6e5c56/docs/Collection.md#filtering) to your request. This is a pretty powerful feature of dstore. Let's see what this might look like.

[gist](https://gist.github.com/odoe/b2d045caf10aaeea613b)

What you do is create a new _filter_ and you can apply the query functions to it. Now you can create a [Collection](https://github.com/SitePen/dstore/blob/21129125823a29c6c18533e7b5a31432cf6e5c56/docs/Collection.md) from the filter and fetch those filtered results.

That's pretty cool.

But is it making a network request each time I do something? Yes, _but_ dstore makes it very easy to create mixins for your stores that alleviate this. You can mixin your store with the [Cache or LocalDB](https://github.com/SitePen/dstore/tree/21129125823a29c6c18533e7b5a31432cf6e5c56#included-stores) Store cache query results or persist them across browser sessions.

This is pretty simple to do.

[gist](https://gist.github.com/odoe/6722c9f8e23eabc8f801)

Voila, you have an awesome cached API store using esri/request that you can use to integrate third-party APIs into your application.

Here is a sample of that in action, you can see results in your browser debug console. [JS Bin on jsbin.com](http://jsbin.com/lozuja/1/embed?js,output)

So take a crack it and check out how you might be able to use dstore in your own application. It's a pretty powerful library with lots of useful features that I'm still experimenting with.
