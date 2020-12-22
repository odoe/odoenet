---
title: "Build apps with the @arcgis/cli"
published: true
author: Rene Rubalcava
date: "2018-06-28"
tags: geodev
coverImage: "jsapi-cli.jpg"
---

A cool new tool was [recently announced](https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/introducing-a-cli-for-the-arcgis-api-for-javascript/) to help you build apps with the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/). The [@arcgis/cli](https://github.com/esri/arcgis-js-cli).

It's fairly easy to set up: `npm install -g @arcgis/cli`

Now you can start using it to quickly scaffold new applications using the ArcGIS API for JavaScript.

```
arcgis create awesome-app
```

it seems like just about every framework out there has a cli to use these days, starting with Ember which still has probably the most extensive cli tooling available, But plenty of others have popped up over the past couple of years, [@angular/cli](https://cli.angular.io/), [create-react-app](https://github.com/facebook/create-react-app), [@vue/cli](https://github.com/vuejs/vue-cli) and my recent favorite, [@dojo/cli](https://github.com/dojo/cli).

The @arcgis/cli is a little simpler than those solutions, as once you've scaffold your applciation, you don't need to keep using the cli, unless you want a little extra, _I'll get to that in a second_. The configuration for TypeScript, testing, and webpack are part of the output so you can update them to meet your needs. Now, this might remove some of the hand-holding and adherance you get with other CLIs, it also let's you shoot yourself in the foot if you choose to do so and break the configuration. _That's just part of the game my friend!_

I personally find myself a little frustrated at times when I want to modify some configuration with webpack or maybe css and I can't do it the way I want until I eject an application from the cli. But there's also comfort in knowing a cli will keep everything uniform and protect you in most cases. There are trade offs, but I can live with that.

So what exactly do you get out of the box? You get a ready to use and scalable application!

- Built with [TypeScript](http://www.typescriptlang.org/)
- Preconfigured with webpack and the [@arcgis/webpack-plugin](https://github.com/esri/arcgis-webpack-plugin), check out my [previous post](http://odoe.net/blog/put-arcgis-js-api-into-your-webpack/) for more info
- Develop with hot-module-reloading
- Deploy production builds with optimizations, Service Workers and other [PWA](https://developers.google.com/web/progressive-web-apps/) configuration
- Unit testing with [Intern](https://theintern.io/)
- [Custom Widgets](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)

You can see the output of a scaffoled application [in this repo](https://github.com/odoe/arcgis-cli-app).

It's never been easier to get started building apps with the ArcGIS API for JavaScript!

_The cli doesn't stop there though_. If you're interested in building custom widgets with the API, you can scaffold a widget using the `arcgis widget <widget-name>` command.

This will output a simple custom widget and unit tests for the widget! You can see what the template widget looks like [here](https://github.com/Esri/arcgis-js-cli/tree/master/templates/widget).
