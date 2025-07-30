---

title: Drag and Drop Editing, Because We Can.
published: true
author: Rene Rubalcava
pubDate: 2012-10-03
description: I thought I would share what I thought was a neat little utility I
  made to handle dragging and dropping an image in your application onto a map
  to add it as a point.
---

I thought I would share what I thought was a neat little utility I made to
handle dragging and dropping an image in your application onto a map to add it
as a point.

A typical web editing scenario might have you use the ArcGIS JS
[Template Picker](http://help.arcgis.com/EN/webapi/javascript/arcgis/help/jssamples/ed_feature_creation.html)
widget to add new data to a map. It's a great robust widget, but I had a need to
edit data and I could not use this widget, so I pretty much replicated it where
I click on an image, click on the map and voila, a new point was added. At some
point I was wondering, why can't I just drag this image to the map to add it.
After all, we live in a drag/swipe world these days.

I ran into some issues if the map portion of the page didn't take up the whole
browser. I knew I had to convert screen points to map coordinates, so my first
thought was to use jQuery to get the screen coordinates and map position to do
the conversion. For whatever reason, the jQuery method of grabbing screen points
didn't play well with this scenario. I probably just did it wrong, but I
eventually just ended up using the dojo/dom-geometry module to get the positions
and everything worked from that point forward. This module uses native drag/drop
events and not the dojo/dnd module.

Dojo 1.8 is supposed to have introduced some nice mobile/tablet swipe
functionality in their DnD module, but the ArcGIS JS API is still using 1.7, so
I don't know how well this will perform on a mobile/tablet device. I would
imagine the ArcGIS JS folks are going to hold off until Dojo 2.0 (pure
speculation) to update the Dojo core of the API, so I'll revisit it then.

On the plus side, the actual DragDropHandler module is not AGS specific, so it
could be used with other mapping APIs like Leaflet or OSM.

[Here](https://github.com/odoe/AGSDragDropHandler) is the module on github. I
also put a sample application in the repo that you can view
[here](http://www.odoe.net/apps/dndeditdemo/).

As an aside, this application also demonstrates my recent attempts to build pure
Dojo applications, so no jQuery or Backbone, although I built it in a very
Backbone-ish way.

I thought this was a pretty cool, so I felt I would share.
