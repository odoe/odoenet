---
title: "Quick Tip: ArcGIS JavaScript Dynamic InfoTemplate"
published: true
author: Rene Rubalcava
date: "2013-06-19"
---

I see questions pop up once in a while about building a dynamic popup, but excluding some fields from showing up or adding a hyperlink. The classic way to do this is to write up the content of your popup ahead of time. There are a [couple](https://developers.arcgis.com/en/javascript/jssamples/widget_extendInfowindow.html) of examples of this in the developer samples.

I have a little utility module I wrote a while ago that has gone through numerous iterations, but it still serves its purpose. It's called [templateBuilder](https://gist.github.com/odoe/5800348) and can be used to dynamically generate the content or used to build [InfoTemplate](https://developers.arcgis.com/en/javascript/jsapi/infotemplate-amd.html) content after a click event or something an [IdentifyResult](https://developers.arcgis.com/en/javascript/jsapi/identifyresult-amd.html).

!(jsfiddle.net/odoe/PDr7p/embedded/)

It will remove some common fields that are typically not viewed in a popup, like _shape_ or _objectid_. It can take options that let you define a URL field and the URL prefix to go along with it. I'm tinkering with adding more advanced options for alias field names and formatting, but I think this is a good base to work from. I currently use this in just about every project that has popups, so I'm hoping someone will find it useful.

You may also notice I have embraced the [dojo/\_base/array](http://dojotoolkit.org/reference-guide/1.9/dojo/_base/array.html) and [dojox/lang/functional](http://dojotoolkit.org/api/dojox/lang/functional) modules available with the ArcGIS JavaScript API. It used to be I would just write my own iterators and try to squeeze as much performance as I could out of it, but I'm finding these modules work fine and I was just being picky.
