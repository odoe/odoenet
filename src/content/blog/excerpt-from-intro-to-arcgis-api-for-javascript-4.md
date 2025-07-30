---

title: Excerpt from Intro to ArcGIS API for JavaScript 4
published: true
author: Rene Rubalcava
pubDate: 2016-11-02
description: This week I'd like to provide you an excerpt from my most recent
  book, _Intro to ArcGIS API for JavaScript 4_. The book is still being written,
  but if you purchase the book, you'll get updates as they come along. I'm
  currently working on section that covers Popups that I will be releasing soon.
---

This week I'd like to provide you an excerpt from my most recent book,
[_Intro to ArcGIS API for JavaScript 4_](https://leanpub.com/arcgis-js-api-4/overview).
The book is still being written, but if you purchase the book, you'll get
updates as they come along. I'm currently working on section that covers Popups
that I will be releasing soon.

I've actually come down with a cold this week, and wasn't up for doing a video,
but I've been wanting to do an excerpt like this for a while, so I figured _now
is as good a time as any!_

The following is an excerpt from Chapter 3 that covers Views and Layers
available in the API. I had some issues with the markdown conversion for this
blog, but the PDF version looks pretty good.

## Layers

As mentioned earlier, not all layers are supported in the initial release of the
4 API. But retrieving those layers is very easy to do. To access the layers on
the map, you can simply retrieve them from the `map.layers` property. This
property will provide you with the operational layers of the map, which means no
basemaps. If you want all the layers, including the basemap, you can use the
`map.allLayers` property. _This is a much simpler API than in 3.x._

If you only care about the basemap, you can get that via the `map.basemap`
property.

To reiterate, the Views and the LayerViews are what actually draw the data for
the map. They control the display of graphics, the extent, and any other visual
properties. The Map and Layers are containers of that data. They are the models
for your map, which means they can be treated like models in your application
development. The Map and the Layer can be used as a datasource for charts or
tables or any other type of custom component that may not even have a map to
display. _That's a powerful feature_ of the API.

There are a handful of layers available in the API, that each serves a different
purpose. You can read more details about each type of layer in the API
documentation, but these are some of the more common layers.

- GraphicsLayer
- FeatureLayer
- MapImageLayer
- SceneLayer
- VectorTileLayer

### GraphicsLayer

The GraphicsLayer is probably the simplest layer you can work with. As the name
suggests, it simply contains graphics that are displayed on the map.

> Note: If you are familiar with the GraphicsLayer from the 3.x version of the
> ArcGIS API for JavaScript, one main difference with the GraphicsLayer in
> version 4 is that it does not support a renderer. You would need to define the
> symbology per graphic instead of on the layer. This is because the
> GraphicsLayer can support graphics with different geometry types. This greatly
> simplifies creating basic graphics to display on the map.

Initializing a GraphicsLayer is fairly simple.

```js
const graphicsLayer = new GraphicsLayer({
  graphics: [graphic1, graphic2, graphic3],
});
```

You can add graphics to the GraphicsLayer via a couple of methods.

```js
// add a single graphic
graphicsLayer.add(graphic);
// add an array of graphics
graphicsLayer.addMany([graphic1, graphic2, graphic3]);
```

Since you can't set up a renderer or popup template for a GraphicsLayer, you'll
need to define the symbology and Popups on a per graphic basis.

```js
// create a graphic
const graphic = Graphic({
  attributes: {
    id: 1,
    city: "Los Angeles"
  },
  geometry: new Point({x: xValue, y: yValue}),
  symbol: new SimpleMarkerSymbol({
    style: 'circle',
    color: 'red',
    size: 10,
    outline: {
      color: 'rgba(255, 255, 255, 0.5)'
      width: 4
    }
  }),
  popupTemplate: {
    title: "My Awesome Graphic!",
    content: "{*}" // display all fields
  }
});

// add it to graphicsLayer
graphicsLayer.add(graphic);
```

Popups will be covered in more detail in a later chapter.

If you need more robust support for your graphics, in particular using a
renderer and popups, you'll want to use a FeatureLayer. The GraphicsLayer is
ideal as simply a bag of miscellaneous graphics.

### FeatureLayer

FeatureLayers are probably the most versatile and widely used layer type in the
ArcGIS platform. There are a few different ways you can initialize a
FeatureLayer.

```js
// Create via URL
const featureLayer = new FeatureLayer({
  url:
    "http://services6.arcgis.com/m3L8QUZ93HeaQzKv/arcgis/rest/services/BeerAndBurgerJoints/FeatureServer/0",
});

// Create via a Portal item
const featureLayer = new FeatureLayer({
  portalItem: {
    id: "b126510e440744169943fd8ccc9b0c4e",
  },
});
```

By initializing a FeatureLayer via one of these two methods, the layer is now
bound to a remote service. The same way you can query the LayerView of a
FeatureLayer, you can query directly against the FeatureLayer to find the
features, ObjectIds or extent of a FeatureLayer.

You can also create a FeatureLayer via a FeatureCollection, although it has been
simplified since the 3x version of the API.

```js
const featureLayer = new FeatureLayer({
  objectIdField: "item_id",
  geometryType: "point",
  // Define the fields of the graphics in the FeatureLayer
  fields: [{
    name: "item_id",
    alias: "Item ID",
    type: "oid"
  }, {
    name: "description",
    alias: "Description",
    type: "string"
  }, {
    name: "title",
    alias: "Title",
    type: "string"
  }],
  // Define a renderer for the layer
  renderer: new SimpleRenderer({
    type: "simple",
    symbol: new SimpleMarkerSymbol({
      style: 'circle',
      color: 'red',
      size: 10,
      outline: {
        color: 'rgba(255, 255, 255, 0.5)'
        width: 4
      }
    })
  }),
  popupTemplate: {
    title: "{title}",
    content: "{description}"
  },
  // This is a collection of Graphics
  source: [graphic1, graphic2, graphic3]
});
```

What we are doing here is defining the source for a FeatureLayer manually. This
is basically passing along a collection of graphics, defining the renderer for
those graphics, as well as the fields and popup. The benefit here is the ability
to use a single renderer for multiple graphics as well as a single popup. You
will also have the ability to query against this FeatureLayer the same way you
could query a FeatureLayer tied to a remote service.

Now, maybe you want to update the source features in a FeatureLayer. You can do
this in the following manner.

```js
const graphicOfInterest = featureLayer.source.find(x => x.attributes.OBJECTID === oid);
const target = graphicOfInterest.clone();
const target.geometry = updatedGeometry;
featureLayer.source.remove(graphicOfInterest);
featureLayer.source.add(target);
```

This lets you update individual graphics in the FeatureLayer source. This comes
in handy if you want to display updated GPS data or maybe change the symbology
for individual features.

### MapImageLayer

The MapImageLayer was previously known as the ArcGISDynamicMapServiceLayer. It
lets you load dynamic map services into your application, which unlike tiled
image services, loads a single image for the entire map extent instead of many
tiles.

It's a fairly simple layer to work with. You can even define what sublayers are
visible in the MapImageLayer, which used to be a cumbersome task. Working with
sublayers is now much easier.

```js
const layer = new MapImageLayer({
  url:
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  sublayers: [{
    id: 0,
    visible: true,
  }, {
    id: 1,
    visible: true,
  }, {
    id: 2,
    visible: true,
  }, {
    id: 3,
    visible: false,
  }],
});
```

You can simply define the visibility of each sublayer in the `sublayers`
property of the MapImageLayer. You could even take it a step further and provide
a `definitionExpression` for individual subalyers.

```js
const layer = new MapImageLayer({
  url:
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  sublayers: [{
    id: 0,
    visible: true,
  }, {
    id: 1,
    visible: true,
  }, {
    id: 2,
    visible: true,
    // provide a definitionExpression
    definitionExpression: "pop2000 > 1000000",
  }, {
    id: 3,
    visible: false,
  }],
});
```

This will now pass a `definitionExpression` for the sublayer to the dynamic map
service when it requests the image. This follows along with the theme of the
entire version 4 of the ArcGIS API for JavaScript to provide a _simpler API_. I
fully expect people to implement the utility of the MapImageLayer in their
applications with this easier to use API.

Starting at version 4.1 of the ArcGIS API 4 for JavaScript, the sublayers you
define will be the only sublayers used in the MapImageLayer. This is incredibly
useful if you working with a Map Service that contains hundreds of layers, which
I have personally seen far too many times.

You can also define a
[`popupTemplate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html)
and even a
[renderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html)
per sublayer.

```js
const layer = new MapImageLayer({
  url:
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
  sublayers: [
    {
      id: 3,
      visible: true,
      renderer: new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          style: "solid",
          color: "dodgerblue",
          outline: {
            width: 0.5,
            color: "white",
          },
        }),
        label: "State boundaries",
      }),
      opacity: 0.5,
    },
    {
      id: 2,
      visible: true,
      popupTemplate: {
        title: "{NAME}",
        content: [
          {
            fieldInfos: [
              {
                fieldName: "POP2000",
                visible: true,
                label: "Population for year 2000",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "POP2007",
                visible: true,
                label: "Population for year 2007",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
            ],
          },
          {
            type: "media",
            mediaInfos: [
              {
                title: "<b>Population</b>",
                type: "column-chart",
                caption: "",
                value: {
                  theme: "Grasshopper",
                  fields: ["POP2000", "POP2007"],
                  normalizeField: null,
                  tooltipField: null,
                },
              },
            ],
          },
        ],
      },
    },
    {
      id: 0,
      visible: true,
      definitionExpression: "POP2000 > 100000",
    },
  ],
});
```

This is incredibly powerful as you can now work with Map Services _almost_ as
easily as a FeatureService. The ability to define a custom renderer for Dynamic
Map Services has been available for quite some time in the 3.x version of the
API and it's been available as part of the ArcGIS Server Map Service for some
time as well. What is new, starting with the 4.1 version of the ArcGIS API for
JavaScript is that it has simplified the API for developers to more easily take
advantage of this feature. The addition of being able to define popups per
sublayer just adds to the utility of the MapImageLayer and I'm not afraid to say
that I think this is now _my personal favorite layer to work with as part of the
API_.

There is, even more, you can do with the MapImageLayer via query tables and
table joins if you have that data available via your services. Check out the
[documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-MapImageLayer.html)
for those details and bask in the glory of the MapImageLayer.

As of right now, the book is approaching 100 pages once I finish the new Popup
section. Go [check it out](https://leanpub.com/arcgis-js-api-4/overview) and as
usual keep an eye on this blog for more content!
