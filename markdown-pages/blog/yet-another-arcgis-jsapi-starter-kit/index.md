---
title: "Yet another application ArcGIS JSAPI starter kit"
published: true
author: Rene Rubalcava
date: "2017-08-10"
tags: geodev, typescript
coverImage: "odoenet-starer-app.jpg"
---

I know, I know.

Lately, I've been working on this [little starter kit](https://github.com/odoe/esrijs4-ts-starter-kit) in my spare time. I started it because I've gotten a few questions about how to build an app with the ArcGIS API 4 for JavaScript.

I've used this application in some demos, and I've gotten requests to share it. So I thought now would be a good time.

_There's no single way to build an app!_

This start kit is fully my own opinion on how you can get an application up and off the ground. It has aspects of adding in third-party libraries, authentication, and building custom widgets.

Some of the features:

- TypeScript
- NPM Scripts
- Service Worker
- [Intern](https://theintern.github.io/) for testing, incuding remap-istanbul for TypeScript coverage
- [TSLint](https://palantir.github.io/tslint/)
- [Prettier](https://prettier.io/)
- [PostCSS](http://postcss.org/)
- [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky) to keep your git commits honest

That's pretty hipster dude.

_It's unapologetically built with TypeScript._ Building custom widgets with the baked-in frameowkr pretty much requires you to use TypeScript anyway with the decorators. So the whole app is built with TypeScript.

The tooling is pure _NPM scripts_. I've used just about every build system under the sun. I'm always trying to hack something, shove some build step in somewhere. I grew _fatigued_. So I just moved to using NPM scripts for all my tooling. Curious on more, read this [old blog post on the subject](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/).

The big benefit I've found is I can easily inject a build step anywhere I want. Just about every good package has a _cli_ so it works pretty well. Not everyone has to use Webpack.

The Service Worker stuff has been a little trickier. Big thanks to [Nick Peihl](https://twitter.com/nickpeihl/status/888100836106051584) for helping me figure out some stuff I was stuck on. I was convinced I had to check the service worker in my cache to use it, but I was writing my Service Worker incorrectly. [Yann](https://twitter.com/yanncabon) and I had this conversation back and forth at one point and as much as it pains me to say it... _he was right_, I don't need to worry about the SW in my application code. I got lots of really good info from [Web Performance In Action](https://www.manning.com/books/web-performance-in-actiona_aid=rrubalcava), which I highly recommend.

Prettier is pretty cool, although I think it formats code with decorators a little odd, but it's not a show stopper for me. I back it all up with TSLint to fix any issues it could fix. I was writing my own custom TSLint rules at one point, but it's a dark abyss I decided I didn't want to stay in.

There you go, enjoy the starter app, give me feedback. If you hate it, that's cool too, please send me hate in bitcoins, thanks!

<iframe width="560" height="315" src="https://www.youtube.com/embed/crfDFM6BswA" frameborder="0" allowfullscreen></iframe>
