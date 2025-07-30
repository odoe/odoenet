---

title: Quick tip - Build React into your Dojo apps
published: true
author: Rene Rubalcava
pubDate: 2016-03-28
tags: geodev
heroImage: '../../assets/blog/quick-tip-build-react-dojo-apps/images/react-dojo.png'
description: So I spent some time this past weekend fussing around with getting
  a Dojo app built with React. I was going through and replacing use of Dijits
  for React components. Everything was working just fine in development. _It was
  awesome!_
---

So I spent some time this past weekend fussing around with getting a Dojo app
built with React. I was going through and replacing use of Dijits for React
components. Everything was working just fine in development. _It was awesome!_

Then I tried to build it with the Dojo build system and none of the React stuff
worked. _Bummer_.

So React is is built with a UMD wrapper, as many good libraries are. So it will
work with AMD loaders like RequireJS and Dojo. Something with the build was off
though. It was getting wrapped in a **define** method and my React imports were
null. After some hair pulling, I went the Dojo IRC (always a good spot to get
some solid Dojo info) and someone there pointed me in the right direction. Just
tell the Dojo build system that those modules are AMD modules. _Problem solved._

That was the light bulb moment I needed.

So I updated my Dojo build profile packages like this.

[gist](https://gist.github.com/odoe/0aea204315c2f568e693.js)

And voila!

My app compiled with the Dojo build into a single file with my React components
and everything worked nicely.

So the point is, if you run into issues with UMD modules not compiling with the
Dojo build system, use the **resourceTags** option to let the Dojo build to know
to treat them like AMD modules.

Happy hacking!
