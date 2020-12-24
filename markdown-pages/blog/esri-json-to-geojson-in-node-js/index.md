---
title: "ESRI-JSON to GeoJSON, with Node.js"
published: true
author: Rene Rubalcava
date: "2011-11-23"
---

I'll admit, my professional GIS development experience is in the ESRI sphere. It's what we use at work and it's what I've been using for going on 10 years now. I'm familiar with [FOSS4G](http://foss4g.org/), but have not really had the opportunity to develop any projects incorporating it. Because of this, I was not really aware that the ESRI [REST spec](http://help.arcgis.com/EN/arcgisserver/10.0/apis/rest/index.html) for their JSON response really differed much from the standard [GeoJSON spec](http://geojson.org/geojson-spec.html). My naivety is a little embarrassing as a GIS professional.

So my interest was piqued a few days ago when I saw someone post a tweet about the request to have ESRI [add a GeoJSON respons](http://ideas.arcgis.com/ideaView?id=0873000000088U9AAI)e to their REST API. For whatever reason, I got it on my head that it couldn't be that hard to do. A quick Google search showed their were a [couple of ways](http://gis.stackexchange.com/questions/13029/how-to-convert-arcgis-server-json-to-geojson) to do this with third party tools, but I figured there had to be a way to do this quickly in the browser or natively server side.

Recently, I have been practicing on little projects in various languages and frameworks and I thought [Node.js](http://nodejs.org/) would be a great solution to get this rolling. It's fast, can work with JSON objects natively and should work pretty simple without having to worry about browser compatibility issues because it runs through Google's V8 engine.

So I set out looking at what would need to be done to convert ESRI-JSON to GeoJSON. As an aside, this entire project was done inside [Google Chrome](http://www.google.com/chrome) using the [Cloud9 IDE](http://c9.io/) and deployed directly to [Heroku](http://www.heroku.com/) from within Cloud9. I could probably do a whole write up on that experience.

It took me a couple of days and lots of debugging and running various ESRI-JSON through the converter, but I think I've got a very usable application running to demonstrate the conversion. If you've worked with this before, GeoJSON has a standard array called "coordinates" to hold x,y information. ESRI-JSON uses "rings" for polygons, "paths" for lines and just an array of x,y pairs for points. A little annoying to convert, but not a big deal.

[ESRI-JSON to GeoJSON Converter](http://esritogeo.herokuapp.com/)

You can also send your ESRI-JSON as a parameter to http://esritogeo.herokuapp.com/parse/esrijosngoeshere and get a JSON response. I should point out a caveat is that you need to make sure you are sending the correct projected data. GeoJSON uses standard Lat/Long, so your ESRI-JSON should be in Spatial Reference 4326.

I put a couple of demo pages up. This [sample](http://odoe.net/thelab/js/geojson/esri.php) uses the ESRI JavaScript API to load a FeatureLayer of points. This [sample](http://odoe.net/thelab/js/geojson/geojson.php) uses [Leaflet](http://leaflet.cloudmade.com/) to load the GeoJSON that was converted. The GeoJSON sample takes a few seconds to load and would not load in IE8 for me, but worked in Chrome. I don't know if this is an issue with Leaflet or not, sorry.

The ESRI-JSON to GeoJSON application is on Heroku for now as an experiment. I don't have any permanent Node.js hosting. So if it gets a lot of traffic it may just disappear. Heroku is for quick testing, not production. I don't really have funds to put this up for wide use. I will get the whole application up on Github, as soon as I figure out how from within Cloud9.

I would however like to share the code that does the conversion, which is shown below.

[gist](https://gist.github.com/odoe/1389205)

I'm sure this functionality could be incorporated using Server Object Extensions on ArcGIS Server, but it works so cleanly this way. Maybe some people will find this useful and could incorporate it into their workflows.

Thanks.

edit: Project is now available on [github](https://github.com/odoe/esritogeojson).
