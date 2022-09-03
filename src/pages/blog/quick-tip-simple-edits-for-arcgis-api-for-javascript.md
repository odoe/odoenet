---
layout: "../../layouts/BlogPost.astro"
title: "Quick Tip - Simple Edits for ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: "2015-03-02"
tags: geodev
coverImage: "esri_edits.png"
---

Do you do some basic editing in your ArcGIS API for JavaScript? Do you find yourself writing the same code over and over again? Yeah me too.

I was doing this enough that I had decided to just turn basic feature editing functions into a widget. This doesn't really concern itself with attachments or attribute editing, my main goal for this was users that just need to edit polygons quickly, but it can work with lines or points. The repo can be found [here](https://github.com/odoe/esri-simpleedit-widget).

Here is what the code looks like.

[gist](https://gist.github.com/odoe/51ca2718a58f1072a982)

What this widget does is take in some parameters that define what layers you want to edit. Those parameters define the type of editing to do. Most of this will probably look familiar to you if you have worked with the edit tools before. One thing it does that is kind of neat is displays a [dialog](http://dojotoolkit.org/reference-guide/1.10/dijit/Dialog.html) to verify that the user wants to delete an item. The widget also handles some mouse events, which I will admit have been a little hit or miss on mobile devices for me in the past. Seems to work fine on Android, but once in a while I run into issues on iOS. It will _attempt_ to determine if you are on a touch enabled device or not. It uses a \_gestureMixin that is shown below.

[gist id = 59cde446aaa2b687c664]

This mixin checks to see if the device is touch enabled and that there are editable layers. It will use the [dojox/gesture](http://dojotoolkit.org/reference-guide/1.10/dojox/gesture.html) modules to help with working with touch gestures on the device. This will enable you to hold your finger on a feature for a second and get a popup asking if you want to delete it or not.

A sample configuration of options would look something like this.

[gist](https://gist.github.com/odoe/d2f63fbe6a845e8e38a2)

This assumes you also pass the map as part of the parameters. Unfortunately, due to the nature of editing in the browser, it requires a proxy, so I can't really show a live demo of this tool in action, but feel free to try it out, take it apart, make it your own.

### Key is to automate

This widget is still in what I would call the **highly experimental** phase. I do use it in production, but only after extensive testing on the iPads the app us being used on. An ArcGIS API for JavaScript or iOS update could break the whole thing, so use with caution. The main takeaway is I would encourage you to try and modularize tasks that you do on a regular basis such as edits or form creation. Start building a library of modules that you can stash away for constant reuse and enjoy the benefits of your hacking investments.
