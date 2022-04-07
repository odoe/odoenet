---
title: "Popups with React Portals"
description: "A look at how you can use React Portals in your ArcGIS JSAPI Popups"
published: true
author: Rene Rubalcava
date: 2022-04-06T10:00:00.000Z
coverImage: "cover.jpg"
tags: odoe
---

## You people do weird stuff

I get asked some pretty odd questions. It's ok, I have some pretty odd answers. One of the questions that comes up is how people can do weird stuff with their Popups in the ArcGIS API for JavaScript.

Can I have multiple popups? No.
Can I drag the Popup around? No.
Can I resize the Popup? No.

All these have some more nuanced answers, that require a bit of elbow grease, but by default... no.

One question that comes up sometimes is can I use React components in my Popup? _Sure you can!_

As a matter of fact, React has an API for just this kind of use case. [React Portals](https://reactjs.org/docs/portals.html). The purpose of React Portals is to manage DOM elements that exist outside the parent DOM. The most common use case is a modal dialog. Or maybe a toast alert, or tooltips and popovers on your page. You can leverage this in your Popups too!

## Open the Portals in your mind

> Note: You can find the source code this project on [github](https://github.com/odoe/Popup-React-Content).

First thing I want to do is create a React component that can take some data and be displayed in my Popup.

```jsx
/// src/PopupInfo.js 
import React from 'react-dom';

const PopupInfo = ({ data }) => (
    <div className='popup-container'>
    <div className='my-popup'>
      <h1>{data.title}</h1>
      <p>
          {data.description}
      </p>
    </div>
  </div>
);

export default PopupInfo;
```

This is a fairly straightforward component. But you can make your component as complicated as you desire, charts, graphs, animations, maybe another Map?!?! Knock yourself out, it's your component.

Then I need to create a wrapper portal component for my Popup content.

```jsx
// src/PopupPortal.js 
import { useEffect } from "react";
import { createPortal } from "react-dom";

const PopupPortal = ({ mountNode, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    mountNode.appendChild(el);
    return () => mountNode.removeChild(el);
  }, [el, mountNode]);

  return createPortal(children, el);
};

export default PopupPortal;
```

This component is going to take `mountNode` DOM element, and child components, and then render them in the React Portal. It's not very complicated, but does the job. I think I could simplify this even more.

```jsx
// src/PopupPortal.js Option 2
import { createPortal } from "react-dom";

const PopupPortal = ({ mountNode, children }) => {
  return createPortal(children, mountNode);
};

export default PopupPortal;
```

My only concern here is that the `mountNode` might get destroyed when I don't want it to. I might be overly cautious, but that's how I roll.

## Put the lime in the coconut

Here is a quick preview of how I can use the `PopupPortal`.

```jsx
// src/App.js
import React, { useRef, useEffect, useState } from "react";

import PopupInfo from "./PopupInfo";
import PopupPortal from "./PopupPortal";

const popupRoot = document.createElement('div');

function App() {
  const mapDiv = useRef(null);
  const [ popupData, setPopupData ] = useState({});

  useEffect(() => {
    if (mapDiv.current) {
      ...
      sceneView.when(() => {
        ...
        function setContentInfo(center) {
          setPopupData({
            title: "My Popup with React Portal",
            description: `This is my React Portal: center = ${JSON.stringify(center.toJSON())}`,
          });
          return popupRoot;
        }
      });
    }
  }, [mapDiv]);

  return (
    <div className="mapDiv" ref={mapDiv}>
        <PopupPortal mount={popupRoot}>
            <PopupInfo data={popupData}></PopupInfo>
        </PopupPortal>
    </div>
  );
}

export default App;
```

Ok, let's break this down a bit. The PopupTemplate [content](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html#content) can be a variety of things, including a method that returns an HTML element that is used for the Popup content. We can use a method like `setContentInfo` to update our component state and return an HTML element we've created.

```jsx
function setContentInfo(center) {
    setPopupData({
        title: "My Popup with React Portal",
        description: `This is my React Portal: center = ${JSON.stringify(center.toJSON())}`,
    });
    return popupRoot;
}
```

We can pass this element exist in the context of our component, so we can pass it to our Portal component.

```jsx
<div className="mapDiv" ref={mapDiv}>
    <PopupPortal mount={popupRoot}>
        <PopupInfo data={popupData}></PopupInfo>
    </PopupPortal>
</div>
```

Now, when we open the Popup in our map, it will be populated with our Popup React component!

## Summary

The ArcGIS API for JavaScript provides a lot of functionality for Popups. Tables, charts, media, attachments, Arcade, various expressions, custom actions, and the list goes on. Considering it is probably the most widely used widget across various applications, the fact that you can have total control of the content based on some of not only _where_ you click on the map, but _what_ you click on the map, is pretty damn cool. Have some fun with it, you might find that React Portals solve a particular use case for you that you've been working around. For example, the non-Portal way to do this would involve using [`React.unmountComponentAtNode(container)`](https://reactjs.org/docs/react-dom.html#unmountcomponentatnode), which works great, but poses it's own issues of managing multiple React DOMs. You can see more information in the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/_Qqe7PH3be0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
