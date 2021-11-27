---
title: "Filter GeoJSON in your ArcGIS Apps"
description: "Use a request interceptor to filter your GeoJSON data"
published: true
author: Rene Rubalcava
date: 2021-11-26T12:00:00.000Z
coverImage: "filter-geojson-arcgis.jpg"
tags: geodev, javascript
---

## Filter GeoJSON in your ArcGIS Apps

[GeoJSON](https://geojson.org/) is a popular data transport format for spatial data. You can think of it as the shapefile of the web. It's not a storage format, but I won't get into that. A lot of agencies and organizations will provide a GeoJSON file that users can download and use in their own applications. This is super helpful and a really simple way to share data. Downside is, _most of the time_, this is a static file that might get updated on a regular basis. _Yes, a web API can be written that can return results as GeoJSON_, but most are just simple files. This means you can't really filter the data out before you use it.

The ArcGIS API for JavaScript can load GeoJSON files pretty easily using a [GeoJSONLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html). Once it's a GeoJSONLayer, you can [edit it](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#applyEdits), [query features](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#queryFeatures), even run statistics and use advanced visualizations and filtering with [FeatureEffects](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html).

You might want to do something to the GeoJSON before you actually consume it in your application. Maybe grab only the first 500 features or do some crazy stuff to add and populate new fields. This is the kind of task you can accomplish using a [request interceptor](https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#RequestInterceptor).

Let's assume you want to load some earthquake GeoJSON data.

```js
const layer = new GeoJSONLayer({
	url: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson`,
	id: "buildingPoints",
	title: "Indoor Maps Locations",
	displayField: "siteName",
	renderer: {
		type: "simple",
		symbol: {
			type: "simple-marker",
			style: "square",
			color: "blue",
			size: "8px"
		}
	},
	geometryType: "point"
});
```

Maybe you only care about grabbing the first 500 earthquakes. You can accomplish this using an `after()` method in your request interceptor.

```js
esriConfig.request.interceptors.push({
	urls: 'https://earthquake.usgs.gov',
	after(response) {
		const geojson = response.data;
		geojson.features = geojson.features.splice(1, 500);
		response.data = geojson;
		return response;
	}
});
```

Note, if you are using an earlier version of the ArcGIS API for JavaScript, you might need to parse the response data using [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) and [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder). You can find more details in this [video](https://www.youtube.com/watch?v=2S3wX7KQDpQ&ab_channel=ReneRubalcava).

Remember, if there is something you want to do in the ArcGIS API for JavaScript that may not seem straightforward, there is probably a way to accomplish it. Even using static GeoJSON files.

You can find a demo of this application below.

<iframe height="500" style="width: 100%;" scrolling="no" title="Interceptor Fun" src="https://codepen.io/odoe/embed/vYJoMGo?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/odoe/pen/vYJoMGo">
  Interceptor Fun</a> by Rene Rubalcava (<a href="https://codepen.io/odoe">@odoe</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
