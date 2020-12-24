---
title: "Client Side Fun with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2018-12-17"
tags: geodev
coverImage: "earthquakes-geojson.png"
---

One of the really powerful and fun features of the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/index.html) is the ability to do some cool client side analysis with your data.

Most of the time, you will be working with a [FeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) in your apps. You will most likely be consuming a [hosted feature service](https://doc.arcgis.com/en/arcgis-online/manage-data/publish-features.htm). I'll do another blog at a later date talking more about feature services and their benefits, but for now, just know that they are a really powerful way to deliver spatial data.

Another simple, but popular format to deliver spatial data is [GeoJSON](http://geojson.org/). GeoJSON is a nice transport format because it is simple, and although _you could_ deliver data in any [spatial reference](http://spatialreference.org/), technically the spec [only allows WGS84](https://tools.ietf.org/html/rfc7946#appendix-B) now. Remember I said GeoJSON is a transport format, it's not really meant to be a storage format, but that is neither here nor there.

What if you wanted to consume GeoJSON in the ArcGIS API for JavaScript? There is a [sample](https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-collection/index.html) for that, and there is even one to [reproject](https://developers.arcgis.com/javascript/latest/sample-code/client-projection/index.html) the data on the fly. They are both really cool, but how cool would it be to treat your GeoJSON like it came from a FeatureService.

Let's try it out with the [earthquake sample](https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-collection/index.html) I just showed you.

What the sample above is doing is creating an empty FeatureLayer, with no url. Since GeoJSON has no metadata, we need to let the FeatureLayer know some information about the data with the `fields` property. This is an array of [`Field`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-Field.html)'s that describe if the field is a string, numeric, a date, plus any field aliases that might be used for labels or in the popup. Then you can provide an `ObjectId` field the FeatureLayer will use internally.

I am going to do it a little differently from the sample in that I am going to create my FeatureLayer up front with an empty [source](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#source). This way my Legend is ready to go when my application starts and then I can use the [applyEdits](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#applyEdits) method to update my FeatureLayer with the results of the GeoJSON request.

I'm going to use the [FeatureLayerView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html) in my app to query the data directly in the client. I'm going to do this when I click and drag on the map.

First thing to do is define the query.

```js
const query = layer.createQuery();
query.set({
  geometry: view.toMap(event),
  distance: 100,
  units: "miles",
  outStatistics: [{
    onStatisticField: "felt",
    outStatisticFieldName: "felt_avg",
    statisticType: "avg"
  }]
});
```

In this snippet, we define a [StatisticDefinition](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-StatisticDefinition.html) for our query. I'm just going to calculate the average, but there are a number of [statistics](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-StatisticDefinition.html#statisticType) you can do on the client.

Once we have our query prepared, we can perform two queries. Once to get the result of our statistics and one to get the ids so that we can highlight those features on the map. This is why you need to tell the FeatureLayer about the ObjectId field, so you can do cool things like highlight those features!  

```js
layerView.queryFeatures(query).then(({ features }) => {
  const result = features[0];
  if (result) {
    avgValue.innerText = result.attributes.felt_avg.toFixed(2);
  }
  else {
    avgValue.innerText = 0.00;
  }
})
layerView.queryObjectIds(query).then(ids => {
  if (highlight) {
    highlight.remove();
    highlight = null;
  }
  highlight = layerView.highlight(ids);
});
```

Doing this allows us to hover over the map, highlight the features we run our statistics on and display the results in a panel on the page.

You can see this demo in action here.

<iframe height="500" style="width: 100%;" scrolling="no" title="jsapi4 geojson consume" src="https://codepen.io/odoe/embed/LMZvNq?height=500&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/LMZvNq'>jsapi4 geojson consume</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This sample barely scratches the surface of what you can do with client side statistics. For a more robust use case, check out [this sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=featurelayerview-query-distance) in the SDK that uses SQL queries in the statistics queries! Not bad for loading some simple GeoJSON into an ArcGIS API for JavaScript app right!

The client-side capabilities of the JavaScript API are silly powerful, not only for Feature Services, but also any data that you want to add to your apps in a FeatureLayer. Happy geohacking!
