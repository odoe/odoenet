---
layout: "../../layouts/BlogPost.astro"
title: "F'ing with FMap in FlexMapTools"
published: true
author: Rene Rubalcava
pubDate: "2010-07-10"
---

I'm going to try to use the next few blog posts to go over how I use the tools I've provided in the [FlexMapTools](http://github.com/odoe/FlexMapTools) toolbox I put up on github.

The first is the [FMap](http://github.com/odoe/FlexMapTools/blob/master/src/net/odoe/FlexMapTools/components/FMap.as) component, which extends the [ESRI Map](http://help.arcgis.com/en/webapi/flex/apiref/com/esri/ags/Map.html) component. This component started as a way to control the position of the ESRI logo in the application. In previous releases the [ESRI Flex API](http://help.arcgis.com/en/webapi/flex/index.html) and even the beta version of 2.0, the logo fit just perfectly in the layout of one of the main projects I am working on, but in the final 2.0 release it was moved slightly to fit in with the [FlexViewer](http://help.arcgis.com/en/webapps/flexviewer/index.html) layout. Now, it's easy enough to set the logo visibility to false, ESRI provides this out of the box, but I kind of like the look of the new logo. Being a little annoyed that this little bit in the API was catered to the FlexViewer rather than the other way around, I decided to just extend the Map component and move it myself.

![](images/normal_map.jpg)

[caption id="" align="alignnone" width="183" caption="Logo position set to fit application layout."]![](images/fmap_inaction.jpg "logomoved")[/caption]

ESRI was kind enough to give us access to a staticLayer Group component in the Map that is used to hold the navigation tool, scalebar and the logo. You could pretty much add what you want in here. So all FMap does is add a Number property called logoToBottom that will be used to position the logo. `if (logoToBottom > 0) { var i:uint = 0; var x:uint = this.staticLayer.numChildren; for (i; i < x; i++) { // logo should be only image object in staticlayer // but this could change in future releases if (this.staticLayer.getChildAt(i) is Image) { // set the bottom property of the image (this.staticLayer.getChildAt(i) as Image).bottom = logoToBottom; } } }`

That's pretty simple.

The next thing I decided to do that is pretty common in a lot of applications was to display coordinates. The FMap component assumes you are working with the WebMercator coordinate system that is all the rage these days and also that you want to display normal WGS1984 coordinates, because you do not want a user filling out some permit paperwork using WebMercator coordinates, so be aware of this. If you would like to convert to a different coordinate system, you're going to have to handle the math in your application. Sending them to a Geometry Service to process on a MouseMove event will bring your application to a crawl.

I add a showLatLong Boolean property the Map and check that in an override of createChildren. `if (showLatLong) { labelArea = new SkinnableContainer(); latLong = new Label(); // check for css style name, can be managed in main application // with normal font/color styles or a skin labelArea.styleName = "latLongText"; labelArea.bottom = 2; labelArea.left = 5; latLong.text = "Coordinates"; // add label to group labelArea.addElement(latLong); // add group to the staticLayer this.staticLayer.addElement(labelArea); // update the text with the MouseMove event on the map this.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove_handler, false, 0, true); }` `protected function onMouseMove_handler(e:MouseEvent):void { if (this.spatialReference && this.spatialReference.wkid == 102113) { const mapPoint:MapPoint = this.toMapFromStage(e.stageX, e.stageY); const coord:MapPoint = WebMercatorUtil.webMercatorToGeographic(mapPoint) as MapPoint; latLong.text = "Lat: " + coord.y.toFixed(6) + " / Long: " + coord.x.toFixed(6); } }`

Notice that the group has a styleName defaulted to "latLongText". This allows you to set the style in your stylesheet. If you have not looked into really using css with your Flex 4 applications, you owe it to yourself to look some stuff up. I've gotten quite a bit of use out of it recently. This allows me to do something like this in my css.

`.latLongText { skinClass: ClassReference("spark.skins.spark.SkinnableContainerSkin"); backgroundColor: "0xF0F8FF"; backgroundAlpha: 0.8; }/`

`.latLongText s|Label { fontSize: 10; fontWeight: bold; paddingBottom: 2; paddingTop: 2; paddingLeft: 2; paddingRight: 2; }`

![](images/coordinates.jpg)

As you can see, css can be a valuable tool in drilling down into the components inside components to manipulate their styles. Remember all this sits in the actual FMap component and can be used from project to project. And because it extends the default Map component, it can be passed into any component/object/function that asks for the default Map component. This should include any widgets you might use in FlexViewer. I also add an eventListener to listen for the REMOVED_FROM_STAGE event, that will handle some cleanup by setting the stuff I added to null. It may be overkill, but I've gotten used to doing this when dealing with custom components.

If there are certain things I did in FMap that don't fit your needs, you could always modify it to fit your project workflow. Maybe you want the logo somewhere else, add settings to modify the top/left/right properties of the logo and go nuts.

I'll cover some of the other tools in the FlexMapTools toolbox in future postings and if you have any questions, suggestions, critiques, please feel free to share.
