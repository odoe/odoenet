---

title: Fun with Search
description: Search is a versatile tool in your ArcGIS JSAPI apps!
published: true
author: Rene Rubalcava
pubDate: 2021-02-19T10:00:00.000Z
heroImage: '../../assets/blog/fun-with-search/images/cover.jpg'
tags: geodev, javascript
---

## Search or SearchViewModel

I don't have ny numbers to back this up, but I would take a guess that the
[Search widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html)
is the most widely used widget in the
[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/). Other
than Zoom and Attribution, which are default when you make a map. Maybe the
Popup too, but that's also a given. The Search is super versatile though. By
default, it uses the
[Esri world geocoder](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm),
so you can just start using it right away to find locations.

But you're not limited to using just the Search widget. You can take advantage
of the
[SearchViewModel](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search-SearchViewModel.html).
The ViewModel is the brains behind the UI of the widget. It's in charge of all
the business logic of doing the actual searching. So maybe, your application
doesn't need the actual Search widget, but you want to use the SearchViewModel
to do some searching. Maybe as content to a Popup or just on map click.

```js
const vm = new SearchViewModel({ view });
view.on("click", (e) => {
  vm.search(e.mapPoint);
});
```

When you use the SearchViewModel like this, it will automatically display the
popup for your, so it can be super useful to quickly identify locations on a
map.

## Not just for places

Another great feature of the Search widget is that it's not just limited to
geocoders. You could give it your own custom locator, but you can also let it
search FeatureLayers!

```js
const search = new Search({
  view,
  sources: [
    {
      layer: new FeatureLayer({
        url:
          "https://services.arcgis.com/DO4gTjwJVIJ7O9Ca/arcgis/rest/services/GeoForm_Survey_v11_live/FeatureServer/0",
        outFields: ["*"],
      }),
      searchFields: ["Email", "URL"],
      displayField: "Email",
      exactMatch: false,
      outFields: ["*"],
      name: "Point FS",
      placeholder: "example: esri",
      maxResults: 6,
      maxSuggestions: 6,
      suggestionsEnabled: true,
      minSuggestCharacters: 0,
    },
  ],
});
```

Now, the Search widget can search the FeatureLayer using the Email and URL
fields. This is really useful to add quick search capabilities for layers into
your application. Like I said, the Search widget is chock full of goodness! You
can even provide
[custom sources](https://developers.arcgis.com/javascript/latest/sample-code/widgets-search-customsource/)
for your widget, so you're not limited to geocoders and layers. But that's a
topic for another time!

## Overrides

Another trick you can do is override the behavior for how the widget will zoom
to a search result. You can do this via
[goToOverride](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#goToOverride).
This allows you to change the easing function, duration, maybe buffer the point,
or whatever other crazy ideas you might have. Maybe you want to disable it
altogether!

```js
const searchWidget = new Search({
  view,
  // no more zoom
  goToOverride: () => null,
});
```

You can view more details in this video!

<lite-youtube videoid="f8cNv77nJTQ"></lite-youtube>
