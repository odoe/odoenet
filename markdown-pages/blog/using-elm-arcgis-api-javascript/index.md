---
title: "Using Elm with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2017-03-15"
tags: geodev
coverImage: "esrijs-elm.png"
---

I'm a big fan of [Elm](http://elm-lang.org/). I think it's a great language to work in, the debugging tools are awesome and once you get the hang of it, it really makes app development flow much easier and just starts to make sense.

This is all due to the simplicity of the [Elm Architecture](https://guide.elm-lang.org/architecture/).

Now, I am far from an Elm pro, I think I'm barely breaking the surface of being an Elm _novice_. But I'm eager and one of the best ways to learn something is to try and teach it, thus why I made this video.

There may be some stuff in the video in terms of how to write your Elm code. I'm still finding cool ways to work with [Commands](https://www.elm-tutorial.org/en/03-subs-cmds/02-commands.html) in Elm and how to please the almighty _type gods_.

So bear with me, as I try to share what I've learned so far as I could have totally _Munsen'd_ this, but I think it's a good start to show some interop with the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/). I admit, I think this video is a little long, but anyone who has seen me present knows I get _excited_ about this stuff. I try not to ramble, but I make no guarantees.

One area I'm really interested with Elm is how to scale a larger application, where I may have a Main application that pulls in some smaller components to compose the application. I got thrown by stuff I had to do to try and make sure my _Msg_ was typed correctly. I'm sure it's easier than I'm making it out to be.

Here is the Elm code for reference.

[gist](https://gist.github.com/odoe/d5eb36e4924745b03bc11614db70b3f9)

That's a lot, I know. I try to explain most of it in the video.

## Resources from the video:

- [Demo repo](https://github.com/odoe/elm-jsapi4)
- [Live demo](https://odoe.github.io/elm-jsapi4)
    
- [Pragmatic Studios - Elm: Th Pragmatic Way](https://pragmaticstudio.com/elm)
    
- [Pragmatic Studios - Elm: Integrating Elm](https://pragmaticstudio.com/courses/integrating-elm)
- [FrontEnd Masters - The Elm Language](https://frontendmasters.com/courses/elm/)
- [Pluralsight - Elm: Getting Started](https://app.pluralsight.com/library/courses/elm-getting-started/table-of-contents)

Thanks for watching!

<iframe width="560" height="315" src="https://www.youtube.com/embed/773PkqI5QzA" frameborder="0" allowfullscreen></iframe>
