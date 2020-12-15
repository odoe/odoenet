---
title: "Modular ArcGIS JavaScript apps"
published: true
author: Rene Rubalcava
date: "2015-05-11"
tags: geodev
coverImage: "esri-modular.jpg"
---

I recently had a conversation with someone about building modular JavaScript applications and how you communicate between them. These are the kinds of problems that [React Flux](https://facebook.github.io/flux/docs/overview.html) tries to answer and I talked about how that architecture could be applied [with Dojo](http://odoe.net/blog/dojo-flux-lite/).

### Let's have a chat

Classically Dojo would handle this through via the [Evented](http://dojotoolkit.org/reference-guide/1.10/dojo/Evented.html) system, so you would probably have an Application Controller listening for and relaying events between several different widgets. There's nothing really wrong with this system, but as an application grows, it can be difficult to maintain and scale it. But, as I demonstrated in the Dojo Flux example, I think there is a _better way to communicate between widgets_ in an application and that's with [dojo/topic](http://dojotoolkit.org/reference-guide/1.10/dojo/topic.html). I talked about this [on GeoNet before](https://geonet.esri.com/people/odoe/blog/2014/12/02/stay-on-topic).

### The main topic

dojo/topic allows you to use a [pub/sub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern in your Dojo applications. This also allows you to easily communicate with other modular pieces of your application without the need for a central controller to do all the listening.

I could have one widget that looks like this. [gist id=da7a0ba4033a3e711bda]

And another widget that looks like this. [gist id=9ab37ead405f53ec67c7]

Ideally, both of these widgets would extend the same base widget, but I just wanted to demonstrate what this looks like.

In this case, I only want one widget visible at a time, this helps keep a clean interface and doesn't look like Windows is crashing if I try to work with too many widgets. You can see that each widget is subscribed to a _widget-tool-show_ channel. The data passed on that channel is the type of the widget, or it could be the name, it doesn't matter, just something to distinguish unique widgets. If the type does not match, it will either show or hide the widget.

The result ends up looking like [this demo](http://www.odoe.net/apps/esrijs-modular/). You can either open the measurement widget or the basemap widget, but not both at the same time. The source code is available [on github](https://github.com/odoe/esri-modular).

### Why

You might be wondering why this matters, after all, the Evented system seems to work just fine. I'm of the _opinion_ that widgets in Dojo applications can be [small little bits](http://odoe.net/blog/?s=modular), such as a pulldown or even a single button that encapsulates some behavior, but when grouped together in ArcGIS JavaScript applications are actually _standalone applications housed in a larger application and at certain points they are either waiting for some outside action to happen or updating the outside world to their current state_.

Say for example you had a widget that listed all the attributes of a [FeatureLayer](https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html) in a [dgrid](http://dgrid.io/). This widget has a configuration file of some sort that tells it what layer it needs and how it behaves. It acts totally independently of other widgets that may do analysis or editing. But at some point it needs to know that it should display a data for a different layer based on outside actions. It would simply subscribe the dojo/topic channel that another widget uses to let it know this action has occurred. These widgets are completely encapsulated little apps that are just stitched together to make a larger application. This also makes them completely reusable. This is how I try to build my apps, it's even how the [cmv app](http://cmv.io/) is built.

### Try some stuff out

So try it out. When you have another application to work, think about how you might build the functionality in modular pieces and encapsulate your application in a single widget, or a series of reusable widgets and you just might find it's easier to maintain and easier to actually build. Take advantage of dojo/topic and the tools that Dojo provides to make your development experience easier.
