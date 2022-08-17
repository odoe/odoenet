---
layout: "../../layouts/BlogPost.astro"
title: "Save your Viewpoint for another day!"
published: true
author: Rene Rubalcava
pubDate: "2018-01-17"
tags: geodev
coverImage: "viewpoint.jpg"
---

As developers, sometimes we're asked to do something weird. Ok, maybe weird isn't the right term, more like _unusual_ or something you haven't done before.

This could range from things like make your buttons change border radius on hover or some odd sliders and drawers so your app can look all snazzy, because hey, you're _paid for snazzy_.

When working with web mapping applications, sometimes we're asked to do things like make animated symbols, shove charts into popups, have data only load when the clock strikes noon, and so on.

There's usually a way or multiple ways to do these small _dev odd jobs_. They may be hax, they could be creative uses of the tools you are using. The list goes on.

I was recently asked about saving the map state of an application when the application is closed so they can return to this same state when the application is loaded again.

Ok.

I could have sworn I've written about this before somewhere, I think with using the 3x version of the ArcGIS API for JavaScript.

In that case, you basically have to walk the properties that make up the current scale, center, maybe extent, possibly more. It's not that dificult, you just need to make some decisions about the properties you're interested in.

These steps can be simplified when using the [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/latest/index.html). In the API, the maps and scenes are separated from the Views. I think I've driven this point pretty hard in the past, but it's a key concept in the API because it allows you to do some interesting things like query a map or scene before adding it to a view or maybe change the provided popups or tweak the renderers and so on.

Another thing it gives you is that the view state is separate from the map state. So if you wanted to save what the current state of the _view_ is, you could do that using the Views [_Viewpoint_](https://developers.arcgis.com/javascript/latest/api-reference/esri-Viewpoint.html).

The Viewpoint is a handle way you can keep track of the current scale, center, rotation, and in 3D the camera of the current view. It's useful to maintain bookmarks and anything you else you may want to abuse it for.

Let's abuse it to save the view state when we reload our application.

The core of it is this simple few lines of code.

```js
  whenFalse(view, "updating", () => {
    const currPoint = view.viewpoint.toJSON();
    localStorage.setItem(KEY, JSON.stringify(currPoint));
  });
```

You just get the JSON of the Viewpoint and save it to [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Then when the app starts, just check to see if there is a Viewpoint in local storage and initialize your View with it

You can see this in action in the demo below.

<iframe height="500" style="width: 100%;" scrolling="no" title="Save my ViewPoint 4.8" src="https://codepen.io/odoe/embed/opaROx?height=500&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/opaROx'>Save my ViewPoint 4.8</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Like I said, this simplifies maintaing the View state of the MapView or SceneView as your application is reloaded. I'll let you creative if you want to save the state of visible layers and maybe open widgets as well :)

Go forth and hack my geodev friends!
