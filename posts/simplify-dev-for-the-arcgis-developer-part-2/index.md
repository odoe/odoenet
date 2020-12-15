---
title: "Simplify dev (for the ArcGIS developer): Part 2"
published: true
author: Rene Rubalcava
date: "2012-02-29"
---

In [part 1](http://odoe.net/blog/?p=200) of this series, I told you to abolish your IDE and take up the torch of the text editor. Now I'm going to challenge you to burn your code to the ground. Ok, not quite...

### Simplify your code

I'll make this real simple. A lot of people [hate JavaScript](http://www.quora.com/Why-do-so-many-people-seem-to-hate-JavaScript) for various reasons. Mostly because it's too damn flexible for their liking. That's also it's greatest strength. **Update (Dec, 2012): I have since changed my personal stance on CoffeeScript. I still enjoy writing CoffeeScript for my personal projects. However, I have found that when working in a team environment, it is not always the best choice. Your team may not know CoffeeScript, may not want to learn it or don't have the time to learn it. They may just need to do simple integration and maintenance, so there is no need to add an extra layer of abstraction to their workload. I still think CoffeeScript has its merits, but it is no longer _for me_.** So today, I'm going to encourage you to stop writing JavaScript. Just stop it, forget it, move on to something else. Move on to [CoffeeScript](http://coffeescript.org/). People that love Ruby, love CoffeeScript. I say that features that make Ruby so appealing are what should attract you to CoffeeScript. There is no "var" in CoffeeScript, nor is there any semicolons or excessive brackets. I enjoy the readability and I can just get my ideas across faster when writing in CoffeeScript. And CoffeeScript compiles to JavaScript that is probably better than you would normally write on your own. I'm not going to teach you [how to write](http://sixrevisions.com/javascript/coffeescript-basics/) CoffeeScript, there are [much better](http://www.amazon.com/gp/product/1934356786/ref=as_li_ss_tl?ie=UTF8&tag=odoenet-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1934356786) [resources](http://www.amazon.com/gp/product/1449321054/ref=as_li_ss_tl?ie=UTF8&tag=odoenet-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1449321054) [for that](http://net.tutsplus.com/tutorials/javascript-ajax/rocking-out-with-coffeescript/). I am going to show you an example of a simple mapping application written using CoffeeScript and the ArcGIS JavaScript API.

### Getting Started

To install CoffeeScript, you're going to need to install Node.js. If you're on Linux or a Mac, you have an easy path ahead of you, you probably already have both installed. If you're on Windows, there is now a Windows installer for Node.js with npm. You might still run across some issues, but I have high hopes.

For this example, we're going to stay basic and use a sample from the ArcGIS JavaScript API samples pages. To make it interesting, we'll use the [Identify with Popup sample](http://help.arcgis.com/EN/webapi/javascript/arcgis/help/jssamples/find_popup.html). The sample is pretty straightforward and shows the basics of how you would initialize your map and use a task, in this case IdentifyTask to perform some action. First off, part of the issue I have seen a lot on the forums and with beginners to the ArcGIS JavaScript API, is they will take these samples as-is and try to build production apps from them. They're _samples_. When you find your users requesting new features or changes, you're going to find yourself in the deep end when you try to integrate functionality from other samples into your now production application. Step back, review them, learn them, let them soak in.

### Stop putting code in your markup

Now, I'm going to show you the first step to making your application simpler and easier to maintain. Separate your JavaScript from your HTML. To quote Tony Stark, "_That's how Dad did it, that's how America does it, and it's worked out pretty well so far_." This follows a basic philosophy I picked up when first treading into web development waters. _HTML is markup, CSS is style, and JavaScript is function, never shall the three ever meet_. That's not really strict, as your code will mingle and fiddle with your DOM and styles all the time, but when you are starting your application, this is a pretty good starting point. So first off, take the JavaScript out of the HTML, save it in a file called main.js or app.js, there is no strict rules here. Refer to it like any other file.

[cce lang="html"]<script type="text/javascript" src="javascripts/main.js"></script>[/cce]

That's step one. In a later posting, I'll discuss on further simplifying the separation of your markup from your style and code. Now, I'm just going to throw this out there to get things going. Here is the CoffeeScript version of the JavaScript code in the sample we are working with. [cce lang="ruby"] dojo.require "dijit.layout.BorderContainer" dojo.require "dijit.layout.ContentPane" dojo.require "esri.map" dojo.require "esri.dijit.Popup"

dojo.addOnLoad -> initExtent = new esri.geometry.Extent xmin: -9270392 ymin: 5247043 xmax: -9269914 ymax: 5247401 spatialReference: wkid: 102100 lineColor = new dojo.Color [255,0,0] fillColor = new dojo.Color [255,255,0,0.25] lineSymbol = new esri.symbol.SimpleLineSymbol esri.symbol.SimpleLineSymbol.STYLE\_SOLID, lineColor, 2 fill = new esri.symbol.SimpleFillSymbol esri.symbol.SimpleFillSymbol.STYLE\_SOLID, lineSymbol, fillColor popup = new esri.dijit.Popup { fillSymbol: fill }, dojo.create "div"

map = new esri.Map "map", infoWindow: popup extent: initExtent

basemap = new esri.layers.ArcGISDynamicMapServiceLayer "http://server.arcgisonline.com/ArcGIS/rest/services/World\_Imagery/MapServer" map.addLayer basemap

landBaseLayer = new esri.layers.ArcGISDynamicMapServiceLayer "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer", opacity: 0.55 map.addLayer landBaseLayer

dojo.connect map, "onLoad", (\_map\_) -> identifyTask = new esri.tasks.IdentifyTask "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer" identifyParams = new esri.tasks.IdentifyParameters() identifyParams.tolerance = 3 identifyParams.returnGeometry = true identifyParams.layerIds = [0, 2] identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER\_OPTION\_ALL identifyParams.width = \_map\_.width identifyParams.height = \_map\_.height

dojo.connect \_map\_, "onClick", (evt) -> identifyParams.geometry = evt.mapPoint identifyParams.mapExtent = \_map\_.extent

deferred = identifyTask.execute identifyParams deferred.addCallback (response) -> dojo.map response, (result) -> feature = result.feature feature.attributes.layerName = result.layerName if result.layerName is "Tax Parcels" then feature.setInfoTemplate new esri.InfoTemplate "","${Postal Address}  
Owner of record: ${First Owner Name}" else if result.layerName is "Building Footprints" then feature.setInfoTemplate new esri.InfoTemplate "", "Parcel ID: ${PARCELID}" feature \_map\_.infoWindow.setFeatures [ deferred ] \_map\_.infoWindow.show evt.mapPoint

dojo.connect dijit.byId("map"), "resize", \_map\_, \_map\_.resize [/cce]

Now take a second to review that and see if you can follow it. First thing you may notice is the lack of parentheses or brackets. it might seem a little off at first, but the readability is greatly increased. Whitespace is king.

### Would you like some sugar with that?

The main thing to remember when writing CoffeeScript is that to write a function, you write the following to define a function. [cce lang="ruby"](value) ->[/cce] This interprets to a JavaScript function. [cce lang="javascript]function(value) {}[/cce]

Once you get that basic down, you're most of the way there. Another idiom of CoffeeScript that differs slightly from JavaScript is the form [cce lang="ruby"]if something is mything then do yourthing[/cce] You'll see bits of this kind of syntactic sugar throughout CoffeeScript. It does exactly what it says in plain english. Simple and elegant.

Let's look at another interesting line having to do with executing a method. [cce lang="ruby"]lineColor = new dojo.Color [255,0,0][/cce] You get the idea of what is happening, but where are the parentheses? You don't need them. You know you're calling a method, the CoffeeScript compiler knows you're intention, so it's not needed. The equivalent JavaScript is below. [cce lang="javascript"]lineColor = new dojo.Color([255,0,0])[/cce] The parentheses are nothing more than a visual cue to the user, but eliminating them makes for simpler code. I would suggest you read some CoffeeScript tutorials to get familiar with the lack of parentheses. There are some caveats where if you do chaining of methods like you might with jQuery, then you will need to use parentheses. [cce lang="ruby"]$(".help").click (evt) -> console.log 'clicked'[/cce] Or when you need to just call a method with no parameters. [cce lang="ruby"]query = new esri.tasks.Query()[/cce]

Another bit of syntactic sugar of CoffeeScript is in defining objects. You don't need brackets, you just need white space. [cce lang="ruby"] initExtent = new esri.geometry.Extent xmin: -9270392 ymin: 5247043 xmax: -9269914 ymax: 5247401 spatialReference: wkid: 102100 [/cce]

The above CoffeeScript code is equivalent to the following JavaScript code. [cce lang="JavaScript"] var initExtent; initExtent = new esri.geometry.Extent({ xmin: -9270392, ymin: 5247043, xmax: -9269914, ymax: 5247401, spatialReference: { wkid: 102100 } }); [/cce]

There is much more syntactic sugar and CoffeeScript goodness that I won't go over. I'd suggest some tutorials of a book to get the most out of it. I just wanted to introduce some simple ways of simplifying your "busy" JavaScript with simplistic, yet effective CoffeeScript.

### Sweet coffee to bitter joe

You might be asking yourself what to do with this awesome CoffeeScript file. After all, you can't very well just use that in your application. If you installed Node.js and CoffeeScript properly, you should be able to use this command [cce lang="c"]coffee --compile main.coffee[/cce] This will produce a main.js file. You can review the output below. [cce lang="javascript"]

dojo.require("dijit.layout.BorderContainer");

dojo.require("dijit.layout.ContentPane");

dojo.require("esri.map");

dojo.require("esri.dijit.Popup");

dojo.addOnLoad(function() { var basemap, fill, fillColor, initExtent, landBaseLayer, lineColor, lineSymbol, map, popup; initExtent = new esri.geometry.Extent({ xmin: -9270392, ymin: 5247043, xmax: -9269914, ymax: 5247401, spatialReference: { wkid: 102100 } }); lineColor = new dojo.Color([255, 0, 0]); fillColor = new dojo.Color([255, 255, 0, 0.25]); lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE\_SOLID, lineColor, 2); fill = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE\_SOLID, lineSymbol, fillColor); popup = new esri.dijit.Popup({ fillSymbol: fill }, dojo.create("div")); map = new esri.Map("map", { infoWindow: popup, extent: initExtent }); basemap = new esri.layers.ArcGISDynamicMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World\_Imagery/MapServer"); map.addLayer(basemap); landBaseLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer", { opacity: 0.55 }); map.addLayer(landBaseLayer); return dojo.connect(map, "onLoad", function(\_map\_) { var identifyParams, identifyTask; identifyTask = new esri.tasks.IdentifyTask("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer"); identifyParams = new esri.tasks.IdentifyParameters(); identifyParams.tolerance = 3; identifyParams.returnGeometry = true; identifyParams.layerIds = [0, 2]; identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER\_OPTION\_ALL; identifyParams.width = \_map\_.width; identifyParams.height = \_map\_.height; dojo.connect(\_map\_, "onClick", function(evt) { var deferred; identifyParams.geometry = evt.mapPoint; identifyParams.mapExtent = \_map\_.extent; deferred = identifyTask.execute(identifyParams); deferred.addCallback(function(response) { return dojo.map(response, function(result) { var feature; feature = result.feature; feature.attributes.layerName = result.layerName; if (result.layerName === "Tax Parcels") { feature.setInfoTemplate(new esri.InfoTemplate("", "${Postal Address}  
Owner of record: ${First Owner Name}")); } else if (result.layerName === "Building Footprints") { feature.setInfoTemplate(new esri.InfoTemplate("", "Parcel ID: ${PARCELID}")); } return feature; }); }); \_map\_.infoWindow.setFeatures([deferred]); return \_map\_.infoWindow.show(evt.mapPoint); }); return dojo.connect(dijit.byId("map"), "resize", \_map\_, \_map\_.resize); }); }); [/cce]

Also, the source code for this sample can be found [here](https://github.com/odoe/SimplifyDev-part2-sample).

By the way, [Net.tuts+](http://net.tutsplus.com/tutorials/javascript-ajax/rocking-out-with-coffeescript/) has a great little intro to CoffeeScript that I would recommend, along with the draft of the [Little Book on CoffeeScript](http://arcturo.github.com/library/coffeescript/index.html) which is a great primer. I would also highly recommend picking up the [published copy](http://www.amazon.com/gp/product/1449321054/ref=as_li_ss_tl?ie=UTF8&tag=odoenet-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1449321054). Another great resource to play with is [js2coffee.org](http://js2coffee.org/).

### The brew of heavens cafe

Phew, that might be quite a bit to take in. After all that, you might be asking yourself why you would even bother with CoffeeScript. I would argue that CoffeeScript provides a simpler approach to writing solid JavaScript. It's not as apparent in this simple example, but many times it can obfuscate some tricky JavaScript funkiness, as in dealing with the "this" keyword in some callback methods. You can also declare [classes](http://coffeescript.org/#classes) in CoffeeScript like so. [cce lang="ruby"] Class MyLayerUtil constructor: (@lyrs) -> allUrls: -> urls = (lyr.url for lyr in @lyrs) [/cce]

I don't know about you, but I think that's pretty nice and clean. CoffeeScript is still fairly new, but there is a great community of developers using it everyday. It's included in Rails 3.x, so it's not exactly a "not ready for production" tool. People are using it and loving it.

In the next posting, I'm going to cover some more interesting tools to help you simplify your web development workflow. I'll go over how to simplify your markup and style.
