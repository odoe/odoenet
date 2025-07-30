---

title: Custom Leaflet Control
published: true
author: Rene Rubalcava
pubDate: 2015-01-19
tags: geodev
heroImage: '../../assets/blog/custom-leaflet-control/images/leaflet_controls.png'
description: One of the reasons people are big fans of Leafletjs is due to the
  simplicity of the API. Leaflet offers a lot of power in that simplicity and
  it's also quite extensible. That much is apparent just by looking at all the
  available plugins users have built for it.
---

One of the reasons people are big fans of [Leafletjs](http://leafletjs.com/) is
due to the simplicity of the API. Leaflet offers a lot of power in that
simplicity and it's also quite extensible. That much is apparent just by looking
at all the [available plugins](http://leafletjs.com/plugins.html) users have
built for it.

You can even add custom controls to the map via the
[Leaflet.Control](http://leafletjs.com/reference.html#control), however it's not
exactly clear on how to do so. The
[plugin guide](https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md)
is a good starting point for plugins, and you could always review the source
code for Leaflet or other
[Controls](https://github.com/perliedman/leaflet-control-geocoder) to see how
they are built.

### Sample Control basics

Here is what a sample control may look like.

[gist](https://gist.github.com/odoe/569382c48d200920873c)

You can define some default options for the control, such as the position.
Leaflet controls can reside in one of four areas of the map, the **topright**,
**topleft**, **bottomleft** or **bottomright**. For example, the zoom controls
reside in the **topleft** corner by default. This makes it pretty easy for you
to organize where you may want to place you custom control. The **initialize**
method is called when you'd expect, when the control is created. The **onAdd**
method is called the control is added to the map. You could add the UI to your
control in this method and similar for the **onRemove** method, when it is
removed from the map. You could do some clean up in this method, such remove
event listeners to make sure you don't have any memory leaks.

### Sample Search Control

Let's say for example you wanted to build a search tool for your application to
search some GeoJSON in your map. You could build a control that would add an
input box and search the GeoJSON as you type. You could even get fancy and have
it perform some simple autocomplete functionality.

[gist](https://gist.github.com/odoe/8b6467e93d5707e055ec)

As you can see, in the **onAdd** method is where all the DOM creation is done.
In the **onAdd** method, return the container element that will be used for the
control. You can see how this is done in other controls like the
[Leaflet.Control.Scale](https://github.com/Leaflet/Leaflet/blob/8a33e94c0e56634a749f378256905e9e23243483/src/control/Control.Scale.js)
to get an idea of how to do this.

In this sample, we handle searching the GeoJSON via the **keyup** method. This
method adds an autocomplete type UI to the application. The **itemSelected**
method is called when an item from the list is selected and the GeoJSON is
zoomed to. You can access the map the control was added to via the **\_map**
property.

### Too easy

_Yes, that's all there is to it_. The API to make a custom Leaflet Control isn't
very difficult and literally will only be as complicated as you need it to be.
This is part of the beauty of working with Leaflet. Of course you aren't limited
to working within the confines of _Leaflet.Control_, you could roll your own
interfaces or use something like Angular or React if you'd like, but don't
forget that Leaflet has tools built in that can be used to get quite a bit done.

You can see the source code for this search control
[here](https://github.com/odoe/leaflet-control-sample).

You can also view my video on how to build a Leaflet Control on my
[Youtube Channel](https://www.youtube.com/watch?v=kAwrqQDwVq0).

<iframe width="420" height="315" src="//www.youtube.com/embed/kAwrqQDwVq0" frameborder="0" allowfullscreen></iframe>
