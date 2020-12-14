---
title: ">Mapping apps with Flex, Swiz and Fluint"
published: true
author: Rene Rubalcava
date: "2009-10-19"
---

\>I have been developing with Flex for about a year now and so far it has been a really fun experience. I am by no means a trained developer, I just happened to have taken some some C++ and VB6 courses in school and fell into it.

  

That being said, I had very little clue how to use a framework when developing, much less how (or why for that matter) to do unit testing. I saw a great presentation at the [ESRI 2009 Developer Summit](http://proceedings.esri.com/library/userconf/devsummit09/index.html) last year on [Flex Best Practices](http://resources.esri.com/arcgisserver/apis/flex/index.cfm?fa=mediaGalleryDetails&mediaID=6D74B9C4-1422-2418-345AC9BAFA21FB23). It was in that session that I learned how much I had been doing wrong. I guess, I shouldn't say wrong, after all, the application I was working on worked. Problem was, when someone wanted to add a new feature or change the way something worked, I found myself spending a lot of time trying to fix things I had broken by doing so.

  

That's when I first started using [Cairngorm](http://opensource.adobe.com/wiki/display/cairngorm/Cairngorm;jsessionid=3ED7D3EB32D8CEF3025F23B2CAEA24E7). [This site](http://www.davidtucker.net/category/cairngorm/) has some great articles and videos on Cairngorm. That's where I learned how to use it. Cairngorm seemed like a great way to organize my code and in the end it just made sense. It can be a little clunky and as I have read elsewhere a bit heavy on boiler plate code. You launch an event that's tied to a command that executes a delegate and then process the results updating your model. Makes perfect sense to me. Then I discovered unit testing. It was discussed in that presentation I mentioned, but I didn't think it really applied to me. After all, I was the only person developing this application and why would I need unit testing, Cairngorm kept everything organized for me. That is until my model got a bit large, my commands dispatched more events to more commands, I was using timers to keep consecutive asynchronous tasks to the same functions from overlapping and I found a change here would break something somewhere else and would go unnoticed until I tried to show someone something cool I had done only to find something else didn't work (yeah, that looks really cool).

  

So, like any Flex developer would do (I actually have no idea what a real Flex developer would do) I tried out [FlexUnit](http://opensource.adobe.com/wiki/display/flexunit/FlexUnit). FlexUnit worked and looked good too. However, have you ever tried to do unit testing with Cairngorm and FlexUnit? Do a web search on that particular subject. It took me a few tries, but I got something working. I realized at this point why Test Driven Driven development has such a good reputation. It works. I've decided to approach all my future projects this way.

  

But I thought this post was titled "Mapping apps with Flex, Swiz and Fluint", why am I rambling on about Cairngorm and FlexUnit? This is my first blog post, give me a break. Did I mention that the only Flex development I have done is mapping applications with [ESRI's Flex API](http://resources.esri.com/arcgisserver/apis/flex/)? Now, I know I'm not alone in having my first Flex experience be with the ESRI Flex API. It's fairly new and it's a niche market. We are a niche group. Now out of that group of ESRI Flex API developers (I use the term developer loosely for myself) also use a Framework of some sort? Okay now, I know this list might be short, but out of that group, how many are doing or attempted test driven development?

  

You can see where I might have been frustrated trying to research that particular subject. When dealing with a mapping application, there is a lot going on. You have a map that you might want multiple functions to access and adjust an extent for, you have multiple map services that you want exposed to other functions so you can turn off layers or adjust transparencies, not mention use query tasks or identify (I'm sure it's just as bad for you real Flex developers if not worse). A framework really lets you get a good grasp on these things. Utilizing testing of some sort is just a cherry on top. Because of some frustrations I had with Cairngorm, I decided to research some more frameworks that I thought lent themselves quite well to mapping applications specifically.

  

That's when I turned to [Swiz](http://code.google.com/p/swizframework/). I really did not like Swiz when I looked at it. I mean, come on, Beans? I thought that was a Java thing? But I decided to buckle down and really take a crack at it. So I took one of the [ESRI Samples](http://resources.esri.com/help/9.3/arcgisserver/apis/flex/samples/index.html) from their website and adjusted it to work in the Swiz framework with some minor tweaks to display a grid of state names. That took me a full Saturday. Being the overambitious glutton for punishment that I am, I decided to try to do some unit testing with [Fluint](http://code.google.com/p/fluint/). But why not Flex Unit you might ask? Fluint was touted at the 2009 Developer Summit I went to as being a little more robust. Plus, I figured, I wanted to learn something new. Fluint has some nice features, and I think the most powerful is the ability to add steps to your test and then run it.

  

So, after spending all weekend, reading multiple tutorials, multiple blogs and forum posts, I got a working, testable (and passing thank goodness) application put together. I figured, someone out there, might be in my situation. Using the ESRI Flex API, trying to wrap their heads around a framework and maybe, just maybe trying to do some unit testing. I did not find a specific example like that anywhere. If you got one, please share it.

  

Remember, in [my example](http://odoe.net/thelab/flex/swizmapfluint/Index.html) (view source available), I am probably doing a lot wrong. I have my map in my Beans (that sounds hilarious) with a controller, a delegate and a component to control my list of states. I'm kind of thinking that in the way I'm using it, my Beans replace my model. It exposes what I want to everything else in my application. Originally, my map was just part of a single component with a datagrid. I parted it out, so that I could add a function to zoom to a state on a datagrid double click. I need my map accessible outside that page. I probably make some wrong assumptions here, but I haven't tried that part yet.

  

If you are curious on what sites I used as references, here is a list.

[Brian Kotek](http://www.briankotek.com/blog/index.cfm/2009/1/8/Using-Swiz-Part-1-Initial-Setup) had an awesome 5-part series on Swiz. There is supposed to be more coming, so I'm sure I'll change how I use it as I learn more of the stuff he didn't post yet. Not to knock the Swiz [Getting Started](http://code.google.com/p/swizframework/wiki/GettingStarted) page, but I had a tough time really grasping it with their walk-through.

  

This [insideria article](http://www.insideria.com/2008/10/automated-testing-and-you-self.html) gave me a good start at using Fluint. The Fluint [Getting Started](http://code.google.com/p/fluint/wiki/GettingStarted) pages were a big help as well.

  

And if you bothered reading all this, I assume you are interested in Mapping applications using Flex with a framework while taking advantage of unit tests. I hope I have helped in your unholy quest.

Sorry, if this wasn't "tutorial" or more specific. If someone has questions (all one of you), I'll try to answer them the best I can. The couple of guys linked above know more than I do about Swiz and Fluint, but I have a newbie perspective on it when it comes to the mapping stuff if you need it. I'll probably still use Cairngorm for stuff already done that way, so might post an example up with that later on. I'm hoping to tackle [Mate](http://mate.asfusion.com/) next weekend, so we'll see how that one goes.
