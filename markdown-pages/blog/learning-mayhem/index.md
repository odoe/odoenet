---
title: "Learning Mayhem"
published: true
author: Rene Rubalcava
date: "2015-04-20"
tags: geodev, dojo, typescript
coverImage: "maybe-mayhem.png"
---

So a couple of months ago, I was minding my own business at the [Esri Developer Summit](http://www.esri.com/events/devsummit) when I first heard of [Mayhem](https://sitepen.github.io/mayhem/guide/#what-is-mayhem). I had no idea this was even in the works. I then had the chance to attend a small meetup at the developer summit where [Dylan](http://dylanschiemann.com/) from [Sitepen](http://www.sitepen.com/) and founder of [Dojo](http://dojotoolkit.org/) talked about it some more. He not only talked about Mayhem, he talked about progress on Dojo 2 and just recently Dojo updated the look of their site and added a [roadmap for Dojo 2](http://dojotoolkit.org/community/roadmap/). This is probably the most activity I have ever seen on Dojo 2 in this short of a timespan, so hopefully from here things can progress quickly.

But back to Mayhem. First things first, it is still _very_ early stages. The [docs](https://sitepen.github.io/mayhem/guide/#what-is-mayhem) are also pretty extensive and still not complete. One of the main things is the fact that it is built using [TypeScript](http://www.typescriptlang.org/), which also seems to be the focus for Dojo 2. There's a few advantages here, **1**, you get the static typing in your code, which is _yay_. **2**, you can compile TypeScript to ES6 modules or ES5. You could even compile it to either [commonjs](http://wiki.commonjs.org/wiki/Modules/1.1.1) or [amd](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition), which is a very convenient feature. Also, TypeScript is also probably one of the only language to JavaScript languages I don't know very well. _It's really a superset of JavaScript, which just means you can write regular JavaScript in a TypeScript file._

So despite all the _experimental_ warnings, I decided to go through the docs and see if I could get a Mayhem app up and running. I was _thusly kicked in the nads_ and had to sit in the corner. Some of this was my lack of TypeScript knowledge, some of this was just the fact that Mayhem is young, in development and not all the pieces are there and docs are still maturing with changes. I took a break and came back to it later.

### Hey I just met you, and this is crazy

First thing I did was tried to build the branch of Mayhem with the [yeoman](http://yeoman.io/) generator. I had no luck here, but I was able to look at the [templates](https://github.com/SitePen/mayhem/tree/generator-mayhem/app/templates) for the generator to just quickly see what it was trying to do and copied them for my sample. This is like a **mega-cheat**, but it helped.

I decided to install Mayhem via bower, via the instructions in the docs, which worked great, except that the compiled files are not included. So you'll need to go in the **bower\_components/mayhem** and run _npm install_ and _grunt build_. That actually worked fine, so let's just chalk that up to _a work in progress_.

Then I had to install various grunt modules which you can see [here](https://github.com/odoe/mayhem-sample/blob/master/package.json). I copied the [Gruntfile](https://github.com/odoe/mayhem-sample/blob/master/Gruntfile.js) from the generator branch, with a few tweaks. I haven't used Grunt in while, but it's as solid as ever. Now it was time to try my hand at some TypeScript.

### Call me Mayhem

I had to set up a dojoConfig to point to the _bower\_components_ folder for all the dojo and mayhem bits along with a couple of other libraries. I found it curious that Mayhem is using [esprima](http://esprima.org/) somewhere. I thought that would be more for tooling, but I haven't dug in too heavily in the source for Mayhem yet. [gist](https://gist.github.com/odoe/a4c2c8569e9b330c6d55)

With that all set, I needed a _main_ file. [gist](https://gist.github.com/odoe/62e5b2bb19008284e0d6)

So what we're doing here is setting up the [WebApplication](https://sitepen.github.io/mayhem/guide/#application-class) with a route called _index_. My assumption was that when I went that route (look like `http://localhost/src/#index`), it would show the appropriate HTML file, but this is where I am running into issues at the moment. I'm still working on it, but as of right now, it's only bringing in the default _Application.html_. Again, I think this is just that Mayhem is still in the process of changing and there is [a note](https://sitepen.github.io/mayhem/guide/#first-app) that the generator branch doesn't work with the master branch, so if I figure this out, I'll send a pull-request. But, this is the farthest I have been able to get with Mayhem, so I was pretty jazzed about that.

### Next steps

As of right now, I have a semi-working sample available [in this github repo](https://github.com/odoe/mayhem-sample). During your testing with compiling the TypeScript files, you may need to go to the _bower\_components/mayhem/dist_ directory you compiled earlier and rename the _\_typings_ folder to _typings_. For the end result, I don't think this mattered, but while I was in the process of testing, this was causing me errors. I also still get errors that when compiling to TypeScript that it cannot find the external modules for the Mayhem bits, but like most life problems, if I ignore them everything still works anyway. If anything, my interest in Mayhem and Dojo 2 are definitely going to be pushing my eagerness to learn TypeScript. I'm always willing to try and learn something new.

If you are interested in contributing to [Mayhem](https://github.com/SitePen/mayhem/blob/master/CONTRIBUTING.md) or [Dojo](https://github.com/dojo/dojo/blob/master/CONTRIBUTING.md), check out the guidelines for each.
