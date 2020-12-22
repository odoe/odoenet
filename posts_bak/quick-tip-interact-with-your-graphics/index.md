---
title: "Quick Tip: Interact with your Graphics"
published: true
author: Rene Rubalcava
date: "2016-02-01"
tags: geodev
coverImage: "esrijs-select.jpg"
---

You ever been working with your ArcGIS JS application and doing some [feature selections](https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html#selectfeatures) and you're getting kind of bored and tired of the same old highlight of features? Sure you could change the highlight symbol and fuss around with some cool symbology. _But why not take it a step further?_ Don't just highlight features, _interact with them!_

The [graphics](https://developers.arcgis.com/javascript/jsapi/graphic-amd.html) in the ArcGIS JS API end up as [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) elements in the page. If you are on some super old version of Internet Explorer, it may not be SVG and you can pretty much stop reading here and go upgrade your browser. Each graphic has a [getNode](https://developers.arcgis.com/javascript/jsapi/graphic-amd.html#getnode) method to give you the node element on the page that you can interact with.

Now, this lets you do some pretty cool stuff with CSS and transitions to add a little [flair](https://www.youtube.com/watch?v=_ChQK8j6so8) to your mapping application.

Before we look at a demo app, let's look at the chunk of code that does all the work.

[gist id=436849dfb8765284d3a7]

We are essentially doing the follow:

1. Filter the graphics to match a query of some sort.
2. Validate the results.
3. Get the DOM elements for each graphic.
4. Remove the element from the SVG container.
5. Apply a new CSS class to the graphic DOM element.
6. Add the element back to the SVG container.
7. On the next frame, apply a CSS class to the SVG container.
8. Set a timer to reset all the CSS classes we applied.

You could skip steps 4 and 6 if you want, this just brings the graphics to the forefront in the SVG container.

What you get when you do this is the application below.

!(https://jsfiddle.net/ab3t89y9/embedded/)

Each button above the Map is related to the condition of the trees in the map. You can click on a button for a condition type and you get a nice little transparency to everything except for the features that match that condition.

This isn't some new groundbreaking visualization, but adds a little more nuanced experience for the user to be able to give them a quick look at what features on the map are related to some other interaction they performed.

This is just one way you could tweak the interaction of the graphics in your map. Remember, they're just DOM elements that you can play with.
