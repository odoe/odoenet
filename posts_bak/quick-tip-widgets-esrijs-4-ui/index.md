---
title: "Quick Tip: Widgets in EsriJS 4 UI"
published: true
author: Rene Rubalcava
date: "2016-05-23"
tags: geodev
coverImage: "custom-widgets.png"
---

Some of you might still be digging into the new [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/latest/index.html).

One of the really cool new features in this version is the introduction of a layout UI for the views. You can read a little more about the [View UI here](https://developers.arcgis.com/javascript/latest/guide/view-ui/index.html).

What the View UI gives you is a built-in way to add your widgets to your application without having to put too much work into how those widgets will be positioned. The UI container even manages max-heights for the UI elements and is responsive.

A really great feature of this UI is that you can either place the out-of-the-box widgets in here or your own custom built widgets.

For example, let's say that I wanted to display the [Legend widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html) in my view, but I wanted to be able to turn it on and off.

There's a few ways you could handle this, after all the Legend widget has a [visible property](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html#visible) that you can just set as needed.

So I'm thinking, maybe have a button displayed in my UI that when clicked will display the widget.

_Simple_

<script src="https://gist.github.com/odoe/80b544257ac13a184ad71e742e8bae8f.js"></script>

Ok, so all we're doing here is creating a simple container for our widget with a button. I'm even borrowing some of the default API class names for my button so it looks like other buttons and widgets in the API. I just apply a couple of custom styles to adjust the width of the button to match the Legend widget size.

[![Legend Widget](images/lgnd-widget.png)](http://jsbin.com/fekara/2/edit?js,output)

You can see this widget in action below.

[Custom Widget on jsbin.com](http://jsbin.com/fekara/3/embed?output)


As you can see, it's pretty easy to create not only custom widgets, but pretty simple widget containers. You can even reuse existing class names in the API so that your widgets look similar to the built-in widgets.

If you want to learn more about widgets and much more about the ArcGIS API 4 for JavaScript, check out this [training seminar](http://training.esri.com/gateway/index.cfm?fa=catalog.webCourseDetail&courseid=3059) and you can also get [my book here](https://leanpub.com/arcgis-js-api-4).
