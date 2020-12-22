---
title: "ArcGIS JS API 4.0 beta1 Accessors"
published: true
author: Rene Rubalcava
date: "2015-07-17"
tags: geodev
coverImage: "js-piece.jpg"
---

Ok, so technically the ArcGIS API for JavaScript 4.0beta1 isn't a final product, but it has some really nice features that users and developers should really enjoy and be excited about. **Yeah yeah, 3D, cool and all** and I'm sure you'll hear plenty about it. But I want to talk more bare metal. I want to talk about [ES5 Accessors](http://ejohn.org/blog/ecmascript-5-objects-and-properties/) in the API. This is the good stuff folks.

## What the what?

You can go ahead and read some details about [Accessors](http://javascriptplayground.com/blog/2013/12/es5-getters-setters/) out there and the 4.0beta1 [doc here](https://developers.arcgis.com/javascript/beta/api-reference/esri-core-Accessor.html) and the [guide here](https://developers.arcgis.com/javascript/beta/guide/working-with-props/).

But let's show what you can basically do!

```
view.watch('extent', function(newValue) {/**/});
```

_Is that an event or what?_ No, these are not events these are observable Objects, this is kind of like some syntactical sugar or [Object.observe()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe).

```js
Object.observe(view, function(changes) {
  var newValue = changes.filter(function(x) {
    return x.name === 'extent';
  }).shift();
});
```

I don't know about you, but the former method is a lot cleaner to me. Does that mean there are no more events in the API? Not at all, there's events, there's more [Promises](https://developers.arcgis.com/javascript/beta/guide/working-with-promises/), which I have [written about before](https://geonet.esri.com/people/odoe/blog/2015/06/17/keeping-promises). What this does mean, is you can use Accessors to watch for property changes and act upon them. This is much more fine-grained than simply listening for some events to happen.

Let's say you want to run a count on the number of features in your extent as the map is panned around. Normally you may listen for the extent to change and then run a query against a service, which is cool and all, but the extent changes every time you slightly pan the map, so that's an awful lot of queries to try and do. Better yet, you can watch for when [view.stationary](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-View.html#stationary) is updated to either true or false. So you can do something like this:

```js
query.watch('geometry', function() {
  queryTask.executeForCount(query).then(function(results) {
    // do something with results
  });
});
view.watch('stationary', function(val) {
  if (val) {
    query.geometry = view.extent;
  } else {
    // message about map panning
  }
});
```

_Woah woah!_ The Query is an Accessor too? That's right, Accessors are all over the place. But wait a second, I don't like having to do that boolean check when the **stationary** property changes. There's a util for that, **[esri/core/watchUtils](https://developers.arcgis.com/javascript/beta/api-reference/esri-core-watchUtils.html)**. This has some nifty little helpers for watching property changes, but the ones I'm interested in are boolean helpers.

```js
watchUtils.whenTrue(view, 'stationary', function() {
  query.geometry = view.extent;
});
watchUtils.whenFalse(view, 'stationary', function() {
  // message about map panning
});
```

Now that is pretty cool. You can see the full sample below. [Accessors on jsbin.com](http://jsbin.com/perovey/2/embed?html,js,output)


## That looks like Stateful

_I know, right?_ At first glance it might look like you are dealing with [dojo/Stateful](http://dojotoolkit.org/reference-guide/1.10/dojo/Stateful.html). But the main differences are in the API. With Stateful when you are watching for changes, the callback signature on a changed property looks like this:

```js
function(name, oldValue, value){}
```

The new value returned is the third argument in. You know how I write this in my apps?

```js
function(a, b, value){}
```

Because the new value is all I care about.

There's also setters. In Stateful you do this:

```js
myObj.set('prop', newValue);
```

With Accessors, you can just do this:

```js
myObj.prop = newValue;
```

_Bam, magic!_

I would actually say that Accessors are closer to [dmodel](https://github.com/SitePen/dmodel) than Stateful. Because you can have computed properties with Accessors. The Accessor module is a mixin that can be used with [dojo/\_base/declare](http://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html). So you could do something like this:

```js
var Model = declare([Accessor], {
  classMetadata: {
    properties: {
      fullName: {
          dependsOn: ['firstName', 'lastName'],
          readOnly: true
      }
    }
  },
  _fullNameGetter: function() {
    return this.fullName + ' ' + this.lastName;
  }
});
```

What we have here is a model that uses the Accessor mixin and sets up a couple of properties. Then we have a _readOnly_ computed property that depends on other properties. Now imagine you did this with your application using attribute data from a FeatureService and you could define some computed properties to easily display. That is pretty damn cool.

## More benefits

So we've seen how Accessors are pretty useful to monitor the state of your application. Well, when I think of stateful applications, I think of [React](https://facebook.github.io/react/). How useful would Accessors be for someone that wants to incorporate the ArcGIS API for JavaScript into a React application. Well, why don't we take a look!

Here is a very simple React component that will display the time of day of the environment in the Scene of your application.

```js
var TimeClock = React.createClass({
  getInitialState: function() {
    // Define an initial state
    return {
      published: true
author: Rene Rubalcava
date: new Date("Sun Mar 15 2015 09:00:00 GMT+0100 (CET)")
    };
  },
  componentDidMount: function() {
    // Watch for updates to the date property
    this.props.view.watch('environment.lighting.date', function(val) {
      this.setState({ published: true
author: Rene Rubalcava
date: val });
    }.bind(this));
  },
  render: function() {
    // Return component
    return (
      <div>
        <label>Time: {this.state.date.toTimeString()}</label>
      </div>
    );
  }
});
```

Let's look at this in action! [Using React - 4.0 beta 1 on jsbin.com](http://jsbin.com/xubedu/1/embed?js,output)


Look at that! A simple React component working flawlessly with Accessors! You have to admit, that is pretty cool.

## Let it sink in

There is a lot more to the 4.0beta1 release that I haven't covered, but will in the coming weeks. I just happen to think that Accessors are a really great addition to the API and will help developers solve a lot of pain points they may have run into when dealing with events. Check out the [What's new](https://developers.arcgis.com/javascript/beta/guide/discover/) section in the docs.

Learn about your [MapView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-MapView.html) and [SceneView](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-SceneView.html). _Embrace your views people_, the map is simply a container, all the action happens in the views now! So go on, bang on the 4.0beta1 API, kick the tires, Check out Accessors and see what you can come up with.
