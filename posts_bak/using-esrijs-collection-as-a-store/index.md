---
title: "Using EsriJS Collection as a Store"
published: true
author: Rene Rubalcava
date: "2016-02-08"
tags: geodev
coverImage: "esrijs4-collections.png"
---

I talked a bit about [Collections](http://odoe.net/blog/quick-tip-collections-in-esrijs-beta-4/) in the ArcGIS JS API 4.0beta. Remember, Collection is part of core in 4.0, so it's helpful to get [familiar with it](https://developers.arcgis.com/javascript/beta/api-reference/esri-core-Collection.html).

To demonstrate how to do this, let's play around with some free traffic camera data,from the [Washington State DoT](http://www.wsdot.wa.gov/). You can sign up for an API key [here](http://wsdot.com/traffic/api/).

You can find the full source code for this post [on github](https://github.com/odoe/esrijs4-collection-store).

> _Note_ This sample also shows how to add widgets to the view ui!

Now that you have an API key, let's look at what a Collection as a Store might look like.

[gist id=89c2a483eded3db933f9]

We're going to go ahead and extend Collection and add some properties for the API url and key that should be provided in the constructor. We also add a method called _loadStore_ that will use _esri/request_ to download the data and fill the collection with it. Now we can use this Store in various widgets.

[gist id=37f60c53e146ce340d9d]

Here, we make a widget that adds a _GraphicsLayer_ to the map and we are going to display some points or each of the traffic cameras that have been loaded into the store. Now what we can do is listen for _change_ events on the store that will let the widget know when to update itself, in this case, to update the _GraphicsLayer_. We do some _trickery_ in the update of the extent to account for zooming to a single point when dealing with extents.

Ok, so how might we make changes to the Collection that would propagate to this widget and update the layer? Maybe a search widget like this.

[gist id=fe65f907c6d59b65c418]

Now we have a search box that will let you find a specific camera by id. We then iterate the _Collection_ and set the visibility of everything to _false_ and then find the specific camera and set it's visibility to _true_. We even have a button to reset everything to being visible again. By removing/adding an item in a _Collection_ will trigger a _change_ event in the Collection, if the position actually changed. That's why in the _onRefresh_ method will remove/add a random feature.

You can see a demo of this application [here](http://www.odoe.net/apps/cams/).

Try searching for ids like 9203 and other numbers around that.

This is just one example of how you could use _Collection_ as a data store for your application. I'm sure you can come up with some more use cases, _so keep hacking away!_
