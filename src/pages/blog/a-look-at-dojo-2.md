---
layout: "../../layouts/BlogPost.astro"
title: "A look at Dojo 2"
published: true
author: Rene Rubalcava
pubDate: "2017-04-05"
tags: geodev, dojo, typescript
coverImage: "lookatdojo2.png"
---

I like Dojo. It's a solid toolkit that's been around a long time.

I've had my share of hair-pulling when it comes to integrating Dojo with other JavaScript tooling like SystemJS and Webpack, each time finding some sort of workaround. And yeah, Dijit is getting a little long in the tooth. _Long in the tooth._ What the hell does that even mean?

Anyway, I've been patiently awaiting a release of Dojo 2 for quite a while now and it looks like we are getting closer than ever to that moment. The core Dojo 2 packages are now in [beta1](https://github.com/dojo/meta) and they have a [new site up](http://dojo.io/) with a groovy new logo.

At one point, I had decided to try out the new [dojo-cli](https://github.com/dojo/cli), although back then it didn't do anything, at least I couldn't get it to work. _But_ that has recently changed, as the cli can now scaffold a basic Dojo 2 application with widgets and everything. You can get all the _deets_ on getting started with Dojo 2 in the new [tutorial pages](http://dojo.io/tutorials/). I wonder if they are just going to call it Dojo and refer to Dojo 1 as _Dojo 1_, kind of how Angular is doing? _naming things is hard_

In this video, I take a quick look at the new site and some info on the current [roadmap](https://github.com/dojo/meta/wiki/Roadmap). I fumble around with the cli as I try to build an app with an old version of the cli tools (I do upgrade during the video), but we get everything up and running. And of course, I have to integrate the ArcGIS API 4 for JavaScript with the [esri-loader](https://github.com/tomwayson/esri-loader).

I'm excited for what Dojo 2 brings to the table in application design. I'm excited that it's all in TypeScript and that it includes some neat toys like typed CSS and theming. I look forward to a solid 1.0 release!

<iframe width="560" height="315" src="https://www.youtube.com/embed/UmOg7scsREI" frameborder="0" allowfullscreen></iframe>
