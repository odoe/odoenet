---
title: "JSON features and ESRI Javascript API (noob adventures)"
published: true
author: Rene Rubalcava
date: "2010-09-30"
---

About a week ago, our test server that we have ArcGIS Server on decided to implode. Our IT department is in the process of building and installing all necessary software to get it back up and running. What that means to me is that most of my Flex work is stalled. Everything I do requires access to ArcGIS Server services and even [WebOrb](http://www.themidnightcoders.com/products/weborb-for-net/overview.html) which we had loaded on the same machine.

So what does a Flex dev do when they can't do Flex. He jumps feet first into a language he has limited experience in, JavaScript. Specifically, I took on the [ESRI JavaScript API](http://help.arcgis.com/EN/webapi/javascript/arcgis/index.html) for a small project. Our need was that we are proposing putting a simple map on our external website for public use. Problem is, we do not want to open up our internal servers for this. There are policies and security concerns in place that are out of my hands, but the gist of it is we didn't want to purchase a second ArcGIS Server license for such a small project.

Now, I knew that I could build a Flex application that could load a shapefile and display it on a map and all that jazz, but where's the fun in doing something you already know how to do. Besides, I was thinking of future proofing this little thing for mobile use.

So I did some research and there was so far no way to load a shapefile into JavaScript and display it on the map. But, after reading through the [API docs](http://help.arcgis.com/EN/webapi/javascript/arcgis/help/jsapi_start.htm), I found that I could load JSON features into the map. I was a little concerned because when I have attempted to load complex polygons as JSON into Flex, performance wasn't very good. So imagine my surprise when performance was spot on in JavaScript. This practice may be old hat, as a lot of JSON is used in the ESRI JavaScript API, but I had not seen an example to explicitly load features in this manner.

You can see an example of a map loading JSON features of States [here](http://odoe.net/thelab/js/jsonmap/Index.php).

Now, I am not [JavaScript ninja](http://jsninja.com/), so please excuse any "bad form" in my code. I'm still learning.

The key was, when you get your JSON results,  you want to iterate through the results["features"] to find attributes and geometries. [Here](http://odoe.net/thelab/js/jsonmap/libs/jsonfeatures.js) is the script for loading JSON features. Once you get that far, the rest is easy. Create the graphics, load attributes into an InfoTemplate if you'd like and voila, you have a nice map with features loaded without the need for your own ArcGIS Server to serve the data out.

It may not seem like a big deal, but I didn't find any quick guides on this info, so I just thought I would share what I learned this past week.

My test server should be back up soon, so I'll be back to Flex'n, but I think I'll be doing some more digging into JavaScript for some simpler applications. One drawback for me is that I love IDE tools, like [FDT](http://www.fdt.powerflasher.com/) and [IntelliJ](http://www.jetbrains.com/idea/), but I've been having a hard time finding an IDE that works well with JavaScript, custom objects, libraries like [Dojo](http://www.dojotoolkit.org/) and [jQuery](http://jquery.com/) but I'll keep looking. I'm not a convert, but it is a bit of fun.
