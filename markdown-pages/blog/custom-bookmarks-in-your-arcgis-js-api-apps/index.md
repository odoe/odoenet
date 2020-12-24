---
title: "Custom bookmarks in your ArcGIS JS API apps"
published: true
author: Rene Rubalcava
date: "2018-07-24"
tags: geodev
coverImage: "bookmark-widget.jpg"
---

The recent release of the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/index.html) introduced the [Bookmarks widget](https://developers.arcgis.com/javascript/latest/sample-code/widgets-bookmarks/index.html) to support Bookmarks you can [create in WebMaps](http://doc.arcgis.com/en/arcgis-online/create-maps/bookmark.htm).

It's pretty cool, simple but elegant little widget. Not to mention the fact that if you have users creating bookmarks in WebMaps, it's kind of cool to expose that to them in a custom app.

_But_, why settle for what you can do with the WebMap. You want bookmarks in your own apps and you want to take advantage of this cool new widget. But wait a second, how you going to persist these bookmarks? Just stick into [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and don't worry about it.

So how would you do this?

You could create a WebMap with an empty bookmarks array.

```js
const map = new WebMap({
  basemap: "streets",
  bookmarks: []
});
```

You can use `esri/WebMap`, since it has the property for `bookmarks` on it. There's no rule that says you need to initialize a WebMap with a webmap id, you can use it just like `esri/Map` and provide a basemap and layers.

Now, what you can do is on a button click or some other event, totally up to you, is add a bookmark to the bookmarks collection.

```js
const bookmark = {
  extent: view.extent,
  name: `Bookmark: ${bookmarks.bookmarks.length + 1}`
};
bookmarks.bookmarks.add(bookmark);
```

I just create the name based on the number of bookmarks that already exist. You could have some UI to let the user provide a custom name or get _fancy_ and do some reverese geocoding to get an address at the center of the extent or city, county, whatever floats your geoboat.

Now I can add that bookmark to local storage.

```js
const rawBookmarks = bookmarks.bookmarks.map(({ active, extent, name, thumbnail }) => ({ active, extent, name, thumbnail }));
const localData = localStorage.setItem(BOOKMARK_KEY, JSON.stringify(rawBookmarks));
```

To access these stored bookmarks when the app reloads, you can do this.

```js
let existingData = [];
const existingBookmarks = localStorage.getItem(BOOKMARK_KEY);
if (existingBookmarks) {
  existingData = JSON.parse(existingBookmarks);
}
const map = new WebMap({
  basemap: "streets",
  bookmarks: existingData
});
```

That will persist the bookmarks when your application reloads. _Awesome right?!_

You can of course add a way to delete a bookmark, or clear all bookmarks, but I'll leave that up to you.

Here is a sample app for you play with.

<iframe height="500" style="width: 100%;" scrolling="no" title="Local bookmarks" src="https://codepen.io/odoe/embed/QxrEVX?height=500&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/QxrEVX'>Local bookmarks</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

So have fun with it! Don't forget, the tools are there for you to make some awesome apps, you just got put in a little work.

Enjoy and hack away!
