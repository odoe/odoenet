---
title: "Ember with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2015-06-29"
tags: geodev
coverImage: "ember-esri.png"
---

I'm a person that likes to try new frameworks and toolets. Even when I was doing Flash development, I really enjoyed using Swiz and Robotlegs, and with JavaScript, aside from the staples of jQuery and Dojo I've enjoyed Backbone, Knockout, Angular, React and much more. Some of these tools tend to be a little easier to use than others. One that has always eluded me though, was [Ember](http://emberjs.com/). I don't know if I could pinpoint exactly what about Ember I had always found difficult to grasp. After all, I figured out how to write [Angular Directives](https://docs.angularjs.org/guide/directive), so it _should be a walk in the park_. Maybe my difficulties with Ember have been the idea that Ember is _really opinionated_. There is definitely an Ember way of doing things, but I've come to find that this rigid structure of the Ember way of doing things is _one of its greatest strengths_. Especially working with a team of developers, it's really nice to know that everyone is doing things the same way.

Most recently, over the past couple of months, one of the things that helped Ember click is [Ember-cli](http://www.ember-cli.com/). Ember-cli is like [Yeoman](http://yeoman.io/) on steroids for Ember. It will scaffold your entire application, including your tests for you. To really see some of this in action, check out this video on [TDD with Ember-cli](https://www.youtube.com/watch?v=2b1vcg_XSR8). I got up to speed using the [ember-cli 101](https://leanpub.com/ember-cli-101) book and most recently [Deliver Audacious Web Apps with Ember 2](https://pragprog.com/news/deliver-audacious-web-apps-with-ember-2). At this point, Ember and Ember-cli are working in unison and it is highly recommended to use Ember-cli when doing Ember development.

## Sounds great, let's get started

So once I felt pretty comfortable with Ember and Ember-cli itself, I was pretty excited to dive right in and use it with my [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) development. Then _I got smacked in the face with a brick_. It doesn't work. You can use vanilla Ember with the ArcGIS JS API like you would most other frameworks, but not when using the Ember-cli. Without getting into too many details, it boils down to Ember-cli using a _minimal_ synchronous amd loader versus an asynchronous AMD loader such as [RequireJS](http://requirejs.org/) or [Dojo loader](https://dojotoolkit.org/reference-guide/1.10/loader/amd.html#loader-amd). The default loader for Ember-cli is [loader.js](https://github.com/ember-cli/loader.js). So I set out to try many, _many_, different ideas on how to get everything to work together. A fella named [Jack Rowlingson](https://github.com/jrowlingson) sent me a pretty cool idea on how to get this to work. There also seemed to be some other interest on using AMD with Ember-cli, so I knew I wasn't alone in this task. Thus was born the [ember-cli-amd](https://github.com/esri/ember-cli-amd) addon.

## Just add it on

Feel free to go through the [source code](https://github.com/esri/ember-cli-amd) for the details of how this works. There are a couple of ways you could use this addon. You could use RequireJS as the loader or you could point to a CDN loader. If you decided to install AMD modules using RequireJS and _bower install_ AMD libraries, the addon will compile your AMD modules using the [RequireJS Optimizer](http://requirejs.org/docs/optimization.html). This actually works out pretty fast as you write your code.

Here is a sample of what your configuration would look like. [gist id=b01d9b4996a415d8a5bb]

In this case, I am providing a _srcTag_ pointing to the ArcGIS JS API CDN. This will use the Dojo AMD loader to start the application. With this option you need to at least provide the _amdPackages_ option, which tells the addon which root modules to look for and load as AMD modules. It will then **inject** these modules into the _loader.js_ used by Ember-cli.

A similar option is to _bower install requirejs_. Set _useRequire_ to _true_, provide the _amdPackages_ and if you want, provide a [RequireJS configuration](http://requirejs.org/docs/optimization.html) for the optimization settings.

Then you need to modify the _index.html_ and _tests/index.html_ files with some _content-for_ blocks. [gist id=58ac8d15f125d3926e37]

If you happen to _need_ it, you can _bower install dojo_ and set _useDojo_ to _true_ and this will inject the Dojo loader into your application.

## Ember fun times

So, let's build a simple app using the ArcGIS JS API CDN. Once you have [Ember-cli](http://www.ember-cli.com/) installed and ready to go, run this command from the command-line of your choice (_it's called ember-cli for reason_).

**ember new ember-esrijs**

Let it do it's thing and navigate into the directory for your project. At this point you can go ahead and run this command.

**npm install --save ember-cli-amd**

Awesome, you have the addon installed. Update the _index.html_ as we described above. You'll also want to update your **Brocfile.js** as [shown here](https://gist.github.com/odoe/b01d9b4996a415d8a5bb#file-brocfile-js). [gist id=406aa7b5a9d1bf99d95c] In this case, I know I am going to use Dojo via the CDN, so I will set up the [dojoConfig](http://dojotoolkit.org/documentation/tutorials/1.10/dojo_config/).

Now let's create some components.

**ember generate component esri-map** **ember generate component esri-search** **ember generate component esri-legend** **ember generate component map-switch**

Ember-cli will scaffold your [components](http://emberjs.com/api/classes/Ember.Component.html) for you. Let's fill out our components now, here's the _esri-map_. [gist id=7ff4169e32ac08443f58] As you can see, Ember-cli uses [es6/es2015](https://github.com/lukehoban/es6features). **Learn it, live it, love it**.

Here's is the search component. [gist id=b6c1843649a564a1e871]

Here is the legend component. [gist id=fcdc801386eae7f35f77]

Then we have a small component that will switch the maps. [gist id=f737d860734303f393b0]

These Ember components are very similar to [WebComponents](http://webcomponents.org/) and it's a good way to think of them like that. In this application, we'll add an _index.hbs_ into _app/templates/index.hbs_. [gist id=012590ce3141b3f51934] Ember uses [Handlebars](http://handlebarsjs.com/) or it's DOM templates, so it's pretty easy to set up the layout of your DOM in here. At this point, you just need to set up the styling for your app and you should be good to go. You can now run your application.

**ember serve**

Go to http://localhost:4200 and you're good to go!

You can find a [sample of this application on github](https://github.com/odoe/ember-esrijs).

## That's it

As you can see, the Ember-cli really makes scaffolding your application pretty simple. Once you get into [routing](http://guides.emberjs.com/v1.10.0/routing/) Ember-cli will even update your Router for you, so it's a great tool you can use to quickly get applications up and running. If you have had issues trying to use AMD libraries, or embed your Ember-cli app in a RequireJS application, give the [ember-cli-amd addon](https://github.com/esri/ember-cli-amd) a try.

I'm still learning some detailed Ember bits. I wouldn't call myself an expert just yet, but I'm working on it. I did learn _a lot_ about writing Ember-cli addons and [broccoli](https://github.com/broccolijs/broccoli), which is a dependency of Ember-cli. This subject alone probably warrants it's own post.

I would highly recommend any developer give [Ember-cli](http://www.ember-cli.com/) a try. It may be opinionated, but it has some pretty good opinions.
