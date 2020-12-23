---
title: "Angular 2 with ArcGIS JS API"
published: true
author: Rene Rubalcava
date: "2016-01-04"
tags: geodev
coverImage: "esri-angular2.png"
---

One of my most popular blog posts is [Using AngluarJS with ArcGIS API for JavaScript](http://odoe.net/blog/using-angularjs-with-arcgis-api-for-javascript/). It's an older version of Angular and an older version of the API, but it still gets a lot of traffic.

I've been wanting to do a follow up for a while, especially with [Angular 2](https://angular.io/) making a lot of progress, but I honestly had not had the opportunity to learn enough Angular 2 to talk about it. **I decided to do something about that.**

A couple of weeks ago, I talked about [using View Models in the ArcGIS API 4.0beta](http://odoe.net/blog/view-models-in-arcgis-js-api/). This mega-post included samples using React, Ember, Elm, and Angular 2. All of which I have discussed here before... except Angular 2.

## SystemJS

Angular 2 uses [SystemJS](https://github.com/systemjs/systemjs) as it's module loader. SystemJs is interesting. It's based on the [ES6 module loader](https://github.com/ModuleLoader/es6-module-loader). It helps to alleviate some of [the concerns with ES6 module loader](http://jrburke.com/2015/02/13/how-to-know-when-es-modules-are-done/). I'm still digging into some inner bits of SystemJS, but my first couple of tries with using with the ArcGIS JS API were not too successful.

SystemJS can work with AMD. This was key since the bulk of the ArcGIS JS API is built on Dojo 1.x, which is all AMD. It worked fine, until I ran into some loader plugins. A loader plugin is something like [dojo/text](http://dojotoolkit.org/reference-guide/1.10/dojo/text.html) which can load files dynamically. It looks like **"dojo/text!something.html"**.

By default, SystemJS doesn't know what to do with this. SystemJS supports [loader plugins](https://github.com/systemjs/systemjs#plugins), but for some reason, they have a different syntax. **'some/text.txt!text'**.

Well, ok. That hurts. This issue with AMD loader plugins [has come up before](https://github.com/systemjs/systemjs/issues/549). So to work around it, I tried using the workaround in that thread.

[gist id=d64caed1422af94dae93]

Ok, that get's you almost there. Except AMD loads modules like **define(["packages/module"], function(){})**. When SystemJS tries to load that. it won't add the **.js** at the end of the file. So ok, you can turn that on via **System.config({defaultJSExtensions:true})**. Simple enough. Except now with the AMD plugin loader compatibility in place, when you do **"dojo/text!something.html"** SystemJS will try and load **something.html.js**.

_This is usually around the point I start drinking too much._

## Enlightenment

Then, as if a light was shining on my keyboard, I saw someone use [System.register()](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/system-register.md) to bundle their AMD code with SystemJS before the application loaded. I did something similar with [ember-cli-amd](https://github.com/esri/ember-cli-amd), because Ember's AMD loader is really more of an SMD (Synchronous Module Loader) to preload the AMD bits into the existing loader ahead of time.

Well, ok then. With that bit of knowledge, everything else fell into place.

[gist id=696a36de99a1c5307552]

First task is to create a list of AMD dependencies, load them using the Dojo AMD loader and when they are ready, register them with SystemJS under a dummy module name and then start the application.

Now you can start building an Angular 2 application and being integrating the ArcGIS JS API.

[gist id=a5764f2e11c061f5d980]

I still like to treat the Map in the ArcGIS API 4.0beta as a service when I can.

[gist id=0683005a8df89e28e706]

That's all there is to it. I don't know enough to walk you through all the details of building an Angular 2 app. Thanks to [Tom Wayson](https://twitter.com/tomwayson) for showing how you can modularize an Angular 2 component even further by inlining the styles, which is really cool.

[gist id=d490c1db98f8697dada5]

Although I just started to get my hands dirty with Angular 2, I am liking it quite a bit so far. I love the fact that the bulk of component work is done via [decorators](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript). _Love it_.

Being able to add directives and providers right into the decorator, you almost don't have to right any actual code... _almost_.

## Get busy

So with this bit of knowledge in hand, knowing how to load the ArcGIS JS API into SystemJS, you can easily start integrating into Angular 2.

I highly encourage you to give Angular 2 a try. I had issues with Angular 1, but so far I don't have the same complaints about Angular 2. I hope this gets you off on the right foot!
