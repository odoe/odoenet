---

title: Five things I learned writing an Ember-cli addon
published: true
author: Rene Rubalcava
pubDate: 2015-07-06
tags: geodev
heroImage: '../../assets/blog/five-things-i-learned-writing-an-ember-cli-addon/images/ember-brain.jpg'
description: I recently talked about how to use EmberJS with the ArcGIS API for
  JavaScript. I also talked about how this was done using ember-cli and provided
  via an addon I wrote called ember-cli-amd. This was a great learning
  experience and I thought I would share some of my big takeaways from this
  project. The Ember-cli docs do provide a great starting point on developing
  addons. I was also able to find some great intros on the subject while
  searching. So here are five things I learned while writing an addon.
---

I
[recently talked about](https://odoe.net/blog/ember-with-arcgis-api-for-javascript/)
how to use [EmberJS](http://emberjs.com/) with the
[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/). I also
talked about how this was done using [ember-cli](http://www.ember-cli.com/) and
provided via an addon I wrote called
[ember-cli-amd](https://github.com/Esri/ember-cli-amd). This was a great
learning experience and I thought I would share some of my big takeaways from
this project. The Ember-cli docs do provide a great
[starting point](http://www.ember-cli.com/extending/#developing-addons-and-blueprints)
on developing addons. I was also able to find some
[great intros](http://toranbillups.com/blog/archive/2014/12/22/write-your-first-ember-cli-addon-in-six-easy-steps/)
on [the subject](https://gist.github.com/kristianmandrup/ae3174217f68a6a51ed5)
[while searching](http://hashrocket.com/blog/posts/building-ember-addons). So
here are five things I learned while writing an addon.

## 1. The Ember-cli addon lifecycle

One of the big challenges I had when I first started was just on where in my
addon could I write code to accomplish my task. I would see mention of a few
methods here and there, but it wasn't until I went back to the
[github repo](https://github.com/ember-cli/ember-cli) that I found reference to
the
[addon hooks document](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md).
This document should be your main ember-cli addon reference. It list all the
methods that you could hook into for your addon. It even list some examples
where a hook was used in a relevant addon. This was great, but the order the
hooks are listed isn't the order things are executed. You could definitely make
out by the names on when certain things happen, but _as a newcomer_, I wanted
some firm footing. So just started _throwing out log messages everywhere until I
figured it out_. Here are the main hooks you should know in order:

- [setupPreprocessorRegistry](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#setuppreprocessorregistry)
- [includedCommands](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#includedcommands)
- [included](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#included) -
  probably most important
- [treeFor](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#treefor) -
  can vary depending on the trees analyzed
- [config](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#config)
- [postprocessTree](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#postprocesstree)
- [preBuild](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#prebuild)
- [contentFor](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#contentfor)
- [postBuild](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#postbuild)

Some of the _treeFor_ calls can be sprinkled throughout before you get to the
_preBuild_, but if you look at
[the documentation](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md#treefor),
it occurs for different types. The steps you would probably be most interested
in is **included** as this is where you access to the
[Ember app](https://github.com/ember-cli/ember-cli/blob/v0.1.15/lib/broccoli/ember-app.js)
and lots of other information about the application being built. The
**postBuild** method might also prove useful as this is where you can get the
temporary directory name compiled files are stored before they get copied to the
assets folder. Don't bother trying to write to the assets folder yourself, it
will just get overwritten.

So if at any point you get stuck on how to accomplish something with your addon,
refer to the
[addon hooks document](https://github.com/ember-cli/ember-cli/blob/master/ADDON_HOOKS.md).

## 2. Broccoli

**I learned how to spell broccoli**. What is Broccoli and why should you care?
[Broccoli](https://github.com/broccolijs/broccoli) is the tooling used by the
Ember-cli. Broccoli is similar to [Grunt](http://gruntjs.com/) or
[Gulp](http://gulpjs.com/). What it mainly does is provide a
[tree structure](https://github.com/broccolijs/broccoli#plugin-api-specification)
of your application during the build process. I suggest you watch
[this video](https://www.youtube.com/watch?v=PEb4BiXH4bE) to get a better
understanding.

It may not be necessary to know Broccoli in and out if you are writing Ember-cli
addons, but it definitely
[couldn't hurt](https://github.com/ember-cli/ember-cli/tree/master/lib/broccoli).
In particular, you may find you need to write a Broccoli plugin to do some
low-level stuff in you addons. I found I had to make a
[pull-request to a plugin](https://github.com/rwjblue/broccoli-string-replace)
to get some functionality I wanted, and thanks to the author, I even got a
better understanding of writing the plugin to fit with how some other Broccoli
plugins were written. So my advice, at least get familiar with Broccoli and
[the plugin ecosystem](http://broccoliplugins.com/).

## 3. Esprima

So you are writing an Ember-cli addon and you find you need to do some sort of
code analysis, such as find where AMD modules are going to be needed. How would
you go about parsing that code? Well, a good method to do something like this
would be with [Esprima](http://esprima.org/). It's important to note, this may
not be required for writing Ember-cli addons, but it was something I learned
while doing so. Esprima turns JavaScript code into an
[abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree),
which is basically a large object with nodes that represent your code. You can
find functions, variables, inject code, _go nuts with it_. It's also great for
finding where known AMD modules are being imported into an application. Import?
Did I forget to mention that all Ember-cli code is written in
[ES6](http://es6-features.org/#Constants) or
[ES2015](https://babeljs.io/docs/learn-es2015/), whatever you want to call it.
That means modules are
[import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)'ed.
Esprima is really, _really_ cool to play with. It's much easier than trying to
parse your code as a string. _I mean it_.

## 4. Blueprints

So [blueprints](http://www.ember-cli.com/extending/#generators-and-blueprints)
are basically templates you can write as Ember-cli addons. Say you want to have
a reusable _take-over-the-world_ button and you want to share this button with
your evil companions. You could create an addon with this component built in.
Evil geniuses that install this addon now can use this button in their own
applications. For more _not-so-evil_ details, check out the
[docs](http://www.ember-cli.com/extending/#developing-addons-and-blueprints) and
I found this
[blog post](http://johnotander.com/ember/2014/12/14/creating-an-emberjs-addon-with-the-ember-cli/)
useful.

## 5. Ember

I've said before that in the past, I have had issues _grasping_ Ember. It was
probably one of the only frameworks that had a tough time _clicking_ for me.
Well, I can tell you, there is nothing like attempting to write an addon for a
tool you _hardly know_ for a framework you _don't understand_ to put you in the
trenches and sink or swim. I think after reviewing tons of source code and
documentation, using Ember-cli has definitely helped me grasp the Ember way of
doing things. Do I think it's or everyone? No, but I do think it definitely has
it's place in some application development. I'm still trying to really learn the
innards of Ember, almost line by line to get a better understanding of how some
things are done, so I am far from an expert.

All in all, I learned a lot while writing an Ember-cli addon and I think anyone
interested in Ember-cli could benefit from the same process. _If everything were
easy, nothing would be any fun and that's what makes all this stuff
interesting!_
