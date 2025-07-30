---

title: AS3-Signals in Swiz, keepin' it simple
published: true
author: Rene Rubalcava
pubDate: 2010-02-19
description: So, previously I had talked about using Swiz and AS3-Signals
  (Swignalz!). My example was crude and honestly, it was not good. Ben
  Clinkinbeard did a much better job of showing how easy it was to drop some
  AS3-Signals around with Swiz.
---

So, previously I had talked about using [Swiz](http://swizframework.org/) and
[AS3-Signals](http://github.com/robertpenner/as3-signals)
([Swignalz!](https://odoe.net/blog/?p=47)). My example was crude and honestly,
it was not good. Ben Clinkinbeard did a much better job of showing how easy it
was to drop some
[AS3-Signals around with Swiz](http://www.benclinkinbeard.com/2010/02/swiz-as3-signals-and-inject-ftw/).

This past week, I have been tinkering around with a project that will be redone
and figured out that if you create a named Bean for a regular Signal, you can
then Inject/Autowire that Bean into any Signal in your application.
`var mySigBean:Bean = new Bean(new Signal(), "mySignal");`

This turns out real nice because then all I have to do anywhere in my
application is the following. `[Inject("mySignal")] public var signal:Signal;`

There's no need to create a custom Signal in your application, even if you are
going to dispatch a payload. No more signals folder for me. I'm not sure if
there is a performance hit for not defining the type of Object that will be
dispatched with your Signal, but so far this has turned out pretty well for me.

I threw together a quick
[example](https://odoe.net/thelab/flex/simpleswignalz/SimpleSwignalz.html) with
source [here](https://odoe.net/thelab/flex/simpleswignalz/srcview/index.html).
I'd also like to point out that Swiz 1.0 metadata Injecttion into view
components is really nice and lets me do cool things like this.
`[Inject(source="mySignal", destination="frmSignal")]`

That is so cool.
