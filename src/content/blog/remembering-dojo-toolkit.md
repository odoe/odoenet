---

title: Dojo Toolkit was Awesome
description: Dojo Toolkit was way ahead of its time, and it was amazing
published: true
author: Rene Rubalcava
pubDate: 2021-01-08T12:00:00.000Z
heroImage: '../../assets/blog/remembering-dojo-toolkit/images/image.jpg'
tags: dojo
---

## Memories

With the official
[retirement of Flash](https://www.adobe.com/products/flashplayer/end-of-life.html)
recently, I was feeling a bit nostalgic. I cut my dev teeth with Flash/Flex back
in the day. I learned how to build large apps with lots of user feedback and
constant changes and refactoring. Near the end of using Flex as a tool for
building web apps, I, like many of my fellow Flex peers had to move on, and
really learn to use JavaScript to do stuff. Up to this point, JavaScript was an
extra tool used to handle bits to optimize the loading of Flash files or talk to
forms. Now we had to build serious apps with it, ugh.

Of course I used [jQuery](https://jquery.com/) a bit, I think everyone did. But
then I came across [The Dojo Toolkit](https://dojotoolkit.org/). This was when
things got really interesting for me. Dojo wasn't just a layer of APIs on top of
the DOM. It had patterns, it had
[classes](https://dojotoolkit.org/documentation/tutorials/1.10/declare/index.html)
with multiple inheritance. It had a suite of tools for extending objects, making
network requests, working with strings, numbers, dates, and locales. There was
so much power at your fingertips!

There are still some rock solid applications in use today built with Dojo
Toolkit, and I'm sure they'll be rewritten someday, but I'm guessing not until
they really need to.

When I started, it was at version `0.6` I think. At the time, I read this book
from cover to cover.

![Mastering Dojo](../../assets/blog/remembering-dojo-toolkit/images/dojo-book.jpg 'Mastering Dojo')

When `1.0` came out, things got crazy!

## Loader

How to load JavaScript files in the browser was one of things that wasn't really
standard at this time. [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) proved
to be incredibly powerful. You could load as many files as you want, or _lazy
load_ them during runtime!

```js
// load some JavaScript
define(["tools/tool1", "tools/tool2"], function (tool1, tool2) {});

// lazy load some JavaScript
define(["require", "tools/tool1"], function (require, tool1) {
  require(["tools/tool2"], function (tool2) {});
});
```

This was powerful stuff. Hell, lots of tools today still pretty much output
stuff like this all the time.

Dojo had feature detection with `dojo/has`, so you could support multiple
browser implementations, or have code for debug, development, and production.

```js
if (has("debug-mode")) {
  logger.log(someStatus);
}

// something like this
if (has("android-device")) {
  // code here works on android
} else if (has("ios")) {
  // this hack works here
}
```

This leads me into another way to do this... via loader plugins!

Loader plugins allowed you to do something like this when the module loads.

```js
define(
  ["dojo/has!device-support?./deviceExtensions"],
  function (deviceExtensions) {},
);
```

This means at runtime, the `dojo/has` loader plugin will do some feature
detection and load modules that meet that requirement. This even works for
loading text files!

```js
define(["dojo/text!./templates/Component.html"], function (templateFile) {});
```

This was amazing at the time. _You don't even know._

If this looks familiar to you and you don't know why, it might be because this
is how webpack loaders work under the hood. In early versions of webpack, you
could do something like this in your applications.

```js
// or similar, I forget exactly
// but close enough
const textFile = require("text-loader!./template.html");
```

I don't know the inner workings of webpack, but I still see similar output in
the terminal when I do builds, or break something, _which happens a lot_.

## Dijit

Now aside, from AMD, Dojo Toolkit also offered some amazing UI tools in the form
of [dijit](https://dojotoolkit.org/reference-guide/1.10/dijit/). Dijit contained
some battle tested UI components that were reliable, cross-browser compatible,
and incredibly useful. You could use Dijits to build solid forms, layouts, and
more. The
[Editor](https://dojotoolkit.org/reference-guide/1.10/dijit/Editor.html#dijit-editor)
alone is an example of a Dijit that has features that are still sought after
today. It even had extensive a11y support!

You had a couple of options when using Dijits. You could instantiate the class,
that's cool, _but_, you could define the Dijit in your HTML with options via
data attributes.

```html
<div data-dojo-type="dijit/Editor" id="editor1" data-dojo-props="onChange:function(){console.log('editor1 onChange handler: ' + arguments[0])},
    plugins:['cut','copy','paste','|','bold','italic','underline','strikethrough','subscript','superscript','|', 'indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight']">
    <p>This instance is created with a subset of functions enabled in the order we want</p>
</div>
```

This was web components before web components were a thing. If memory serves me
right, I think this declarative pattern was even possible before the data
attributes standard was done, it was `dojo-type`, and then became
`data-dojo-type`. Seriously, Dojo was pushing the boundaries of web development.

Not specifically in Dijit, but [dgrid](https://dgrid.io/) was a grid component
built with Dojo and Dijit. I still compare dgrid to other grid components I come
across, and many are really good, but man, dgrid can do some amazing stuff with
nested rows, components in grids, and customization. _Ah, nostalgia_.

Another companion to Dojo was [dstore](https://dstorejs.io/). Let me tell you,
dstore was a great tool for data and state management in your applications. It
had a built in query engine, cache capabilities, browser storage, mapping to
REST APIs. It was way ahead of its time.

## dojox

Another fun library was
[dojox](https://dojotoolkit.org/reference-guide/1.9/dojox/index.html), which was
kind of a home to experimental features, thus the _x_ in the name. Or maybe it
was for _Extreme_! Wild. This is where stuff like
[`dojox/gfx`](https://dojotoolkit.org/reference-guide/1.10/dojox/gfx.html)
lived, which allowed cross-browser drawing capabilities for either svg, vml,
silverlight, or canvas. Do you even remember vml? Times were tough man.

## Dojo Build Tools

One of the criticisms of AMD was the number of files that need to be loaded. No
one wanted to load 200, 300 files at runtime for a large application. I
remember, without AMD, writing JavaScript in multiple files and running a `make`
script that would just append them all together and wrap them in an
[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). It worked, but
man.

Dojo solved this build problem with the
[Dojo build tools](https://dojotoolkit.org/documentation/tutorials/1.10/build/).
This allowed you to define your own bundles, what JavaScript files they would
contain, you could even exclude files to avoid overlap. You could do some pretty
awesome fine-tuning of your builds. You could even define the locales to include
in your build and Dojo would handle what locales to load at runtime. It uses the
[closure compiler](https://developers.google.com/closure/compiler) to optimize
your code and produce some wicked fast JavaScript.

## Dojo Already Did That

Petter Higgins gave a seminal talk at JSConf a few years ago that talks about a
lot of these topics.

<iframe width="100%" height="350" src="https://www.youtube.com/embed/BY0-AI1Sxy0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Modern Dojo

Today, [Modern Dojo](https://dojo.io/) is a fully streamlined framework that
anyone could use to build scalable and fast web applications. I liked it so
much, I [built this blog](https://odoe.net/blog/new-site) with it. Oh, and
[this one too](https://learn-dojo.com/). You should definitely give it a spin,
the team obviously knows what they are doing.
