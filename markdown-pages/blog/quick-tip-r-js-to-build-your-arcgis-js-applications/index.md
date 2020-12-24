---
title: "Quick Tip: r.js to build your ArcGIS JS Applications"
published: true
author: Rene Rubalcava
date: "2012-09-11"
tags: geodev
coverImage: "esri_build.jpg"
---

"How do I build my ArcGIS JavaScript Application using the Dojo build tools?"

I've seen this question come up a few times and thought I would share my experience. I've posted about this on twitter a couple of times, but thought it warranted it's own posting.

A quick answer to the question above is, I don't think you can, at least not easily. [It would look like](http://forums.arcgis.com/threads/64087-Loading-Local-Esri-Modules-via-AMD) without the un-built version of the ArcGIS API, you can't use the dojo build tools for your application. I tried following [this post](http://geospatialscott.blogspot.ca/2011/06/using-dojo-build-system-to-speed-up.html) about a custom build. I've given it a shot a few times with no success, but of course if someone has and is willing to share I'm all ears. I decided to just go the simple, maybe cowardly route.

Now, before the ArcGIS API went to version 3.0 and started using Dojo 1.7, I was already [using Require.js](https://odoe.net/blog/?p=290) to build be applications, so I was familiar with the [r.js](https://github.com/jrburke/r.js/) optimization tool. After my shameful failure of trying to get the Dojo build tools to work, which by the way seemed overly complicated, but that's just me, I decided to see if r.js would still do the trick. And sure enough, it works just fine.

I'm not going to tell you how to install r[.js](https://github.com/jrburke/r.js/), but I recommend the npm install.

Here is my app.build.js file with comments and some links.

```js
/** * This is the build file I have started using * to build my ArcGIS JS API 3.0 apps, which are * based on Dojo 1.7. I used a similar build file * when I was using Require.js, so it wasn't much different. * * I tried using the Dojo Build Tools, but it just seemed * way too bloated to download the Dojo SDK, sort my files, * blah blah blah. With r.js I can use Node NPM to * npm install requirejs and just use the following command * r.js -o src/js/app.build.js * Done and done! * * This build file is meant to be used with r.js * http://requirejs.org/docs/optimization.html * * For more details on options, you can review * the sample r.js build file * https://github.com/jrburke/r.js/blob/master/build/example.build.js */ ({ appDir : "../", baseUrl : "js", dir : "../../release",

paths : { "jquery" : 'libs/jquery/jquery-1.7.2.min', "jqueryui" : 'libs/jqueryui/jquery-ui-1.8.20.custom.min', "jquery.boostrap" : 'libs/boostrap/bootstrap.min', "underscore" : 'libs/lodash/lodash.min', "backbone" : 'libs/backbone/backbone-min', /** * This is key. Since the namespaces of dojo & esri, * even dojox and dijit come from the ArcGIS CDN, use the * empty: scheme so r.js doesn't try pull in these * dependencies. * http://requirejs.org/docs/optimization.html#empty */ "dojo" : "empty: ", "esri" : "empty: ", "text" : "empty:" }, /** * r.js uses uglifyjs by default. * https://github.com/mishoo/UglifyJS/ * * If you run r.js via java, you can use google closure. * I tried to integrate closure, but java on my work * machine kept punching me in the face. Stick with uglify, * a dude on twitter told me it was faster anyway. */ optimize : "uglify", /** * This doesn't work as intended for me. * According to docs and google groups, this * should remove all combined files when * optimizing a whole project */ //removeCombined : true, /** * This option will grab all the text! calls and * place them in your optimized file to avoid * making XMLHttpRequests to load the files */ inlineText : true,

/** * This is optional, as setting the modules * will create a combined file of all dependencies * in the release folder. You get a single larger file * to load rather than multiple smaller files. * Use at your own discretion. * */ modules : [ { /** * I optimze my app file, because I use * my main file to set up my dojoConfig. * If doing a single js file optimization, * DO NOT include the dojoConfig file * to be included. It will blow you up. * Optmize the next entry point into your app. * This is optional, you don't need modules. */ name: "app" } ],

/** * Will make your css a single line file */ // I had an issue in one app where this caused some issues. Didn't track it down, but only // happened in the one app. I should look into it further. Just disable if it causes problems. optimizeCss : "standard", /** * Ewww, RegEx. It's easy though, * just include files/folders you don't want to * get exported to your release build folder. */ fileExclusionRegExp : /\\.(coffee|coffee~|js~|html~|css~|swp|rb|lnk)|sass|.sass-cache|build/ }) `
```

Look that over and take it in. I tried to be very descriptive with this because I've had to share the same file with other people on a couple of projects.

If you want to try it, I have this [little app on github](https://github.com/odoe/MapStyler) that you can download and try to build yourself. This will not build the dojo/esri stuff into your app, so we're till relying on their CDN for the core library, but your code will minified just fine.

A couple of notes, I did have some issues on an app where building to a single file gave me some errors on load. I should probably document in more detail on how I fix things, but I think think adding a $(document).ready() statement to my initial require() fixed it (in my case in my main.js file). This is probably just because I'm using Twitter Bootstrap and Backbone.js which rely on jQuery. When built to a single file, I think these ready statements are more important.

Hopefully this helps some people that might be wanting to optimize their ArcGIS JavaScript builds.

Also, please if you come across a solution to this with the Dojo build tools, I'd love to hear about it.
