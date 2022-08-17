---
layout: "../../layouts/BlogPost.astro"
title: "DIY Edit Sessions"
description: "I don't recommend you do this, but you could. If you had to. But maybe don't."
published: true
author: Rene Rubalcava
pubDate: 2021-03-24T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Show me the edits

The ArcGIS API for JavaScript comes with an [Editor widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html) you can use out of the box. It works with any layer that supports editing. This makes building an application that supports editing pretty easy. When using the Editor widget, edits are applied immediately. This is by design, and works pretty well.

One thing you might be tasked to do is create an edit session. This means you do a few edits in the client first before you push them all at once to your layer. The Editor widget doesn't do this and there is no built-in mechanism in the API for this. There's a good reason for that. _It's complicated_.

## Use at your own risk

Project requirements can vary at times, so the ArcGIS JSAPI is flexible enough to meet those needs. You can use the [applyEdits](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) of the layer to build out your own editing workflow. The idea here is to perform your initial edits on a clientside layer. Once you've completed the clientside edits, you can then push them to the source layer. There's a few problems that could arise from this.

* How do you handle conflicts when multiple editors are editing the same data?
* What do you do if you want to undo edits in a session?
* How many edits does it take to screw in a light bulb?

I can't answer these questions for you, but I can help you with the edit session part. When you think about it, you need a few things to create an edit session.

* Source layer
* Clientside copy of the source layer
* Layer to store edits

To do this, we could have a utility method to copy the properties of the source layer.

```js
function copyLayer(lyr, title) {
    const tempLayer = new FeatureLayer({
        title,
        fields: lyr.fields.map(x => x.clone()),
        geometryType: lyr.geometryType,
        renderer: lyr.renderer.clone(),
        spatialReference: lyr.spatialReference.clone(),
        source: [],
        visible: false
    });
    return tempLayer;
}

const clientLayer = copyLayer(layer, "Client Layer");
const editLayer = copyLayer(layer, "Edit Layer");

map.addMany([clientLayer, editLayer]);
```

Now we can configure an Editor widget so that it will only work with the editLayer we created.

```js
const editor = new Editor({
    view,
    layerInfos: [{
        view,
        layer: editLayer,
        addEnabled: true,
        updateEnabled: false
    }, {
        view,
        layer: clientLayer,
        enabled: false
    }, {
        view,
        layer: layer,
        enabled: false
    }]
});
```

That's a really useful feature of the Editor widget, it is highly configurable. That's amazing right!

Now what I want to do is populate the clientside copy of my layer.

```js
whenFalse(layerView, "updating", async () => {
    const { features } = await layerView.queryFeatures();
    const oids = await clientLayer.queryObjectIds();
    const result = await clientLayer.applyEdits({
        addFeatures: features,
        deleteFeatures: oids.map(x => ({ objectId: x }))
    });
    const count = await clientLayer.queryFeatureCount();
});
```

You could probably get away without this static copy of the source layer. I like to play it a little safe and use it, so I don't accidentally edit the source layer.

At this point, I can use the Editor widget to edit the empty editLayer I created. I can use the clientside layer as a reference to the source layer, just to visually see my data. I'll turn off the source layer, because that's just what I do.

When I'm ready, I can use the features in the editLayer to do a batch edit to the source layer.

```js
edit.addEventListener("click", async () => {
    const { features } = await editLayer.queryFeatures();
    const result = await layer.applyEdits({
        addFeatures: features
    })
    .catch(err => console.log(error));
    layer.refresh();
    editLayer.refresh();
    editLayer.visible = true;
    // cheap way of getting the oids
    const oids = features.map((a) =>  a.attributes.OBJECTID);
    await editLayer.applyEdits({
        deleteFeatures: oids
    });
});
```

There's probably some stuff wrong here, I'll admit it. It may not fit your exact use case. But this pattern should give you a good start. Lastly, this will probably void your ArcGIS API for JavaScript warranty. Kidding about that last part, but yeah.

## Summary

I've worked on some pretty complicated projects back in the day when it comes to editing. I've done some dark things, things I'm not proud of with JavaScript, things that changed me. I don't recommend you use these edit session patterns unless you have to. But you could, and sometimes you just need to meet requirements. I feel ya.

You can see more details in this video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/C7B7DSHnRVc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
