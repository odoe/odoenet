---
title: "Polymer with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2015-09-14"
tags: geodev
coverImage: "esrijs-polymer.jpg"
---

If you are a web developer, you've probably been waiting for [Web Components](http://webcomponents.org/) to become the de facto standard for UI in your web apps. [We all have](https://hacks.mozilla.org/2015/06/the-state-of-web-components/). This [recent talk from Forward 3](https://www.youtube.com/watch?v=AvgS938i34s) encourages using web components now, but not in the way you'd think. Basically almost every framework is using some form of components. Whether it's [Ember](http://guides.emberjs.com/v1.10.0/components/), [Angular Directives](http://www.sitepoint.com/practical-guide-angularjs-directives/), [React Components](https://facebook.github.io/react/docs/reusable-components.html) or it could be argued even [declarative Dojo with Dijits](https://dojotoolkit.org/documentation/tutorials/1.10/declarative/). The point being these frameworks recognize the value of components and we want them now, _browser vendors be damned, we're going to use them!_

[Polymer](https://www.polymer-project.org/1.0/) is probably the major library that allows you to develop web components for your applications. The 1.0 version landed not too long ago and it had some breaking changes if you were using earlier versions, _in case you didn't notice yourself ripping your hair out_. So there's little reason you can't use it for your own ArcGIS API for JavaScript development. As a matter of fact, there is an [esri-polymer](https://github.com/JamesMilnerUK/esri-polymer) library of components available from Esri UK. This is a nice collection of components that can help you compose your application. Old-school [Flex developers](http://www.adobe.com/products/flex.html) might see a resemblance to [MXML](http://help.adobe.com/en_US/flex/using/WS2db454920e96a9e51e63e3d11c0bf5f39f-7fff.html). Everything comes full-circle man.

I've been testing out the [ArcGIS JS 4.0beta](https://developers.arcgis.com/javascript/beta/) with various libraries and I've found that some features of the 4.0beta lend itself very well to Polymer. I am a fan of [Accessors](http://odoe.net/blog/arcgis-js-api-4-0beta1-accessors/) in the beta and it turns out that Accessors work out great as Models for Polymer components.

Let's check out what a simple model to display map extents may look like. [gist id=f01b8567a2e91e8ca110]

Here, we're using Accessor to create a model with some metadata. This basically tells the model that the **extent** property is an [Extent](https://developers.arcgis.com/javascript/beta/api-reference/esri-geometry-Extent.html).

This let's us define a simple Controller that will just watch for changes on the model and update a view. [gist id=9bb4c55539f305572b21]

That's not too tricky. We have a reference to a Component coming from a ViewProxy (this is just what I called it, maybe it could use a better name). Let's look at the component now. [gist id=c9c946d22653bf3f36bd]

This ViewProxy is simply in charge of adding the required **import** statements to the page to use the Polymer component. It has an _update_ method that will update the attributes of the component. Now let's check out out Polymer component. [gist id=3eb0473e7f9582d83a2f]

This is a pretty standard Polymer component. We're even using some [computed properties](https://www.polymer-project.org/1.0/docs/devguide/properties.html) to adjust the precision of the extent values.

You can find the [entire application on github](https://github.com/odoe/esrijs-polymer).

As you can see, Polymer makes it pretty easy to start taking advantage of Web Components in your application development today. The beauty here is you can start composing these components into entire user interfaces to simplify your development workflow. Maybe just compose the UI and let a designer spruce it for you with some nice CSS styling.

If you want a more robust implementation, I highly recommend [esri-polymer](https://github.com/JamesMilnerUK/esri-polymer). But looking forward at ArcGIS 4.0 it's nice to see how you could work with Polymer using [Accessor](https://developers.arcgis.com/javascript/beta/api-reference/esri-core-Accessor.html) to drive your updates.
