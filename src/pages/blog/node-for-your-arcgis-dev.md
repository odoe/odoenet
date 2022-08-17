---
layout: "../../layouts/BlogPost.astro"
title: "Node for your ArcGIS Dev"
published: true
author: Rene Rubalcava
pubDate: "2013-03-06"
---

## Need a local server anyway

One of the things that tripped a lot of users up when the [ArcGIS JavaScript API](http://help.arcgis.com/en/webapi/javascript/arcgis/) moved to version 3.0 and started using [Dojo](http://dojotoolkit.org/) 1.7 as it's core was the fact that you needed to use a server to test your applications. This is by no fault of the ArcGIS API team, it's just the way Dojo works as part of the [AMD loading](https://dojotoolkit.org/blog/learn-more-about-amd). This isn't the kind of thing Esri can fix, nor is going away, so users will need to deal with it. And let's be honest, best practices would dictate that you probably should have been developing with a local server of some sort anyway.

There are various solutions to work with this. If you use a flavor of [Visual Studio](http://www.microsoft.com/visualstudio/eng/office-dev-tools-for-visual-studio), you are in the clear. You could use something like [XAMPP](http://www.apachefriends.org/en/xampp.html), which is a great choice especially if you will be deploying to an Apache environment (it even comes in a portable version for usb drives). I still use both of these methods on a regular basis. But as usual, I was looking for something better. I wanted an easy way to to develop, build tools, test, debug and the all critical build and deploy.

So I turned to [Node](http://nodejs.org/).

## The Node less traveled

I have [dabbled](https://odoe.net/blog/?p=187) in [some](https://odoe.net/blog/?p=168) node in the past, but it has been a while as I have had other projects to work on. So I was sitting there drifting off to sleep in my vanpool (eco-friendly, of course) on the way home from work when it hit me. Why can't I just build a template app that I could run in node to serve my app to test and debug? It's just another web page after all. One of the reasons I like to use MVC to build my apps is it's easy to write an underlying REST API side by side with my web app. Node devs do this kind of thing with their eyes closed while sipping lattes from a Tardis mug (adding to wishlist) all the time.

So I put a [template project together on github](https://github.com/odoe/agsnode-dev).

## The Point

Using this method makes it very easy to get started. One of the great things about working with Node and the [connect](http://www.senchalabs.org/connect/) framework that [expressjs](http://expressjs.com/) uses is the ability to drop in [middleware](https://github.com/senchalabs/connect/wiki), which is basically another word for extensions.

So in this case, I am using [Jade](http://jade-lang.com/) for an HTML template engine, although you can use any engine you desire or none at all. There is a [less-middleware](https://github.com/emberfeather/less.js-middleware) which not only compile less css for you when it is served, but optimize it as well. I am also using [express-uglify](https://github.com/ncrohn/express-uglify), which will minify my js files from the server. This means I don't need to create a release build using [r.js](https://github.com/jrburke/r.js/) or some other method to deploy my application. That to me is very cool. If you come from a .NET/MVC4 background, this is all very analogous to the [Web Optimization](http://www.asp.net/mvc/tutorials/mvc-4/bundling-and-minification) tools.

I came across a method on [stack overflow](http://stackoverflow.com/questions/5605392/node-js-with-express-importing-client-side-javascript-using-script-tags-in-jade) to load scripts into a jade template that you can see in [router/index.js](https://github.com/odoe/agsnode-dev/blob/master/routes/index.js). This is where you can set the title of your page and tell it what scripts you may want to load to shim up your application.

The bulk of the work is done under the [public/](https://github.com/odoe/agsnode-dev/tree/master/public) folder. This is all stuff I use in production on a daily basis. This would be where you do most of your actual ArcGIS JS dev. I use a config.json that could probably use a README.MD for options, but for now you can load dynamic and feature layers. If you review the code, you should be able to figure it out. Ideally, this config json would be a web service responseThis config json is served from a url endpoint, but could come from [MongoDB](http://www.mongodb.org/). I'm still playing with this in my development.

You may notice lack of tests. I am a horrible person. I had some [QUnit](http://qunitjs.com/) tests, but nothing comprehensive. I'll be adding in some [mocha](http://visionmedia.github.com/mocha/) tests as soon as I can, which would make it easy to run my test from the command line and probably even on save in my vim environment.

## The Proxy

A lot of ArcGIS JS dev requires the use of a [proxy](http://help.arcgis.com/en/webapi/javascript/arcgis/jshelp/#ags_proxy), for long queries and CORS and edits, it just comes in handy quite a bit. Obviously, Esri doesn't provide a node version. I attempted to make one with [http-proxy](https://github.com/nodejitsu/node-http-proxy) and I think I was somewhat successful. I got it to proxy to external sites ok, but it has not been extensively tested. This is where my node-fu is weak, so no guarantees here, but I am more than open to assitance (or ridicule) on this subject on [how I did it](https://github.com/odoe/agsnode-dev/blob/master/app.js). _\--Uppublished: true
author: Rene Rubalcava
pubDate: I think I may have the proxy working as expected. Doesn't handle tokens just yet. Keep an eye on git repo for further updates._

## Will this work?

So you may be asking if all this works. It is totally experimental on my part. I really like developing in this environment and I hope to use it to deploy a couple of projects in the future. You can host node apps in IIS with [iisnode](https://github.com/tjanczuk/iisnode) if you are an IIS shop. I'm hoping some people will be open to try a solution like this. You could deploy directly to [nodejitsu](https://www.nodejitsu.com/) to streamline the process. I was easily able to deploy it to Nodejitsu, which you can see [here](http://agsnode.nodejitsu.com/).

## Are you high?

This was a project I got really excited about because I think it opens up some cool possibilities. Say for example you have some bit of code that doesn't interact with the DOM, but could be a little complex for the client to handle. Offload it to a node module in your development environment. I'm going to add in the [esri/geojson-utils](https://github.com/Esri/geojson-utils) as a node module for geojson/esrijson conversions. I have a lot of ideas on how I can use this approach for some projects that have proven a little tricky.

In the end, I do all this for fun and every once in a while, something useful comes out of it. So take it, play with it and maybe you'll find some use out of it as well.
