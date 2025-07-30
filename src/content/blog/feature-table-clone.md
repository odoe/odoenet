---

title: FeatureTable Clones
description: How to create new FeatureTables from other FeatureTables
published: true
author: Rene Rubalcava
pubDate: 2021-04-13T10:00:00.000Z
heroImage: '../../assets/blog/feature-table-clone/images/cover.jpg'
tags: geodev, javascript
---

The
[FeatureTable](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html)
is a useful widget for your ArcGIS JSAPI applications. It's pretty simple
really, it's a table of the data in your layer.People get all excited about data
viz, and charts, and that sexy stuff. But one of the most basic business needs
of an application is usually a table. Someone will always look at a pretty map
and be like, _can you put that in excel?_ This is where your developer heart
drops.

You can utilize the table to do some basic functionality and then tie into it
for some extra workflows. This
[sample](https://developers.arcgis.com/javascript/latest/sample-code/widgets-featuretable-map/index.html)
will zoom the map to selected features in the table, this
[sample](https://developers.arcgis.com/javascript/latest/sample-code/widgets-featuretable-editing/)
will let you edit data directly in the table, which is awesome! There's plenty
more you could do if you wanted to.

One question I recently received was, _can I create another table from the
selection of my first table?_ I've gotten some pretty interesting requests, and
I've come to learn that some developers have some unique business needs. It's
not my job to question why, but to help with the _how_. So ok, you want to get
weird, _let's get weird._

I recently wrote about [DIY Edit Sessions](https://odoe.net/blog/edit-sessions),
and in that post I talked about creating client-side copies of a FeatureLayer.
You could use that same idea to create a copy of a FeatureLayer, but populate it
with selected items in a FeatureTable.

```js
function createLayer(lyr, title, source) {
  const tempLayer = new FeatureLayer({
    title,
    fields: lyr.fields.map((x) => x.clone()),
    geometryType: lyr.geometryType,
    renderer: lyr.renderer.clone(),
    spatialReference: lyr.spatialReference.clone(),
    source,
    visible: false,
  });
  return tempLayer;
}
```

I've gotten a lot of use out of this little helper function to copy the
properties of one layer to another. Once I do that, it's just a matter of
keeping track of selected items in the table, passing them to my copied layer,
and creating a new table from that layer.

```js
const source = features.map((x) => x.feature);
const layer = createLayer(featureLayer, "Copy Layer", source);
const fTable = new FeatureTable({
    view,
    layer,
    fieldConfigs: [...]
    container: document.getElementById("tableDiv2")
});
```

That's pretty much it. If I wanted to take this a step further, I could sync
them table by using the layers
[applyEdits](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#applyEdits)
method and this will update the table.

Here is a sample application in action!

<iframe height="400" style="width: 100%;" scrolling="no" title="FeatureTables widget with a map" src="https://codepen.io/odoe/embed/preview/MWJVeNv?height=300&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/MWJVeNv'>FeatureTables widget with a map</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

You can watch this video for some more details!

<lite-youtube videoid="AIqQlwpsmVU"></lite-youtube>
