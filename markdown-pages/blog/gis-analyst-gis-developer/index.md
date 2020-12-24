---
title: "GIS Analyst to GIS Developer"
published: true
author: Rene Rubalcava
date: "2014-12-08"
tags: geodev
coverImage: "geodevpost.png"
---

I'm going to keep this short and simple. If you're a GIS pro or student and wondering how to get started learning how to boost your developer chops, I'm going to list some resources. For some detailed geo-career advice, I'd recommend [Justin Holmans blog](http://www.justinholman.com/2012/03/29/spatial-career-guide-5-key-skills-for-future-gis-software-developers/) with tons of great resources.

_I'm a GIS professional, why do I need to learn to program?_ Look over some of the job listings at [gjc](http://gjc.org/), [gisjobs](http://www.gisjobs.com/), [gisgig](http://gisgig.com/) or any other job site and look up "GIS" or "spatial". More and more positions are looking for people that can do some sort of programming. They can range from just knowing how to automate the sofware you use to wanting someone that knows a dozen languages, server-side and database administration while juggling apples (and pays like a damn intern). My point being... it can't hurt.

_Caveat_  You don't need to learn everything listed, but I would advise, pick at least one and you will definitely boost your all around skills.

_Caveat++_  I made this list specifically targeting geo folks, so it's by no means "one size fits all".

#### Learn some damn Python

I'm going to go ahead and say that every geodev should learn some Python. Why? Because it's a great automation language and spatial tools have historically favored them. There is of course [ArcPy](http://resources.arcgis.com/en/help/main/10.2/index.html#//000v000000v7000000) for your Esri-flavored Python, but even the ArcPy tools are built on top of [GDAL](https://pypi.python.org/pypi/GDAL/), and you would do yourself a huge favor learning some [GDAL](http://www.gdal.org/). To learn some GDAL basics, check out [Geprocessing with Python](http://www.manning.com/garrard/?a_aid=rrubalcava) and [Geospatial Power Tools](http://locatepress.com/gpt) from Locate Press. For some ArcPy, look at [Python Scripting for ArcGIS](http://smile.amazon.com/Python-Scripting-ArcGIS-Paul-Zandbergen/dp/1589482824/?tag=odoenet-20). You can even use [Python in QGIS](http://docs.qgis.org/testing/en/docs/pyqgis_developer_cookbook/intro.html).

**Benefits of Python?**

- Easy scripting tool
- GDAL bindings
- Can schedule scripts
- Good starter language

I'm probably glancing over some other benefits. But we run scheduled Python scripts to do large data exports and conversions across servers and databases in addition to using it to automate some complicated map-book generation tools. Go check out [Learn Python The Hard Way](http://learnpythonthehardway.org/) to learn some Python..uh...the hard way, but you'll really learn it that way.

#### Learn some C# or Java

Yeah yeah, I may get some flack for this, but I don't care. Learning Python alone will take your desktop GIS skills to the next level, in either ArcMap or QGIS. If you are at all interested in doing some custom web stuff, learn _Java or C#_. They are both object-oriented languages that can be used to do some pretty heavy lifting on the server. I'm a heavy user of [Pluralsight](http://www.pluralsight.com/)(not affiliated by the way) which has tons of courses that covers both of these. I suggest getting a trial, checking it out. Once you get your feet wet in either of those, dig further with something like [C# In Depth](http://www.manning.com/skeet3/) which will teach you more about C# than you ever even cared about. When it comes to Java, well, I'm no Java pro, but I learned Java by learning [JUnit](https://code.google.com/p/t2framework/wiki/JUnitQuickTutorial) and [Jetty](http://devblog.virtage.com/2013/02/hello-world-with-jetty-maven-eclipse-wtp-tutorial/). I have this [Head First](http://smile.amazon.com/Head-First-Java-Kathy-Sierra/dp/0596009208/?tag=odoenet-20) book too. Besides, tons of books like [Clean Code](http://smile.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/?tag=odoenet-20) use Java in the examples, so you pick up a lot reading books like that. I don't think it matters which of these you learn, once you pick up one, it's fairly easy to learn the other, they're very similar in syntax so that shouldn't be an issue.

_Why not Ruby or C++?_ I'd say if you learn C#/Java, you can pick up Ruby just fine. I wouldn't say the same about the other way around. Want to learn C++, sure go ahead, it's well worth it, C++11 and C++14 make things like memory management much easier to work with, but it's still pretty barebones, so for that reason and seeing how I'm focusing on "Geo" devs, I'd recommend C#/Java.

_What about Node?_ Damnit dude. See previous answer.

#### Just learn JavaScript already

I could probably put together a whole post about this. Maybe you're focused on desktop GIS, but those pretty maps aren't very helpful sitting on your pc. You'll probably want to share them on the web (or not, that's your business), so just learn some JavaScript. _Flash and Silverlight are dead. They've been dead. You can wish they weren't, doesn't make them any less dead_. [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do) is a near essential. I really liked [Dom Enlightenment](http://shop.oreilly.com/product/0636920027690.do) as well to learn about how to do jQuery like tasks without jQuery. If you're ready to do some deep soul-searching JavaScript learning, go look at the [You Don't Know JS series](https://github.com/getify/You-Dont-Know-JS).

Go learn the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) and some [Leaflet](http://leafletjs.com/)/[Mapbox](https://www.mapbox.com/). Get familiar with the [Google Maps API](https://developers.google.com/maps/). There are no shortage of JavaScript tutorials, check out [tuts+](http://tutsplus.com/), [Code School](https://www.codeschool.com/), [FrontEnd Masters](https://frontendmasters.com/), check out some of the free vids at [watchmecode](https://sub.watchmecode.net/) and more out there. Learn it, live it, love it. I'm a big fan of [TurfJS](http://turfjs.org/), which is used mostly in a Node environment, but can be used in the browser and it is just awesome and a great resource to see some spatial operations done in JavaScript. And not to toot my own horn, if you want to learn some ArcGIS web dev, check out [ArcGIS Web Development](http://www.manning.com/rubalcava/?a_aid=rrubalcava).

#### Look to some OSS

Open-source won't save the world, but if you are typically an Esri dev, branch out. Look at [GeoServer](http://geoserver.org/) and what the [BoundlessGeo](http://boundlessgeo.com/) suite has to offer. I wasn't kidding about learning [GDAL](http://opengeoportal.org/software/resources/gdal-and-open-source-geoprocessing-tutorials/), even by the command-line. Try [QGIS](http://www.qgis.org/en/site/), you may be pleasantly surprised at how you can extend it. Check out [OpenStreetMap](http://www.openstreetmap.org/) and embrace your local roads.

**_Optional_**

#### Learn SQL

Oh yeah, I said it. This may be optional until it's not. If you in anyway shape or form ever want to get any sort of meaningful information out of a database, for the love of all that is sacred, learn to write some SQL. [Learn the Hard Way](http://sql.learncodethehardway.org/book/) even. I'm sure there are some great resources out there, but I pretty much learned by trial and error, lots of error.

**_More resources_**

- [GIS Stack Exchange](http://gis.stackexchange.com/)

- [StackOverflow](http://stackoverflow.com/)

#### Summarize

- [Learn Python](http://learnpythonthehardway.org/)
- [Learn an object-oriented language (C#/Java)](http://www.pluralsight.com/)
- [Learn JavaScript](https://frontendmasters.com/)
- [Learn SQL](https://blog.udemy.com/beginners-guide-to-sql/)

Pick one or two of these and boost your GIS skills thus making yourself more marketable and give yourself a warm fuzzy feeling.
