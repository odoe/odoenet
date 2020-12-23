---
title: "NativeMappedSignal (map that shit!)"
published: true
author: Rene Rubalcava
date: "2011-01-27"
---

I have had the pleasure of using [AS3-Signals](https://github.com/robertpenner/as3-signals) in combination with [Robotlegs](http://www.robotlegs.org/) for quite a while now. It's a great combo for communication within a Flex Application. I was at one point hesitant about using signals for communication within my components, until I started experimenting with them. You can check out the [Community Examples page of the wiki](https://github.com/robertpenner/as3-signals/wiki/Community-Examples) to get up to speed on how use your basic [Signal](https://github.com/robertpenner/as3-signals/blob/master/src/org/osflash/signals/Signal.as), [DeluxeSignal](https://github.com/robertpenner/as3-signals/blob/master/src/org/osflash/signals/DeluxeSignal.as) and even [NativeSignal](https://github.com/robertpenner/as3-signals/blob/master/src/org/osflash/signals/natives/NativeSignal.as). Also, check out some of the videos that [John Lindquist](http://johnlindquist.com/) has put together, as they are very informative.

I started out using NativeSignal inside my components, but I always felt that although it was a neat way of tying up my internals, it was missing a little something. That's when I found [NativeMappedSignal](https://github.com/robertpenner/as3-signals/blob/master/src/org/osflash/signals/natives/NativeMappedSignal.as). The documentation in the source on this one was pretty good at giving me a rundown of what it did. You can basically map an event to more relevant data. This seemed to be the solution I was looking for and didn't even know it.

To my surprise, my web searching revealed plenty of examples on using Signal, DeluxeSignal and NativeSignal, but I couldn't find any solid examples of using NativeMappedSignal. I'm a visual person, so some examples or even video would have been great, but alas, I was left to just try it and learn. I'm glad I did.

First off, let's start with a simple example of how you can use a NativeMappedSignal in a Flex component.

[gist id=799072]

In this example, I have 2 Buttons and a TextInput. In this SkinnableComponent, where normally I would override the partAdded to add eventListeners, I am binding my NativeMappedSignals to each button and using the signal.mapTo() method to return strings that are unique to each signal. Then the same method is added as a listener to each signal. The method is not aware that an event happened, nor does it care where it came from. There's no need to check the target to determine what text to display. This is a great convenience for me. [Here is a sample](http://www.odoe.net/thelab/flex/nms/simple/index.html) of this little component in action.

You can also see that in the partRemoved() override, I just use the signal.removeAll() and set my signal to null when done. Easy peezy. That's all there is to it. You can map the NativeMappedSignal to a string or more than one string or any object or objects as you'd like. It's great.

Now, since I am a GIS developer using the [ESRI Flex API](http://help.arcgis.com/en/webapi/flex/index.html), let me show you a simplified version of how I use NativeMappedSignals in my current application development.

[gist id=799135]

In this sample component, I have a couple of buttons that activate a DrawTool. You can draw a square or line, depending on the button you click. So like the previous example, I bind each button to a NativeMappedSignal that maps to a string that represents the type of drawing action that I'd like to perform. I have a single method to activate my DrawTool. No need to create if/else or switch/case statements to check which button was clicked to determine that action.

Probably the more interesting part is the NativeMappedSignal that I bind to the DrawTool. When the DrawTool finishes drawing, it dispatches a DrawEvent.DRAW\_END event, that carries the graphic that you just drew on the screen. The NativeMappedSignal is actually mapped to a function that returns this graphic, so again, the method I would normally use to handle the DrawEvent doesn't care what event just occurred. You send it a graphic and it will add that graphic to the GraphicsLayer. Simplicity. [Here is a sample](http://www.odoe.net/thelab/flex/nms/map/index.html) of this component in action.

Of course these are very simple examples of how you can use NativeMappedSignal, but as you can probably already see, it can be a very powerful tool in transforming your events into useful, meaningful data. A use I have found is using them in BaseComponents, that I can extend. The extended components are sometimes not even aware that events are happening, I just add methods as listeners to inherited signals and voila, it's like magic. Play with it a little bit for yourself, I don't think you'll be disappointed. Another benefit of signals, is that [they are fas](https://github.com/robertpenner/as3-signals/wiki/Performance)t. Now, admittedly, I don't know what performance results of NativeMappedSignal are, but even if they are marginally slower than normal Signals, the benefits are worth it in my opinion.

I hope you've found these little samples informative. Like I said, I had trouble finding specific examples using NativeMappedSignal and once I felt comfortable with them, I though I would share the little bit I have learned. Of course, I could be using them completely wrong or abusing them in some absurd fashion. If so, oh well, it works right?

But really, if I'm way off base, let me know, thanks!

By the way, there is a [NativeRelaySignal](https://github.com/robertpenner/as3-signals/blob/master/src/org/osflash/signals/natives/NativeRelaySignal.as) that looks interesting, but again, I'm not sure how to use it or in what circumstances it would be useful, so if anyone has some insight on this one, I'd appreciate it.
