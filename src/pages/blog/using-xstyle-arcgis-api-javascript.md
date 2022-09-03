---
layout: "../../layouts/BlogPost.astro"
title: "Using xstyle with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: "2014-12-15"
tags: geodev
coverImage: "esri-xstyle.png"
---

Recently I have been toying around with a library called [xstyle](http://sitepen.github.io/xstyle/) that is maintained by the same guys that maintain the [Dojo Toolkit](http://www.sitepen.com/). At first glance, it may seem like another css preprocessor, similar to [Sass](http://sass-lang.com/) or [less](http://lesscss.org/), which are both great tools. However, once you dive in, it can do so much more.

#### Keeping it dynamic

If you've read my blog before, you know I'm a big fan of using Dojo to keep my code [modular](http://odoe.net/blog/embrace-your-modules/), even using [dynamic loading](http://odoe.net/blog/modularized-arcgis-js-overboard/). The first thing I had tried with xstyle was loading my css files dynamically. You can find some details [here](http://www.sitepen.com/blog/2014/07/02/dojo-faq-dynamically-loading-css/). But you can basically load the css only when needed when a module is loaded, like this.

[gist](https://gist.github.com/odoe/6d3dc6ec5df98f89f7d6)

This is great for working with modules that may or may not be used in your application. In my case however, this is a little less important to me because I use less and my build process will typically handle this, but that's not to say it doesn't come in handy. The aspect of xstyle that really got me excited was [building UI components](http://www.sitepen.com/blog/2013/09/17/building-ui-components-with-xstyle/) from css templates. Now that sounded like fun.

#### How xstyle nearly broke me

My first dive into trying xstyle components was a miserable failure, sort of. It worked when I used it in a standalone non-esri project, just to get my feet wet. As soon as I tried the same thing using the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript) the whole thing blew up. It was error after error with no luck at all. At this moment, the latest version of xstyle as **1.3.1**. The version that ships with ArcGIS JavaScript API is **0.1.3**. That's a big difference. I suspect it's because that it is the [minimum version used with dgrid](https://github.com/SitePen/dgrid/blob/342e344a92fe29f312937cb1fc780c4efb644451/bower.json). At this point, I had other things to finish up and xstyle fell off my radar, but not quite...

I couldn't get that nagging feeling out of the back of my head. I knew it worked standalone, I had seen it work outside the ArcGIS JavaScript API, so I had to keep trying. Every once in a while I'd go on a twitter rant about these trials and experiments, random errors. Even when I loaded the most recent build of xstyle into my ArcGIS API projects, I would get errors. I finally spent some time tracking it down to an odd error when using the _@import_ rule in my css. So I did what any good dev would do, I submitted a [pull request](https://github.com/kriszyp/xstyle/pull/35) and that fixed the issue enough for me to really get the party rolling.

#### Component abuse

Let's dive right in. I used [bower](http://bower.io/) to load xstyle [into my project](https://github.com/odoe/esri-xstyle/blob/master/bower.json). Here is what my bower.json looks like.

[gist](https://gist.github.com/odoe/3343c0049ce72b1cf9ca)

The next important step was to override the xstyle that ships with the ArcGIS JavaScript API. This can be done where you define your [dojoConfig](https://github.com/odoe/esri-xstyle/blob/master/app/js/run.js).

[gist](https://gist.github.com/odoe/816c0d18ca6f3ebbd594)

Next I have a [widget](https://github.com/odoe/esri-xstyle/blob/master/app/js/widgets/mywidget/mywidget.js) that doesn't really do much other than load the css and sets up a module used as the model for the component.

[gist](https://gist.github.com/odoe/7d33bc9ccda0d389c232)

Now, let's look at what the [css](https://github.com/odoe/esri-xstyle/blob/master/app/js/widgets/mywidget/css/mywidget.css) looks like.

[gist](https://gist.github.com/odoe/e4adb3bdca1b829f0403)

Here is a look at the [model](https://github.com/odoe/esri-xstyle/blob/master/app/js/widgets/mywidget/model.js) that does all the work.

[gist](https://gist.github.com/odoe/8aa12f4e68ca328b549c)

By using **model = module('widgets/mywidget/model');** in the css, you now have access to methods on the model. This is just a plain object with methods. You can't really initialize a constructor the way you do with dijit widgets. This is why I used [this widget](https://github.com/odoe/esri-xstyle/blob/master/app/js/widgets/mywidget/mywidget.js) to pass some parameters, including the **map** to the model. If you look at the css, you can see that we can bind a method of the model to the **keyup** event by using **on-keyup: model/updateValue(event)**. Then the **button** can bind the **click** event to another method by using **on-click: model/find()**. This find method fires off a [FindTask](https://developers.arcgis.com/javascript/jsapi/findtask-amd.html) and will zoom to a location. The search is configured for state names, so search for Texas or California.

This is just a quick rundown, you can find the whole [project on github](https://github.com/odoe/esri-xstyle).

#### Components rule, Dijits drool

Ok, slow down. xstyle is still fairly new and it's [not going to replace Dijits in Dojo 2.0](http://www.sitepen.com/blog/2013/08/29/goals-and-philosophy-of-xstyle/#comment-1027171401), but is a very interesting way of building components. I'm thinking this might be a great way to build _tiny_ widgets, something similar to the [LocateButton](https://developers.arcgis.com/javascript/jsapi/locatebutton-amd.html) or [HomeButton](https://developers.arcgis.com/javascript/jsapi/homebutton-amd.html). I'm still experimenting with it myself. I for one use simple buttons to activate more complex widgets all the time, so this could be a great way to build small reusable components in my applications.

I highly encourage you to give it a shot and experiment. If anything you may find just dynamically loading your css files with the accompanying widget to be well worth the effort.
