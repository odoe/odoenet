---
title: "dbind in your ArcGIS JS apps"
published: true
author: Rene Rubalcava
date: "2015-02-02"
tags: geodev
coverImage: "dbind.jpg"
---

Dojo has a lot of strength in it's [Dijit](http://dojotoolkit.org/reference-guide/1.10/dijit/) library. Dijits can be used to build very basic reusable user interfaces or wire together some very complicated interfaces. One example is that of [FreeNAS](http://dojotoolkit.org/blog/case-study-freenas) which has a pretty extensive interface. You can get some good tips on building a custom widget [here](https://dojotoolkit.org/documentation/tutorials/1.7/recipes/custom_widget/) and [here](http://dojotoolkit.org/reference-guide/1.10/quickstart/writingWidgets.html#quickstart-writingwidgets).

### I hear you like widgets

When you build a widget, you would at minimum extend [\_WidgetBase](http://dojotoolkit.org/reference-guide/1.10/dijit/_WidgetBase.html). **\_WidgetBase** also extends [Stateful](http://dojotoolkit.org/reference-guide/1.10/dojo/Stateful.html) which allows you to use **get/set** methods in your widget. This also includes using a [watch](http://dojotoolkit.org/reference-guide/1.10/dojo/Stateful.html#watch) method that allows you to do something when a value is changed via the \*set\* method.

Traditionally this is where you may update DOM elements to match newly updated properties. There are plenty of things you may want to do in a _watch_ method, but if you've written enough simple widgets that simply update some text or other DOM element that doesn't need to much, it can get a little tedious typing up all these watch methods. Luckily, there's a handy module you can add to your app called [dbind](https://github.com/kriszyp/dbind).

### The ties that dbind

dbind is kind of neat because it simply binds a DOM element to the values of an object. I would highly suggest reading the docs on dbind, as it even includes some validation and has a couple of neat tricks you can do with it. But of course, as with most things, nothing speaks louder than a functional example.

Let's say you simply wanted to display the name of a State as you hovered your mouse over it. Sounds simple enough right? Well dbind can make this even simpler.

[JS Bin](http://jsbin.com/cusejogaje/1/embed?js,output)
<script src="http://static.jsbin.com/js/embed.js"></script>

In this sample, you simply bind the DOM element to the _STATE\_NAME_ property and when you _mouse-over_ the _FeatureLayer_ use the _set_ method to set this value. It all comes together in a nice little package.

### Piece it all together

This may not seem like a big step in your widget development, but it's one of those things that comes in really handy as you start building out your apps in small pieces and want to get creative in how and when things may get updated. I have a couple of widgets where a widget module may be a single list item, so dbind is great in this case. I'll be honest here, it doesn't look like too many updates have been made to the project over the past couple of years, but it does what it needs to do pretty well as far as I can tell, so it may just not need too many updates. It simply _works as advertises_.

So take dbind for a spin in your app development and simplify your workflow.
