---
layout: "../../layouts/BlogPost.astro"
title: "Esri Developer Summit 2015: Day 2"
published: true
author: Rene Rubalcava
pubDate: "2015-03-12"
---

It was day 2 of Esri Developer Summit 2015 and it was a blast.

### Keynote

The keynote was by [John Tomizuka](http://www.taqtile.com/2016/) of [Taqtile](http://taqtile.com/) which was really refreshing I think for this crowd. It was great to see someone who works in the trenches of developing applications and being able to see what problems they tackle and how they solve them. Lots of great takeaways here on look at design and the development process.

### More JavaScript

I dove right in to more JavaScript sessions. I saw the session on the 3D capabilities coming to the API in the 4.0 release of the ArcGIS API for JavaScript. The best thing was to see that the API is moving away from [dojo/Evented](http://dojotoolkit.org/reference-guide/1.10/dojo/Evented.html) to [dojo/Stateful](http://dojotoolkit.org/reference-guide/1.10/dojo/Stateful.html) and [dojo/promise](http://dojotoolkit.org/reference-guide/1.10/dojo/promise.html) in developing modules in the API. This is really neat as it provides even more fine-grained control of acting upon changes in the application. The 3D stuff was really impressive too and it looks like even the 2D stuff will get a performance boost based on what they are doing. Vector Tiles man, it's good to see it coming to the Esri API.

I saw the Esri Leaflet intro session, which was great just to see how far those guys have come in developing that plugin. It's a fantastic project and I thoroughly enjoy using it when the opportunity arises. I'm glad to have helped write some tests early on in that project.

I saw [Patrick Arlt](https://twitter.com/patrickarlt) do a great [WAT](https://www.destroyallsoftware.com/talks/wat) inspired talk on the weird parts of JavaScipt. Patrick is a JS nerd after my own heart. And JS is definitely weird, although I think all developers are sadists in one form or another.

I did my [ES6 presentation](https://docs.google.com/presentation/d/1u1H9LAiOCfCod4L7QwGW-KoaW2hsOm-62bJJ03Q8Giw/edit?usp=sharing) as well, however there was some scheduling issues so I know people showed up at the wrong time and were told of the new new time than what was written. It was a handful of folks, but I _ES6'd their brains out_. I even busted out an easel and paper to talk about iterable generators.

After my talk I rushed over to the [cmv.io](http://cmv.io/) meetup in progress where I'm sure some folks that were going to see my presentation were at (we all have to make sacrifices). It was a great meetup, with a great update on the road to Dojo 2.0 by [Dylan](https://twitter.com/dylans), CEO of [Sitepen](http://www.sitepen.com/). He gave us a great update on things that were coming up, some insights into [Mayhem](https://github.com/SitePen/mayhem) which I will be hacking on this weekend, some TypeScript and even on how they are collaborating with other frameworks and libraries to make web development better in general. [Scott Davis said it best](https://twitter.com/ScottAGRC/status/575845515566297088), I think it was my favorite talk of the day. I would nominate Dylan as a keynote for DevSummit next year, so anyone reading this, make it happen.
