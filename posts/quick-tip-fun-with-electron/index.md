---
title: "Quick Tip: Fun with Electron"
published: true
author: Rene Rubalcava
date: "2015-05-25"
tags: geodev
coverImage: "electron-leaflet.png"
---

Have you tried out the [Atom editor](https://atom.io/)? It has some nice features as far as editors go, however one of the most interesting things about is the fact that it uses atom-shell, which is now called [Electron](http://electron.atom.io/). Electron is a built on [node.js](https://nodejs.org/). What does that even mean? That means we have transitioned from JavaScript in the browser, to JavaScript in the server to JavaScript on your desktop. With Electron, you can now write and distribute desktop applications written entirely in JavaScript. It's reminiscent of what Adobe AIR was for Flash, without the plugin requirements.

I've been playing around with Electron a bit to just get my feet wet. It has some really neat features. Technically, you can add a [Browser Window](https://github.com/atom/electron/blob/master/docs/api/browser-window.md), disable node support for the window and just copy paste your JavaScript application and be up and running with a web app in Electron.

Yeah, that's right, you can have a web app with built-in node support. This means you have access to all the normal node stuff you'd expect, file system as well as other modules you might add via npm. So if you were to add [Leaflet](http://leafletjs.com/) and [Esri-Leaflet](https://github.com/Esri/esri-leaflet) as npm modules, you could just write some code like this and it would work.

\[gist id=05ad9e876d4942ccbb84\]

The code to start the app is just taken from [the docs](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md).

I did have some issues trying to request GeoJSON data from an external service and load it into the map. If I happen to figure this out, I'll post an update.

I put this quick sample on [github](https://github.com/odoe/leaflet-electron) if you want to try it out. I'm still playing around with Electron, mixing node and non-node environments. The cool part here is you can spawn new process, ala web workers, to handle some heavy lifting for you. A very nice sample app I found while digging around was [this one](https://github.com/mick/geojsonapp) that can preview local GeoJSON files.
