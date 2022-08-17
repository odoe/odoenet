---
layout: "../../layouts/BlogPost.astro"
title: "CycleJS with ArcGIS JS API"
published: true
author: Rene Rubalcava
pubDate: "2016-01-11"
tags: geodev
coverImage: "esri-cycle.png"
---

A while ago, I had seen a tweet about a new JavaScript framework called [Cycle.js](http://cycle.js.org/), so _of course I had to check it out._

It touts itself as _"A functional and reactive JavaScript framework for cleaner code"_.

Ok, cool, let's check it out.

My first look at it and it relies heavily on [RxJS Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md). It's this sort of brew of RxJS and React, minus the JSX.

Here is how the DOM creation happens.

```js
div([
  input({type: 'checkbox'}), 'Toggle me',
  p(toggled ? 'ON' : 'off')
])
```

If you are not familiar with [React without JSX](https://facebook.github.io/react/docs/displaying-data.html#react-without-jsx), this looks very similar. It actually reminds me of [Mithril](http://mithril.js.org/), but I haven't spent too much serious time with Mithril.

I'm still wrapping my head around some of the concepts in Cycle.js. The DOM stuff is pretty straight-forward, the structure makes sense and should be easy to pick up. I think it's the bits of RxJS that will be more of a learning curve for people.

Let's look at a sample where we create a zoom slider to adjust the zoom of a View in the [ArcGIS JS API](https://developers.arcgis.com/javascript/beta/index.html).

[gist](https://gist.github.com/odoe/75319deae0b51a364fc6)

So there is quite a bit happening here. We can break to talk about it.

All of this happens inside a _main_ function.

[gist](https://gist.github.com/odoe/354595261fb1ef8c8a44)

This is pretty basic, we create the map with a VectorTileLayer and create a View. _Awesome, nothing new here to most_.

[gist](https://gist.github.com/odoe/7ab9a1da47167cb13bf7)

What we've done here is create an _Rx Observable_ that selects a DOM element and watches for events. This let's map the events as a stream of values. You can get more familiar with this using [rxmarbles](http://rxmarbles.com/).

We watch for _input_ events, return the value, change the view zoom based on the value and make sure to return the value after we do that. We also are sure to start the stream a default value of _4_.

The next step is really cool. We map the _changeZoom$_ observable and update the DOM when the values change.

[gist](https://gist.github.com/odoe/3d72af37c9f530724a6d)

Now we're returning an object with a _DOM_ property that is the observable that will update the DOM when changes occur.

The last step is to actually start the Cycle app.

[gist](https://gist.github.com/odoe/a3b6302fa5d675cbe111)

This seems to be pretty standard in all Cycle.js apps I've looked at so far. There are a couple of other options that can be used, but this is the minimum to run it right here.

Here is a [demo of this app](http://odoe.github.io/esrijs4-cyclejs/) and the [git repo](https://github.com/odoe/esrijs4-cyclejs).

I'm not going to pretend to have a full grasp on Cycle.js, but my first step as usual when considering to use it with the ArcGIS JS API is to simply get the two working together and do something.

One area I'm not clear on with Cycle.js is watching for a change on the view, such as when the zoom level changes and syncing that change to the state of the Cycle.js stuff. I'll toy around this some more and if I make progress, I'll follow up.

If you have any experience with Cycle.js and some ideas about using it with the ArcGIS JS API, let me know!
