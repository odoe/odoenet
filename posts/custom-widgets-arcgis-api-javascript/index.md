---
title: "Custom Widgets in the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2017-01-05"
tags: geodev
coverImage: "widgets.jpg"
---

One of the new features introduced with the ArcGIS API 4 for JavaScript recently in the 4.2 release is the introduction of a new [widget framework](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html) you can use to build custom widgets with the API.

You are not required to use this widget framework, you can always just build your own widgets how you want to, but the widget framework is how the out-of the-box widgets of the API are being built.

There is some great documentation in the SDK on how to create your own custom widgets, and a [great sample](https://developers.arcgis.com/javascript/latest/sample-code/widgets-custom-recenter/index.html) you can review as well.

In this video, I just wanted to walk you through a basic chart widget built with the new widget framework. It's not too fancy, but gives you a good idea of how you can create data-driven widgets in the ArcGIS API 4 for JavaScript.

You can find the sample code used in this videol on [github](https://github.com/odoe/esrijs4-ts-demo). It has a couple of fixes not in the video, like a rendundant use of `renderable()` in the Widget View Model.

<iframe width="560" height="315" src="https://www.youtube.com/embed/GruNa7cWgKU" frameborder="0" allowfullscreen></iframe>
