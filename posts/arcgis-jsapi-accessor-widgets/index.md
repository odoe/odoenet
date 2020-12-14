---
title: "ArcGIS JSAPI Accessor and Widgets!"
published: true
author: Rene Rubalcava
date: "2016-12-23"
tags: geodev
coverImage: "accessor-widgets.jpg"
---

The latest release of the [ArcGIS API for JavaScript 4.2](https://blogs.esri.com/esri/arcgis/2016/12/21/arcgis-api-for-javascript-4-2-released/) introduced some vew and improved features.

One feature, that isn't really new in 4.x, but has been more thoroughly documented is the [Accessor](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html). I've covered [Accessor before](http://odoe.net/blog/quick-tip-accessor-arcgis-api-javascript/) on this blog, and for good reason, _it is so powerful!_

## Accessor

I'm a huge fan of Accessor, because it provides a great way to watch for changes in your application. I think it's incredibly useful for state management. One of the new additions to the documentation is this [guide on Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html). What's key here is that not only does the guide show how to implement the Accessor for your own needs, that would be cool enough, but it also introduces the use of [TypeScript decorators](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html#typescript-decorators) to do so. TypeScript is incredibly powerful and I am defintely a big TypeScript fan, so being able to use decorators to extend the Accessor is a great feature. It also uses some nice trickery to [extend multiple classes](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html#extend-multiple-classes).

It is able to accomplish this by still using [dojo/\_base/declare](https://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html) under the hood but still maintain the Types for use in TypeScript.

From the documentation:

```
// create an Interface that extends the classes you want to extend
interface Base extends Accessor, Evented {}
// create a constructor interface
// http://stackoverflow.com/a/13408029/241635
interface BaseConstructor extends Base { new (): BaseConstructor; }
// create a function to return that interface that returns the typed Accessor
function getBase(): BaseConstructor { return <any> Accessor; }

// used declared to extend the new constructor function and additional classes
// this will let the TS compiler maintain typeness and editor intellisense
@subclass()
class Collection extends declared(getBase(), Evented) {}
```

It may look a little weird, but if you have ever attempted to extend multiple classes in TypeScript via some hacks, you will quickly realize this works out very nicely.

The decorators provided allow you to easily define properties that are watchable when extending Accessor, as well as much more such as [computed properties](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html#computed-properties), [read-only](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html#define-a-read-only-property) and how to predefine the types to take advantage of [autocasting](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html#autocast).

## Widgets

You may be asking yourself, _wow, that's awesome, what can I do with it?_ I covered some of that in my [previous post](http://odoe.net/blog/quick-tip-accessor-arcgis-api-javascript/) but what you will most likely use it for is the [new widget development framework](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html) included with 4.2! That's right, just like in the 3.x version of the API, there was a guide on writing widgets using the Dijit library, the 4.x JSAPI has been moving away from the Dijit library for widget development and has finally released a new recommended guide for building your own custom widgets.

Keep in mind, _you don't have to use the new widget framework_. You can still utilize the ViewModels as [shown before](http://odoe.net/blog/view-models-in-arcgis-js-api/) along with your framework of choice to build your components. This is simply how the widgets are built in the JSAPI 4.2 and is available to you as a developer to take advantage of. The new widget framework does require TypeScript and that is because of the heavy use of decorators and JSX. That's right, _I said [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)_. Like that stuff you might have used if you're familiar with [React](http://buildwithreact.com/tutorial/jsx).

Does that mean the widget framework is based on React? No, it's not, but it does use a [virtual dom](https://medium.com/cardlife-app/what-is-virtual-dom-c0ec6d6a925c#.dxn5z2mgl) library under the hood that JSX is very useful for. I actually _think_ you could use the decorators and JSX in an ES6 environment and things would work, but I haven't tried it yet, so don't take my word for it.

Where the magic really starts to happen is by using the same decorators for Accessor along with a new one called `renderable()` that lets the widget know _when this property changes, we'll need to rerender the component_.

There's a couple of really solid samples in the SDK on building a custom widget. There's a basic [Hello World](https://developers.arcgis.com/javascript/latest/sample-code/widgets-custom-helloworld/index.html) and a [Recenter](https://developers.arcgis.com/javascript/latest/sample-code/widgets-custom-recenter/index.html) widget. You could even see how a couple of the current JSAPI widgets are built with the new framework. Currently, you can [LayerList](https://github.com/Esri/arcgis-js-api/blob/4master/widgets/LayerList.tsx) and [Print](https://github.com/Esri/arcgis-js-api/blob/4master/widgets/Print.tsx).

I fully expect to see a lot of use out of this new widget framework and I'm really excited to see what people do with implementing Accessor in their own applications. The 4.x version of the ArcGIS API for JavaScript is maturing very nicely with lots of new features, not just for users of the API, but for developers that can utilize all the exciting and powerful features being introduced.
