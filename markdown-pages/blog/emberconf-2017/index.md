---
title: "EmberConf 2017"
published: true
author: Rene Rubalcava
date: "2017-03-29"
tags: geodev
coverImage: "emberconf2017.jpg"
---

I'm in Portland, OR again! This is my [second EmberConf](https://odoe.net/blog/reflecting-ember-conf-2016/) and I'm looking forward to some cool stuff this year.

There's a few Ember projects at Esri right now,

- [Operations Dashboard](http://doc.arcgis.com/en/operations-dashboard/)
- [Workforce Web App](http://www.esri.com/products/workforce)
- [Open Data](https://opendata.arcgis.com/)

I'm sure there's some other stuff going on too.

I've talked a bit about using [Ember with the ArcGIS API for JavaScript before](https://odoe.net/blog/update-on-ember-with-arcgis-js-api/). I've talked about it in [presentations](http://odoe.github.io/presentations/2017-devsummit-ps-using-frameworks/#/).

I've even talked about my adventures in writing an [addon](https://odoe.net/blog/five-things-i-learned-writing-an-ember-cli-addon/), oh and _what adventures they were!_

We currently have the [ember-cli-amd](https://github.com/Esri/ember-cli-amd) addon that will let you use the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) with the [ember-cli](https://ember-cli.com/). The addon works pretty solid, but is not an ideal solution, because we have to do load the JSAPI first and then the Ember bits.

Using the ArcGIS API 4 for JavaScript, you can do some cool stuff by treating the Map as a Service in an Ember app.

```js
import Ember from 'ember';
import EsriMap from 'esri/Map';

export default Ember.Service.extend({
  _map: null,
  map: Ember.computed('_map', {
    get() {
      let map = this.get('_map');
      if (!map) {
        map = new EsriMap({
          basemap: 'hybrid',
          ground: 'world-elevation'
        });
        this.set('_map', map);
      }
      return map;
    }
  })
});
```

So just in time for EmberConf, my bud, Tom Wayson has put together a new addon that is written specifically to lazy-load the ArcGIS API for JavaScript in an Ember app.

[twitter link](https://t.co/uHPYCe3H9T);

I tested this out when he started working on it and it works pretty nicely with minimal inconvenience. I'll be doing some more testing once EmberConf is done.

I'm not sure what exactly to expect this year at EmberConf, I'm looking forward to updates on Components and maybe some native integration, ala [React Native](https://facebook.github.io/react-native/).

## Glimmer

Big announcement out of keynote was official release of [Glimmer](https://glimmerjs.com/). I would have started rocking this right away, but I think everyone in attendance was killing the wifi doing that same thing! I'm excited about Glimmer, but I think I'm more excited about the TypeScript support in ember-cli (_start rewriting your apps folks_). Looks like I can nab Glimmer outside an Ember environment, so I'm jazzed about that.

There were some solid presentations, but probably the highlight was the last of the day on higher-order components presented via as a video game. I think it was a great way to inject some humor into the presentation and still provide some great info.

I'm currently spending my night trying to figure out how to use Glimmer outside of ember-cli so I can try to integrate it into some ArcGIS JSAPI apps. I think I'm about 80% there, so close, so close.
