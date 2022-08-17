---
layout: "../../layouts/BlogPost.astro"
title: "SolidJS with the ArcGIS JSAPI"
description: "Intro to using SolidJS to build apps with the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: 2022-05-17T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## Embrace Reactivity

[SolidJS](https://www.solidjs.com/) is an interesting UI library. On the surface, it feels pretty familiar if you've used libraries like React or Vue. However, instead of maintaining a virtual DOM under the hood, it just updates the DOM elements as needed, so there is no diffing. It comes with a suite of reactive helpers, lifecycle functions, and utilities. This won't be a deep dive into SolidJS, but a quick intro how you can get started using it to build your [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/) applications.

> You can find the code for this post on [github](https://github.com/odoe/jsapi-solidjs-simple)

Before we dive into working with Solid and the ArcGIS JSAPI, let's cover a few basics real quick.

The [`createSignal`](https://www.solidjs.com/docs/latest/api#createsignal) method is the most basic reactive method you can use. It can track a value for changes.

```js
const [ coords, setCoords ] = createSignal({ x: 0, y: 0 });

// at some point in your component
setCoords({ x: value.x, y: value.y });

// the returned component
return (
    <div>
        <h3>Current Location</h3>
        <label>Current Location: x: {coords().x}, y: coords().y</label>
    </div>
);
```

Notice, that to access the properties of the signal, you reference them via `coords().*`, not `coords.x`. The values are getter methods, so you need to execute them to get the values. Now you might be tempted to destructure the properties from the object. The `setCoords` in this case is a setter method. So just remember the return value of `createSignal` is a tuple of a getter and setter _methods_.

```js
const { x, y } = coords();
```

Once you destructure them, they lose reactivity and will not update the DOM. Don't get bit by this one, remember that props, signals, are getter methods being passed around

## Making a map

One of the first things you want to know when using the ArcGIS JSAPI with any UI library is how to reference a DOM element that it generates so you can display the map. With Solid, there is no special function needed for this, you just need to assign a variable to the `ref` of the element.

```js
let mapDiv;

return (
    <div ref={mapDiv}>
    </div>
);
```

Simple enough, I'm not sure how much simpler you can make this.

The next thing you need to know is when can you initialize the map and use this reference to create your map. Solid has a lifecycle helper you can use called [onMount](https://www.solidjs.com/docs/latest/api#onmount). The `onMount` method runs once in the component, and never again. At this point, since, as the name implies, the component is mounted, our ref variable should now be available to use.

```js
onMount(() => {
    const webscene = new WebScene({
        portalItem: {
        id: 'adfad6ee6c6043238ea64e121bb6429a'
        },
    });

    const sceneView = new SceneView({
        map: webscene,
        container: mapDiv,
        popup: {
        actions: [],
        dockEnabled: true,
        dockOptions: {
            buttonEnabled: true,
            breakpoint: false,
        },
        },
    });
});
```

This particular component has no side-effects, so there's not much else to do with it. If it had a dependency on some passed down properties, I might want to use a [`createEffect`](https://www.solidjs.com/docs/latest/api#createeffect), but I don't need that right now.

## Summary

Solid is a fun library! I really like the idea that everything is just functions and components that return DOM elements. There are a lot of utility methods available in Solid to help with reactivity and simplify how you handle side-effects and properties. I highly recommend you review the guides and documentation, they did a great job here!

You can watch this video for more information!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/Bwjm4asSAMo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>