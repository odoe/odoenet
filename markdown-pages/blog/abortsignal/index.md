---
title: "Stop what you're doing"
description: "Use AbortSignal to cancel requests in the ArcGIS JSAPI"
published: true
author: Rene Rubalcava
date: 2021-02-24T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Can't Stop the Feeling

Once upon a time, there was a proposal in JavaScript to be able to [cancel Promises](https://github.com/tc39/proposal-cancelable-promises). That didn't happen. [Dojo Deferred](https://dojotoolkit.org/reference-guide/1.10/dojo/Deferred.html) was way ahead of its time here when it offered the ability cancel Promises, and other Promise libraries offered the same thing. But I would argue we live in a world of modern JavaScript, and you really shouldn't need a third-party Promise library. Observables like [RxJS](https://github.com/ReactiveX/rxjs) are a little different, as they have more to offer than just unsubscribing from things. But I tend to think you can get by just fine with native Promises for most use cases. So, how would you cancel a Promise using something like AbortSignal?

The bare bones could like something like this.

```js
const controller = new AbortController();
const { signal } = controller;

const asyncMethod = (mySignal) => {
    return new Promise((resolve, reject) => {
        // do some stuff
        if (mySignal.aborted) {
            reject(new Error('Signal was aborted'));
        }
        else {
            resolve(result);
        }
    });
};

asyncMethod(signal);

// change your mind
controller.abort();
```

This is a really simplistic example, but gives you an idea about how it could be used.

## Supported in the ArcGIS JSAPI

If you look at the documentation for the `request` in the ArcGIS JSAPI, you'll see that it has an option to pass a [signal](https://developers.arcgis.com/javascript/latest/api-reference/esri-request.html#RequestOptions). This means you can cancel any requests you make. This signal can be passed in the options to any of the query methods in the API, like [`queryFeatures`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatures). That signal will get passed down to the request and if you abort the signal before the request is done, it will essentially cancel the request via a rejected Promise. The native [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API also takes a signal that will reject if the signal is aborted.

```js
const controller = new AbortController();
const { signal } = controller;

myLayer.queryFeatures(query, { signal })
    .then((handler)
    .catch(errorHandler);

controller.abort();
```

There could be various reasons you, as a developer might use this. Maybe there is some user interaction that updates charts in your app, and you want to limit some weird deferred loading of data if there is some interaction to update the chart during a request. Honestly, _most_ developers probably don't have a need for this in their applications. But I think it's helpful to know the option is there if you ever do come across an occasion where you find you need this pattern. Consider it another tool on your belt.

Check out this video below for more details.

<iframe width="100%" height="350" src="https://www.youtube.com/embed/WUwzGIzwZ38" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
