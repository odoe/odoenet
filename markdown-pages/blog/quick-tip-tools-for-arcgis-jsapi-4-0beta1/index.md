---
title: "Quick Tip - Tools for ArcGIS JSAPI 4.0beta1"
published: true
author: Rene Rubalcava
date: "2015-08-24"
tags: geodev
coverImage: "esrijs-tools.jpg"
---

I recently wrote about [filling some gaps](https://geonet.esri.com/people/odoe/blog/2015/08/19/diy-editing) in the [ArcGIS 4.0beta1](https://developers.arcgis.com/javascript/beta/). In that case, I did a quick edit sample. However that got me thinking that this edit sample could be enhanced to include updates, deletes and even caching of data so that edits aren't done right away.

What I came up with looks like this. **_Warning - [ES6 incoming](https://hacks.mozilla.org/category/es6-in-depth/)_**

[gist](https://gist.github.com/odoe/437198dbc5e091918a93)

So real quick, let's talk about what is happening here. This an [ES2015 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) called Edit. The constructor parameters require the map and a layer, specifically a FeatureLayer. The API for this class covers your basic editing needs. It has an _add_, _update_ and _del_ method. _del_ is short for delete, but delete is a keyword in JavaScript, so need to shorten it a bit. I could have called it _annihilate_ or maybe _kill_, but _del_ seemed appropriate. **Update - I changed this to remove**

What these methods do is check for a second parameter called _immediate_, which has a [default value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) of _true_. If this remains true, it simply pass the _graphic_ to an _\_edit_ function with the type of action to take: _add_, _update_, or _delete_. The _\_edit_ method actually does all the hard work and converts the graphic to JSON and sends it to the appropriate endpoint of the [ArcGIS REST API](http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/Feature_Service/02r3000000z2000000/). Remember, [it's all just REST](https://geonet.esri.com/people/odoe/blog/2015/01/28/learn-to-speak-rest).

Right now in the 4.0beta, you need to remove the FeatureLayer and add it back again in order to refresh the features shown after an edit. So keep that in mind when you are doing edits for now. I also force [esri/request](https://developers.arcgis.com/javascript/beta/api-reference/esri-request.html) to use POST for each call, just to be safe.

Now if a method is passed an _immediate_ of _false_, then the FeatureLayer is not edited and the graphic is added to a dummy layer and pushed into a cache. You then have the option to call the _save_ method and push all the edits in the cache, clean the dummy layer and clear the cache. This can be useful if you have users that may not want their edits to be immediate, but maybe want to tidy things up before pushing them to the server. This portion could probably be extended as well to allow users to edit items in the cache.

**Note** - I should point out that my sample and the Edit tool do not handle symbology. So that's left up to you to define the symbology of your Graphics if you are not going to immediately edit the data. Otherwise when editing the symbology will be taken from the Feature Service.

This is just one tool currently in [the repo](https://github.com/odoe/esrijs4tools). I'm also thinking of adding an Identify tool and any others to kind of fill the gaps in the beta for people that are just too eager to try and use the 4.0beta in a production environment.

Feel free to fork and contribute tools you think would be useful as well!
