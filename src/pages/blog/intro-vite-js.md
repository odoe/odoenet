---
layout: "../../layouts/BlogPost.astro"
title: "Intro to ViteJS"
description: "A quick intro to ViteJS to build web apps"
published: true
author: Rene Rubalcava
pubDate: 2021-09-07T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript
---

## Rambling

There used to be a time when I would write JavaScript in multiple files. They might look something like this.

```js
// start.js
(function () {

// multiple js files of code

// end.js
})();

// use a makefile to join them together
```

Then I would use a `make` file to run a script that just concatenated all those files together. I didn't care much about minification or optimization. I don't think I was alone here, I'm pretty sure I got this idea from an article way back when. I do remember writing Ant scripts when the project was a mix of JavaScript and Flash, _that was fun_.

If the project was big enough, there were tools like [jsmin](https://www.crockford.com/jsmin.html). If the project warranted it, I would use [Dojo Toolkit](https://dojotoolkit.org/), which could probably make me a sandwich if I wanted it to.

As a developer, no matter the language, build tools _just come with the territory_.

## Ok, no more rambling

My point in all this is that if you're not careful, build tools can get unweildy. This is where a tool like [ViteJS](https://vitejs.dev/) comes in.

Vite is like a breath of fresh air. It handles ES modules natively, meaning that builds are super fast, because it just builds ESM, especially dev builds! Out of the box, you don't even need a config file, _it just works_.

<blockquote class="twitter-tweet"><p lang="pl" dir="ltr">my vitejs config <a href="https://t.co/q034T2ssvM">pic.twitter.com/q034T2ssvM</a></p>&mdash; Rene (Hecho En East Los) Rubalcava (@odoenet) <a href="https://twitter.com/odoenet/status/1428017428441681926?ref_src=twsrc%5Etfw">August 18, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Under the hood, Vite uses [esbuild](http://esbuild.github.io/). For CSS, it can handle [PostCSS](https://postcss.org/) if you add a config for it, or [css-modules](https://github.com/css-modules/css-modules) if you add `.module.css` files, or [sass](https://sass-lang.com/). It will also make liberal use of the [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) to add some sugar methods like [glob imports](https://vitejs.dev/guide/features.html#glob-import) or adding environment variables. You can switch the build to use [terser](https://terser.org/) and get a slightly smaller build, but it is a little slower. In my regular usage, I don't notice a huge difference, so I leave esbuild as default.

It handles `JSON` and `wasm` imports for you. Even [workers](https://vitejs.dev/guide/features.html#web-workers) can be loaded via `import WorkIt from './workit?worker'`. Just when you thought you could escape loader plugins, _they drag you back in!_

_But I have some complex workflows, I use `ejs` templates, I need sprite sheet generation_... I hear you. The great thing about Vite is that it uses [rollup](https://www.rollupjs.org/), so you can use rollup plugins if you want. It also has a suite of [vite plugins](https://github.com/vitejs/awesome-vite#plugins) available. Just add them to your [`vite.config.js`](https://vitejs.dev/config/) and you're good to go.

Most projects I don't even need a config. It's insane.

How to use it?

```bash
npm init vite@latest my-vite-app
```

When you run that command, you'll be asked if you want a vanilla project or if you want react/preact/vue and even TypeScript. It's really that simple and makes me smile.

Geez, I feel like this should be a longer blog post. But it really is that simple. Now, I wouldn't try converting your large webpack application to Vite. Don't get me wrong, webpack has a ton of plugins, loaders, community, and history.

I should note, I have had some issues in building third-party css where I need to modify the url imports, like I can with the resolve-url-loader for webpack, but that has been the only very specific issue I've run into.

Vite is another option, and one I think is great for new projects! In testing, I can get a smaller build with webpack, not much smaller, but smaller. So if squeezing every last kb out of your build is your goal, maybe webpack is your thing. You do you, and build awesome apps!

You can check out more info in this video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/sV1Tcie2SR8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
