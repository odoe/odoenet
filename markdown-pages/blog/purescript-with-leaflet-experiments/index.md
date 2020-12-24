---
title: "PureScript with Leaflet Experiments"
published: true
author: Rene Rubalcava
date: "2015-01-05"
tags: geodev
coverImage: "pureleaf.png"
---

### Not another damn JavaScript compiler

Yeah yeah, I know. For a long time, I really enjoyed using [CoffeeScript](http://coffeescript.org/) and I have spent quite a bit of time learning [ClojureScript](https://github.com/clojure/clojurescript). I've given [TypeScript](http://www.typescriptlang.org/) a hard time in the past, but I've changed my tune about it. Recently I have been digging my head down into [Haskell](https://www.haskell.org/haskellwiki/Haskell), mostly due to attending an online course from Frontend Masters on [functional programming in JavaScript](https://frontendmasters.com/courses/functional-javascript/). A lot of things on both the Haskell and functional JavaScript side began to click when I delved more into Haskell. Now I'm not a functional snob, but there is something real nice about working in pure functions and immutable data. I don't know if I'm totally sold on the strictness of a type system, but it does add another layer in the compilers that makes it easier to debug apps.

With that said, I've been playing around with two _Haskell-inspired_ JavaScript compilers. [Elm](http://elm-lang.org/), after reading about it in [Seven More Languages in Seven Weeks](https://pragprog.com/book/7lang/seven-more-languages-in-seven-weeks) and [PureScript](http://www.purescript.org/), which I have been toying around with more lately. I kind of just kept eye on PureScript for a while until I saw this [session from StrangeLoop](https://www.youtube.com/watch?v=yIlDBPiMb0o). That really piqued my curiosity and I wanted to see if I could do something with it.

### Starting from scratch

So the main thing I wanted to figure out about PureScript was how to use third-party JavaScript libraries with it, mainly [Leaflet](http://leafletjs.com/). I saw that there was a [purescript-d3](https://github.com/pelotom/purescript-d3) library, so I decided to look at the source to try and figure it out. I was so lost and to be honest I still don't fully _get it_. But I'm working on it.

PureScript provides a [foreign function interface (FFI)](https://github.com/purescript/purescript/wiki/JavaScript-Interop) for working with JavaScript code. It wasn't quite doing what I wanted, at least without making it totally hacky. But I did find another PureScript library for [easy-ffi](https://github.com/pelotom/purescript-easy-ffi) that explained things a little better for me. A really neat thing about PureScript is there is the core library and other libraries are available via a [bower](http://bower.io/) install, many of which are available [here](https://github.com/purescript-contrib).

I based my project on [pulp](https://www.npmjs.com/package/pulp) which is used in this example [here](https://github.com/bodil/purescript-is-magic), which was again created by [Bodil](https://github.com/bodil). This is a good starting point and a lot simpler than the grunt build I was using to initially learn PureScript.

**_Side note - PureScript works really well with existing JavaScript build tools like Grunt, Gulp and Bower, which is totally awesome_**

### Code and Types and Data oh my

Here is the code for the working application.

[gist](https://gist.github.com/odoe/7c95ac549f9cd9e13d3a)

I am _not going to get into Monads_, just that they are a way to deal with side-effects in functional programming. This is a good read on the [EFF Monad in PureScript](https://leanpub.com/purescript/read#leanpub-auto-the-eff-monad). I am still wrapping my head around it, but using the _EFF Monad_ with _EasyFFI_, it becomes pretty simple to create PureScript functions that can interop with native JavaScript.

Take note the extra empty string argument used in the _easy-ffi_ methods. According to the [docs](https://github.com/pelotom/purescript-easy-ffi) this is needed if the method returns an action. When using _unsafeForeignFunction_ of _easy-ffi_, pass an empty string argument in the argument array so it executes correctly. Like this. `map' = ffi ["s", ""] "L.map(s)"`

This threw me for a loop for a while, but when I rewrote these functions without _easy-ffi_ it kind of makes sense... I think. The above function would probably look like this.

[gist](https://gist.github.com/odoe/15fa18b5ebc81c7c1e4b)

These functions are curried and there is a function wrapped around the _L.map(s)_ method, so I think that's what the empty argument is for, to call that method. At least to my eyes that's what it looks like. I could be totally wrong though. _Please tell me so I can update this post later_.

This demo application is available [here](https://github.com/odoe/pureleaf).

### What the hell

You may be asking _why bother with all this nonsense?_ After all this doesn't look very easy nor is it any simpler than the [regular JavaScript](http://leafletjs.com/examples/quick-start.html) samples. Truth is... I don't know yet. That's why it's called experimenting. This sample doesn't do much, but it's really just meant as a proof-of-concept. There is a [purescript-react](https://github.com/purescript-contrib/purescript-react) library that I'm interested in trying out. With a little more practice maybe I can put together some purescript bindings for Leaflet as well. There is also a [purescript-quickcheck](https://github.com/purescript/purescript-quickcheck) which if you look at [quickcheck for Haskell](https://www.haskell.org/haskellwiki/Introduction_to_QuickCheck1) is basically automatic testing for your app, which is pretty damn sweet.

I'm still in my early learning phase with PureScript so far. I'm not even done with the [PureScript by Example](https://leanpub.com/purescript) book yet. I got too excited. There is also a [24 Days of PureScript](https://gist.github.com/paf31/8e9177b20ee920480fbc) guide which has tons of great info.

I don't know if I'll have a chance to push PureScript into production (my team would kill me), but I am definitely a fan and will continue to play around with it.

**_Update_** - It turns out there is a [purescript-leaflet](https://github.com/dysinger/purescript-leaflet) library already on github that is working towards doing bindings for purescript. I'll be giving this a shot next!
