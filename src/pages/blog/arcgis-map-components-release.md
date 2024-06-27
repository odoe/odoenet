---
layout: "../../layouts/BlogPost.astro"
title: "ArcGIS Map Components Release"
description: "The ArcGIS Maps SDK for JavaScript components are officially out of beta"
published: true
author: Rene Rubalcava
pubDate: 2024-06-27T12:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, components
---

## Introduction
A few years ago, I demoed a prototype of web components using the [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/) to my colleagues – which at the time was called the ArcGIS API for JavaScript – that's five extra keystrokes if you're keeping track. It was just an idea and believe me – I have plenty of ideas. It was something that had the potential to be beneficial to users and other developers at Esri. For current users, it could simplify how much code they need to write and take advantage of components to write basic applications. They can also be a gentle introduction to the maps SDK using HTML and CSS with minimal JavaScript. I knew there was other web component work being done – of course Calcite Components, and applications such as the Map Viewer, Instant Apps, and more were using web components to make it easier to reuse components in applications. I was lucky enough to have a spark at the right time and join a team with a goal to make it easier for internal developers to not only use web components – but to build their own.

At Developer Summit 2024, the Map components were announced as a beta release. This was a huge step above the initial crude implementation, but with the help of a solid team, we were able to get them in a good spot. More importantly, we were able to get more developers testing and providing feedback. With the help of that feedback, as of the [4.30 release of the ArcGIS Maps SDK for JavaScript](https://www.esri.com/arcgis-blog/products/js-api-arcgis/announcements/whats-new-in-arcgis-maps-sdk-for-javascript-4-30/), the map components are now officially **out of beta**. This means a defined API, naming convention, and they should work as advertised. Are they perfect? Sounds like a philosophical question to me, but they are stable. There is of course what we would call _under-the-hood_ work to be done. There are plans to have additional web component features in a future release. I'm not a fortune-teller though, so don't ask me when – but when they are added you will know.

## Map Components
What are the [map components](https://developers.arcgis.com/javascript/latest/components/#map-components)? They are a collection of custom elements that let you compose HTML to build an application. In many cases you only need an item id for a webmap or webscene from ArcGIS Online or your own Enterprise portal. You may not even need to write JavaScript. The components can be used almost anywhere. The advantage is they are portable across applications and tooling.

## Things to know
Here are a few things I think you should know when working with components.

### 1. Events
In the [map components](https://developers.arcgis.com/javascript/latest/references/map-components/?path=/docs/welcome--docs), we can make a distinction between _view_ components and UI components. View components would be the `arcgis-map` and `arcgis-scene`. These two components are the equivalent of the `MapView` and `SceneView` in the core API. I only bring this up because these two components have a specific event called `arcgisViewReadyChange`.
```js
const mapElement = document.querySelector("arcgis-map");
mapElement.addEventListener("arcgisViewReadyChange", (event) => {
  // Continue work that might include adding layers or more
});
```


This event will fire when the component is ready to be used. If you have ever used `view.when()` with the core API, that's how this works. This event only fires once – unless you change the `map` property. Yes, you can do that.

```js
// Assign a WebMap to a Map Component
// Using CDN, similar with NPM package
const arcgisMap = document.querySelector("arcgis-map");

async function load() {
  // Change the WebMap
  const WebMap = await $arcgis.import("esri/WebMap");
  arcgisMap.map = new WebMap({
    portalItem: { id: "e691172598f04ea8881cd2a4adaa45ba" }
  });
}

load();
```

```js
// You can defer loading components to do
// authentication for example
async function load() {
	const IdentityManager = await $arcgis.import("esri/identity/IdentityManager");
	const OAuthInfo = await $arcgis.import("esri/identity/OAuthInfo");

	// Do your authentication steps here
	
	// When ready, load the components library and it will pick up
	// the authentication you have done.
	await import("https://js.arcgis.com/map-components/4.30/arcgis-map-components.esm.js");
}

load();
```

Another event that is common across all components is `arcgisPropertyChange`. Before I dive into this event, you need to remember that custom elements are a standard and there are standard ways to know when DOM elements have changed. Event listeners and Mutation Observers. If you have used the core API, you are probably familiar with the Accessor and watching for property changes. This is a convenient pattern – in the core API. For custom elements, not so much. There was quite a bit of discussion on whether we should implement a `DOMReactiveUtils` that would work just on map components. But this isn't part of the standard, it wouldn't work anywhere else except map components and honestly, goes against the grain of the web platform.

What does this have to do with `arcgisPropertyChange`? This event will fire when _some_ properties on a component change. This lets you do something in your application that might need to know when a property has changed. When this event fires it will provide the name of the property that changed, and you can then access that value from the component.

```js
const features = document.querySelector("arcgis-features");
features.addEventListener("arcgisPropertyChange", (event) => {
  // name: event.detail.name
  // value: features[event.detail.name]
});
```

Some properties are also attributes (more on that in a moment). What makes a property an attribute? It must be either a boolean, string, or number. But if the updates are reflected to the element, you can use a MutationObserver.

An event like `arcgisViewReadyChange` that is available on UI components is `arcgisReady`. This means the component is ready. I've written a lot of test apps and so far, I haven't used this event, but it's there in case you need it – someone will.

### 2. Attributes and Properties
With HTML elements, it's key to understand the difference between attribute and properties. This topic can cause confusion for developers when trying to set properties as attributes or expecting certain value types when accessing properties.

Let's start with attributes. Attributes are values that can be set directly in the DOM on an element. Here are some examples.
- `<input type="text" value="Bob" />`
- `<button type="submit">Submit</button>`
- `<my-element show-children origin="home"></my-element>`

Technically, all attributes are only string values. Even a boolean value is either `null` or an empty string `""`. Technically it is _truthy_ or _falsey_. What could possibly go wrong here?

Attributes are also always kebab-case. Don't try to set `showChildren` as an attribute on the custom element, the proper name is `show-children`.

You can access attributes via `element.getAttribute("value")` and set attributes via `element.setAttribute("value")`. For boolean attributes, you can use `element.toggleAttribute("show-children")`.

Properties however can only be accessed via JavaScript: `console.log(element.currentValue)`. Properties cannot be set as attributes, but that doesn't mean they can't be related. A property can also be an alias for attribute and vice versa.

You might have a property called `valueHistory` that is an array that tracks `value` attribute changes. This property can be accessed internally by the component or by users that might be interested in using these entries in their application.

The key here is that properties can be objects or arrays. Attributes can be string, number, or boolean.
### 3. Frameworks
Events and property/attribute assignment are some core basics you should know when working with not only components, but the DOM in general. But you can also use libraries and frameworks to make this easier to deal with. For example, in React, you can assign complex objects to components.

```jsx
<ArcgisMap
  itemId="d5dda743788a4b0688fe48f43ae7beb9"
  popup={
    {
      dockEnabled: true,
      dockOptions: {
        position: "bottom-right",
        breakpoint: false,
      },
    }
  }
  theme={
    {
      accentColor: "purple",
      textColor: [125, 255, 13, 0.9],
    }
  }
  onArcgisViewReadyChange={() => {
    console.log("Map is ready");
  }}
>
  <ArcgisSearch position="top-right" />
  <ArcgisExpand position="bottom-left">
    <ArcgisAreaMeasurement2d />
  </ArcgisExpand>
</ArcgisMap>
```

All those rules about property assignment and objects mentioned earlier can be thrown out the window when talking about most frameworks. They will handle correct property assignment for you.

In a [DevSummit presentation](https://mediaspace.esri.com/media/t/1_5p1v4430), I did a quick rundown showing how you can use them with everything from React to Laravel, even an Elm application. Some may have thought I went too far – I like to think I went far enough. The components provide framework wrappers for React and Angular. But with upcoming release of React 19, you shouldn't need the wrapper.

```jsx
// Example using React 19
import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import './App.css';

defineCustomElements();

function App() {
  const popupConfig = {
    dockEnabled: true,
    dockOptions: {
      position: "bottom-right",
      breakpoint: false,
    },
  };
  return (
    <div className='app-container'>
      <arcgis-map
        popup={popupConfig}
        item-id="e691172598f04ea8881cd2a4adaa45ba"
        onarcgisViewReadyChange={() => console.log("ready")}></arcgis-map>
    </div>
  )
}

export default App
```

## Samples
In addition to the [documentation](https://developers.arcgis.com/javascript/latest/components/), [patterns](https://developers.arcgis.com/javascript/latest/programming-patterns/) and [tutorials](https://developers.arcgis.com/javascript/latest/tutorials/), there are more samples you can review [here](https://github.com/Esri/jsapi-resources/tree/main/component-samples). These samples provide a good starting point. You will notice that hanging out among [React](https://github.com/Esri/jsapi-resources/tree/main/component-samples/map-components/samples/react) and [Vue](https://github.com/Esri/jsapi-resources/tree/main/component-samples/map-components/samples/vue) samples is a [CDN sample](https://github.com/Esri/jsapi-resources/tree/main/component-samples/map-components/samples/cdn). It's important to note that the CDN is a completely viable way to build some applications. You don't always need a framework. You don't always need a build tool. Sometimes you just need some HTML and a dash of CSS. I'm a fan of simplicity.

## Summary
The addition of components to the ArcGIS Maps SDK for JavaScript provides some new options and powerful features to developers. The intention is that it makes adding mapping capabilities to your applications easier and provides some reusability. With a script and link tag, you can add maps to a WordPress site, Shopify store or any other static page without having to worry about writing additional JavaScript. And for new users who want to display a map quickly on the page, they can focus on other capabilities of the SDK like queries and visualization.
