---

title: Who watches the WatchUtils
description: WatchUtils are a key feature of working with ArcGIS JSAPI
published: true
author: Rene Rubalcava
pubDate: 2021-02-22T10:00:00.000Z
heroImage: '../../assets/blog/watchutils/images/cover.jpg'
tags: geodev, javascript
---

## Watching the watchers

A _key_ concept of working with the ArcGIS API for JavaScript is a basic
understanding how
[properties](https://developers.arcgis.com/javascript/latest/programming-patterns/#properties)
work in the API, and how to watch for property changes. The API utilizes
JavaScript
[Accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors),
with a little sugar on top that allows for watching when those properties
change.

Rather than rely on the API to provide detailed events for every little thing
you're interested in, you can just watch for specific properties to change. The
most basic would look something like this.

```js
view.watch("scale", (newScale, oldScale, propName, target) => {
  if (newScale > oldScale) {
    console.log("You got a big scale!");
  } else if (newScale < oldScale) {
    console.log("You have a smaller scale!");
  }
});
```

As you can imagine, there's a lot you could do here. You can check if values are
true or false, defined or not, maybe you only care about capturing this change
one time. The watch methods also return a
[watchHandle](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle)
with a remove method.

```js
const handle = view.watch("ready", (ready) => {
  if (ready) {
    handle.remove();
  }
});
```

There are some really useful patterns you can use here. Luckily, the API comes
with a helper module specifically to work with properties using
[watchUtils](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-watchUtils.html).

## watchUtils

I use watchUtils all the time. The ones I use the most are probably
[whenFalseOnce](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-watchUtils.html#whenFalseOnce),
[whenTrueOnce](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-watchUtils.html#whenTrueOnce),
and
[once](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-watchUtils.html#once).
The interesting thing about the _WhenSomethingOnce_ methods is they are promise
based. Since they only happen once, it makes sense.

A really interesting one is
[pausable](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-watchUtils.html#pausable).
As the name says, you get a handle that you can pause and then resume.

```js
const handle = pausable(view, "scale", (scale) => {
  handle.pause();
  whenTrueOnce(view, "stationary").then(() => {
    console.log(view.scale);
    handle.resume();
  });
});
```

This little code snippet will capture a scale change, wait until the map view is
stationary, meaning the navigation is done, then log the views current scale.
This is the kind of problem you might encounter in your own applications, so
it's useful to know how to use watchUtils to handle it.

You can see more details of how this works in the video below.

<lite-youtube videoid="6q4mz8BCKts"></lite-youtube>
