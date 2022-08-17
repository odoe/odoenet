---
layout: "../../layouts/BlogPost.astro"
title: "Type Your HashMaps with TypeScript"
description: "It's tempting to just use any when working with HashMaps in TypeScript, but we can do better"
published: true
author: Rene Rubalcava
pubDate: 2020-12-31T12:00:00.000Z
coverImage: "image.png"
tags: typescript
---

## It's my HashMap, I'll do what I want to

First off, I know what you're going to say. Why use your own HashMap if you can make a `Map` or `WeakMap`? Sometimes, you just want to use a _Plain Old JavaScript Object_ (POJO). There could be a variety of reasons for this, maybe you just need to keep track of data when iterating or maybe you're working on some arguments for a function.

```ts
function doCoolStuff(params: Params, options: OptionsMap) {
    // cool stuff
}
```

In the case above, I might have a strictly typed `Params`, but the options could vary, so I want to keep them pretty flexible. I use `any` a lot as a placeholder and try to get away from it when I can. A cool option for this is to type a [hashMap](https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#HashMaps).

```ts
// simple HashMap, assume it can take all string or boolean values
interface OptionsMap { [key: string]: string | boolean }

const options: OptionsMap = {
    cacheId: 'u21987',
    useDefaultValues: true,
    responseAs: 'json'
};
```

Looking at this code, we can type out the options so the values can be either a `string` or a `boolean`. This allows users to enter any extra options they want that are supported by this function. This is definitely useful if you work with a development server for your back-end and want to pass special dev options for testing.

## Type Happy

You can even be more explicit and type the _values_ to something more concrete.

```ts
interface User {
    name: string;
    level: number;
    status: string;
}

interface HashMap<T> {
    [key: string]: T
}

// init the map
const userMap: HashMap<User> = {};

userMap['bob'] = {
    name: 'bob',
    level: 12,
    status: 'afk'
}
```

Here, we've typed our `HashMap` to only accept values of `T`. This is pretty useful when working with response data or possibly some cache implementation you might build.

## You can do more

This typed HashMap is a great way to start a building block of types in your application. You might even move on to incorporatinbg [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html). You can mix and match these to do some amazing things with TypeScript. I just wanted to cover a really simple way you can get started to move beyond typing your _still-in-progress_ types as `any`.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/ufi5WhF9Frk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
