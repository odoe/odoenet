---
title: "ArcGIS for Web Developers: Part 1"
published: true
author: Rene Rubalcava
date: "2019-07-08"
tags: geodev
coverImage: "arcgis-webdev-1.png"
---

## Introduction

Are you a web developer that wants to bring maps into your existing applications? I wanted to cover some basics of building web mapping applications and how you can leverage the ArcGIS Platform and the ArcGIS API for JavaScript to do it!

The [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) is a tool of the larger ArcGIS platform. If you are interested in learning how to use the ArcGIS API for JavaScript to build web applications, it is worth knowing ho to use the platform to your advantage. There's a lot [you can do](https://developers.arcgis.com/features/) with ArcGIS. From geocoding, routing, to analysis, and a _geocornicopia_ of content for you to use!

## What makes up a map?

When we talk about making maps for web apps, what does that actually mean? A map consists of layers. Layers, in the map sense, are distinct sets of spatial data. They could be roads, buildings, store locations, population, or any other type of data that has a spatial component.

![](images/map-layers.png)

Map Layers

A map contains information about the layers. it also contains information about the extent of the map and more. You can read more in this documentation on [What is a Web Map](http://doc.arcgis.com/en/arcgis-online/reference/what-is-web-map.htm).

## Free Developer Account

If you really want to learn to use the ArcGIS API for JavaScript to its fullest potential, I highly recommend you sign up a _[Free](https://developers.arcgis.com/)_ [ArcGIS Developer account](https://developers.arcgis.com/). This will give you access to all the premium content and ArcGIS premium services to get crazy with! All for the low cost of _free-ninety-nine_.

## Lets's make a map

When you log in to you ArcGIS developer account, you'll be presented with a dashboard with lots of information. Feel free to explore the dashboard to satisfy your curiosity. What we want to focus on today is the _New Web Map_ link under the ArcGIS Online section of the dashboard.

![](images/Screen-Shot-2019-07-01-at-10.49.09-AM-1024x174.png)

Developer Account Dashboard

At this point you're going to be directed to the Online Map Viewer. The Map Viewer is a great tool that you can use to search, and view data, you can explore the datasets, experiment with visualizations, and save and share your maps with others!

![](images/Screen-Shot-2019-07-01-at-10.52.23-AM-1024x674.png)

ArcGIS Online Map Viewer

You start with a basic map with a basemap. But let's make it interesting and add some data to this map. You can click on the _Add_ button and you are going to _Browse Living Atlas Layers_. [Living Atlas](https://livingatlas.arcgis.com) is a collection of curated data in the ArcGIS platform. Some of it is put together by Esri, but a lot of it is published by other content providers on the platform.

![](images/Screen-Shot-2019-07-01-at-10.54.48-AM.png)

Browse Living Atlas Layers

Search for _los angeles_ and click on the **+** button next to the first result in the list. I'll select the _Los Angeles Transit Stops_.

![](images/Screen-Shot-2019-07-07-at-2.40.33-PM-1024x541.png)

Transit Stops Data

Once you've done that, click on the _Details_ button at the top. Now, click on the save icon to save your map to your Online account. Give your map a name, and add at least one tag. The description is optional.

![](images/Screen-Shot-2019-07-01-at-11.01.07-AM.png)

Save Web Map

With the map saved, click on the _Share_ button and check on the _Everyone (public)_ option and click on the _Done_ button. Your map is now available for everyone to view!

_Awesome!_ You just made your first Web Map with ArcGIS! You can now copy the URL and share it with others. But let's make things a little more interesting. Let's consume this webmap in your own application.

Copy the URL and save the webmap id, which will be in this format of the URL. _?webmap=WEBMAP\_ID_.

Go to [developers.arcgis.com/javascript](https://developers.arcgis.com/javascript/) and take a look around before we dive into using your own Web Map with JavaScript.

## My First Web Map

Let's dive right into making a map!

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <title>My First Map</title>
    <style>
      html,
      body,
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
    </style>

    <link
      rel="stylesheet"
      href="https://js.arcgis.com/4.12/esri/themes/light/main.css"
    />
    <script src="https://js.arcgis.com/4.12/"></script>

    <script>
      require(["esri/WebMap", "esri/views/MapView"], function(WebMap, MapView) {
        // create a map instance
        const webmap = new WebMap({
          portalItem: {
            id: "be4b2af07b5a4d40a4deeae1b11fe3cc"
          }
        });

        // create a view to display
        // our map data
        const view = new MapView({
          container: "viewDiv",
          map: webmap
        });
      });
    </script>
  </head>

  <body>
    <div id="viewDiv"></div>
  </body>
</html>
```

Don't worry too much about the details at this point. In the sample, we are doing a couple of things.

First, creating a [WebMap](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html) that will use the given **webmap id** by providing a _portalItem_ to the WebMap. When working with the ArcGIS API for JavaScript and items from ArcGIS Online, they are referred to as Portal Items. You can learn more in the documentation on _[Working with the ArcGIS Platform](https://developers.arcgis.com/javascript/latest/guide/working-with-platform/)_.

Second, you create a [MapView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) that will draw the data contained in our web map. It is the job of the MapView to read the contents of the map, determine what layers to draw, at what scale they should be drawn and how to center the map.

```js
require(["esri/WebMap", "esri/views/MapView"], function(WebMap, MapView) {
  // create a map instance
  const webmap = new WebMap({
    portalItem: {
      id: "be4b2af07b5a4d40a4deeae1b11fe3cc"
    }
  });
  // create a view to display
  // our map data
  const view = new MapView({
    container: "viewDiv",
    map: webmap
  });
});
```

Congratulations! You just authored your fist web map and consumed it in a web app! In this series on ArcGIS for Web Developers, we'll cover some more basics, so stay tuned and _happy geohacking_! In the meantime, you can have fun with the [ArcGIS Developer tutorials](https://developers.arcgis.com/labs) to learn more!
