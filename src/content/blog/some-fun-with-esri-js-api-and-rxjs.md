---

title: Some fun with Esri JS API and RxJS
published: true
author: Rene Rubalcava
pubDate: 2014-08-13
description: So I get pretty bored. For the past year or so I've been learning
  some functional programming stuff, and like most things it has snowballed into
  tons of little side projects and experiments. A few months ago I attended this
  online workshop from FrontendMasters and it totally melted my brain. I highly
  recommend it when the course becomes available.
---

## What the

So I get pretty bored. For the past year or so I've been learning some
functional programming stuff, and like most things it has snowballed into tons
of little side projects and experiments. A few months ago I attended this online
workshop from
[FrontendMasters](http://frontendmasters.com/workshops/functional-programming-javascript/)
and it totally melted my brain. I highly recommend it when the course becomes
available.

This has lead me to really diving into some functional reactive programming,
which honestly, I don't think I have really grasped yet, but you can read the
[reactive manifesto](http://www.reactivemanifesto.org/) and this popular answer
on
[stack overflow](http://stackoverflow.com/questions/1028250/what-is-functional-reactive-programming?answertab=votes#tab-top).
I think this quote from that answer sums up my naive understanding of FRP.

> ...FRP is about "datatypes that represent a value 'over time'

## So what

I've been experimenting with various functional libraries using Leaflet to play
around with, but had yet to really try to use anything with my Esri JS
development, mainly because Dojo as a library has everything I need for
production dev, but even it's own
[dojox/lang/functional](http://dojotoolkit.org/reference-guide/1.10/dojox/lang/functional.html)
library is pretty sparse and poorly documented at the moment.

One frp library I really liked was [Bacon.js](http://baconjs.github.io/), but I
couldn't find a way to have it play nice with Dojo Evented modules. Then I tried
[RxJS](https://github.com/Reactive-Extensions/RxJS) which lo and behold, even
has a
[sample on how to use with Dojo](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromeventpattern.md)
using the _fromEventPattern_ method.

## Really, so what

With that in hand, I tweaked
[this sample](http://developers.arcgis.com/javascript/sandbox/sandbox.html?sample=util_relation)
from the Esri JS docs to use RxJS to convert events and promises to streams.

[Geometry Service: Relation](http://jsbin.com/nopulo/1/embed?js,output)

The interesting part is probably the Observable of the promises that do the
drive time analysis and finds the local pizza places.

```js
Rx.Observable.fromPromise(
  new all({
    poiSearch: executeLocalSearch(clickPointGraphic),
    driveTimes: getDriveTimePolygon(clickPointGraphic),
  }),
)
  .map(function (results) {
    // This is the cool part
    // before the results go to the handler
    // map over them and do some transformations.
    // In this case, each result will be passed to other
    // other methods and used to build the
    // drive time RelationParameters.
    // This makes the relateGeometries method much cleaner.
    if (results.poiSearch || results.driveTimes) {
      showDriveTime(results.driveTimes);
      showLocations(results.poiSearch);
    }
    var relationParams = new RelationParameters();
    relationParams.geometries1 = graphicsUtils.getGeometries(baseGraphics);
    relationParams.geometries2 = graphicsUtils.getGeometries(
      results.driveTimes[0].value.features,
    );
    relationParams.relation = RelationParameters.SPATIAL_REL_WITHIN;
    return relationParams;
  })
  .subscribe(relateGeometries);
```

Notice how you can map over the results before they go to the handler. This
allows you to transform the data and tweak it as needed before the handler gets
it. In this case, I use it to create parameters for another method. This allowed
me to remove this code from the original handler. There is a lot you can do with
this interim methods. The promises are now a stream, and you can inject other
methods into the stream to do cool stuff like this. This is a pretty simple
sample, but I'm still learning all this stuff.

The next thing I want to try is integrating this
[RxJS-Dojo](https://github.com/Reactive-Extensions/RxJS-Dojo) extension into
some test projects.

So I may be totally missing the mark on all this and in the end may not find I
like using it in my Esri JS/Dojo projects, but I'll definitely be using these
libraries with other things I am working on. Functional and Reactive seem to be
the latest buzzwords for the past couple of years, but ignore that and give it a
shot. You may be pleasantly surprised.
