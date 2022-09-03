---
layout: "../../layouts/BlogPost.astro"
title: "Leaflet.Control, transducers and es6"
published: true
author: Rene Rubalcava
pubDate: "2014-09-29"
---

## Hacking away

I haven't hacked away at using [Leaflet](http://leafletjs.com/) in a while, but I'm looking at doing some pretty extensive [Leaflet.Control](http://leafletjs.com/reference.html##icontrol) development down the line so I needed some practice. I also wanted to play around with [Transducer.js](https://github.com/jlongster/transducers.js) which is a JavaScript port of Clojure's Transducers. To learn more about Transducers, go watch [this video](https://youtu.be/6mTbuzafcII) by Rich Hickey at Strange Loop and swoon. Sample project I built [is here](https://github.com/odoe/leaflet-exp).

## Not production ready

Also because I love learning to use stuff I decided to try my hand at using [Immutable Data Collections](https://github.com/facebook/immutable-js) with Transducer.js. Although in this case, I'm not really taking advantage of Immutable in any way that I think I could justify at the moment. Plus, the trick shown [here](http://jlongster.com/Transducers.js--A-JavaScript-Library-for-Transformation-of-Data) to use Immutable with Transducers is finicky in my Chrome-unstable install, but is cherry in Firefox.

## ES6 and a Traceur love affair

I also decided pretty recently that I was going to write all my new JS with the latest ES6 features, including the [ES6 module loaders](http://guybedford.com/practical-workflows-for-es6-modules), yes even in my EsriJS Dojo apps, but that's probably for another blog post. So how can you accomplish this today? I've been using [Google's Traceur compiler](https://github.com/google/traceur-compiler), which covers a lot of features, even [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) if you include the traceur-runtime.js file in your app. I like it because is can use [ES6 fat arrow](https://coderwall.com/p/ikusla) functions, which is a feature I miss from when I was a big CoffeeScript guy (I wish we had a support group). [TypeScript](http://en.wikipedia.org/wiki/TypeScript##ECMAScript_6_support) also has some nice ES6 support, but not as much as Traceur. Although I've been meaning to give TypeScript another chance to adhere to some type safety, which can be important when you hand your code off to others.

## Get it gellin'

This was actually my first attempt to use Traceur with [Browserify](http://browserify.org/) and it worked great except for some issues with generating source maps using [gulpjs](http://gulpjs.com/). Uglify seems to strip them. It took quite of tweaking on my part, but I think I got my [gulpfile](https://github.com/odoe/leaflet-exp/blob/master/gulpfile.js) down so that it works correctly for me.

## All this talk and no code, wtf

So, when using Browserify commonjs modules, you typically would write them like this.

```js
module.exports = L;
var L = require('leaflet');
```

The ES6 equivalent looks like this.

```js
export default L;
import L from 'leaflet';
```

Easy right? Traceur will compile this to it's commonjs equivalent for you. One of the cool features of ES6 is the destructuring capabilities. This means you I can pull methods from transducers like this.

```js
var { sequence, compose, into, map, filter, take }= transducers;
```

## The fun stuff

The fun part of the autocomplete control is using Transducers to do the actual searching of the data. In order to do that, I made some support functions.

```js
var indexOf = (a, b) => a.indexOf(b);
var getName = get('NAME');
var getProps = get('properties');
var getPropName = kompose(getName, getProps);
var upper = (s) => s.toUpperCase();
};
// create a filter function to check if
// given name matches name in GeoJSON
var filtername = function(name) {
  return filter(x => upper(getPropName(x)) === upper(name));
};
// same as filter, but not an exact match
var fuzzyname = function(name) {
  return filter(x => indexOf(upper(getPropName(x)), upper(name)) > -1);
};
// check name composing fuzzy search and
// mapping the "properties" of a given GeoJSON
var getfuzzyname = function(name) {
  return compose(fuzzyname(name), map(getProps));
};
// create an anchor tag for each result
var makeListItem = function(x) {
  var a = L.DomUtil.create('a', 'list-group-item');
  a.href = '';
  a.setAttribute('data-result-name', getName(x));
  a.innerHTML = getName(x);
  return a;
};
```

With these support functions in place, you can start implementing them as needed. On each keydown event, search the Immutable.Vector based in key input and create a list of DOM elements to put in the autocomplete list by using Transducers.js take the first 10 results and append them to the list.

```js
var result = sequence(getfuzzyname(this._input.value), this.data);
var results = result.toJS();
this.resultElems = sequence(compose(take(10), map(makeListItem), map(x => {
  this._results.appendChild(x);
  L.DomEvent.addListener(x, 'click', this.itemSelected, this);
  return x;
})), results);
```

This happens pretty quickly, so I used [lodash.debounce](https://www.npmjs.org/package/lodash.debounce) to delay the events from happening. Then when an item from the list is selected, I can filter down the dataset of GeoJSON data to just a single item by using the _last()_ method of the result returned from Transducers.js. Since the source data was a result of _onEachFeature_ in [esri-leaflet](http://esri.github.io/esri-leaflet/api-reference/layers/feature-layer.html) FeatureLayer, I can just grab the _id_, search the layer for the feature and use the _getBounds()_ method to zoom the map. Saves me recalculating the bounds myself.

```js
var result = sequence(filtername(this._input.value), this.data);
var data = result.last();
if (data) {
  var feature = this.options.layer.getFeature(data.id);
  this._map.fitBounds(feature.getBounds());
}
```

The whole app still has a couple of bugs in when certain events fire, but overall it's working pretty nicely for an experiment.

I was also pleasantly surprised at how fast the search capabilities were. I don't have an JSPerf samples, but I have tried doing similar autocomplete tools in the past using client side features/GeoJSON as a source and have hit some hiccups before.

## Confusion, I mean conclusion

All in all, I had a lot of fun testing this stuff out. I'm really enjoying Transducers and I haven't even had a chance to try it out in Clojure yet. It's not quite production ready, but I'll be following it because looking at the [TODO](https://github.com/jlongster/transducers.js##todo) there could be some breaking changes. My next step is to try using [React](http://facebook.github.io/react/) in a Leaflet.Control to see how that might work out. I also learned in this testing that just about all the lodash methods are available as individual npm libraries, which is awesome as I don't really need the whole thing, just bits and pieces. So if you have an itch to try some new stuff, I say dive right in and give Transducers a shot, along with Immutable. Plus start trying to write your JS with ES6 standards, start small and work your way up. Before you know it, browser support for ES6 will blow up and you'll want to keep up with it.
