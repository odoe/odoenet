---
title: "Using RxJS with the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2015-05-18"
tags: geodev
coverImage: "esri-rxjs.png"
---

A while back I did a [blog post](http://odoe.net/blog/some-fun-with-esri-js-api-and-rxjs/) on using [RxJS](https://github.com/Reactive-Extensions/RxJS) with the ArcGIS API for JavaScript. I've also been pretty interested in [using Flux architecture](http://odoe.net/blog/dojo-flux-lite/) to build my apps, even non-React apps. Recently I was reading [this blog post](http://qiita.com/kimagure/items/22cf4bb2a967fcba376e) that discusses the authors frustrations with Flux and his move to using RxJS instead.

_So of course, I had to try it out._

I don't have many issues when using the Flux architecture as the author does, I suspect because using [dojo/topic](http://dojotoolkit.org/reference-guide/1.10/dojo/topic.html) and [dbind](https://github.com/kriszyp/dbind) alleviate some of those issues. Or maybe I just haven't built a large enough app.

Either way, I'm always game to try something new and I'm a fan of RxJS anyway. So I took the sample from my Dojo-Flux demo and updated it with RxJS. This meant there was no more need for dojo/topic and unfortunately, I couldn't really get dbind to play nicely with RxJS subscribe method, at least not in a meaningful way, so I just did away with it.

### Good intentions

The first thing we want to do is create an Intent. \[gist id=9ba2868979a027abcc22\]

This sort of takes the place of using dojo/topic. It has it's own [Subject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/subjects.md) that can be subscribed to. In this case, an [Action](https://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html) can pass an update to the Intent and the subject will pass the update into the flow of data.

Then I can make a dead simple action that isn't much different from when it used dojo/topic. \[gist id=5316a00a2afd87f2fd35\]

### Open the Store

Before the Store used [dojo/Stateful](http://dojotoolkit.org/reference-guide/1.10/dojo/Stateful.html) to watch for updates, but now we can just use a plain object, subscribe to updates from the Intent and pass those updates via another Subject. \[gist id=d7ce67f7ebd06f949dbb\]

As you can see here, using the Subject again, we can kind of mock up the Store to pass through updates in state through the application. I'm not really adding any error checking/handling in these steps, but it would probably be prudent to handle that in the Store to prevent bad data from getting by.

### Up to the View

At this point, the View only needs to know about updates to the Store, so we can subscribe to changes in the store and update the DOM as needed. \[gist id=bf22f0ffffae42f488c0\]

This is the portion where I was disappointed I couldn't get dbind working correctly. There might be a way to bind to a subscription update, but I couldn't quite figure it out.

### Reactively Interesting

I'm not an expert in RxJS, nor am I well versed in reactive programming in general. I would say I'm novice at best, but I do think some of these methods are very interesting and I do like some of the other features of RxJS when it comes to streams of data and transformations. I'll keep playing with this and see if I can find some other useful to share, but I am totally open to hear about how others might be using it in their ArcGIS API for JavaScript development.

You can find the repo for this demo [here](https://github.com/odoe/esrijs-rxjs).
