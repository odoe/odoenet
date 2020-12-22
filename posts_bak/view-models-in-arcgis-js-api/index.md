---
title: "View Models in ArcGIS JS API"
published: true
author: Rene Rubalcava
date: "2015-12-21"
tags: geodev
coverImage: "esrijs-viewmodels.png"
---

This past couple of months marked not one, not two, but _three_ releases for the ArcGIS API for JavaScript. You had 3.15, [4.0beta2](http://odoe.net/blog/arcgis-api-javascript-4beta2/) and then 4.0beta3.

These releases have introduced [Vector Tile Support](http://odoe.net/blog/vector-tiles-in-arcgis-js-api/), new Popup and now with 4.0beta3 release, View Models.

## What is a View Model

Since 4.0beta1, we were introduced to this concept of the [map and view](http://odoe.net/blog/maps-and-views-in-arcgis-js-api/), which basically treats the map as a data source for a view. That view could be a regular 2D MapView or a 3D SceneView.

Well, this concept is now being introduced into the out-of-the-box widgets in the API. So you can use the widgets provided as you normally do or you could take the View Model of a widget and create your own interface for it. The View Models handle all the heavy lifting for you, you just need to build the user experience around them as you like.

## Dijits

The out-of-the-box widgets in the API are built on top of [Dijits](https://dojotoolkit.org/reference-guide/1.10/dijit/). Dijits are a tried and well-tested UI framework for [Dojo](https://dojotoolkit.org/). Some may say Dijit is getting a _little long in the tooth_, but remember, Djits have been around as long as jQuery, longer than most modern frameworks and are used heavily in enterprise development. Dijits provide solid [i18n](https://dojotoolkit.org/reference-guide/1.10/dojo/i18n.html) support and have been battle tested against just about every browser oddity imaginable. Web Component like syntax, templates, data-binding and more, remember... [_Dojo already did that_](https://www.youtube.com/watch?v=BY0-AI1Sxy0). Even if Dijits seem a little dated at this point, they are getting a facelift with the new [flat theme](https://github.com/dojo/themes).

Dijits aren't perfect, but they are solid. However, lots of developers may want to integrate the ArcGIS JS API into their applications and use their framework of choice to handle the bulk of their user-interface.

If you are familiar with my blog at all, _I love frameworks_. View Models make this much easier to do.

## Examples

I'm going to cover a few different examples of how you might use these new View Models in your framework of choice. I'll be covering the following:

- [React](https://facebook.github.io/react/)
- [Ember](http://ember-cli.com/)
- [Angular 2](https://angular.io/)
- [Elm](http://elm-lang.org/)

Roll up your sleeves boys and girls, it's time to party.

### Basics

To find out how the View Models in the 4.0beta3 API work, you can check out the docs.

For example, if you want to find out about the ZoomViewModel, look at the [docs for the Zoom Widget](https://developers.arcgis.com/javascript/beta/api-reference/esri-widgets-Zoom.html), you will see a property for a [viewModel](https://developers.arcgis.com/javascript/beta/api-reference/esri-widgets-Zoom.html#viewModel) that leads to the [ZoomViewModel](https://developers.arcgis.com/javascript/beta/api-reference/esri-widgets-Zoom-ZoomViewModel.html). All the doc'd widgets in the 4.0beta3 API follow this same pattern, so you can see what the docs for ViewModels look like.

Every View Model constructor takes a [View](https://developers.arcgis.com/javascript/beta/api-reference/esri-views-View.html). There might be a couple that take an extra property, but at minimum, they need the View. From there, they will interact with the View as needed and provide methods and properties you can hook into create your own interface.

### React

I'm a [big fan of React](http://odoe.net/blog/esrijs-reactjs/), like I [really dig React](https://geonet.esri.com/people/odoe/blog/2015/04/01/esrijs-with-reactjs-updated). React isn't so much a framework as it is a UI library, but that makes it a perfect candidate for using with View Models. I've already demonstrated in the past how easy it is to use React with the ArcGIS JS API, and now it just got easier.

Here is the [sample repo for using React with ArcGIS JS API View Models](https://github.com/odoe/esrijs4-vm-react).

In this sample, everything is a React component using View Models, even the Zoom buttons.

[gist id=f4a866de5bc02680f12f]

As you can see, the plus/minus buttons for the zoom control will enable/disable based on the max/min zoom level of your View. This is a regular React component that has the ZoomViewModel as it's state and some other state dependencies based on the state of the ZoomViewModel. We just watch for some property changes.

This doesn't look too different from the default widget, so let's try something more interesting, like [BasemapToggle](https://developers.arcgis.com/javascript/beta/api-reference/esri-widgets-BasemapToggle.html) widget.

[gist id=8f0da49e4a4e83c272dd]

This is a slightly more complicated UI that will display the basemaps as two little picture cards that switch spots as you toggle the map.

![basemaptoggle](images/basemaptoggle.png)

With the entire UI built as React components, I can even do cool stuff like add a transparency to the whole UI as you interact with the map view.

You can see a [live demo here](http://odoe.github.io/esrijs4-vm-react/).

### Ember

I've talked before about the [work to get Ember working with the ArcGIS JS API](http://odoe.net/blog/tag/ember/). There's been even more improvements made on the [ember-cli-amd addon](https://github.com/esri/ember-cli-amd) thanks to some solid contributions.

I like Ember, a lot. It can take some getting used to and could be a bit constraining at times, especially when using the ember-cli, but at least it's uniform. I don't agree with everything Ember does, but it's still a very solid framework that makes app development very consistent.

Here is the [sample repo for using Ember with ArcGIS JS API View Models](https://github.com/odoe/esrijs4-vm-ember).

Ember makes it incredibly easy to use View Models, because it's very easy to pass properties between components.

[gist id=4d011156cfbaf4ce70f9]

The UI for these is very simple and you can pass the _view_ between them very easily.

Let's look at the Home Button component.

[gist id=b78a3c43dd133e56c0b3]

Very simple, when the view is added, it creates a new View Model. When it's clicked, it uses a method on the View Model to return to the default extent of the View. _No fuss_.

This sample also demonstrates how the map is treated as a data source for the view and how you might use that in an Ember application.

[gist id=53c72f33523a3509d96f]

We treat the map as an [Ember service](https://guides.emberjs.com/v1.10.0/understanding-ember/dependency-injection-and-service-lookup/) and this allows us to take advantage of dependency injection to add it to our Map View component.

Ember actually turns out to be a great example of using View Models from the ArcGIS JS API.

### Angular 2

One of the most popular posts on this blog is [Using Angular with ArcGIS JS API](http://odoe.net/blog/using-angularjs-with-arcgis-api-for-javascript/). I have an odd relationship with Angular 1. I can appreciate it, but at times I curse it for being over-engineered. I may get crap for it, but that's how I feel. It's a solid framework and there's no denying it's a popular one.

I haven't really had an opportunity to work with Angular 2 much, but I have been wanting to give it a solid try.

Here is the [sample repo for using Angular 2 with ArcGIS JS API View Models](https://github.com/odoe/esrijs4-vm-angular2).

One of the things I've been ashamed of is that I couldn't figure out how to use the [Dojo AMD loader](https://dojotoolkit.org/reference-guide/1.10/loader/) in the JS API with [SystemJS](https://github.com/systemjs/systemjs), which is what Angular 2 uses. I recently came across a sample where someone was using [System.register()](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/system-register.md) to pre-load AMD modules into SystemJS to get this working. This is very similar to what the [ember-ci-amd addon does](https://github.com/Esri/ember-cli-amd/blob/master/start-template.txt) to work with the funky loader Ember uses.

So after many beers and tears, I came up with [this solution](https://github.com/odoe/esrijs4-vm-angular2/blob/master/app/load.ts).

[gist id=696a36de99a1c5307552]

You basically require your dependencies first, then iterate over them and create a dummy modules in SystemJS and add each dependency to it. This method could probably use some fine-tuning, but it works.

With that done, I could create some components.

[gist id=911873776f72805d9d27]

Directives are basically just components now and I guess become directives when part of another component. I kind of wish they would have come up with a different naming convention here. But it works ok. Again, View Models work just fine in this situation. I had issues working the subscribing to [RxJS 5 Subjects](https://github.com/ReactiveX/RxJS) used in Angular 2, so I fell back to [dojo/topic](https://dojotoolkit.org/reference-guide/1.10/dojo/topic.html) to pass service updates around.

Again, I don't know Angular 2 very well yet, so this code could probably be a little better.

Here is a [live demo](http://odoe.github.io/esrijs4-vm-angular2/) of using View Models with Angular 2.

### Elm

So [Elm](http://elm-lang.org/) isn't really a framework so much as it is an entirely different language that compiles to JavaScript. It doesn't look like JavaScript and doesn't behave like JavaScript, but it's got a solid reactive UI implementation similar to React that [I've talked about before](http://odoe.net/blog/typescript-elm-and-arcgis-api-for-javascript/).

Here is the [sample repo for using Elm with ArcGIS JS API View Models](https://github.com/odoe/esrijs4-vm-elm).

Elm works with your parent JavaScript application by use of [ports](http://elm-lang.org/guide/interop), so I need a JavaScript layer to work with the View Model that will power the Elm application that builds the UI.

[gist id=8559664d5ea95a1d0829]

In this file, I initialize the View Model and pass all updates to the Elm application.

[gist id=bee95631e7ee79cc4ff1]

The Elm app will take the updates from the View Model and maintain the state of the UI. So for the [SearchViewModel](https://developers.arcgis.com/javascript/beta/api-reference/esri-widgets-Search-SearchViewModel.html) it will take the suggested search results and add them as a list to the UI. This is also an example where the UI component doesn't need _everything_ from the View Model, so you only need to handle what you need and not implement everything in the View Model.

Here is a [live demo](http://odoe.github.io/esrijs4-vm-elm/dist/) using the SearchViewModel with Elm. It's still needs some work, as I think I'm updating the state too often, but it's a good start.

## Code what you want

I could keep going, adding even more frameworks. I could Angular 1, Knockout, Backbone, Mithril and on and on, _but I think you get my point_.

**View Models give you the freedom to build your UI as you wish.**

Here is a summarized list of frameworks with View Models samples.

- [React](https://github.com/odoe/esrijs4-vm-react)
- [Ember](https://github.com/odoe/esrijs4-vm-ember)
- [Angular 2](https://github.com/odoe/esrijs4-vm-angular2)
- [Elm](https://github.com/odoe/esrijs4-vm-elm)

If you're using ViewModels, _you're going hardcore_. If you don't need to dig that deep, stick with the out-of-the-box widget implementations. They're well tested and simply work.

But... if you _have that itch_ and you area already building your application around another framework, you should be able to easily integrate View Models with them.

The View Models are still being tested and some of the APIs may change, so keep an eye out for when the 4.0 final lands in the future to see what changes might come about.

Until then, give the View Models a try and see what you can come up with. Most of all, have fun!
