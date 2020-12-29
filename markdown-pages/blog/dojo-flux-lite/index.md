---
title: "Dojo Flux (lite)"
published: true
author: Rene Rubalcava
date: "2015-04-06"
tags: geodev, dojo
coverImage: "dojo_flux.png"
---

[React](https://facebook.github.io/react/) has blown up in popularity and has become a favorite among many JavaScripters. I am [admittedly](https://odoe.net/blog/esrijs-reactjs/) a [fan](https://geonet.esri.com/people/odoe/blog/2015/04/01/esrijs-with-reactjs-updated) and have even tried to integrate it with some of my [Dojo](http://dojotoolkit.org/) and [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) projects.

One of the neat things that has also come out of Reacts popularity is the [Flux application architecture](http://facebook.github.io/flux/docs/overview.html) that is favored in developing React applications. To be clear, Flux is not a requirement to build React apps, it is simply a recommendation as it works very well in managing application state and updates. As the docs themselves attest to, it's not really a framework, it's a collection of patterns used to develop applications. If you are doing React development, Facebook has packaged up Flux as a formal [library](https://github.com/facebook/flux) you can use.

### Tinker tinker

As with most things, I wasn't content to limit the use of Flux to React applications. In the handful of times I have used Flux for React apps, I found the patterns it used very familiar and the flow of it worked very nicely when building an application. I mostly work with the ArcGIS API for JavaScript and use Dojo on a regular basis and after a while it occurred to me _these patterns could be implemented pretty easily in a vanilla Dojo project_. There's no magic here. Let's look at what happens when using the Flux architecture.

[![flux architecture](images/flux_cycle.gif)](https://odoe.net/blog/wp-content/uploads/flux_cycle.gif)

Flux cycle

Basically, _Dispatchers_ respond to _Actions_ that are asking for some change (updating state) to happen in the application. The _Dispatcher_ relays this to the _Store_ along with any data needed to make the changes. The _Store_ is then updated and those changes are reflected in the _View_. In turn, the _View_ can relay more _Actions_ that will repeat the cycle.

If you think about for a second, Dojo already has all these tools. [dojo/topic](http://dojotoolkit.org/reference-guide/1.10/dojo/topic.html) can be used as the Dispatcher, which doesn't need much and be used right inside an Action. I wrote about dojo/topic [here](https://geonet.esri.com/people/odoe/blog/2014/12/02/stay-on-topic). At first I thought I could use [dstore](https://github.com/sitepen/dstore) as the Store, but really, I think [dojo/Stateful](http://dojotoolkit.org/reference-guide/1.10/dojo/Stateful.html) or [dmodel](https://github.com/SitePen/dmodel) are a better choice. A more complex Store may benefit from dstore, such as binding to a REST endpoint. A View could be a basic dijit using [_WidgetBase](http://dojotoolkit.org/reference-guide/1.10/dijit/_WidgetBase.html). To simplify the process of binding to Store updates, you could use [dbind](https://github.com/kriszyp/dbind) and some of it's syntax sugar to format the Store data accordingly. I wrote about dbind [here](https://odoe.net/blog/dbind-arcgis-js-apps/). Let's see what that might look like.

### Simple code

I'm going to work off a previous example I did [using React with Dojo](https://odoe.net/blog/esrijs-reactjs/) that displayed the XY coordinates as you move the mouse over the map. First is the Action.

```js
define([
  'dojo/topic'
], function(topic) {
  return {
    updateXY: function updateXY(data) {
      topic.publish('UPDATE-XY', data);
    }
  };
});
```

You can see this is very simple. It's going to use dojo/topic to pass the data by an _UPDATE-XY_ topic. In this case I'm not using a stand-alone dispatcher, nor am I concerning myself with details about the [Action Type](https://facebook.github.io/flux/docs/dispatcher.html). That may change with a larger application, but I just wanted to show how it might work in a simple sample.

Next let's look at the Store.  

```js
define([
  'dojo/_base/declare',
  'dojo/Stateful',
  'dojo/topic'
], function(
  declare, Stateful, topic
) {

  var Store = declare([Stateful], {
    x: 0,
    y: 0
  });

  // http://www.anujgakhar.com/2013/08/29/singletons-in-dojo/
  if (!_instance) {
    var _instance = new Store();
    topic.subscribe('UPDATE-XY', function(data) {
      _instance.set('x', data.x);
      _instance.set('y', data.y);
    });
  }
  return _instance;
});
```

As you can see in the comments, I borrowed a technique [found here](http://www.anujgakhar.com/2013/08/29/singletons-in-dojo/) to make the Store a [Singleton](http://en.wikipedia.org/wiki/Singleton_pattern). This isn't a robust implementation, but it works, as far as I can tell. This just uses dojo/Stateful to create an object that has an **x** and a **y** property. It also uses dojo/topic to listen for the _UPDATE-XY_ topic and update the Store accordingly.

Let's check out the View.

```js
define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dbind/bind',
  'stores/LocatorStore',
  'helpers/NumFormatter',
  'dojo/text!./templates/LocatorView.html'
], function(
  declare,
  _WidgetBase, _TemplatedMixin,
  bind, store, format,
  template
) {

  var fixed = format(3);

  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,
    postCreate: function() {
      var xStore = bind(fixed).to(store, 'x');
      var yStore = bind(fixed).to(store, 'y');

      bind(this.yNode).to(yStore);
      bind(this.xNode).to(xStore);
    }
  });

});
```

This view as simple as it is, does quite a bit. This is a basic widget with a template. It uses a helper module that will format the coordinates to three decimal places. The LocatorStore is passed in to the module and using the **dbind** library, you can bind any updates to the store to DOM elements. You can use some of **dbinds** syntactical sugar to first bind the updates to the format function. Then you can bind the DOM elements to the formatted results. That's really all there is to it. As a side note, the more I use dbind, _the more I like dbind_.

You can view the full source code for the project [here](https://github.com/odoe/esrijs-flux).

### That's it?

That's it. Granted this sample is not using Constants for Action types and if you wanted this to be maintainable for scale you may want to wrap dojo/topic in a more robust Dispatcher, but honestly, I think when you break down the Flux architecture to it's simplest parts, this works very well. To learn more about Flux and React, I highly recommend the videos at [egghead.io](https://egghead.io/technologies/react).

Someone pointed out to me that this looks [Mayhem](https://sitepen.github.io/mayhem/guide/#what-is-mayhem)\-like in many ways. I still have not had a chance to really dig into Mayhem, but it quite possible could do much of this in a more _Dojo'ish_ way.

I'll probably get ripped for bastardizing Flux, but hey, this works. Let's call it _Flux-influenced_ if you like. Again, I think this just goes to show that the patterns used here do not have to be limited by libraries, _they can be applied where ever you damn well please_.

Hack on folks.
