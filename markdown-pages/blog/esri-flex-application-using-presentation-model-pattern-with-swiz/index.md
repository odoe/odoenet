---
title: "ESRI Flex Application using Presentation Model Pattern with Swiz"
published: true
author: Rene Rubalcava
date: "2009-11-04"
---

So continuing on my quest to be a better developer, I have really dived in deep to the [Swiz framework](http://swizframework.org/).I have learned quite a bit since my last postings and I think I have gotten a really solid grasp on how to leverage the framework to meet my needs. Inspired by Ben Clinkinbeard's [Presentation Model Pattern using Swiz](http://www.benclinkinbeard.com/2009/05/swiz-example-application-with-presentation-model-pattern/), I set out to try and build an ESRI web mapping sample in the same manner.

[This is my result](https://odoe.net/thelab/flex/swizmappresentationmodel/SwizMapPresentationModel.html).

So, I read through some of [this](http://martinfowler.com/eaaDev/PresentationModel.html) in addition to Ben's example above and this how I interpreted using the Presentation Model Pattern.  
  
**image lost**

( I prefer yellow sticky notes for complex explanations )

What I liked about this pattern was that I'm able to keep the view as dumb as possible, so less can go wrong from here. The Presentation Model represents what happens in the view including values and events. The Presentation Model is responsible for dispatching events you would normally dispatch from the view. Controller does the work, utilizing delegates when needed and updating Autowired values to the model. If you look at the [source](https://odoe.net/thelab/flex/swizmappresentationmodel/srcview/index.html) for my example, you'll see I made some comments about having issues with a couple of Autowired items that I could not get to update directly in the Controller, I had to set custom setValues(value:Object) setters for the model and use that. I would prefer the Controller not even be aware of the model, and I think I may be able to accomplish this with an IEventDispatcher and using the Controller as a Protocol in my SwizConfig, but for the points I was trying to illustrate, I don't think it was really needed here.

You may also notice I am using [FlexUnit 4](http://opensource.adobe.com/wiki/display/flexunit/FlexUnit+4+feature+overview) to do some testing. I am just now starting to utilize unit testing as I build my applications and FlexUnit 4 has some nice features I am playing with. Testing is part of the reason I want to try and keep my Presentation Models and my Controllers as independent of each other as much as I can, to prevent any funny business from occurring when I try to maintain my tests as an application grows.

This is just another of my experiments in my quest to be a better developer. As I have said before, I just kind of fell into this, so a lot of these concepts are still new to me. I'm fairly comfortable with the [ESRI Flex API](http://resources.esri.com/arcgisserver/apis/flex/) at this point. Now, I'm trying to really grasp how to use design patterns and testing practices to improve my work.
