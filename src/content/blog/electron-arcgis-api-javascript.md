---

title: Electron with ArcGIS API for JavaScript
published: true
author: Rene Rubalcava
pubDate: 2017-04-27
tags: geodev
heroImage: '../../assets/blog/electron-arcgis-api-javascript/images/esri-electron.png'
description: Many moons ago, I tried my hand at some Electron. I even tried it
  out with esri-leaflet and it was pretty straightforward.
---

Many moons ago, I tried my hand at some [Electron](https://electron.atom.io/). I
even tried it out with
[esri-leaflet](https://odoe.net/blog/quick-tip-fun-with-electron/) and it was
pretty straightforward.

Recently, a couple of
[github issues](https://github.com/tomwayson/esri-loader/issues/21) popped up
related to this and I realized, I had not talked about how I was using the
[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) with
Electron. There is one small tweak you need to do for the AMD loader to work as
expected.

```js
const nodereq = window.require;
```

_That's it_. Just rename the default Node `require` in the Browser app of your
Electron project and the AMD loader will play nicely. Once you get that far, the
wheels are off and you can go full steam using Node modules in your application,
and [ipc](https://electron.atom.io/docs/api/ipc-main/) to communicate with the
main node process to do some really neat stuff.

In my browser app, referred to as the _renderer process_, I can do something
like this.

```js
ipcRenderer.send("upload-shp", filepath);
```

Then in the _main process_, I can listen for that message.

```js
ipcMain.on("upload-shp", (event, arg) => {...})
```

In this [sample app](https://github.com/odoe/electron-add-shapefile) I just
build an app that lets me drop shapefiles into the app, that file is passed on
to the main process via ipc messaging, and the parsed results are returned to
the browser app and displayed. _Eazy-peezy_.

I'm sure there's a lot of really cool stuff you could do with Electron and the
ArcGIS API for JavaScript, I'm just scratching the surface and really just
wanted to share with you how to get the ball rolling.

I hope you enjoy the video, _comment, like, subscribe!_

<lite-youtube videoid="00kIOSUog7U"></lite-youtube>
