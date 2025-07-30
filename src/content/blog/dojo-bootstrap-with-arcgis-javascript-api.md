---

title: Dojo Bootstrap with ArcGIS JavaScript API
published: true
author: Rene Rubalcava
pubDate: 2014-12-01
tags: geodev, dojo
heroImage: '../../assets/blog/dojo-bootstrap-with-arcgis-javascript-api/images/dojo-bootstrap-logo.png'
description: If you use the ArcGIS JavaScript API, have you tried Bootstrap?
  It's a great way for developers to get a decent looking website up and going
  pretty quickly that doesn't look like total crap. It has some handy
  components, however they are dependent on jQuery because everyone uses jQuery,
  didn't you know that?
---

If you use the ArcGIS JavaScript API, have you tried
[Bootstrap](http://getbootstrap.com/)? It's a great way for developers to get a
decent looking website up and going pretty quickly that doesn't look like total
crap. It has some handy components,
[however they are dependent on jQuery](http://getbootstrap.com/javascript/)
because everyone uses jQuery, didn't you know that?

**Bootstrap Map JS** I've
[discussed before](https://odoe.net/blog/using-angularjs-with-arcgis-api-for-javascript/)
on how you can use other frameworks with the the ArcGIS JavaScript API, but if
you're a Dojo purist, what are you to do? Don't fear, the Esri JS folks have you
covered. They put together this
[Bootstrap Map JS](https://github.com/Esri/bootstrap-map-js) project that works
really well. It covers some subtle nuances of using Bootstrap with your Esri JS
apps, some of which I cover in
[ArcGIS Web Development](http://www.manning.com/rubalcava/?a_aid=rrubalcava)(affiliate
link). It handles
[some CSS](https://github.com/Esri/bootstrap-map-js/blob/master/src/css/bootstrapmap.css)
so the map displays properly and even keeps the InfoWindow popups in the map
view.

**dbootstrap** In addition to Bootstrap Map JS, there are a couple of non-Esri
projects that attempt to marry Dojo with Bootstrap. There is
[dbootstrap](https://github.com/martinpengellyphillips/dbootstrap) that tries to
make the Dojo css used in Dijits look like Bootstrap. The main advantage here is
you can use Dijits just as you normally would and they end up looking like
Bootstrap components. However, at the moment it is still based on Bootstrap 2.x,
and movement to 3.x seems to have stalled while the project seeks a new
maintainer. I don't blame them, and I may get some flack for it, but styling
Dijits can be a real pain because of how the components are built. The
[Configurable Map Viewer](https://github.com/cmv/cmv-app) is an example of a
project that uses dbootstrap.

**Dojo Bootstrap** Another interesting project that I prefer is
[Dojo Bootstrap](https://github.com/xsokev/Dojo-Bootstrap). Dojo Bootstrap
forgoes trying to style the Dijit library and provides new Dojo components that
mirror the current Bootstrap library. The real benefit here is that you can add
these components to your application real easily using the current Bootstrap css
file and not worry about compatibility issues. You can use
[Modal](http://xsokev.github.io/Dojo-Bootstrap/modal.html),
[Dropdown](http://xsokev.github.io/Dojo-Bootstrap/dropdown.html) and
[more](http://xsokev.github.io/Dojo-Bootstrap/). My recommendation is to look
over [the tests](https://github.com/xsokev/Dojo-Bootstrap/tree/master/tests) to
get a good idea of how it works. The docs are a little behind the current state
of the project in some places and I've found a few things are a little unclear
sometimes. For example, I had to get some clarification from
[Tom Wayson](https://twitter.com/tomwayson/status/529317224952389632) on how to
programatically build the [Collapse](http://jsfiddle.net/tomwayson/yLxg5e5m/).

**You autocomplete me** Let's check out a sample of using the Typeahead from
Dojo Bootstrap in an application.
[Typeahead](http://xsokev.github.io/Dojo-Bootstrap/typeahead.html) is a neat
autocomplete module in Bootstrap. It's been deprecated in Bootstrap 3 in favor
of Twitters [typeahead.js](https://github.com/twitter/typeahead.js/) but again,
that has a jQuery dependency and the Typeahead in Dojo Bootstrap works really
well. In the following example, you can use the
[FindTask](https://developers.arcgis.com/javascript/jsapi/findtask-amd.html) as
the source for Typeahead and use this results in the autocomplete feature.

[JS Bin](http://jsbin.com/sesacitafa/1/embed?js,output)

I use this same implementation in a variety of applications and I've had really
good feedback with it. Feel free to experiment with it to do autocomplete of
various services and even address searching. Combine this with a dedicated
indexing service like [Lucene/Solr](http://lucene.apache.org/) or
[ElasticSearch](http://www.elasticsearch.org/) and you are looking at some nice
Google-like search capabilities in your application.

So if you've been looking to Bootstrap to get some nice looking UI components
into your ArcGIS JavaScript API aps, but you didn't want to mix in jQuery, give
Dojo Bootstrap a try. The github repo has had a decent stream of activity and
tests rewritten. I use it in almost all my ArcGIS JavaScript API applications in
one form or another these days.
