---
title: "Swignalz!"
published: true
author: Rene Rubalcava
date: "2010-02-09"
tags: geodev
---

Recently I decided to take a crack at [AS3 Signals](http://github.com/robertpenner/as3-signals). [Robert Penner](http://robertpenner.com/flashblog/) has done some really nice work putting signals together. AS3 Signals is basically meant to replace using custom events to dispatch your payload around. I'm not sure I'm entirely sold on the concept of introducing another API into my apps, but I was intrigued enough to give it a shot.

Some good resources of getting started with AS3 Signals is [this video](http://pv3d.org/2010/01/21/as3-signals-tutorial/) by John Lindquist. I don't know about you, but I have found that these screencasts are a great way to get a grasp on an idea. There has also been some [testing](http://alecmce.com/as3/events-and-signals-performance-tests) to show that Signals can actually be quicker that Events. This could appeal to you if you are writing a large application that could benefit from the increased performance.

As I see it, you would use Signals in place of creating custom events that would be dispatched to carry a payload. In trying out signals, I began to think of how much I might want a signal to do. Most examples I have seen treat them as value objects, but I suppose you could turn them into full blow mini-controllers. One area I might try playing with signals is in processing raw data from a service into something the rest of my application could use.

Joel Hooks already  put together a cool AS3 Signals/Robotlegs [example](http://joelhooks.com/2010/01/16/robotlegs-image-gallery-example-using-as3-signals-and-the-presentation-model/) that showed how you could leverage Signals with Robotlegs. So I figured, hey, I'm going to try Signals with [Swiz](http://swizframework.org/).  I haven't really tackled Swiz in a while as my current project uses [RobotLegs](http://www.robotlegs.org/), but with [Swiz 1.0 Alpha](http://swizframework.org/2009/12/swiz-1-0-0-alpha-released/) out and 1.0 beta coming up, I thought I'd give it a shot as I anticipate using Swiz 1.0 in a couple of upcoming projects. I tried some stuff out in the available examples and then put together a small demo app.

[Application](http://odoe.net/thelab/flex/swignalz/Index.html)

[Source](http://odoe.net/thelab/flex/swignalz/srcview/index.html)

It's not a pretty example, but it shows a couple of ways that you can treat signals in your application.

I use a couple of value objects with signals in my application model. This way, I can Autowire (the Inject tag is supported in the latest builds, but I already had this alpha build on hand) my model into my controller and assign the listeners that way. With this method, you have the ability to keep your listeners private, which some people might find appealing. A disadvantage here is that some people might not like tying the controller in this manner. I haven't tried unit testing a controller like this yet, so I'm not sure if it would pose a problem.

Another method is to drop a value object with a signal directly into my BeanProvider and assign a function from a Controller as the listener when you initialize the Bean. The rest is pretty simple, I added some comments where I thought they'd be useful.

Swiz 1.0 offers some cool new features like custom metadata processors and virtual beans, which may be able to manage signals is a more efficient manner, but I have not had the opportunity to dive into that much detail in Swiz to be comfortable saying if it would work or not. As for my opinion of Signals, I'm not sure I'm entirely sold yet, but as I built the example, I began to think of the possibilities of mapping them out with a decorator pattern or similar. The fact that it got me thinking about it seems like a good sign. I'm always a little hesitant to add APIs to my applications, but when it comes to being used in the context of the framework of my application, I think I'd be a bit more comfortable. I expect I'll take AS3 Signals for a test drive in the near future.
