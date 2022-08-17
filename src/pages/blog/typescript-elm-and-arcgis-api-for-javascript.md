---
layout: "../../layouts/BlogPost.astro"
title: "TypeScript, Elm and ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: "2015-12-07"
tags: geodev, typescript
coverImage: "ts-elm-esrijs4.png"
---

I have quite the affinity for learning programming languages and frameworks. It's a guilty pleasure that sometimes I just let myself get drunk on. I recently got _hammered on Elm and TypeScript_.

I've been doing quite a bit of [TypeScript](http://typescript-tacos.com/) lately. I started [learning it](http://odoe.net/blog/tag/typescript/) a while ago and I thoroughly enjoy it.

About a year or so a ago, I had seen one of [Evan Czaplicki's videos](https://www.youtube.com/user/eZap3) on [Elm](http://elm-lang.org/). I was instantly _interested_. But at the time, I didn't quite grasp it. The syntax of the language has changed a bit since then, removing some confusing bits and I found when I returned to it, it started to click. Just recently, I bought [this video](https://pragmaticstudio.com/elm) and [this video](https://pragmaticstudio.com/elm-signals) to get up to speed again.

_I had to build something, anything._

I just [talked about vector tiles](http://odoe.net/blog/vector-tiles-in-arcgis-js-api/) in the ArcGIS JS API beta 2 release. So I figured, hey, wouldn't it be cool to have an easy way to browser the available vector tiles. I had just finished reading [this cool article](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org) on how [pokedex.org](https://www.pokedex.org/) was built. Although, my test app is not nearly as flashy as this one, I was inspired.

So I set out to _blow a hipster gasket_.

This is what I wanted to build... [![elm vector tile browser](images/vt-browser-sm.gif)](http://odoe.net/blog/wp-content/uploads/vt-browser-sm.gif)

## Simple TypeScript

I dig TypeScript. I've come to appreciate the type checking of the compiler to keep me honest. But I'm also not a _type nazi_, so I've taken to writing my TypeScript closer to ES2015, with little typings and using the compiler to make sure I don't do something really dumb.

Here is the _main.ts_ for this application. [gist](https://gist.github.com/odoe/89ca70d4a307eeeb6ea0)

You'll notice that I'm using the _amd-dependency_ method of adding the AMD bits as [described here](https://www.sitepen.com/blog/2013/12/31/definitive-guide-to-typescript/). This is a pretty simple way of loading AMD dependencies into your TypeScript application if you don't have some tds files available.

I create an [interface](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Interfaces.md) to type the _PortalItem_ I'm using in the bits that I send to the Elm application.

I initialize the Elm app with the embed method. **Elm.embed(Elm.PortalItems, mainNode, { portalItems: { items: [] }});**.

This will embed the Elm app to a DOM element. I also need to initialize the model used in the application.

Then I can subscribe a _port_ that I've exposed to relay model changes in the Elm app. This is done via [Ports](http://elm-lang.org/guide/interop) in Elm. This provides the updated model then I just check to see of the model property _showmap_ is true, which means I need to create a map based on the updated model.

The TypeScript portion isn't too tricky. It's pretty straightforward.

_Query Portal Items -> Initialize Elm with results -> Listen for Elm updates -> Create map when model updated_

## The bliss of Elm

I'm still learning Elm. It appeals to me. _It speaks to me_. So I'm not going to pretend this Elm code is awesome and that I'm doing everything right. It's rough, can probably be updated with some sugar, but _it works!_

[gist](https://gist.github.com/odoe/849a8d8d7b9b9e61715a)

Ok, don't get scared. Let's talk about it a bit.

Elm apps all seem to follow a basic pattern.

_Model -> Update -> View_

This pattern is handled via [Signals](http://elm-lang.org/guide/reactivity).

### Elm Model

[gist](https://gist.github.com/odoe/f6648e52546535618fc4) Notice that the PortalItem _type alias_ here is the same as the _interface_ I used in TypeScript. I wanted to make sure I was passing the correct data to the Elm app, that's why I used the interface.

The _initialModel_ is the model for the whole application, which is typed to _Model_, which has a property _items_ which is a list of _PortalItems_. This could probably be tweaked a bit, but again, _it works_.

### Elm Update

[gist](https://gist.github.com/odoe/f9ba1e03ef419a9a9d02) You have a type called _Action_, which has different types of action that can be done in your application. Each action takes some type of argument, except _NoOp_, which will just return the model.

We have the _update_ that takes two arguments, _Action_ and _Model_ and it returns a _Model_. Data in Elm is _immutable_, so you can't simply update the _Model_, you create a new _Model_ with the updated values.

That's done with the following syntax. **{ model | items = List.map updateItem model.items }**

What this is saying is create a new _Model_ with a new property of items, **model | items**. And the items is equal to the updated values, **List.map updateItem model.items**.

**See that?** Now that you know how that works, look at it again and it's not so bad. This kind of stuff begins to click after a while.

### Elm View

I won't go into too much detail on the _View_ stuff, but here are the basics. [gist](https://gist.github.com/odoe/daf45cdbcc43df40c7e0) Elm uses a [virtual DOM, which makes it fast](http://elm-lang.org/blog/blazing-fast-html) like some other frameworks that also use a virtual DOM. I won't get into if it is actually faster, but you get the same benefits.

A _View_ takes an _Address_ of an _Action_, that basically wires up events ([read more here](https://github.com/evancz/elm-architecture-tutorial/#starting-the-program)) and a _Model_ and it will return _Html_. It will then render the _View_ based on this model.

I have some methods in here to render the view based on some conditional checks. _Should I display all the tiles? Should I display the details of an item? Should I display the map for the item?_

Honestly, I struggled with conditional portion of the _View_ in this application. I'm talking _kept me up late, had me tossing and turning in my sleep, dreaming up solutions, getting up early to test_ type struggling. I got it eventually, but this was one of those things that made me feel like an idiot. So now, I feel less like an idiot.

### Elm Signals

Signals in Elm is how you wire things up. [gist](https://gist.github.com/odoe/6cd5728cc341ed1c9f93)

Elm has this concept of a _Mailbox_, that matches an _address_ to an _action_. So when you provide an _Address_ and _Action_ send, it shows up in the _Mailbox_. You can read more about _Mailbox_ [here](http://elm-lang.org/guide/reactivity#tasks).

The _Signal_ library has some helpers to assist you.

For example, **model = Signal.foldp update initialModel actions**. You are going to fold the _update_ we defined earlier with the _initialModel_ and the _actions_.

_actions_ is defined as **Signal.merge inbox.signal (Signal.map UpdateModel portalItems)**. Here, you are merging the _Mailbox_ signal with the mapping of _UpdateModel_ action and the _portalItems_ in our app. This is where the _reactive_ part comes in. You can read more about how this is all wired together [here](http://elm-lang.org/guide/reactivity).

**Ok, take a breath.**

This looks cool, but how do I actually use it in my JavaScript (or TypeScript) app?

### Elm Ports

You expose portions of your application via _Ports_. [gist](https://gist.github.com/odoe/b4867d2c7c3224e19e91)

You can expose the _portalItems_ so I can send updates into Elm from my JavaScript app. **elmApp.ports.portalItems.send({ items });**

Then I create a _Port_ called _modelChanges_ I can subscribe on to listen for updates to the _PortalItems_ in the Elm app. **elmApp.ports.modelChanges.subscribe()**

## My brain, it hurts

It took me a while to kind of grasp what's going on in Elm. I'm not going to pretend to be an expert, but I've dabbled in some Haskell and [PureScript](http://odoe.net/blog/tag/purescript/) and even though I find these purely functional languages challenging, I find them fun. I think it's the fact that I know I'm not 100% with them and that they are challenging that I'm drawn to them. They make wish I were smarter, but _they also push to me to try harder_.

You can view [a live demo of the application in action here](http://www.odoe.net/apps/portalbrowser/). It's best viewed on a mobile device. I'll probably tweak it a bit more as I return to it, add some functionality, clean up some styling, but it's a good start.

The source code is [available on github](https://github.com/odoe/portal-item-browser).

It's been a little while since I've had a chance to play with a new language, much less build something with it and I had a lot of fun. I think it also shows how easy it really is to integrate the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/beta/) with not only other frameworks, but other languages that compile to JavaScript.

_Experiment and make cool shit_
