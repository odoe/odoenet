---
layout: "../../layouts/BlogPost.astro"
title: "ArcGIS JavaScript API 3.0, Dojo 1.7 and AMD Modules"
published: true
author: Rene Rubalcava
pubDate: "2012-06-14"
---

## Diving in

For a while now, I have been keeping my JavaScript development modular by using [Require.js](http://requirejs.org/) as I have discussed [before](https://odoe.net/blog/?tag=require). Require.js provides AMD module loading for JavaScript projects. If you are not familiar with AMD, take a look [here](https://github.com/amdjs/amdjs-api/wiki/AMD). [Dojo 1.7](http://dojotoolkit.org/reference-guide/1.7/releasenotes/1.7.html) is AMD compliant and uses require/define methods to load modules. Up until now, the ArcGIS JavaScript API has been using Dojo < 1.7 for its core. I [posted](https://odoe.net/blog/?p=290) before how I used Require.js to load the API into my applications. Recently, the [ArcGIS JavaScript API has been updated to 3.0](http://help.arcgis.com/en/webapi/javascript/arcgis/help/jshelp_start.htm) and is now using Dojo 1.7 for it's core. I was pretty excited about this, mainly for AMD modules.

As soon as I saw that 3.0 was out, I dived right in, went straight past go, updated the CDN url in one of my apps and crossed my fingers. Of course it didn't work. So I did what any dev should do. [RTFM](http://help.arcgis.com/en/webapi/javascript/arcgis/help/jshelp/migration_30.htm). That gave me a little insight, but I figured there must be something in my Require.js config I need to set up, so I went to check out the _[How to use RequireJS with Dojo](http://requirejs.org/docs/dojo.html)_ page. I know I've seen samples of Require.js loading Dojo modules, so I set out to hack away at it. The [Require.js/Dojo](https://github.com/neonstalwart/dojo-requirejs-template) template was a good read, but has since been abandoned in favor of a [non-Require.js template](https://github.com/csnover/dojo-boilerplate).

## Trimming it down

After some fiddling around, I found out the issue of using Require.js with Dojo 1.7 via a CDN was that you [can't](http://dojo-toolkit.33424.n3.nabble.com/Error-defineAlreadyDefined-td3920722.html) and you shouldn't. When you load Dojo via a CDN, the dojo loader will create a global define and require, negating the need to use Require.js in this case. If I was loading Dojo locally, I could continue using Require.js and load individual Dojo modules as I was initially expecting to do. Now that we know that Require.js is no longer _required_ (pun intended), we can remove that from our upgrade path equation.

## I broke it

Let's return to the [ArcGIS JS 3.0 migration page](http://help.arcgis.com/EN/webapi/javascript/arcgis/help/jshelp/migration_30.htm). It explains how to load custom modules while using the CDN. I tried this, and hit a snag. jQuery was broken, which broke my Backbone lib too. I use Backbone a lot. So ok, more digging. I went through this page on [Using Custom Modules with a CDN](http://dojotoolkit.org/documentation/tutorials/1.7/cdn/). It seemed pretty straightforward, but jQuery was still broken and other modules were not working. Part of my problem was I was trying to define my package like this. ` packages: [ { name: "module", location: location.pathname.replace(/\\/[^/]+$/, "") + "src/moduleFolder/moduleFile" } ] ` Where "moduleFile" is actually a JavaScript file. You don't need to add the *.js, the require function knows what to do. The regex is needed when using the CDN so that the path will point to the server your app sits on, or else it looks in the CDN directories and you just get lots of "file not found" errors. I thought I could bypass the regex with "./src" and so on, don't bother, do it this way, don't be dumb like me. So I went back and read up on [some more documentation](http://dojotoolkit.org/documentation/tutorials/1.7/dojo_config/). Turns out, I am dumb. Packages simply defines the path to a folder. If you want the name to point to a specific file, you need to define the main field. ` packages: [ { name: "module", location: location.pathname.replace(/\\/[^/]+$/, "") + "src/moduleFolder", main: "moduleFile" } ] `

## I fixed it

At this point, I think I'm good to go, but jQuery is still broken and I'm getting pretty pissed, but I was on a roll, so I plowed right through with various config options, then I found [this article](https://www.ibm.com/developerworks/mydeveloperworks/blogs/94e7fded-7162-445e-8ceb-97a2140866a9/entry/loading_jquery_with_dojo_1_7_amd_loader2?lang=en). I followed this and it worked. jQuery worked, Backbone worked, everything was working. Now I had to know why. It turns out this was the magic piece to get jQuery to work. ` // Add this before first require to launch app define.amd.jQuery = true; ` There is even a page explaining about using [jQuery and AMD](https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD) loaders.

I have put together a sample project using ArcGIS JavaScript API 3.0, jQuery and Backbone. You can find the [source on github](https://github.com/odoe/ags30sample). I add a lot of comments to the [config file](https://github.com/odoe/ags30sample/blob/master/src/config.coffee), but I use CoffeeScript, so look at those files for comments. To load configs, like you would inside an HTML page creating a dojoConfig, you call require passing it an object with your configs defined. ` require({ async: true, packages: [{...}] }); `

## Caveats and Tips

So what does all this mean to ArcGIS JavaScript developers. It means you should [write your modules as AMD compliant](http://dojotoolkit.org/documentation/tutorials/1.7/modules/). As of right now, a few ESRI modules work as AMD compliant, meaning you can do this. ` define(['esri/dijit/Popup'], function(){ return new esri.dijit.Popup({...}); }); ` BUT, it doesn't work everywhere. Not all ESRI modules are AMD compliant, so for now I would suggest using the standard dojo.require() method.

If you are used to using the [text plugin](http://requirejs.org/docs/download.html#text) for Require.js to load html templates, have no fear, Dojo has you covered with [dojo/text](https://dojotoolkit.org/reference-guide/1.7/dojo/text.html). I just had to change my modules where I called text! to dojo/text!. ` define(['text!templates/home.html'], function(template){ ... }); // Became this define(['dojo/text!templates/home.html'], function(template){ ... }); `

I tried creating an alias for this in my dojo config, but couldn't get it to work. If someone does, I'd love to hear about it. I was able to fix this by forming my alias as a proper array or arrays in my [config](https://github.com/odoe/ags30sample/blob/master/src/config.coffee). In the config, especially if you are using jQuery, async: true is an important parameter. jQuery won't work without it. This specifies that Dojo should be loaded asynchronously. You can also use it in your require/define methods similar to the order! plugin for Require.js. ` // 1 means true, 0 means false require({async:1},['modules/myModule'], function(myModule){ ... }); ` I have not tried this method yet, but if I have a need, now I know.

## Go forth and update

The biggest hurdle for me was getting the config to work as I needed it to work. Now that I have a better understanding of how Dojo defines packages and loads them, I'll be moving forward with the ArcGIS JavaScript API 3.x updates. Future updates when the ESRI modules become AMD compliant should be less painful. My old Require.js modules will load just fine now. Most people may not need to move on from Require.js, so you should have a clean slate to work from. Hopefully some of these tips help get you on the track to creating modular apps with the new API.
