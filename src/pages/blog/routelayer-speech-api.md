---
layout: "../../layouts/BlogPost.astro"
title: "Web Speech API with ArcGIS RouteLayer"
description: "A fun look at using the Web Speech API with the ArcGIS API for JavaScript RouteLayer"
published: true
author: Rene Rubalcava
pubDate: 2022-06-13T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## Stop for directions

The ArcGIS API for JavaScript recently added a [RouteLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-RouteLayer.html) that you can use to visualize the results of turn-by-turn directions, along with information about the route, like the stops and any barriers. It can be stored as an individual item in ArcGIS Online, or as part of a WebMap. There's a great intro [sample](https://developers.arcgis.com/javascript/latest/sample-code/layers-routelayer/) in the documentation you can refer to. I was pretty excited when I first saw the RouteLayer, for one ridiculous reason... I wanted to run it through the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

Follow me for a second here! You have service trucks on the road and they are using your web application to get routed to various work locations. The work locations might be assigned at the beginning of the day. Maybe you've added some functionality to update the route while they are driving, due to priority or maybe someone canceled an appointment. This might push an alert on the device and reroute them with a new RouteLayer. But the user is driving, they can't be bothered to pick up the phone and _read_ the directions. Safety first people! You have no other choice, you must use the Web Speech API!

## Tell me what to do

> The code for this blog post is available on [github](https://github.com/odoe/jsapi-routelayer).

We can take this original [sample](https://developers.arcgis.com/javascript/latest/sample-code/layers-routelayer/) and modify it a little bit. We can grab the `speechSynthesis` of the window object.

```js
const synth = window.speechSynthesis;
```

The RouteLayer has a `directionsPoint` property made up of a Collection of [DirectionPoints](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-DirectionPoint.html). Each DirectionPoint has a [`displayText`](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-DirectionPoint.html#displayText) property with the direction information associated with that point.

In a production application, you would probably create a buffer around the user's current location, and measure along the route to the next DirectionPoint. When you get within a certain distance, you might want to prefix the text with _In a quarter-mile..._ or something similar. For demonstration purposes, we can iterate through the DirectionPoint Collection. We can add a short 1 to 2-second timeout between locations to make the speech pattern a little more natural. To simplify this, we can convert the [Collection to an array](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Collection.html#toArray) and then get the [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values) as a new array iterator. This will make navigating the points a little easier.

We can now create a new instance of an _utterance_ using [`SpeechSynthesisUtterance`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) and the display text of the DirectionPoint. We can call [speak](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak) on the SpeechSynthesis and when the utterance is complete, we'll wait 1500ms and move on to the next set of directions. At each DirectionPoint, we can even add a marker and center the map to highlight the current point.

```js
let utterance = new SpeechSynthesisUtterance(point.displayText);
utterance.addEventListener('end', () => {
    const { value, done } = points.next();
    if (done) return;

    setTimeout(() => {
        speakToMe(value);
    }, 1500);
});

synth.speak(utterance);
```

Once the iteration is done. we can do nothing and the directions are done!

## Summary

The RouteLayer formalizes directions in the ArcGIS Platform that can be consumed in your web mapping applications. You don't have to use the Web Speech API, but it's so much fun, so why not give it a shot! You could use it with directions, alerts, or maybe some really important notification that must be shouted at the user! My point is, it sure is fun, so have some fun!

You can see a walkthrough of this application in the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/K0Iv-4sCvv8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

