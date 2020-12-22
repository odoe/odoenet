---
title: "Quick Tip: CSS Filters and your ESRI Tiles"
published: true
author: Rene Rubalcava
date: "2012-07-10"
tags: geodev
coverImage: "osm_bw.jpg"
---

I was playing around with some css properties recently while working on a project to try and make working with the [OSM layer](http://help.arcgis.com/EN/webapi/javascript/arcgis/help/jsapi/openstreetmaplayer.htm) in the ArcGIS JS API a little nicer. The service already looks good, but I kept wishing I had it as a grayscale. Then I found [this](http://snipplr.com/view/63328).

The way I did it was to give my osm layer an id. `osm = new esri.layers.OpenStreetMapLayer({ id: 'osmLayer' });`

The HTML element that gets created for the layer will be map\_LAYER\_ID, so map\_osmLayer in this case. Then I just apply the css to all img tags in this div.

```css
#map\_osmLayer img { filter: url(filters.svg#grayscale) !important; /\* Firefox 3.5+ \*/ filter: gray !important; /\* IE5+ \*/ -webkit-filter: grayscale(1) !important; /\* Webkit Nightlies & Chrome Canary \*/ }`
```

And voila!

![](images/osm_color.jpg "osm_color")](http://odoe.net/blog/wp-content/uploads/osm_color.jpg)

 

![](images/osm_bw.jpg "osm_bw")](http://odoe.net/blog/wp-content/uploads/osm_bw.jpg)

 

_FYI: I know grayscale as used in the CSS I posted works in all browsers (even IE8), but I can't guarantee other filters will work in IE._ This comes in really handy, so as only this layer is impacted by the css, my own data can "pop" a bit more. There's more you can do with these fun filters!

 

![](images/osm_hue_50.jpg "osm_hue_50")](http://odoe.net/blog/wp-content/uploads/osm_hue_50.jpg) OSM Layer: hue-rotate(50deg)

 

[![](images/osm_bright_sepia.jpg "osm_bright_sepia")](http://odoe.net/blog/wp-content/uploads/osm_bright_sepia.jpg) OSM Layer: brightness(-10%) sepia(100%);

 

![](images/osm_invert.jpg "osm_invert")](http://odoe.net/blog/wp-content/uploads/osm_invert.jpg) OSM Layer: invert(100%);

 

Of course you can mix and match these css styles, so experiment with them to see what kind of interesting effects you can plug into your maps.
