---
title: "Edit GeoJSON with the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2019-11-14"
tags: geodev
coverImage: "arcgis-geojson.jpg"
---

I recently came across a question about the [GeoJSONLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html) in the ArcGIS API for JavaScript. The question had to with editing and also being able to save those edits somewhere. If you didn't know, the GeoJSONLayer takes a URL to a GeoJSON file and loads it in the API. Not only that, but you get all the benefits that you also get with the FeatureLayer.

- Can use [Smart Mapping, multiple types of renderers, even 3D](https://developers.arcgis.com/javascript/latest/guide/visualization-overview/)
- [Arcade](https://developers.arcgis.com/javascript/latest/guide/arcade/)
- [Queryable](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#queryFeatures), including [statistics](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html#outStatistics)
- [Popups](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#popupTemplate)
- [Definition Expressions](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#definitionExpression)
- [Feature Filters](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html) and [Feature Effects](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureEffect.html)
- [Feature Templates](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureTemplate.html)
- [Editing](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html)
- and plenty more I'm sure!

This means you can really enhance the use of your GeoJSON directly in the API.

Since the GeoJSON is downloaded to the client, when you use [applyEdits](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html#applyEdits), it's editing the data locally. This makes sense when you think about it, because there's no clear way of knowing the behavior of the service the GeoJSON comes from, so there's no way to know what the update API for the GeoJSON might look like, if there even is one.

## Write your own rules

But, of course, this is JavaScript and you can do whatever you want. We can turn back to an old staple when working with GeoJSON with ArcGIS and use [Terraformer](https://esri.github.io/terraformer). Terraformer is great to convert from ArcGIS JSON to GeoJSON and back again.

First off, I want to provide an editing experience for my GeoJSON in my application. I could go all out and provide [templates](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureTemplate.html) for the [Feature Templates widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTemplates.html) to build a custom editing experience or just use the [Editor widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html) by itself.

Let's create our GeoJSONLayer.

const geojsonLayer = new GeoJSONLayer({
  url:
    "https://www.chapelhillopendata.org/api/v2/catalog/datasets/pedestrian-crashes-chapel-hill-region/exports/geojson",
  templates: [
    {
      name: "Crashes",
      description: "Pedestrian crashes in Chapel Hill",
      drawingTool: "point",
      prototype: {
        attributes: {
          ...
        }
      }
    }
  ],
  popupTemplate: {
    title: "{crash\_grp}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ambulancer",
            label: "ambulancer"
          },
          {
            fieldName: "county",
            label: "county"
          },
          {
            fieldName: "crash\_type",
            label: "crash\_type"
          },
          {
            fieldName: "locality",
            label: "locality"
          },
          {
            fieldName: "drvr\_age",
            label: "drvr\_age"
          }
        ]
      }
    ]
  }
});

I can provide Feature Templates with my GeoJSONLayer that will define some default values for fields that I might want when adding new features. Now we can use the GeoJSONLayer as the source of Editor widget.

const editor = new Editor({
  view,
  layerInfos: [
    {
      layer: geojsonLayer,
      fieldConfig: [
        {
          name: "ambulancer",
          label: "ambulancer"
        },
        {
          name: "county",
          label: "county"
        },
        {
          name: "crash\_type",
          label: "crash\_type"
        },
        {
          name: "locality",
          label: "locality"
        },
        {
          name: "drvr\_age",
          label: "drvr\_age"
        }
      ]
    }
  ]
});

In this case, I'll only expose a few fields to the Editor and not concern myself with the others.

## Editing

At this point, I can edit my data just like a FeatureLayer, but maybe I want to download this edited GeoJSON and upload it to my server for future use. I can add a button to application that when clicked will query all the features in the GeoJSONLayer, convert them to GeoJSON and then I can do whatever I want with them.

geojsonLayer
  .queryFeatures()
  .then(({ features }) => {
    const FeatureCollection = {
      type: "FeatureCollection",
      features: []
    };
    FeatureCollection.features = features.map(
      ({ attributes, geometry }, index) => {
        return {
          id: index,
          properties: attributes,
          geometry: Terraformer.ArcGIS.parse(geometry)
        };
      }
    );
    // Do something with your GeoJSON
    // Download it or send it to an external API
    // to update your existing GeoJSON
    console.log("FeatureCollection", FeatureCollection);
  })
  .catch(error => console.warn(error));

And that's it!

Working with GeoJSON in the JavaScript API let's you use simple GeoJSON in a more robust manner and take full advantage of all the tooling you get with the API!

Here is a demo of this application in action.

<div class="codepen" data-height="500" data-theme-id="31222" data-default-tab="result" data-user="odoe" data-slug-hash="BaaqKQO" data-preview="true" data-prefill="{&quot;title&quot;:&quot;GeoJSONLayer Fun&quot;,&quot;tags&quot;:[],&quot;head&quot;:&quot;<meta name=\&quot;viewport\&quot; content=\&quot;width=device-width, initial-scale=1\&quot;>\n<script>\n  var dojoConfig = {\n    has: {\n      \&quot;esri-featurelayer-webgl\&quot;: 1\n    }\n  };\n</script>&quot;,&quot;stylesheets&quot;:[&quot;https://js.arcgis.com/4.13/esri/themes/light/main.css&quot;],&quot;scripts&quot;:[&quot;https://js.arcgis.com/4.13&quot;]}"><pre data-lang="html">&lt;script src="https://unpkg.com/terraformer@1.0.9"&gt;&lt;/script&gt;
&lt;script src="https://unpkg.com/terraformer-arcgis-parser@1.0.5"&gt;&lt;/script&gt;
&lt;div id="viewDiv"&gt;
  &lt;div
       id="export"
       class="esri-widget esri-widget--button esri-widget esri-interactive"
       title="Export to GeoJSON"
       &gt;
    &lt;span class="esri-icon-download"&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre><pre data-lang="css">html,
body,
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}</pre><pre data-lang="js">require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GeoJSONLayer",
  "esri/renderers/smartMapping/creators/type",
  "esri/widgets/Legend",
  "esri/widgets/Editor"
], function(
  ArcGISMap,
  MapView,
  GeoJSONLayer,
  typeCreator,
  Legend,
  Editor
) {
  const exportBtn = document.getElementById("export");
<div></div>
  const geojsonLayer = new GeoJSONLayer({
    url:
      "https://www.chapelhillopendata.org/api/v2/catalog/datasets/pedestrian-crashes-chapel-hill-region/exports/geojson",
    templates: [
      {
        name: "Crashes",
        description: "Pedestrian crashes in Chapel Hill",
        drawingTool: "point",
        prototype: {
          attributes: {
            ambulancer: "No",
            rd_defects: null,
            crsh_sevri: null,
            crash_ty_1: null,
            crash_time: null,
            county: null,
            speed_limi: null,
            rural_urba: null,
            ped_sex: null,
            crash_mont: null,
            drvr_vehty: null,
            crash_type: null,
            city: null,
            workzone_i: null,
            severity: null,
            rd_conditi: null,
            locality: null,
            crash_grp0: null,
            crashalcoh: null,
            excsspdind: null,
            rd_config: null,
            rd_feature: null,
            drvr_unitn: null,
            ped_pos: null,
            drvr_injur: null,
            crash_loc: null,
            drvr_age: null,
            rd_charact: null,
            drvr_alc_d: null,
            drvrage_gr: null,
            ped_race: null,
            light_cond: null,
            drvr_sex: null,
            crashday: null,
            pedage_grp: null,
            ped_alc_dr: null,
            ped_age: null,
            crash_grp: null,
            crash_hour: null,
            drvr_race: null,
            crash_published: true
author: Rene Rubalcava
date: null,
            crash_id: null,
            hit_run: null,
            ped_injury: null,
            developmen: null,
            on_rd: null,
            traff_cntr: null,
            num_units: null,
            region: null,
            rd_class: null,
            crash_year: null,
            weather: null,
            crsh_typex: null,
            rd_surface: null,
            num_lanes: null,
            ped_unitno: null,
            drvr_estsp: null,
            crash_sevr: null
          }
        }
      }
    ],
    popupTemplate: {
      title: "{crash_grp}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "ambulancer",
              label: "ambulancer"
            },
            {
              fieldName: "county",
              label: "county"
            },
            {
              fieldName: "crash_type",
              label: "crash_type"
            },
            {
              fieldName: "locality",
              label: "locality"
            },
            {
              fieldName: "drvr_age",
              label: "drvr_age"
            }
          ]
        }
      ]
    }
  });
