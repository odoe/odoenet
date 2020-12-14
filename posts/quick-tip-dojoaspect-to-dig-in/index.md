---
title: "Quick tip: dojo/aspect to dig in"
published: true
author: Rene Rubalcava
date: "2016-01-25"
tags: geodev
coverImage: "dojo-aspect.png"
---

When you use the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) you already have [Dojo](https://dojotoolkit.org/) and all it's capabilities available for you to use.

One of the more useful modules you may or may not use very much is [dojo/aspect](https://dojotoolkit.org/reference-guide/1.10/dojo/aspect.html). The dojo/aspect module is very interesting. It provides a lightweight mechanism for you to do [aspect-oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming) in JavaScript that you don't typically see with other libraries. That means you can add functionality to existing methods in your application fairly easily.

[David Walsh](https://davidwalsh.name/dojo-aspect) has a great little intro to dojo/aspect that is worth reading.

So how could you use this to your advantage in your ArcGIS JS API apps?

Well, if you combine it with say [dojo/has](https://dojotoolkit.org/reference-guide/1.10/dojo/has.html), you can add some fine-grained real time debugging tools into your application.

Let's assume you have an application that selects features from a FeatureLayer. You could do your debugging right in your application code or you can provide a runtime flag that will do it for you.

\[gist id=7134943d3916dbeca89f\]

Now you can set up some logic in your application to use dojo/aspect to monitor when that method is called and use it to provide logging in your application.

\[gist id=fb483f2c32a7a09ac2e5\]

In this case we are using _aspect.after_ to log the arguments sent to _featureLayer.selectFeatures_ after it has been called. You could do it before as well, if you wanted to manipulate the arguments sent to the method. Maybe you want to limit the number of ObjectIds requested. _This could make a good April Fools joke on someone_.

Here is a demo of this app.

[JS Bin on jsbin.com](http://jsbin.com/jowifa/2/embed?js,console,output)
<script src="http://static.jsbin.com/js/embed.min.js?3.35.9"></script>

You could even stick your nose in where maybe it doesn't belong and listen for when listeners are added to the document. I'll add that to the above sample just for fun.

[JS Bin on jsbin.com](http://jsbin.com/jowifa/3/embed?js,console,output)
<script src="http://static.jsbin.com/js/embed.min.js?3.35.9"></script>

As you can see, the dojo/aspect module could come in handy in plenty of ways.

Don't be afraid to get your hands dirty with it!
