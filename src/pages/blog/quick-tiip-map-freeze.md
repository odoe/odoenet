---
layout: "../../layouts/BlogPost.astro"
title: "Quick Tip - Map Freeze"
published: true
author: Rene Rubalcava
pubDate: "2015-10-05"
tags: geodev
coverImage: "map-freeze.jpg"
---

Have you been working with a Map in your [ArcGIS JS API](https://developers.arcgis.com/javascript/) app and thought to yourself, _gee, it would be cool if I could make a nice print layout for my map_. And yeah, there is the [print widget](https://developers.arcgis.com/javascript/jssamples/widget_print.html) and the nifty print task on ArcGIS Server. But we've all struggled with this in one way or another _right?_ Wouldn't it be cool if you could just set up your app and map in such a way that you can just make a print friendly page in the browser? Well, you can get pretty close.

_I'm not going to blow smoke in your tailpipe_, this isn't a perfect solution, but it can help get you there.

The key factor is basically freezing the map state and removing the zoom tools and such. This can be accomplished pretty simply.

[gist](https://gist.github.com/odoe/9b7bdf3e510e72541893)

That method pretty much goes through the map and disables everything on the map. It also allows re-enabling all the same features.

You can see a sample of this in action here.

[JS Bin on jsbin.com](http://jsbin.com/luwowu/2/embed?js,output)

You'll of course need to set up your own CSS stylings for your particular use-case.

The key here is you can set up your map in a simple frozen state and just print from the browser.

So don't fret over printing to a service and such if you don't really need it. Make a print-safe page and go crazy!
