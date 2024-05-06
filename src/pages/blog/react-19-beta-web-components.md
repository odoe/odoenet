---
layout: "../../layouts/BlogPost.astro"
title: "React 19 beta, they finally did it"
description: "React 19 beta adds support for web components"
published: true
author: Rene Rubalcava
pubDate: 2024-05-06T12:00:00.000Z
coverImage: "cover.jpg"
tags: react, javascript
---

## Why web components

Way back in the day (for me, Dojo, Backbone, Knockout days), when the world of web development was much simpler, all frameworks and UI libraries were basically trying to solve the problem of custom elements before custom elements support was fully fleshed out among browser vendors. Don't forget, at the time of this writing, IE 11 support only ended two years ago. But for years before this, we had all been working on things that let us bind data to elements, make it easier for them to be reactive, and support custom functionality.

In 2017, the [RFC](https://github.com/facebook/react/issues/11347) to add custom elements properties and attribute support to React was posted. To be fair, as I mentioned, web components were still in their infancy, and developers had been investing a lot of energy into their frameworks of choice. Can't really blame them, there is a finite amount of time and resources, so you do what you have to do.

However, many companies and teams, such as the one I work on, have put a lot of effort into building out their web component offerings. This has a lot of benefits, which I have touched on in numerous talks, but the number one being that dev teams are free to choose the frameworks and tooling they are most comfortable with. But let's be honest here, we're not going to maintain a separate UI library for every single framework. We can focus on web components and create wrapper libraries as needed. Web components allow us to share a common suite of features across those teams.

## React 19 beta

So recently, the [React 19 beta](https://react.dev/blog/2024/04/25/react-19) was announced and way at the bottom of the post was the mention that support for custom elements was finally added.

_I nearly fell out of my chair._

This was something I, and I'm sure many others had been waiting for. No more wrappers (maybe), no more odd work around tricks or having to `useRef` for property assignment. It was a good day.

I went through the [upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) and quickly realized I needed a little more info to get TypeScript working. I knew there must be some React 19 types out there somewhere, so I went to github and found the [DefinitelyTyped PR](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69022) and it had some more detailed instructions for getting the types installed and everything working.

[Here](https://github.com/odoe/arcgis-map-comps-react-19-beta) is a repo using React 19 beta, TypeScript, and the [ArcGIS Maps SDK for JS map components](https://www.npmjs.com/package/@arcgis/map-components).

```tsx
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
  } as unknown as __esri.Popup;
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

As can be seen in this snippet here, there's no need to use a React wrapper for these components, and I can assign complex objects as properties. This is awesome!

One thing you may notice is the casing of the event name. Normally, using React components, the event name would be `onArcgisViewReadyChange`, but I had to do some digging and found [this issue](https://github.com/facebook/react/issues/7901) that mentions you should use lowercase `oneventnameType` for custom event names, so in my case I use `onarcgisViewReadyChange`. Looks like this is to distinguish custom element events from synthetic events. This wasn't in the React 19 beta blog post, so you're welcome.

## Summary

I've been critical of React in the past, but it doesn't mean I don't see the value, plus it has such a large community and ecosystem, it can't be ignored. I am also an advocate for web components and think that if you can use the tools you're available in the browser, use them. I think being able to take use web components in React is going to open up a lot of opportunities for component developers. You kind of get the best of both worlds to build your applications.

I also did a video on this topic you watch below!

<lite-youtube videoid="3VXJtD599sM"></lite-youtube>
