---
title: "Use ES2015 with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2015-06-01"
tags: geodev
coverImage: "es6-geo-500.jpg"
---

At the most recent Esri Developer Summit, I did a presentation on using [ES6 for ArcGIS JavaScript development](http://video.esri.com/watch/4533/enjoy-some-es6-in-your-js-apps-today). ES6 is now referred to as ES2015, but I'm still not use to calling it that. I realized recently that I had not really discussed ES6 other than using it with a [Leaflet project](http://odoe.net/blog/leaflet-control-transducers-and-es6/). So today, I thought I would walk through how to convert an existing application to ES6/ES2015 and how you can transpile your code on the fly to ES5 so that it runs in your browser.

## Build tools

[ES6 standards](http://tc39wiki.calculist.org/es6/) are not yet finalized, so browser support is still up in the air. [Firefox supports some features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla) and even [Chrome has some limited support](http://stackoverflow.com/questions/24008366/using-ecmascript-6). This is why tools like [Babel](https://babeljs.io/) are so popular. Babel will convert your ES6 code to ES5 compatible JavaScript that will work in modern browsers today. This means your code base will be ready for when ES6 is universally supported. But let's be honest, how much of the code that you write today do you expect to support until ES6 is in all browsers. What we really want is to get all the practice we can in writing ES6 so we are fully prepared for when it is ubiquitous across all browsers. It's all about _keeping up._

I'd suggest using [gulp](http://gulpjs.com/) as a build tool for its simplicity in setting it up, but you could also use [Grunt](http://gruntjs.com/) or any other build tool you'd like. We'll set up these build tools later. I'm going to take an [existing project](https://github.com/odoe/esrijs-flux) and convert it to ES6, then when that's done, use gulp with babel to convert it to ES5.

## Import you heart out

One of the neat features of ES6 is the support for modular JavaScript files. You can now _import_ files into other files, similar to CommonJS or AMD modules, but built into the browser. Let's start with a simple one.

[gist](https://gist.github.com/odoe/3285fd37ec5405599cf6)

You should be able to follow along pretty easily here with what it is happening. Instead of using the _define_ method to bring in external modules, you use the _import_ keyword to designate the modules. When you use babel to transpile to ES5 there will be an option to turn this into an AMD module and it will use the _deifne_ method in its output. That's right, you can transpile your ES6 to commonjs _require_ style or AMD _define_ style. We'll get to that later. Let's look at another one.

[gist](https://gist.github.com/odoe/df387a13305b01207958)

There's a couple of things happening here. First is that instead of returning the module, we are using the syntax _export default_, which means you are exporting the default method or object from this module. This is how you can make your module available to be _import_ed by other modules. You can read more about this module behavior [here](http://24ways.org/2014/javascript-modules-the-es6-way/). Also notice how for _postCreate()_, we didn't have to use the _function_ keyword. This is a little syntactic sugar in ES6 that works for functions that are part of classes or objects.

Speaking of classes...

[gist](https://gist.github.com/odoe/df4961f7eed6921369b8)

In this case, we are now using an ES6 _class_. Don't worry, for all intents and purposes, JavaScript is still a [prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) language, but classes were introduced in ES6 to simplify some behavior... I think. So instead of using _dojo/\_base/declare_ to define our module, we just use a _class_ that extends _Stateful_ and we can use the _constructor_ method to set up our default properties. Notice the use of _super()_ here. Since we are _this_ in the constructor to _set_ the defaults, we need to call the constructor of the class we are extending, you do this via the _super_ method. You can read more about classes [here](http://www.2ality.com/2015/02/es6-classes-final.html).

I won't go over all the module changes here, but you can check out the [full project on github](https://github.com/odoe/esrijs-flux).

## Take a gulp

Let's set up a simple _gulpfile_ to handle the transpiling of your JavaScript code for you.

[gist](https://gist.github.com/odoe/aa9ae872624d49015000)

What this gulpfile is doing is using the JavaScript files in the _src_ directory, running them through _babel_ with the parameters designating you want _amd_ output. That's right, you can write your code in ES6/ES2015 and output to either AMD or CommonJS, whichever works for you, but in our case using Dojo, we want AMD. I also added a task to copy widget template files to the _dist_ directory. This is a basic setup, but it's a good start to writing your code in modern ES2015 today. There is even a _watch_ task that will monitor your code and do the transpile as you save changes to your code.

## Get coding

There's a whole lot more to ES6/ES2105 than what I covered here. You can find more resources in the links in [my presentation slides](https://docs.google.com/presentation/d/1u1H9LAiOCfCod4L7QwGW-KoaW2hsOm-62bJJ03Q8Giw/edit#slide=id.g754626497_038). Babel provides some [great info](https://babeljs.io/docs/learn-es2015/) as well.

Don't be afraid to start using ES6/ES2015 for your ArcGIS JavaScript development today. There's no point in really putting it off as it will be available soon enough (at least by end of 2015 if things stay on track). Go forth and code.
