---

title: ArcGIS API Keys for JSAPI
description: How to use API keys in your ArcGIS JSAPI apps
published: true
author: Rene Rubalcava
pubDate: 2021-02-12T10:00:00.000Z
heroImage: '../../assets/blog/api-keys/images/cover.jpg'
tags: geodev, javascript
---

## Keys to the Kingdom

Recently, ArcGIS introduced
[API keys](https://developers.arcgis.com/documentation/security-and-authentication/api-keys/)
as a compliment to authentication in ArcGIS. They serve a couple of specific
purposes, consuming location services and basemaps. They don't replace
authentication for your private hosted data, but for stuff like geocoding and
directions, this is your butter.

One of the cool ideas about API keys, is you can use them anywhere. OpenLayers,
Leaflet, raw REST calls, whatever floats your boat. One of the easiest
integrations is directly in the ArcGIS API for JavaScript.

The most common task you would probably use this for are the new basemap styles
that require API keys. You can see a list of the named basemaps in the
[documentation](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).

## Getting Started

- Be sure to sign up for a developer account
  [here](https://developers.arcgis.com).
- Create an API key [here](https://developers.arcgis.com/api-keys).
- Please, I'm begging you... _add a referrer_.

![Add a Referrer](/images/api-key-referrer.png)

Once you've done this, you can now use it in your apps!

```js
import config from "https://js.arcgis.com/4.18/@arcgis/core/config.js";
import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";

config.apiKey = "DONT_STEAL_MY_KEY";

const map = new ArcGISMap({
  basemap: "arcgis-newspaper",
});

const view = new MapView({
  container: "viewDiv",
  map,
  zoom: 4,
  center: [-118, 34],
});
```

That's about it really. This demo just shows using a named basemap. But you
could start using it for
[directions](https://developers.arcgis.com/documentation/mapping-apis-and-location-services/routing/services/routing-service/)
for example. Just point it to the API-key friendly route service.

```js
...
import Directions from "https://js.arcgis.com/4.18/@arcgis/core/widgets/Directions.js";

...

const directions = new Directions({
    view,
    routeServiceUrl: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
});
view.ui.add(directions, "top-right");
```

Now you're really cooking with those API keys!

## Summary

I'm really digging API keys. I think they offer a clean way to take advantage of
some of the location services that would normally require you to get familiar
with OAuth and Identity workflow. Don't get me wrong, if you are dealing with
secure data, you still need to authenticate your app, and you should
[get familiar with it](https://developers.arcgis.com/javascript/latest/sample-code/identity-oauth-basic/).
But if you just want directions and basemaps in an app, API keys are quick way
to get there.

Check out a demo [here](https://glitch.com/edit/#!/invented-evening-fontina)!

Check out this video below to see it in action!

<lite-youtube videoid="kgTv7SMjKIM"></lite-youtube>
