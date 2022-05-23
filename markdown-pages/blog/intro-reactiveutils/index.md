---
title: "Intro to reactiveUtils"
description: "Intro to reactiveUtils in the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: 2022-05-23T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## Reactive at heart

If you weren't already aware, the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/) is reactive at heart. Since it's release, you have had the capability to [watch for property changes](https://developers.arcgis.com/javascript/latest/programming-patterns/#watching-for-property-changes). This provides a lot more flexibility for developers to watch for changes they care about. Rather than rely on a variety of events, you can just watch for particular properties to change.

Since the release of version 4 of the API, there has been a [watchUtils](https://odoe.net/blog/watchutils) you could use to help you watch for changes. The drawback is that depending on what you were interested in, you could use a utility to check when a property has been defined, changed, or is a true/false boolean value. These watchUtils are being deprecated in favor of reactiveUtils, so there is no time to update like today!

## Flexibility

A core benefit to using reactiveUtils is the flexibility you have to manage property changes. Combine this with [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), and you don't even need to check if properties exist up front.

Let's take a quick look at [reactiveUtils](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html) and what they are used for.

* `on()` - Listen for events on a target
* `once()` - Like `watch`, but only fires one time as a Promise
* `watch()` - Most versatile of the methods, used for watching property changes
* `when()` - Similar to `watch`, but executes the callback when the expression returns _truthy_
* `whenOnce()` - Executes the `when` expression only once as a Promise

This is an older example of how you might do some deep property watching compared to how you can use reactiveUtils.

```js
// old watchUtils
watch(view, 'map.basemap.title', (title) => console.log(title));

// reactiveUtils
watch(
    () => view.map?.basemap?.title,
    (title) => console.log(title)
);
```

This sample isn't too exciting, but it gives you an idea of what you can accomplish.

An incredibly useful property to track is [`view.updating`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#updating). This property will be `true` when there is data being fetched, and rendered by the map, it becomes `false` when that rendering is done. It's useful to know when the View, in 2d or 3d, has completed drawing.

```js
when(
    () => !view.updating,
    (updating) => /** take screenshot, notify user, etc **/
);
```

You can also watch for multiple properties to update.

```js
watch(
    () => [view.scale]
);
```

You can also watch for multiple properties to change. Maybe you are interested in checking when the `zoom` or `scale` of the map changes, but not when you pan the map. This requires that track the previous the zoom value to compare.

```js
let prevZoom;

// wait for view to be ready
whenOnce(() => view.ready).then(() => {
  // save the initial value
  prevZoom = view.zoom;
  watch(
    () => [view.zoom, view.stationary],
    ([zoom, stationary]) => {
      // do not execute if values are the same
      if (zoom === prevZoom) return;
      // make sure view is stationary
      if (stationary) {
        // update tracked value
        prevZoom = zoom;
        // do something when the value is updated as expected
        console.log(zoom);
      }
    }
  );
});
```

In this sample, as a bonus, we can look at an alternative to `view.when()` to check then the [`view.ready`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#ready) property is true using `whenOnce`.

You can get as detailed or specific in how you watch for property changes as needed. There's a [great sample](https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes-reactiveutils/) in the documentation you can look at with some good use cases.

## Events

An alternative to `target.on()` is using the [`on()`](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html#on) to listen for events.

```js
on(
    () => view.popup,
    "trigger-action",
    (event) => handleTriggerAction(event)
);
```

You can even listen for multiple events.

```js
on(
    () => view,
    ["click", "double-click"],
    (event) => handleViewEvents(event)
);
```

This could be useful if you want to handle multiple events the same way on an component or element.

## Summary

This was just a quick intro to reactiveUtils in the ArcGIS API for JavaScript. There are many different use cases you can leverage in your applications with this utility. There are less methods in reactiveUtils than you would find in watchUtils, but now you have more flexibility in how you compose what is being watched, when you handle those updates and other side effects in your application. If you can learn how to leverage reactiveUtils in the ArcGIS API for JavaScript, you can take your development experience to the next level!

You can see more details in the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/8tHdwpCEXKg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
