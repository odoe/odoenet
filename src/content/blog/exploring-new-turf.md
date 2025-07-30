---

title: Exploring new Turf
published: true
author: Rene Rubalcava
pubDate: 2015-02-16
tags: geodev
heroImage: '../../assets/blog/exploring-new-turf/images/turf-tools.png'
description: I've used some of Turfs capabilities in a couple of projects, but
  nothing more than some quick near functionality or to do some intersect and
  buffers. But I know Turf can do more than just that. Much more.
---

[TurfJS](http://turfjs.org/) is a relatively new library that allows you to do
spatial analysis in the browser. Turf is great because it works with
[GeoJSON](http://geojson.org/). This means it's suited very well to work with
[Leaflet](http://leafletjs.com/). So well that it's even included as a plugin
for [Mapbox](https://www.mapbox.com/) now.

I've used some of Turfs capabilities in a couple of projects, but nothing more
than some quick [near](https://github.com/Turfjs/turf-nearest) functionality or
to do some [intersect](https://github.com/Turfjs/turf-intersect) and
[buffers](https://github.com/Turfjs/turf-buffer). But I know Turf can
[do more](https://www.mapbox.com/blog/turf-gis-for-web-maps/) than just that.
[Much more](https://www.mapbox.com/blog/playback-the-iditarod-with-turf/).

### Practical Use

Those are all really cool and sexy examples of using Turf to do some neat GIS in
the browser. I'm not doing a lot of hexbin analysis in my apps, but someone
recently asked me how to do something in their Mapbox app and I instinctively
knew Turf could pull it off. The question asked had to with parcel maps. The
user wanted to click on a parcel and see the approximate dimensions of the
parcel displayed on the map. _That's a pretty clear task_. It sounds easy, but
think through the steps needed to accomplish this, given a simple four-sided
parcel. 1. Measure each side of the parcel. 2. Find the mid-point of each
side. 3. Label the distance at the mid-point of each side.

That functionaly isn't built right into Leaflet, and before Turf I would have
had to do all the math myself, _eww_. But Turf made this task much easier to do.

[JS Bin](http://jsbin.com/quqito/2/embed?js,output)

In this case I took the parcels of a park and first thing I did was use Turf to
simplify the polygon and add it to the map. Remember, I just want _approximate_
lengths, not each edge (oooh
[topology](http://www.gisdoctor.com/site/2012/04/10/spatial-topology-basics/)).
I define a custom marker that will display the distance as the label. When the
map is clicked, send the target layer and the GeoJSON feature to a function that
does the real work. This method will calculate the distance for each line
segment, find the mid-point and add them as features to the GeoJSON layer that
will display them as labels. _BAM!_

### Turf is a tool

Ok, this might not be a fancy visualization of the data, but this is defintely a
practical use case. You could run some quick area calculations to display in the
popup to spruce it up. You could even easily get the
[perimeter of a polygon](https://twitter.com/morganherlocker/status/566105741229305856).
If you overlay some local census data and land-use information you could even do
quick population analyses on groupings of parcels, _now that would be cool_.

So next time you find yourself thinking about how you might need to do some
server-side work to do some spatial analysis, look through the
[Turf toolbox](https://github.com/Turfjs) and see what may prove useful for your
applications. Turf even comes up a
[couple of times](http://geohipster.com/2014/12/27/will-hot-geo-2015-predictions-geohipster-crowd/)
in GeoHipsters 2015 predictions. So embrace your JavaScript, embrace GIS in the
browser.
