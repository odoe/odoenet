---

title: ESRI Flex Map with Robotlegs
published: true
author: Rene Rubalcava
pubDate: 2009-12-12
tags: geodev
description: Well, I'm not really one to leave well enough alone and I just had
  to give another Flex framework a try for my ESRI Flex mapping needs. My latest
  victim was Robotlegs. If you look at my earlier blog postings, you might have
  seen me mention that my first Flex framework was Cairngorm. I didn't really
  dislike Cairngorm, but after some conferences and reading around, I felt like
  I should expand my Framework horizons. Most recently I have been using Swiz
  with a lot of success. I think I use Swiz in the most minimal way possible,
  which is actually something for a future blog posting.
---

Well, I'm not really one to leave well enough alone and I just had to give
another Flex framework a try for my ESRI Flex mapping needs. My latest victim
was [Robotlegs](http://www.robotlegs.org/). If you look at my earlier blog
postings, you might have seen me mention that my first Flex framework was
Cairngorm. I didn't really dislike Cairngorm, but after some conferences and
reading around, I felt like I should expand my Framework horizons. Most recently
I have been using Swiz with a lot of success. I think I use Swiz in the most
minimal way possible, which is actually something for a future blog posting.

But I had also tried at one point to give Robotlegs a try. I had worked through
some of the docs, but had not really dived into any of the examples. So I
finally decided that I needed to get my feet wet a bit and dived into
[some](http://www.vimeo.com/7524637) [reading](http://www.vimeo.com/7569666)
[material](http://joelhooks.com/). Joel Hooks had a posting of a
[presentation](http://joelhooks.com/2009/11/14/texflex09-robotlegs-slides-and-a-robotlegs-t-shirt-giveaway/)
that I particularly enjoyed. So after some trial and error, I think I wrapped my
head around the basics of Robotlegs. Like Swiz, Robotlegs utilizes metadata to
support
[Dependency Injection](http://wiki.github.com/robotlegs/robotlegs-framework/best-practices#dependencyinjection)
in the framework. I'll be honest here, I'm spoiled, I don't know how to do
dependency injection in Flex/AS3 manually. Adding that to my list of things to
learn. Anyway, this makes tying classes and events together pretty simple.

After a couple of hours of watching videos and creeping through some examples, I
was able to come up with this
[example](https://odoe.net/thelab/flex/robotlegsmap/RobotLegsMap.html), with
[view source](https://odoe.net/thelab/flex/robotlegsmap/srcview/index.html)
enabled of course. Now, as far as Flex Mapping applications go, this is about as
simple as it gets and as far as I wanted to go tonight as it's getting late. But
the basics are in there. You have a map, with it's layers and extent tied to a
model. You have a datagrid tied to a custom ListCollection ( I took portions of
this from another project I'm working on ) and a graphicslayer that gets
highlighted when you click on the datagrid. And of course a QueryTask to handle
getting attribute information. Most folks that work with Flex Maps using the
ESRI Flex API will be familiar with this and realize this is probably the
starting point for about 90% of your projects.

Now on to my impressions of Robotlegs. I will say this, Robotlegs got me in the
mindset of the
[Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle)
when I was going through my project. For example, I have a command to query the
States Service and a command o handle the results. In most of my recent work, I
had one controller doing both those tasks. Now, I'm not going to go "programmer
purgatory" for using my controllers that way and the only coding cookie I'll get
for wanting to follow that principle is the sugar cookies my wife and kids make,
but it is one of those things I have found makes maintaining and testing of code
easier. My only complaint would be is that I found, even looking at examples, is
that the code started looking a little "Cairngormish". By that I mean, I had to
manually wire my events to my commands. This started looking an awful lot like
the FrontControllers I'd seen in previous apps.

One other thing bothered me, but I'm sure it has more to do with my following
examples as opposed to really knowing how to use the framework is the need to
override functions and extend Robotlegs classes for everything. Something I have
been trying to do, is keep 3rd party APIs that aren't specific to the output of
my app as minimal as possible. That's actually a topic for a later post, but it
was something I found odd as I worked through my first real attempt. But like I
said, I have a feeling that as I get more familiar with Robotlegs, I can find a
nice balance to keep the framework implementation as minimal as possible.
Something I really liked was the Mediator for views. I have been using the
Presentation Model on my most recent work app and I'm a big fan of using a model
for my view that can be tested independently. The Mediator class in Robotlegs is
a very nice way of keeping your views as "dumb" as possible.

So, that's it for my first run at Robotlegs. I'm going to dive into it some more
and try some things to see how I like using it most. I'm sure the more I use it,
the more I'll enjoy it. It's nice having another tool in my Flex toolbox that I
can pound on something with.
