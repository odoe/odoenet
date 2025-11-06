---
title: Shadow DOM and Slots in ArcGIS Map Components
description: Big component updates in the ArcGIS Maps SDK for JavaScript 4.34 release
published: true
author: Rene Rubalcava
pubDate: 2025-11-06T10:00:00.000Z
heroImage: "../../assets/blog/shadow-dom-slot-map-components/images/cover.jpg"
tags: javascript
---

It's been a while since the ArcGIS Maps SDK for JavaScript released the map components. They're pretty awesome if I do say so myself! This latest 4.34 release of the Maps SDK introduced some exciting changes.

- Components are all Shadow DOM enabled
- New Slots UI layout
- No need to import css files
- Beta Popup component

## Shadow DOM

If you're not familiar with [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), it's essentially a hidden, secret DOM that is safe from the dirty CSS and JavaScript of the outside world... mostly, ha! One benefit here is that it allows each component to scope it's own styles and not be concerned about conflicts with other css on the page. The one exception here is the [Calcite Design Tokens](https://developers.arcgis.com/calcite-design-system/foundations/tokens/reference/) that the map components use heavily. These tokens are defined at the root of the page and can be used anywhere else, including inside the Shadow DOM.

This was a big task for Map components and also opens up some other capabilities of using web components!

## Slots

One really fun update is the addition of [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot) for a new UI layout in Map and Scenes! The available slots can be found [here](https://developers.arcgis.com/javascript/latest/references/map-components/arcgis-map/#slots). Take note that there are RTL slots, which I am pretty proud of!

[Demo](https://codepen.io/odoe/pen/YPwboPj?editors=1000)

```html
<arcgis-map item-id="45725ba7d9fb47a0925398919b13d1fa">
  <arcgis-zoom slot="top-left"></arcgis-zoom>
  <arcgis-home slot="top-left"></arcgis-home>
  <arcgis-compass slot="top-left"></arcgis-compass>
  <arcgis-expand slot="bottom-left">
    <arcgis-legend></arcgis-legend>
  </arcgis-expand>
  <arcgis-layer-list slot="top-right"></arcgis-layer-list>
</arcgis-map>
```

I also want to point out that this fixes an old issue where components didn't always honor the order they were placed in the DOM as they were using an old positioning method. Now the order works as expected!

The old `position` attribute has been deprecated, but for now, it is backwards compatible, so it will work for this release, but please... please update your code. Pretty please.

There has been some requests to provide some specific layout options, and I don't think any solution will satisfy everyones needs, but you can integrate your own custom layout if you need it. [Here is a demo](https://codepen.io/odoe/pen/dPGbYLO?editors=1000) that places the directional-pad in the center of the map and only visible when you hover over it. So if you need some custom layout options, you can definitely implement your own.

## Where's my CSS?

You might notice in the [samples](https://developers.arcgis.com/javascript/latest/sample-code/) there is no css added for the Maps SDK or Calcite. Each component loads it's own css, so no need to add the ArcGIS css file for light or dark.

How do you get dark mode? Oh my friend, that is such a nice story now.

[Demo](https://codepen.io/odoe/pen/dPGEBRg?editors=1000)

```html
<body class="calcite-mode-dark"></body>
```

Since the Map components use Calcite, it follows the same conventions for their [modes](https://developers.arcgis.com/calcite-design-system/core-concepts/#modes)!

Geez, wish I had more to say here, but it's pretty self explanatory. You don't need to add css. Fin.

## Beta Popup Component

The [`arcgis-popup`](https://developers.arcgis.com/javascript/latest/references/map-components/arcgis-popup/) is in beta for the 4.34 release. Why? It works great, but it needs a little more time to cook, _let us cook!_ You can start playing around with it now by adding it to the `popup` slot of the map or scene component.

```html
<arcgis-map item-id="06ca49d0ddb447e7817cfc343ca30df9">
  <arcgis-popup slot="popup"></arcgis-popup>
</arcgis-map>
```

Why a `popup` slot? This lets the map/scene component know you are overriding the default popup on click. That's key right now, this only takes over the popup used when you click on the map. The search component still uses the popup widget. However, you won't see two popups at the same time, that won't happen.

Try it out, provide some feedback. This is an awesome addition to the library and I'm proud of the team that got this working!

## Summary

The 4.34 release of the ArcGIS Maps SDK for JavaScript components had some great updates that really push the component story forward. Shadow DOM and Slots was a big undertaking and opened up the path to fully embrace the full suite of web component technologies!

Take the components for a spin, provide some feedback and build some awesome apps!

<lite-youtube videoid="cQxhb8wwCvU"></lite-youtube>
