---
layout: "../../layouts/BlogPost.astro"
title: "How to be a geodev"
published: true
author: Rene Rubalcava
pubDate: "2017-05-04"
tags: geodev, typescript
coverImage: "geodevpost-1.png"
---

I recently made a comment in jest about how to be a Geospatial Web Developer.

[twitter](https://twitter.com/odoenet/status/858773180655190016)

It was inspired by perusing this [reddit thread](https://www.reddit.com/r/gis/comments/68ff95/how_to_become_a_geospatial_web_developer/).

I've talked about [similar topics](https://odoe.net/blog/gis-analyst-gis-developer/) before.

Although, said in fun, it's not too far from the truth. There's no _set-path_ to becoming a geodev. There are some basics you should learn for web development, but even in geodev there are subsets. Are you focused on visualization, general app dev, algorithms? My point is, you're going to learn a lot as you journey down that path, things change and technology flows, so be adaptive, be flexible, be ready to learn. Those are details, learn the basics first.

I've been doing this a while, so I figured I'm at least minimally qualified to answer this question.

_Be a geodev second and a web developer first._

Think of it this way, web development is your role, spatial is your _niche_.

I'm a big believer in specialization. As a geodev, I do web development, I just happen to focus on working with maps and the importance of location information.

_Web developer first, geodev second._

So let's focus on the Web Developer part of this question.

## Learn JavaScript

You have to learn JavaScript.

_Oh, but I want to be a server-side web developer_, I don't care, learn JavaScript. _Can't I just learn a framework?_ Sure, but learn JavaScript. _I just want to learn XXXScript and compile to JavaScript_, still don't care, learn JavaScript.

I'm a huge fan of _compile-to-js_ languages like TypeScript (technically same thing), Elm and PureScript. But that's like some next level shit right there.

Learn JavaScript. Learn how [Arrays work](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), learn how [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) works. Learn about [inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain). Learn about [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) and [scope](https://docs.microsoft.com/en-us/scripting/javascript/advanced/variable-scope-javascript).

I'm not saying you need to be a JavaScript pro, but you should learn enough to be comfortable. This is a [great site](https://plainjs.com/javascript/) to learn about DOM manipulation. Oh yeah, it would be really helpful to learn about [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) and how to manipulate the DOM if you are doing any web development.

JavaScript should be your base. It should be your morning oatmeal. It should be the shoes you wear as you walk down the wary path of web development.

Frameworks are fantastic tools. Anyone that has seen me talk about them or has read my past blogs knows that I'm something of a framework _aficionado_. But, although learning a framework is awesome, frameworks come and go, JavaScript will live forever.

Look at it this way, frameworks are for developers, _your users don't give a shit how you built it, as long as it works._

_JavaScript is a horrible language, poorly designed... blah blah blah_ That's cool, the rest of us are too busy building shit.

## CSS

Now normally I wouldn't say CSS is a required. But we're looking at being a web developer here. You don't need to know all the CSS magic and there is some [crazy shit you can do in CSS](http://www.michaelbromley.co.uk/blog/298/on-building-a-3d-game-with-css).

You should at least know enough to do a bit of styling, maybe some [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). My CSS skills are novice, to say the least, but I've found plenty of places that let me eliminate some [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) calls in my JavaScript that would be replaced with CSS transitions and delays. A little CSS can go long way.

## HTML... maybe

By learning some DOM manipulation in JavaScript, there may not be much need to know the ins and outs of [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML). I think we're kind of past the days of manually building up web pages with hand-written _artisinal_ HTML.

_But_... as you up your webdev game and say are interested in [progressive web apps](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/), knowing some HTML semantics coupled with CSS will be really beneficial to load your pages as fast possible, so users aren't staring at a white page while your app loads. Yeah yeah, server-side rendering (next level shit) can help with this, but lets stay a little closer to the metal here.

## Geodev

Ok ok, you've gone through all the JavaScript, CSS, HTML web development tutorials on the internet and you're ready to get serious about geo web development.

_Full disclosure, I work at Esri, on the JavaScript API, but I won't limit my list_

You have quite a few options to work with spatial data on the web.

[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) - If you are interested in working with the ArcGIS Platform at all, this is what you want to use. Check out [devlabs](https://developers.arcgis.com/labs/) for quick tutorials.

[Mapbox](https://www.mapbox.com/) - They provide some nice customizable basemaps and the latest uses WebGL exclusively for all drawing, which is pretty cool.

[Carto](https://carto.com/) - Carto has some nice analytic and visualization tooling. What I really like is they expose PostGIS queries via their API.

[Leaflet](http://leafletjs.com/) - Really simple mapping library, can do some powerful stuff if you put the work in.

[OpenLayers](https://openlayers.org/) - Really powerful mapping library. Works with a variety of services, been around forever, I'm a fan.

[Google Maps API](https://developers.google.com/maps/) - Probably got the online mapping party started. Google maps can do quite a bit for an enterprising developer, but be sure to check out licensing limitations for its use.

[d3](https://d3js.org/) - I was a little hesitant to add this, but it can do [mapping](http://maptimeboston.github.io/d3-maptime/#/) and may serve the purpose for some developers.

So, what do you do with this information?

Pick one and go to town. They are all built on JavaScript, and since you now know JavaScript, it's all about making a useful app with a technology of choice.

You're probably not building a ArcMap or QGIS into a browser, you're _most likely_ building a focused app. It's generally a good idea to know a little bit about each of these mapping technologies. But again, just like being a web developer, you are specializing in _geo_, I would pick one and focus on it. But you never know when a new job may have you working with new tech, so it's still a good idea to know a bit about each one.

## Summary

I'm just covering frontend dev here. We're not even talking fullstack, which would mean knowing some server-side tech (.NET, node, _you down with OTP_ and so on) or learning SQL to work with database queries and data wrangling. That is really some next level shit that I couldn't really cover in a single blog post.

Want to a find an awesome community of geominded folks? [The Spatial Community](http://thespatialcommunity.org/) has you covered!

But let's stay focused on the initial question. _How to become a geospatial web developer?_

To reiterate, _learn to be a web developer first, add the geospatial developer second_.

Don't misunderstand me though and think that you can't do any geodev until you've studied JavaScript for six months. That's not realisitc, especially if you need to do this for work. Just remember, at the end of the day, geo or not, you're still doing what a web developer does and that's build web apps that make _your users_ fuckin' awesome.
