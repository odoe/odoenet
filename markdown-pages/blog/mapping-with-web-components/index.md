---
title: "Mapping with Web Components"
published: true
author: Rene Rubalcava
date: "2019-04-19"
tags: geodev
coverImage: "arcgis-webmap.jpg"
---

Web Components are one of those web technologies that has been around for a relatively long time with support being kind of _meh_ across multiple browsers. They are definitely something that I think deserves attention and the more I think about it, the more I'm getting on board with it. I had talked about web components a [while ago](https://odoe.net/blog/dojo-2-and-web-components/), I even made a [video](https://www.youtube.com/watch?v=bXvsGhNkXXU)!

Imagine this... you create a series of web components that are not bound to any particular framework or technology, you can consume them in static HTML pages, add some DOM attributes, some event listeners and they just work. You can use them in your framework of choice, across multiple projects. You just need to wire them together. There are [polyfills](https://www.webcomponents.org/polyfills) and libraries like [StencilJS](https://stenciljs.com/) and modern [Dojo](https://dojo.io/) make it easier than ever to produce web components for you to abuse use.

Since I've been knee deep in [learning dojo](https://learn-dojo.com/) as of late, I'm going to use Dojo to build my web components. You can use the [dojo-cli](https://dojo.io/tutorials/000_local_installation/) to get up and running pretty quickly to [scaffold a project](https://learn-dojo.com/up-and-running-with-dojo-cli/) we can use to build these web components.

## WebMap Component

I'm going to make a web component that can display a webmap via an item id from [ArcGIS Online](https://www.arcgis.com/home/index.html). It will be relatively simple. Since the dojo-cli handles all the build tooling under the hood, I can't use the [arcgis webpack-plugin](https://github.com/esri/arcgis-webpack-plugin), so I'm going to use [esri-loader](https://github.com/Esri/esri-loader).

I'm going to create a utility file that will manage all the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) bits of my component. First thing I'll do is import the esri-loader modules and define an interface for the properties I expect when using the API.

```ts
// src/widgets/map-widget/support/arcgis.ts
import { loadCss, loadModules } from 'esri-loader';

export interface initializeProperties {
  webmapid: string;
  container: HTMLElement;
  widgets: string[];
  onChange: (data: any) => void;
}
```

I need a webmapid to load my map, a container to display it, a list of possible widgets to include in my map and I'll accept callback called onChange to pass some sort of notification when something about my map changes.

In this utility, I'll export a function that will initialize loading of the ArcGIS API for JavaScript and kick off the mapping party!

```ts
// src/widgets/map-widget/support/arcgis.ts
export async function initialize({ container, webmapid, onChange, widgets = [] }: initializeProperties) {
  loadCss('https://js.arcgis.com/4.11/esri/css/main.css');
  const [MapView, WebMap] = await loadModules(['esri/views/MapView', 'esri/WebMap']);
  // then we load a web map from an id
  const webmap = new WebMap({
    portalItem: {
      id: webmapid
    }
  });
  // and we show that map in a container w/ id #viewDiv
  const view = new MapView({
    map: webmap,
    container: container
  });

  view.watch('center', (center: any) => {
    onChange(center);
  });
}
```

What I'm doing here is creating my webmap and mapview based on the properties I'm given. For fun, I'll watch for the center property of my view to change and pass that to the onChange callback. We'll see how this comes into play in a moment.

I'll also allow the loading of a handful of widgets.

```ts
// src/widgets/map-widget/support/arcgis.ts
export async function initialize({ container, webmapid, onChange, widgets = [] }: initializeProperties) {
  ...
  if (widgets.length) {
    const positions: string[] = [];
    const requiredWidgets = widgets.map(w => {
      if (w === 'legend') {
        positions.push('bottom-left');
        return 'esri/widgets/Legend'
      };
      if (w === 'search') {
        positions.push('topp-right');
        return 'esri/widgets/Search'
      };
      if (w === 'basemapGallery') {
        positions.push('top-right');
        return 'esri/widgets/BasemapGallery';
      }
      return '';
    }).filter(x => x.length);
    const modules = await loadModules(requiredWidgets);
    modules.forEach((Widget, idx) => {
      view.ui.add(new Widget({ view }), positions[idx]);
    });
  }
}
```

If I were to push this out in the wild, I would probably want to add some options to put the widgets in an Expand widget, and allow more widget variety. _But I don't want to type anymore_.

Now I can create a widget that can use this utility.

```ts
// src/widgets/map-widget/map-widget.ts
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import MetaBase from '@dojo/framework/widget-core/meta/Base';
import { v } from '@dojo/framework/widget-core/d';

import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import * as css from './styles/map-widget.m.css';

import { initialize } from "./support/arcgis";

export interface MapWidgetProperties {
  webmapid: string;
  widgets: string | string[];
  onChange: (data: any) => void;
}

class HtmlMeta extends MetaBase {
  get(key: string): Element {
    const node = this.getNode(key);
    return node as Element;
  }
}
```

In here, I'm bringing in all my dependencies, along with my utility, defining an interface and a custom meta to grab the output DOM node of this widget. I talk more about metas [here](https://learn-dojo.com/building-a-simple-app-in-dojo/), but they basically allow you to get a reference to the real DOM inside this whole _virtual DOM world existence of loneliness_.

Now I can create my widget.

```ts
// src/widgets/map-widget/map-widget.ts
export class MapWidget extends WidgetBase<MapWidgetProperties> {
  onAttach() {
    const container = this.meta(HtmlMeta).get('elemRef') as HTMLElement;
    const propWidgets = this.properties.widgets;
    const widgets = Array.isArray(propWidgets)
      ? propWidgets
      : typeof propWidgets === 'string' ? propWidgets.split(',') : [];
    initialize({
      container,
      webmapid: this.properties.webmapid,
      onChange: this.properties.onChange,
      widgets
    });
  }

  protected render(): DNode | DNode[] {
    return v('div', { classes: [ css.root ], key: 'elemRef' });
  }
}
```

I can use the meta to get a reference to the output DOM node of my widget and pass it to the initialize method of my helper. I then pass the properties of my widget to the helper as well. This widget is fairly simple, but let's make it a magical web component. I can add a [customElement](https://dojo.io/docs/index.html#doc--dojo__framework__v5__src__widget-core__README_md___web-components) decorator to my class.

```ts
// src/widgets/map-widget/map-widget.ts
@customElement<MapWidgetProperties>({
  tag: 'arcgis-webmap',
  attributes: ['webmapid', 'widgets'],
  events: ['onChange']
})
```

What I'm doing here is defining the tag name for my component, which will be **`<arcgis-webmap />`**. I want the user to pass some attributes like a webmap id, and the widgets they want to use. Then I can define events on my component, like my onChange callback, so users of my component can add event listeners.

## Build it

The last thing I need to do is tell my **.dojorc** file what widgets I want to create custom elements from.

```json
// .dojorc
{
  "build-widget": {
    "elements": [
      "src/widgets/map-widget/map-widget"
    ]
  }
}
```

And now I can run the command **dojo build widget --mode dist** and it will output the JavaScript and CSS for my Web Component. It's important to note, this is a native [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements), so if you want to support browsers without full custom element support, you'll need a [polyfill](https://github.com/webcomponents/custom-elements). Yay.

Once I add the required JavaScript and CSS to my page, I can add my component to an application a couple of ways.

<iframe height="500" style="width: 100%;" scrolling="no" title="ArcGIS Web Components" src="//codepen.io/odoe/embed/preview/dLePdQ/?height=500&amp;theme-id=31222&amp;default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen <a href='https://codepen.io/odoe/pen/dLePdQ/'>ArcGIS Web Components</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>. </iframe>

Or programatically, because maybe I want to parse URL parameters.

<iframe height="500" style="width: 100%;" scrolling="no" title="ArcGIS Web Components - JS" src="//codepen.io/odoe/embed/preview/NmMPer/?height=500&amp;theme-id=31222&amp;default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen <a href='https://codepen.io/odoe/pen/NmMPer/'>ArcGIS Web Components - JS</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>. </iframe>

Pretty cool right?

I added an extra portal-card web component for fun in the source code available on this [github repo](https://github.com/odoe/arcgis-web-components).

I've had a lot of fun working on Web Components recently and trying some different things. I could have written all this from scratch too, but using a framework like Dojo allows me to do other really cool things, like take advantage of their widget library and tooling. I also talk about building [Dojo widgets as Web Components](https://learn-dojo.com/web-components-with-dojo/) on my other blog, [learn-dojo](https://learn-dojo.com).

Happy map hacking my geodev friends!

_Update_ - The demos have now been updated to include a WebScene component as well!
