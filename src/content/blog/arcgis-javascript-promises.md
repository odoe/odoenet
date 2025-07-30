---

title: ArcGIS JavaScript Promises
published: true
author: Rene Rubalcava
pubDate: 2015-08-03
tags: geodev
heroImage: '../../assets/blog/arcgis-javascript-promises/images/promises.jpg'
description: Something not exactly new to the ArcGIS API for JavaScript 4.0beta1
  is the increased usage of Promises within the API. You can read more details
  about the use of Promises here.
---

Something not exactly new to the
[ArcGIS API for JavaScript 4.0beta1](https://developers.arcgis.com/javascript/beta/)
is the increased usage of
[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
within the API. You can read more details about the use of Promises
[here](https://developers.arcgis.com/javascript/latest/guide/programming-patterns/#async-data).

I've talked before about Promises in the ArcGIS API for JavaScript
[here](https://geonet.esri.com/people/odoe/blog/2015/06/17/keeping-promises) and
about how in the 4.0beta1, you would uses
[Accessors](https://odoe.net/blog/arcgis-js-api-4-0beta1-accessors/) to really
manage when the state of your application has changed. However, Promises are now
also used to let you know when creation of certain moving parts in the API are
complete. For example, as
[discussed here](https://developers.arcgis.com/javascript/beta/guide/working-with-promises/),
the Map, the Views and Layers are all Promises, meaning that if you need to act
on them when they are finished being created you can just treat them like a
Promise, there is no need to listen for load events.

## Use them as needed

You may not always need to worry about using the Promise of the Map or View, but
you may find certain situations when maybe you are trying to
[use Accessors to monitor the state of the Map or View](https://odoe.net/blog/fun-with-accessors-in-arcgis-js-4beta1/)
and you find you get errors about undefined variables. This can be alleviated by
using Promises to wait for everything to be ready. It can be as simple as this:

```js
view.then(function () {
  view.watch("center", function (val) {
    console.log("view.center", val);
  });
});
```

This **guarantees** that the center of the View will be ready to be monitored
for state changes. As shown in
[the guide](https://developers.arcgis.com/javascript/beta/guide/working-with-promises/),
you can chain Promises for a number of purposes. Most of which would be to chain
the flow of data and process it as shown in the guide. However, you can also
chain promises to pass them around to different methods or modules that may
handle different aspects of your application.

Perhaps you have a module that handles what happens when the center of the View
is changed, and another that handles changes for the extent for the extent of
the View. You can chain them like so.
`view.then(centerWatch).then(extentWatch);`

That's pretty simple. You can see this demo below.
[Search widget - 3D - 4.0 beta 1 on jsbin.com](http://jsbin.com/xigona/embed?js,console,output)

## Make your life easier

There's a lot of info already out there about how to use Promises, but I just
wanted to stress how they are used in the ArcGIS API for JavaScript 4.0beta1.
There are still Promises used throughout the API for asynchronous operations,
but they are also used a lot for constructors, so you know when something is
completely done being loaded. Take advantage of it and you may find you can
further modularize certain aspects of your application. I _promise_, you'll find
it very useful.