<div></div>
  const map = new ArcGISMap({
    basemap: "gray-vector",
    layers: [geojsonLayer]
  });
  const view = new MapView({
    container: "viewDiv",
    map: map
  });
<div></div>
  const legend = new Legend({ view });
  view.ui.add(legend, "bottom-left");
<div></div>
  const editor = new Editor({
    view,
    layerInfos: [
      {
        layer: geojsonLayer,
        fieldConfig: [
          {
            name: "ambulancer",
            label: "ambulancer"
          },
          {
            name: "county",
            label: "county"
          },
          {
            name: "crash_type",
            label: "crash_type"
          },
          {
            name: "locality",
            label: "locality"
          },
          {
            name: "drvr_age",
            label: "drvr_age"
          }
        ]
      }
    ]
  });
  view.ui.add(editor, "top-right");
<div></div>
  view.ui.add(exportBtn, "top-left");
<div></div>
  exportBtn.addEventListener("click", () =&gt; {
    geojsonLayer
      .queryFeatures()
      .then(({ features }) =&gt; {
        const FeatureCollection = {
          type: "FeatureCollection",
          features: []
        };
        FeatureCollection.features = features.map(
          ({ attributes, geometry }, index) =&gt; {
            return {
              id: index,
              properties: attributes,
              geometry: Terraformer.ArcGIS.parse(geometry)
            };
          }
        );
        // Do something with your GeoJSON
        // Download it or send it to an external API
        // to update your existing GeoJSON
        console.log("FeatureCollection", FeatureCollection);
      })
      .catch(error =&gt; console.warn(error));
  });
<div></div>
  view
    .when(() =&gt; {
      const typeParams = {
        layer: geojsonLayer,
        view: view,
        field: "drvr_age"
      };
<div></div>
      return typeCreator.createRenderer(typeParams).then(response =&gt; {
        geojsonLayer.renderer = response.renderer;
        return geojsonLayer.queryFeatures();
      });
    })
    .then(({ features }) =&gt; {
      view.goTo(features);
    })
    .catch(error =&gt; {
      console.warn(error);
    });
});
</pre></div>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Summary

As you can see, the ArcGIS API for JavaScript can even take basic GeoJSON, make it editable with rendering and let you download that new edited data. That's awesome! I'm sure you can take full advantage of this yourself in your applications! Happy geohacking!
