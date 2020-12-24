---
title: "Taking it offline"
published: true
author: Rene Rubalcava
date: "2014-12-22"
tags: geodev
coverImage: "esri-pouchdb.png"
---

When building a mobile web-mapping application, like any other web application, there are a few things you need to consider. Who are the users? What services do I need? How will the application be used? What devices will the application be used on? You get the idea. If the application in any way requires a user to enter information or do some editing, you will no doubt cringe when the topic of offline capabilities comes up.

Offline capabilities in most other web applications is always a concern, but in most cases you would probably just need to worry about some state or keep track of what information a user has entered into a form, but then you start thinking about the web-map and how would you manage edited feature data? What about tiles? All very valid questions.

If you use ArcGIS tech, you have no doubt heard about [Collector for ArcGIS](http://doc.arcgis.com/en/collector/android/collect-data/offline-use.htm) and its offline capabilities. That's great for Android and iOS dev, but you need a JavaScript solution.

The first place I would point you to is the [Esri offline-editor](https://github.com/Esri/offline-editor-js). This is a great library with some [really nice demos](http://esri.github.io/offline-editor-js/demo/) on how you can use it for offline usage for both editing and tiles, including [tile packages](http://resources.arcgis.com/en/help/main/10.2/index.html#//006600000457000000). I use this library in production and it works great for my needs. I may do a future blog post specifically on this library. Today however, I wanted to show you an alternative way to get some offline-capabilities in your application.

### Storage and sorta storage

Let's first look at what your offline storage options are when making a web application. Let's ignore cookies, as I think they have their place and can be used for some things, but I wouldn't use them for offline use.

- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage). - This is a simple key/value storage system. This is probably the most common web storage system you might end up using. It's part of what is referred to as [DOM Storage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage) which also includes [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#sessionStorage). The API is pretty simple and it meets most users needs. You are however limited to approximately 5MB per host, which could be a limiting factor.

- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - This is a more robust SQL-like storage system. IndexedDB is probably the storage system you want to target for offline editing capabilities. The API isn't very difficult, but it is not as simple as simple get/set type API with LocaStorage.

- [WebSQL](http://html5doctor.com/introducing-web-sql-databases/) - This is another SQL-like database system in the browser, however it was deprecated around 2010 in favor of IndexedDB. You can read more about this [here](https://hacks.mozilla.org/2010/06/beyond-html5-database-apis-and-the-road-to-indexeddb/).

**Well hey, that looks great, I'll just use IndexedDB for everything.** You'd think so right. IndexedDB will work great on modern desktop browsers, even [Internet Explorer](http://msdn.microsoft.com/en-us/library/ie/hh673548%28v=vs.85%29.aspx). However, [not all mobile browsers fully support IndexedDB](http://caniuse.com/#search=indexeddb) or have buggy support. If they don't, they still use WebSQL. So what are you to do?

### Show me the Pouch

In [ArcGIS Web Development](http://www.manning.com/rubalcava/?a_aid=rrubalcava) I show you how to a build a mobile application that has offline capabilities. I think one of the best tools for web-mapping applications to use for offline capabilities is [PouchDB](http://pouchdb.com/). I'm not alone in thinking this as there is also a [leaflet layer for PouchDB](https://github.com/calvinmetcalf/leaflet.pouch). Why is this? Well, [under the hood](http://pouchdb.com/adapters.html), PouchDB will determine whether or not to use IndexedDB or WebSQL. So it does all the heavy lifting for you. PouchDB is what I mainly used before the esri offline-editor was released.

In order to use PouchDB with an ArcGIS Web app, I would suggest wrapping it in a [store](http://dojotoolkit.org/reference-guide/1.10/dojo/store.html)\-light kind of API. I wrote a PouchDBStore you can see below.

[gist](https://gist.github.com/odoe/be5fc67872c7e0ec2afd)

In this example, I provide three public methods, [add](https://gist.github.com/odoe/be5fc67872c7e0ec2afd#file-pouchdbstore-js-L50), [delete](https://gist.github.com/odoe/be5fc67872c7e0ec2afd#file-pouchdbstore-js-L66) and [getAll](https://gist.github.com/odoe/be5fc67872c7e0ec2afd#file-pouchdbstore-js-L77). These are pretty straightforward. It uses Dojo's [deffered](http://dojotoolkit.org/reference-guide/1.10/dojo/Deferred.html) module to return results using promises. Just to make sure the results from the **getAll** method work as expected with older browsers (ugh) I wrap the results with the [QueryResults](http://dojotoolkit.org/reference-guide/1.10/dojo/store/util/QueryResults.html) utility that just adds **forEach**, **filter**, and **map** methods to the result array.

_update_ - It was pointed out to me that [PouchDB already has a promise API](https://twitter.com/svenlito/status/547083255380729856), so you don't really need to use dojo/Deferred in this case. That is pretty sweet. I would probably still use it for the **getAll** method, only so I can return only the rows and not the whole response, but that's really just preference.

### Edit with PouchDB

For this example, I took [this ArcGIS API for JavaScript sample](https://developers.arcgis.com/javascript/jssamples/ed_feature_creation.html) and added the PouchDBStore to it [in this demo](https://github.com/odoe/esri-pouchdb). The way I handle it here is I use it in the error callback when the edits are applied to the FeatureLayer.

[gist](https://gist.github.com/odoe/65b6f063123c1397f8e5)

In this example, if they FeatureLayer throws an error, it will add the features that were trying to be added to the layer to the PouchDBStore. When the FeatureLayer successfully performs an edit, it will check the PouchDBStore to see if there are any pending features and then add them as well. When those adds are done, it will then delete the pending edits from the PouchDBStore.

You can view/download the code for this sample [on github](https://github.com/odoe/esri-pouchdb). Take note, this is just one workflow on how to use the PouchDBStore for editing. But it does provide quite a bit of flexibility. Let's say you need to store edits in different buckets for some reason. Maybe point edits need to query an underlying parcel layer to save the address with the edit and line edits don't have the same requirement. You could also do you [own check](http://stackoverflow.com/questions/2384167/check-if-internet-connection-exists-with-javascript) to see if you have lost an internet connection before even trying to apply the edits. Like I said, PouchDB and this method provides a lot of flexibility in how you handle offline scenarios.

### Perfect, I'm an offline wizard

Don't get too carried away now. You can get pretty close to building good offline solutions, but in reality, there is no perfect offline solution. The [esri offline-editor](https://github.com/Esri/offline-editor-js) has some good tools, including [Application Cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache), but there is no perfect solution. You probably can't store all your tiles in web storage nor query layers not loaded locally. You can make offline easier though. The key is to be aware of your apps limitations and handle them accordingly. If you really need more robust offline solutions for ArcGIS mobile development, I would highly suggest you look at the [Android SDK](https://developers.arcgis.com/android/) or [iOS SDK](https://developers.arcgis.com/ios/).
