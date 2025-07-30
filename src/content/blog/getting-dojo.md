---

title: Getting your Dojo on
published: true
author: Rene Rubalcava
pubDate: 2015-01-26
tags: geodev, dojo
heroImage: '../../assets/blog/getting-dojo/images/dojo_toolkit.jpg'
description: Dojo however is just as it's name says. It's a toolkit, with a
  collection of modules that provide a lot of power to do just about anything
  you need with JavaScript development. Since Dojo has been around for so long,
  it has been run through the ringer in terms of browser and usability testing.
  Dojo also pioneered the idea of a module API for JavaScript applications. Dojo
  was fully ready to support the AMD loader and again, it's loader is battle
  tested.
---

[Dojo](http://dojotoolkit.org/) has been around for quite a long time, since
around 2004. Dojo is not an
[MV-something framework](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
in the same way as [Backbone](http://backbonejs.org/) or
[Angular](https://angularjs.org/). Although Dojo
[has all the bits to do so if you wanted to](http://dojotoolkit.org/documentation/tutorials/1.6/data_modeling/).

### Loader lover

Dojo however is just as it's name says. It's a toolkit, with a collection of
modules that provide a lot of power to do just about anything you need with
JavaScript development. Since Dojo has been around for so long, it has been run
through the ringer in terms of browser and usability testing. Dojo also
pioneered the idea of a
[module API for JavaScript applications](http://dojotoolkit.org/reference-guide/1.10/loader/).
Dojo was fully ready to support the
[AMD loader](https://github.com/amdjs/amdjs-api/wiki/AMD) and again, it's loader
is battle tested.

### Templates for life

You may get all excited to type **data-ng-controller="AppCtrl"** in your HTML
markup and have it magically bind to your JavaScript to save the world, but
again, Dojo was doing this a long time ago. The
[Dijit](http://dojotoolkit.org/reference-guide/1.10/dijit/) library is a way to
use Dojo to quickly build form-based applications. Dijit's have markup such as
**data-dojo-attach-event="click:doSomething"** and voila, your template is bound
to to your custom widget. You could even embed widgets with templates in your
widgets. Now that is some Inception nonsense right there. Here is a good write
up on
[how to build a custom widget](https://dojotoolkit.org/documentation/tutorials/1.7/recipes/custom_widget/).

### DOMination

A big complaint people make about Dojo is that it's not jQuery. Yeah, I don't
know what to tell you. jQuery is great and is widely adopted and has a great
simple API, but Dojo can do all that too. Dojo makes the bits more modular
though, so you have access to
[dojo/query](http://dojotoolkit.org/reference-guide/1.10/dojo/query.html),
[dojo/NodeList](http://dojotoolkit.org/reference-guide/1.10/dojo/NodeList.html)
and
[dojo/dom-construct](http://dojotoolkit.org/reference-guide/1.10/dojo/dom-construct.html)
among others that can handle tons of DOM manipulation.
[Dojo can even do animations if you want](http://dojotoolkit.org/reference-guide/1.7/quickstart/Animation.html).

### I Promise

Dojo even comes with a robust
[Promise](http://dojotoolkit.org/reference-guide/1.10/dojo/promise.html) library
that can make dealing with async tasks a breeze. You could wait for a single
Promise or what for a whole group of Promises, it doesn't matter, Dojo has it
all built in.

### An Event for every occasion

Dojo has always had some great utilities for event listening. The old way of
listening for events in Dojo was via
[dojo/connect](http://dojotoolkit.org/reference-guide/1.10/dojo/connect.html),
which worked awesome for it's time. Dojo also has a great module called
[dojo/aspect](http://dojotoolkit.org/reference-guide/1.10/dojo/aspect.html)
which has all kinds of neat tools like
[after](http://dojotoolkit.org/reference-guide/1.10/dojo/aspect.html#after),
[before](http://dojotoolkit.org/reference-guide/1.10/dojo/aspect.html#before),
and
[around](http://dojotoolkit.org/reference-guide/1.10/dojo/aspect.html#around).
Dojo also introduced a more familiar
[dojo/on](http://dojotoolkit.org/reference-guide/1.10/dojo/on.html) event
handling system to listen for DOM or custom events. Combined with
[dojo/Evented](http://dojotoolkit.org/reference-guide/1.10/dojo/Evented.html)
and you have an event handling toolkit that's tough to beat. On top of all that,
Dojo comes with a
[dojo/topic](http://dojotoolkit.org/reference-guide/1.10/dojo/topic.html) module
that provides
[pub-sub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
capabilities for your applications.

### Experimental

Dojo even has an entire area dedicated to experimental features called
[DojoX](http://dojotoolkit.org/reference-guide/1.10/dojox/). This area is
admittedly a crap shoot at times, but much of these modules have been thoroughly
tested such the
[Graphics and Effects](http://dojotoolkit.org/reference-guide/1.10/dojox/#id6)
section that has proven useful to me in the past.

### If you build it

A complaint about Dojo is that it's _too big_. A complaint about AMD is that too
many file downloads is a hindrance to browser performance. AMD modules are meant
to be built in some fashion to minimize these issues. You could use the
[Dojo build tools](http://dojotoolkit.org/documentation/tutorials/1.9/build/) to
optimize your applications and only load what you need in the most efficient way
possible. Granted, I don't have a happy history with Dojo builds, thanks to the
good folks at
[Utah AGRC](http://gis.utah.gov/the-esri-api-for-javascriptdojo-build-system-saga-continues/),
I can get something going now.

### References

Dojo gets a lot of complaints about the documentation and it's not unwarranted.
The [tutorials](http://dojotoolkit.org/documentation/) are a great place to
start and get familiar stuff. When you need a little more details, dig into the
[Reference guide](http://dojotoolkit.org/reference-guide/1.10/). If you need
nitty-gritty, the [API documentation](http://dojotoolkit.org/api/) might be the
place to look. Finally, if you really need to figure something out, go to the
[source](https://github.com/dojo/dojo), which I do on numerous occasions. Check
out the [Sitepen blog](http://www.sitepen.com/blog/) for some useful Dojo tips
as well. Pluralsight even has a course on
[Dojo Fundamentals](http://www.pluralsight.com/courses/dojo-fundamentals) that I
found to be a great starter.

### Don't listen to me

I'm just saying Dojo is a viable library. I use it extensively because of the
[ArcGIS JS](https://developers.arcgis.com/javascript/) stuff I do, so I'm real
comfortable with it, but I am also painfully aware of some it's pain points. It
usually boils down to you don't know what you don't know. For example, if you
didn't know about dojo/NodeList, you could get really frustrated trying to use
dojo/query for certain things. I don't tend to mix and match Dojo with other
libraries too often since I don't feel a need to and it is definitely not the
only library I use for _all_ my projects, but when it comes to doing
[ArcGIS Web Development](http://www.amazon.com/dp/1617291617/ref=as_sl_pc_tf_lc?tag=odoenet-20&camp=15309&creative=331441&linkCode=st1&creativeASIN=1617291617&adid=02GJ56NEN5QJAPC7V7DX&ref-refURL=http%3A%2F%2Fodoe.net%2Fblog%2F)
it's what's available, so it pays off to learn it well. All libraries have their
quirks, particularly JavaScript libraries.

You can also see this [neat talk](https://www.youtube.com/watch?v=BY0-AI1Sxy0)
from a couple of years ago called _Dojo already did that_.

At the end of the day, it's all just JavaScript. Whether you're using Dojo or
React or Ember, it's all
[just JavaScript man](https://github.com/getify/You-Dont-Know-JS).
