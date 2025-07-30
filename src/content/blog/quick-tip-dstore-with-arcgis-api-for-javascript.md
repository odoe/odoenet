---

title: "Quick tip: dstore with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: 2015-06-22
tags: geodev
heroImage: '../../assets/blog/quick-tip-dstore-with-arcgis-api-for-javascript/images/esri-dstore.jpg'
description: Have you been in the _dijit trenches_? Have you used dijit
  FilteringSelect or dijit Trees? If you have, you probably know the joys of
  working with the dojo/store modules. These aren't bad modules. They definitely
  serve a purpose when it comes to working with data-binding to UI elements. But
  did you know the guys at Sitepen were like, _hey, we can make stores better_
  and thus they developed dstore. You can read more details here and here.
---

Have you been in the _dijit trenches_? Have you used
[dijit FilteringSelect](http://dojotoolkit.org/reference-guide/1.10/dijit/form/FilteringSelect.html)
or [dijit Trees](http://dojotoolkit.org/reference-guide/1.10/dijit/Tree.html)?
If you have, you probably know the joys of working with the
[dojo/store](http://dojotoolkit.org/reference-guide/1.10/dojo/store.html)
modules. These aren't bad modules. They definitely serve a purpose when it comes
to working with data-binding to UI elements. But did you know the guys at
[Sitepen](https://www.sitepen.com/) were like, _hey, we can make stores better_
and thus they developed [dstore](http://dstorejs.io/). You can read more details
[here](https://www.sitepen.com/blog/2014/11/17/introducing-dstore/) and
[here](https://www.sitepen.com/blog/2015/04/17/dstore-1-1/).

Now _I'll admit_, when I first saw dstore, I was skeptical. I mean, I could do
just about the same with arrays and maybe some [lodash](https://lodash.com/) or
[ramda](http://ramdajs.com/0.15/index.html) sugar sprinkled on top. But then a
while ago I had decided to dig in and give it a shot. dstore behaves very much
like any of the dojo/store modules you might be used to, but in my opinion,
_where it really shines_ is in some of it's **filter**ing capabilities.

## Filtering Fun

In dstore, [Stores](https://github.com/SitePen/dstore/blob/master/docs/Store.md)
are made up of a
[Collection](https://github.com/SitePen/dstore/blob/master/docs/Collection.md).
It is on the Collections that you can perform some pretty cool
[filtering](https://github.com/SitePen/dstore/blob/master/docs/Collection.md#filtering).

Say for example, you wanted to filter a list of the states by population. So you
need to wire up how to get this list form a service, display it and filter it.
That could look something like this.

[gist](https://gist.github.com/odoe/66b5e316736bcaa5f892)

That's pretty cool. You can wire up the Store to listen for when graphics are
added to a FeatureLayer and then pass the attributes to the store. Then you can
perform a filter based on the minimum population and update the list. Rather
than try and remove only parts of the list that have changed, just destroy it
and rebuild it. _No fuss_.

You can see a demo of this application here.
[JS Bin on jsbin.com](http://jsbin.com/vukugi/embed?js,output)

## Find the Right State

You can also simply filter by state names. Which is pretty easy.
[JS Bin on jsbin.com](http://jsbin.com/vukugi/1/embed?js,output)

One thing I haven't quite figured out in this scenario is how to make the filter
case _insensitive_, so if someone has some ideas on this, I'd love to hear about
it. The **contains** method of a filter is kind of cool, because it will match
_Ca_ with _California_ and _Colorado_, since both have _C_ and _a_ in them. Now
that I think about it, both of these searches could probably be tweaked with
regular expressions using **match** in the filter.

In either of these cases, you could also wire up the filter to do a selection of
the FeatureLayer on what is currently filtered in the store, so you can bind the
two together, _but I'll leave that exercise up to you_.

Filters provide a whole lot of good stuff. There's even a
[Rest Store](https://github.com/SitePen/dstore/blob/master/docs/Stores.md) you
can bind to an REST API or a LocalDB Store that can be used to persist data in
the browser. If you want to use some new dstore capabilities with older dijits,
you can use an
[Adapter](https://github.com/SitePen/dstore/blob/master/docs/Adapters.md).

It should also be noted that dstore is on the
[roadmap](http://dojotoolkit.org/community/roadmap/) for Dojo 2, so it could
prove useful to get to know it now and be ahead of the game later on.

## Done

So go on and have some fun with dstore. Like I said, I was a little unsure about
it when I first heard about it, but after I started integrating it into some of
my own projects, I was surprised how much I actually liked it.
