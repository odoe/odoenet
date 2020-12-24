---
title: "Drag and Drop Services to Map"
published: true
author: Rene Rubalcava
date: "2010-09-14"
---

Recently a conversation came up at work about making a tool that would allow us to drag and drop any of our existing Map Services on our [ArcGIS Server](http://www.esri.com/software/arcgis/arcgisserver/index.html) to a Map using the [ESRI Flex API 2.0](http://help.arcgis.com/en/webapi/flex/index.html). It wasn't critical, but I had a bit of downtime today and after some tooling around I managed to put together a component that I have added to the [Flex](http://github.com/odoe/FlexMapTools)[MapTools](http://github.com/odoe/FlexMapTools) library.

An example can be seen [here](https://odoe.net/thelab/flex/serviceslist/Index.html).

The source code for the component is [here](http://github.com/odoe/FlexMapTools/blob/master/src/net/odoe/FlexMapTools/components/ServiceList.as).

It has a required [Skin](http://github.com/odoe/FlexMapTools/blob/master/src/net/odoe/FlexMapTools/components/skins/ServiceListSkin.mxml) and [ItemRenderer](http://github.com/odoe/FlexMapTools/blob/master/src/net/odoe/FlexMapTools/components/itemRenderers/ServiceListItemRenderer.mxml) as well.

It works by passing it the target Map and calling a loadServices() function passing the URL of your ArcGIS Server, as in `http://sampleserver1.arcgisonline.com/ArcGIS/rest/services`

Enjoy, and as usual any feedback and critique is welcome.
