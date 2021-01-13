---
title: "Sketch and Query"
description: "Check out how you can use the ArcGIS JSAPI Sketch Widget to help you perform queries in your apps!"
published: true
author: Rene Rubalcava
date: 2021-01-13T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev
---

## Sketch and Fetch

The [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) can do so much more than make pretty maps. It has a suite of tools you can use to make some awesome interactive applications. One of those tools is the [Sketch widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html). Sketch is great for [redlining](https://youngarchitect.com/architecture-intern-101-architectural-redlines/) and just adding some dummy graphics to a map. Something else the API is great at is tool for [performing queries](https://odoe.net/blog/client-side-fun-with-arcgis-api-for-javascript/) and creating interactive applications. So why not do both?

Let's create a basic app to include the Sketch widget.

```js
const graphicsLayer = new GraphicsLayer({
	listMode: 'hide',
});

const featureLayer = new FeatureLayer({
	portalItem: {
		id: 'b234a118ab6b4c91908a1cf677941702',
	},
	outFields: ['NAME', 'STATE_NAME', 'VACANT', 'HSE_UNITS'],
	title: 'U.S. counties',
	opacity: 0.8,
});

const map = new ArcGISMap({
	basemap: 'streets',
	layers: [featureLayer, graphicsLayer],
});
const view = new MapView({
	container: 'viewDiv',
	map: map,
});

const layerList = new LayerList({ view });

const sketch = new Sketch({
	view,
	layer: graphicsLayer,
});

view.ui.add(layerList, 'top-right');
view.ui.add(sketch, 'top-right');
```

One thing to note is you can set the [`listMode`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html#listMode) of the layer to `"hide"`, so it doesn't show up in the LayerList. It's not really needed there when it's used with the Sketch widget.

Once we've added all the widgets, we can wait for the layer to finish loading and use it as the maps viewable extent.

```js
view.when(async () => {
	await featureLayer.when();
	view.extent = featureLayer.fullExtent;
	const layerView = await view.whenLayerView(featureLayer);
});
```

Now, we can get crafty and use the Sketch to do some cool stuff.

* Define some statistic
* Create a query
* Query the features
* ...Profit!

```js
sketch.on('create', async ({ graphic, state }) => {
	if (state === 'complete') {
		const avgStatistic = new StatisticDefinition({
			onStatisticField: 'VACANT',
			outStatisticFieldName: 'VACANT_AVG',
			statisticType: 'avg',
		});

		const query = featureLayer.createQuery();
		query.geometry = graphic.geometry;
		query.outStatistics = [avgStatistic];

		const featureSet = await layerView.queryFeatures(query);
		console.log(featureSet);
	}
});
```

Don't forget, queries don't just return data and geometries, you can run statistics directly against the data. Not only that, but in this case, the query is on the [FeatureLayerView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html), which means no data is fetched from the server. Even when you do statistics queries, the API has a built-in client-side query engine. That's nuts!

Here is a live demo.

<iframe height="500" style="width: 100%;" scrolling="no" title="JSAPI Sketch and Query" src="https://codepen.io/odoe/embed/dypgdEG?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/dypgdEG'>JSAPI Sketch and Query</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

If you want to see me walk through this in more detail, check out the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/8eUMNAZ79gg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
