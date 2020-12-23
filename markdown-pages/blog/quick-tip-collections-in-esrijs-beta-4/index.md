---
title: "Quick Tip - Collections in EsriJS Beta 4"
published: true
author: Rene Rubalcava
date: "2015-10-19"
tags: geodev
coverImage: "esrijs-collection.jpg"
---

I've talked a lot about some cool features of the [ArcGIS API for JavaScrtipt beta 4](http://odoe.net/blog/tag/esrijs4beta/). I think [Accessors](http://odoe.net/blog/?s=accessors) are a great component of the new API, which has lots of applications. One other really interesting module in the API is the [esri/core/Collection](https://developers.arcgis.com/javascript/beta/api-reference/esri-core-Collection.html).

You can think of Collection as a store for Arrays, with some sugar on top. It allows you to move items around, remove them from the collection, add individual items or groups of items. It also emits events when the collection has changed. Hmm, this is starting to look like an [_AS3 ArrayList_](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/mx/collections/ArrayList.html).

This opens up some cool things you can do in your app.

Let's say you have a list of items you want to filter with an input. I've done [similar samples](http://odoe.net/blog/?s=autocomplete) to test stuff out in the past.

For this case, we'll keep a source collection, to use it as a cache of the original data. Then we'll create another collection that is in charge of drawing the elements on the page. When the user types something in the input, we can filter the cache and update the collection. The collection will listen for changes and simply redraw the whole list.

[gist id=626178b5a06fa31fb416]

You can see what this looks like in this sample here. [JS Bin on jsbin.com](http://jsbin.com/juzeqe/3/embed?js,output)


So dig into the beta API a bit and play around in some of the darker corners. You just might find some gems.

By the way, I'm gathering interest for an [Intro to ArcGIS JS API 4 book](https://leanpub.com/arcgis-js-api-4), please take a look and sign up if interested.
