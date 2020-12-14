---
title: "Communicating with Embedded Map Apps"
published: true
author: Rene Rubalcava
date: "2016-08-01"
tags: geodev
coverImage: "embedded-communication.png"
---

Sometimes you want to embed a mapping application into a separate application via an [iframe element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe). You may want to embed in a dashboard application or some other application related to the data on the map, but the map is not the main focus of the application.

_The question at this point becomes how can you communicate with the map when you need to?_

You can use [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to handle that communication pretty easily. If you wanted to add some sort of data validation or have some more control of the messages as they are passed around, you could initialize a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to send the messages.

It really depends on what your particular needs are to be able to communicate with embedded mapping applications. You can even run two different version of the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) and communicate between them.

So sit back and check out the following video for a demonstration on _Communicating with Embedded Map Apps_.

<iframe width="560" height="315" src="https://www.youtube.com/embed/oaumE7-w02s" frameborder="0" allowfullscreen></iframe>
