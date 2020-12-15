---
title: "Clojurescript with Leaflet"
published: true
author: Rene Rubalcava
date: "2015-01-12"
tags: geodev
coverImage: "cljsleaflet.png"
---

Last week I talked about some testing I have been doing with [PureScript & Leaflet](http://odoe.net/blog/purescript-with-leaflet-experiments/). In that post I mentioned I had also been doing some testing with [ClojureScript](https://github.com/clojure/clojurescript).

If you are new to ClojureScript, it is a compiler for [Clojure](http://clojure.org/) to JavaScript. Clojure is a Lisp that works on the JVM and even the .NET CLR (although I have never used the CLR). To learn more about Clojure, I'd recommend [The Joy of Clojure](http://www.manning.com/fogus2/?a_aid=rrubalcava) and [Web Development with Clojure](https://pragprog.com/book/dswdcloj/web-development-with-clojure) which are two books I have found really helpful. I'm still a Clojure novice myself, but I have grown to really enjoy working with it.

There are some [differences between Clojure and ClojureScript](https://github.com/clojure/clojurescript/wiki/Differences-from-Clojure), but it's not a stretch to go from one to the other. [Here is a handy ClojureScript cheatsheet](http://cljs.info/cheatsheet/) and you can even try [ClojureScript in the browser](https://himera.herokuapp.com/index.html).

### All in one

Although not a requirement, I like to use Clojure to run my local development server. I use [Ring-Server](https://github.com/weavejester/ring-server) with [Compojure](https://github.com/weavejester/compojure) for routing. I won't go into detail on these, but I also use [hiccup](https://github.com/weavejester/hiccup) as my server-side HTML renderer. If you're familiar with other templating languages, it works pretty much the same way.

[gist id=1b0f0cef590ba96c5845]

Even if you don't know Clojure, you can probably make out the DOM structure fairly easily just by looking at the code above.

### On to the ClojureScript

ClojureScript provides methods to interact with native JavaScript that may take a little getting used to. There is the _aget_ method that can return the property from something and the _this-as_ macro which allows you to assign the _this_ value to something. [Macros](https://www.safaribooksonline.com/library/view/clojurescript-up-and/9781449327422/ch08.html) are a way to really power-up Clojure/ClojureScript and do neat things like [DSLs](https://pragprog.com/magazines/2011-07/growing-a-dsl-with-clojure). Accessing the properties of a JavaScript object may look odd as well. Say you wanted to access the esri extension of Leaflet. You would normally just do _L.esri_. In ClojureScript this looks like _(.-esri L)_. If there were no dash in there, ClojureScript would treat _esri_ as a method instead of a property. I like to set up a module in ClojureScript with some of these properties already defined, just to make it easier to put an app together. This is what the sample looks like.

[gist id=d2c4b0e6a0a35303f7ef]

You can think of _def_ as defining a variable, whereas _defn_ defines a function. Every Clojure/ClojureScript module gets a namesapce, hence the _ns_ in the above code. In ClojureScript this translates to a module that can be used by the [Google Closure](https://developers.google.com/closure/) compiler, which is what ClojureScript uses when it compiles to JavaScript. There are a lot of benefits to this that don't become readily apparent until you use some of the advanced optimization features. There are some other really neat optimizations ClojureScript does with JavaScript. I found this [JavaScript Jabber podcast](http://devchat.tv/js-jabber/107-jsj-clojurescript-om-with-david-nolen) to have insights into some of these optimizations.

So with that little helper module built, I can move on to putting things together.

[gist id=a299d07646ba97f13760]

I create a helper function to load the style for the features loaded to the map. The _clj->js_ macro translates a Clojure data structure to a JavaScript one. So _(clj->js { :name "Chuck" }_ translates this to a JavaScript object of _{ name: "Chuck" }_.

You can also see some syntax using _let_. This creates a local variable for the function. So _(let [d (js/Date)])_ would bind a new Date object to the local variable d, but it would only be good in that function. You can see it used in the code above to return the _map_ object from a couple of methods so that it could be passed around.

With helper functions defined, you can bring it all together in the init method, defined as _(defn ^:export init [\_] ...)_. This method is what is made available in the compiled JavaScript to start the application and was initialized in the _layout.clj_ we saw earlier. The rush is in the easy way to put these functions together to easily compose the app in a single line. **((comp bindPopup (partial fLayer opts) basemap loadMap))**. _comp_ is a method that allows you to compose multiple functions together. So in this example the result of _loadMap_ is passed into the _basemap_ method and so on. Clojure doesn't curry its methods, but you can use the _partial_ method to build a curried function like _(partial flayer ops)_ that won't complete until the the _map_ is passed to it.

### That looks like a lot of trouble

Clojure and ClojureScript may seem a bit jarring at first, but I have grown very fond of using parentheses and working with it over the past couple of years, even if it is only has a hobby language at this point. I'm not saying it's for everyone, but some of the underlying optimizations of ClojureScript were deemed so popular they've even made their way into their own [JavaScript libraries](https://github.com/swannodette/mori) so that anyone could use them in their apps. I've deployed a couple of simple viewers for internal stuff using this and I'm working on getting good enough to build more involved apps that can really take advantage of what ClojureScript has to offer. I'm sure the above code could probably be improved, but I'll tweak it as I learn more.

You can find all the code for this sample [on github](https://github.com/odoe/esrileaflet-clj). I even dabbled with using [Mapbox](https://www.mapbox.com/) with ClojureScript in [this example](https://github.com/odoe/mapbox-clj) a while ago. I'm a big fan of giving different languages a try and gaining new perspectives in my development, and I encourage you to do the same as well.
