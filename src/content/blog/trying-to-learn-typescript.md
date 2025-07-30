---

title: Trying to learn TypeScript
published: true
author: Rene Rubalcava
pubDate: 2015-05-04
tags: geodev, typescript
heroImage: '../../assets/blog/trying-to-learn-typescript/images/esri-ts.png'
description: So I'm trying to learn TypeScript. TypeScript is not necessarily
  difficult to learn, I think most of my stumbling blocks have to do with
  working with definition files. Sometimes they work, sometimes they don't and
  sometimes I just can't get my vim or Grunt build scripts to understand what
  I'm doing.
---

So I'm trying to learn [TypeScript](http://www.typescriptlang.org/). TypeScript
is not necessarily difficult to learn, I think most of my stumbling blocks have
to do with working with
[definition files](https://typescript.codeplex.com/wikipage?title=Writing%20Definition%20%28.d.ts%29%20Files).
Sometimes they work, sometimes they don't and sometimes I just can't get my vim
or Grunt build scripts to understand what I'm doing.

### Not a love story

This is not a success story. This is like Empire Strikes Back, I've made
progress, but I've pretty much had my ass handed to me. For me, when I try to
learn something related to JavaScript, I look at how I can incorporate it with
the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/).
There's a pretty good demo and definition file in the
[jsapi-resources repo from Esri on github](https://github.com/Esri/jsapi-resources/tree/master/typescript).
The [demo](https://github.com/Esri/jsapi-resources/tree/master/typescript/demo)
in there is pretty solid too. I looked over this demo in addition to what I
learned
[trying to work my way through Mayhem](http://odoe.net/blog/learning-mayhem/)
recently and came up with this.

### The party

[Here is what I came up with](https://github.com/odoe/esrijs-ts). First off,
let's go over the _main.ts_ file.
[gist](https://gist.github.com/odoe/e34b075a0d4c8d18877e) One thing to note, if
you are new to TypeScript, is the use of _import_ and _require_, which is very
much like
[commonjs](https://egghead.io/lessons/nodejs-commonjs-basics-introduction).
TypeScript of course also allows you to do type checking at compile time, which
I really like. It's like another layer of confidence in my code. For getting
started, I'm using the _any_ type, which is kind of cheating. For the
_mapOptions_, I would probably actually create a Type for it and use that.

The next module is my actual widget, which just adds the map.
[gist](https://gist.github.com/odoe/699faedd1d192d10c713) This is the kind of
stuff that was killing my in trying to create widgets in Dojo with TypeScript.
In TypeScript, you can
[create a class](http://www.johnpapa.net/typescriptpost3/) and do inheritance.
The issue is, you can't do multiple inheritance and something just feels weird
about JavaScript classes, but that's another topic entirely.
[This guy worked out TypeScript/Dojo stuff](http://allibec.com/typescript-and-dojo-part-2),
but I found that if I just use _dojo/\_base/declare_ as-is, things worked out.
Also, I would get the dreaded _Cannot find external modules_ error when I
compile, but if I set _noImplicitAny_ to true in my _Gruntfile_, my code would
compile and everything would still work.

### The shame

This isn't ideal, but it's still a good learning exercise. I'm hoping to pick
some Esri brains and get more insight here. Maybe just deep-dive mind-meld with
TypeScript for a few days and fully embrace it, it will seep in. I mostly get
stuck on the compile side with integrating definition files. I'm sure I'll post
more about TypeScript in the future. I'm really interested in
[Dojo 2](https://github.com/dojo/dojo2) and
[Mayhem](https://sitepen.github.io/mayhem/guide/#what-is-mayhem), so really
doing things in a _TypeScripty_ way is on my todo list.
