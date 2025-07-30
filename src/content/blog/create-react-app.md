---

title: ArcGIS ESM with create-react-app
description: The ArcGIS ESM build is perfect for integrating with create-react-app
published: true
author: Rene Rubalcava
pubDate: 2021-01-11T10:00:00.000Z
heroImage: '../../assets/blog/create-react-app/images/cover.jpg'
tags: geodev
---

## It's never been easier

[create-react-app](https://create-react-app.dev/) is useful for developers to
get started quickly building applications with React. The one drawback, or
_delight_, depending how you look at it, is you don't have access to the webpack
config. That is unless you
[eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject),
which I've heard is something lots of users end up doing.

If you want to use [`@arcgis/core`](https://www.npmjs.com/package/@arcgis/core)
with create-react-app, follow these steps.

- `npm install @arcgis/core`
- `npm install --save-dev ncp`
- Add a new npm script -
  `"copy": "ncp ./node_modules/@arcgis/core/assets ./public/assets"`
- `npm run copy`
- Update the browserlist in `package.json`

```json
// package.json
{
  "browserslist": {
    "production": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

- Import the css in the `index.js` -
  `import '@arcgis/core/assets/esri/themes/light/main.css';`

That's the core of it. I've mentioned this a few times, but the key thing to
remember when using `@arcgis/core` is you need to
[copy the `assets` folder](https://github.com/Esri/jsapi-resources/tree/master/esm-samples#copy-assets)
into your build directory. In the case of create-react-app, you copy them into
the `public` directory, and it will copy anything in `public` to your deployed
folder.

You should update the `browserlist` because the ArcGIS JSAPI doesn't support
older browsers, and create-react-app tries to inject some babel helpers into
code in the node_modules. I'm not sure why, but it breaks the build. You can do
some babel stuff to get es5 support in there, but create-react-app doesn't
expose that configuration `¯\_(ツ)_/¯`

So you can set the `browserlist` and it won't break.

Once that is done, you can start using the API like any other library.

```jsx
import React, { useEffect, useRef } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import "./App.css";

function App() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        extent: {
          spatialReference: {
            wkid: 102100,
          },
          xmax: -13581772,
          xmin: -13584170,
          ymax: 4436367,
          ymin: 4435053,
        },
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
```

There is a sample application you look at for more details in this
[Esri github repo](https://github.com/Esri/jsapi-resources/tree/master/esm-samples/jsapi-create-react-app).

Watch me try to remember how to React in this video!

<lite-youtube videoid="dhyMamfjvcQ"></lite-youtube>
