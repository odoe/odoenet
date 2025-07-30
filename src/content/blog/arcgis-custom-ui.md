---

title: ArcGIS Custom UI
description: Building a custom UI with the ArcGIS Maps SDK for JavaScript
published: true
author: Rene Rubalcava
pubDate: 2023-08-18T10:00:00.000Z
heroImage: '../../assets/blog/arcgis-custom-ui/images/cover.jpg'
tags: javascript
---

## You need weird stuff

I see a lot of user questions come across my desk about doing some kind of
custom work when building apps with the
[ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/).
I'm not going to lie, some of you want to do some weird stuff. I get it, I get
it, you have users with specific needs, some odd workflow, or your boss drew
some sketch for an app on a napkin. Hey, we've all been there.

The ArcGIS Maps SDK provides a ton of out-of-the-box widgets to build awesome
apps. Once in a while you need some custom component that needs to interact with
the map or scene. Just our luck, we provide
[a sample](https://github.com/Esri/jsapi-resources/tree/main/esm-samples/jsapi-custom-ui)
for that!

## Custom UI

Let's assume you're tasked with building a component that needs to display the
center coordinates of the map at all times. I don't know, but I've seen this
type of interface in mapping apps before, so it's feasible.

Let's go ahead and make a React component, because of course you're using React.

```jsx
// src/CenterComponent.jsx
import { useEffect, useState } from "react";
import { watch } from "@arcgis/core/core/reactiveUtils";
import "./center-component.css";

const CenterComponent = ({ view, id }) => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    // Watch for changes on the View's Extent
    let handle = watch(
      () => view?.view?.extent,
      (value) => {
        const { latitude, longitude } = value.center;
        // Update the component's display
        setCenter(`${longitude.toFixed(4)}, ${latitude.toFixed(4)}`);
      },
    );
    // Clean up any handles or event listeners
    // created in useEffect method
    return () => handle.remove();
  }, [view]);

  return <div id={id} className="center-component">Center: {center}</div>;
};

export default CenterComponent;
```

## Off the hook

Ok, let's break down how some of this works in React. We are going to use a
couple of hooks from React.

- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)

The purpose of `useState` is pretty straightforward. It's helpful to manage the
internal state of the component, which would be the string value of the
coordinates.

The purpose of `useEffect`, directly from the docs... _Some components need to
stay connected to the network, some browser API, or a third-party library, while
they are displayed on the page._ I would say that qualifies for our use case.
Pay attention to the hooks dependency array. First the function that is returned
is referred to as a cleanup function, the first function is called the setup. On
a re-render, if something in the dependencies array has changed, the function
the cleanup function runs, then the setup function runs.

The setup function uses
[`reactiveUtils`](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html)
to watch for the MapView center to change. I talked more about reactiveUtils in
this post [here](https://odoe.net/blog/intro-reactiveutils). When the center of
the view changes, the local state is updated. In this component, the cleanup
function removes the
[WatchHandle](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle).

## Using the Custom UI

We can now consume the custom component in our React application.

```jsx
// src/App.jsx
function App() {
  const [viewState, setViewState] = useState(null);
  const centerComponentID = useRef("center-component");
  const mapDiv = useRef(null);

  useEffect(() => {
    // super awesome code here
  }, [mapDiv]);

  return (
    <div className="mapDiv" ref={mapDiv}>
      <CenterComponent
        id={centerComponentID.current}
        view={viewState}
      >
      </CenterComponent>
    </div>
  );
}

export default App;
```

The main thing the `CenterComponent` needs is access to the view so it can watch
for changes. The reason we do this is so that the internals of how this works
can change in the future if it needs to. That's all there is to it. Not too
complicated, and now we can use this component across any of our React
applications in our organization.

## Summary

I kind of wish this was more complicated than it really is. Then I would have
more to talk about. But in this case, when you know a little bit about building
React components, you integrate functionality from the ArcGIS Maps SDK for JS
pretty easily. This applies to doing the same thing with Vue, Svelte, Angular,
Solid, whatever.

I've seen some pretty creative custom functionality built in various frameworks
and stacks. So if you ever need to build some custom UI functionality for your
application, this example should give you a pretty solid start. Good luck and
build something awesome!
