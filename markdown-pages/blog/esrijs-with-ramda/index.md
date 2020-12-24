---
title: "EsriJS with Ramda"
published: true
author: Rene Rubalcava
date: "2015-03-30"
tags: geodev
coverImage: "esri-ramda.png"
---

When you start looking into what the latest JavaScript craze is, chances are you will end up at [TodoMVC](http://todomvc.com/) and twirl your handlebar mustache or stroke your beard. It's a decent enough sample that developers can use to see how a framework functions. Not everyone may agree with it, but as a quick snapshot of how something can be done, it's a good resource.

I've found while working with different frameworks or utility libraries that using [Leaflet](http://leafletjs.com/) with an autocomplete search tool gives me a fairly good idea of how to use the library to get this simple task done. I've done this sample before with [raw Leaflet](http://odoe.net/blog/custom-leaflet-control/) and when [testing out transducers](http://odoe.net/blog/leaflet-control-transducers-and-es6/). This basic test has a lot to it, searching, DOM events, DOM manipulation and more. It's a pretty good measure for me personally to try stuff out.

### Grab the Ramda by the horns

One library I've become a big fan of this past few months has been [Ramda](http://ramdajs.com/). You could think of Ramda like [underscore](http://underscorejs.org/) or [lodash](https://lodash.com/). Ramda however focuses on the ease of composing methods in a functional manner. This means the parameters are in the correct order to do currying. If I had one wish about Ramda it would be that partial builds were published via bower or npm. You can still do these partial builds on your own, but I'm just thinking in terms of selfish laziness.

So let's dive right into some ES6 code for the actual widget. [gist](https://gist.github.com/odoe/6e5a33645282ade9dd93)

So there is a lot going on here, but I was pretty much able to take the [Leaflet-Ramda](https://github.com/odoe/leaflet-ramda) sample I had done a while ago and tweak it for the ArcGIS API for JavaScript.

You can notice at the top of the file, after the **import** statements, I declare some methods that are used throughout the application. Part of the reason you can do this is that all the Ramda methods are automatically [curried](http://www.crockford.com/javascript/www_svendtofte_com/code/curried_javascript/index.html). This makes it very easy to compose functions and start to build a story for the application. A lot of this composition happens in the _onKeyUp_ method, where you can map over the first ten results of the search, convert them to list items and then add them to the DOM with event listeners.

Aside from the Ramda bits, you may notice that there is nothing really special that needs to be done with the Dojo/Dijit bits. Everything simply works as expected. When you think about the steps needed to make an AutoComplete search tool, there's a lot going on. You have to search for features, find some matching results (_Do you want exact spelling? Do you care about matching case?_), convert results to DOM elements, attach DOM elements, manage event listeners, find the exact match and zoom to matches. Ramda has all the functionality you need to do a good chunk of that, and the rest can be handled by whatever library you want to use, be it Leaflet or the ArcGIS API for JavaScript.

### To the source

You can find the whole project [on github](https://github.com/odoe/esrijs-ramda). This project also gives you a good idea on how you might use [gulp](http://gulpjs.com/) and [babel](https://babeljs.io/) to write your ArcGIS API for JavaScript apps in ES6 and compile them into something your browser of choice will understand.

So give Ramda a shot and try composing the story for your application. If the functional goodness of Ramda gives you a nice warm fuzzy feeling, check out [pointfree-fantasy](https://github.com/DrBoolean/pointfree-fantasy) to get your fix.
