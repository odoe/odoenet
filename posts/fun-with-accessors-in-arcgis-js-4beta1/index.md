---
title: "Fun with Accessors in ArcGIS JS 4.0beta1"
published: true
author: Rene Rubalcava
date: "2015-07-20"
tags: geodev
coverImage: "camrecorder.png"
---

Last week I talked about how cool [ES5 Accessors in the ArcGIS JS API 4.0beta1](http://odoe.net/blog/arcgis-js-api-4-0beta1-accessors/) are. This week, I want to talk a little more about how you might be able to do some cool stuff with them in your applications.

## New Point of View

Before we dive in to a sample, I want to talk a little about the [map](https://developers.arcgis.com/javascript/beta/api-reference/esri-Map.html) and views, like [MapView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-MapView.html) and [SceneView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-SceneView.html). The main thing to understand is that the map is basically considered a container. **It's a datasource, with no real interaction**. You're not panning the map anymore, nor are you rotating the map in 3D. The map isn't even doing the drawing, _it's a whole new world man_. All that stuff is now handled by the views. You can read more about the views [here](https://developers.arcgis.com/javascript/beta/guide/migrating/#views).

## 3D Camera

As you get familiar with the 4.0beta1, you'll learn more about how the [ViewPoint](https://developers.arcgis.com/javascript/beta/api-reference/esri-Viewpoint.html) works with views. One thing to know about is the [Camera](https://developers.arcgis.com/javascript/beta/api-reference/esri-Camera.html). The camera is really interesting when working with 3D views. Imagine you are the camera looking at a 3D globe. _What is your position? How much of the world can you see? How much are you tilting the camera? What direction are you looking?_ These are all properties that the camera object of the ViewPoint can tell you.

Now remember, just about everything in the 4.0beta1 is an Accessor, which means you can watch for changes. This means you can check for when the camera properties are updated or when it's state changes. Well, of course, if you can watch for state changes, you could save state changes... which means, **you can record your camera movements!**

## Camera Recorder

Now let's assume I want to record and playback my camera movements. _Why?_ **Why not!** This means I'd want to watch for when the state of the camera has changed, save that state and then be able to reapply that state at a later time in the order it was saved. If I can do that, I can easily reverse the order and replay my camera movements backwards. Let's look at what a widget like that looks like.

\[gist id=06a60445cc090908935c\]

Let me point out that I'm using an undocumented helper here, the _esri/core/Scheduler_. This is used to help with animation stuff in the API, and it's undocumented, because being beta, it could totally change, so this sample may break at some point. _The fun of beta!_

There's a lot going on in this code, but hopefully you can follow along and see that the method **\_cameraWatch** captures state changes in to the camera, _clones it_ and saves that copy to an array. It will then update the slider. We can even use the slider to update the camera view to certain point in time. The **\_play** method is used to simply iterate over the camera array, update the views camera and essentially play back your camera positions. There is even an option to do it in reverse.

Let's take a look at a demo of this in action. [JS Bin on jsbin.com](http://jsbin.com/sodeda/1/embed?output)
<script src="http://static.jsbin.com/js/embed.min.js?3.34.0"></script>

Like I said before, I think Accessors are a really cool, powerful feature in the ArcGIS 4.0beta1. 3D is cool, sure, but the stuff in the API that powers 3D is even cooler.
