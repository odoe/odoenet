---
layout: "../../layouts/BlogPost.astro"
title: "Quick Tip - Move a Graphic"
published: true
author: Rene Rubalcava
pubDate: "2018-02-02"
tags: geodev
coverImage: "quicktip-move-graphic.png"
---

A quick tip today! Because someone asked me how to do this and I was like, _I think I can do that._

**Scenario:** You're working deep cover overseas. You're cornered in an alley and have no clear eyeshot of the bad guys that are looking for you. _But_, you have access to a small drone in the area with a camera. You, being the geeky spy that you are have built your own web app to control the location of the drone. You need to move the location of your drone around in your mapping app so you can get a better look around to survive this harrowing ordeal!!! How would you have done that?

So I'm sure a super spy isn't writing his own drone software, but I'm sure he has someone that does...

As of right now, the [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/) has the underlying [editing API](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#applyEdits) but doesn't really have any widgets to edit features right now. But there's some stuff you can do. _You do you._

Let's assume the basic use case of grabbing a point and moving it around. Sounds simple enough. Let's think through how you would do this for a second.

1. Listen for a _hold_ event on the map.
2. Check if there is a graphic where you are holding, either a mouse pointer or touch.
3. Stop the map from panning around.
4. Move the graphic as you move the mouse or your finger.
5. Let go of mouse or finger and stop moving the graphic and let the map pan again.

Now that we have the steps to do this task, let's look at how we can accomplish this with the JSAPI!

1. Ok, so, we can listen for a [hold event](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event:hold) on the MapView. AWESOME!
2. We can then use [MapView.hitTest](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#hitTest) to see if there is a graphic where we touched.
3. We lucked out as there is a sample showing how to [disable the pan of the MapView](https://developers.arcgis.com/javascript/latest/sample-code/view-disable-panning/index.html)!
4. We can now use the [pointer-move event](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event:pointer-move) to [clone](https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html#clone) the Graphic, update the geometry and move the Graphic location!
5. Now we can use the [pointer-up event](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event:pointer-up) to say that we're done and clean up all the mess we made!

This is assuming you are just using points. If you are working with lines or polygons, you'll need to do some math of the vertices based on the deltas of moving the mouse around, but I'll leave that for you.

Here's a quick sample showing how you might do this with the steps above and a little _flare_ thrown in!

<iframe height="500" style="width: 100%;" scrolling="no" title="Move Graphics" src="https://codepen.io/odoe/embed/bLEroK?height=500&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/bLEroK'>Move Graphics</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Hope you enjoy the quick tip! Hack away!
