---
title: "Custom GeocodeProcessor with Swiz"
published: true
author: Rene Rubalcava
date: "2010-03-31"
---

One of the interesting features of Swiz 1.0 (still pre-release) is the ability to create custom metadata processors. To get more familiar with the idea, check this [docs page](http://swizframework.org/2009/12/swiz-1-0-reflection-api-and-custom-metadata-processors/). Note that some items from the docs has changed, such as you no longer extend MetadataProcessor, but extend BaseMetadataProcessor.

There is a [Yahoo Finance Processor](http://soenkerohde.com/2010/03/swiz-yahoo-finance-metadata-processor/), a [URLMapping Processor](http://www.ryancampbell.com/2010/03/26/introducing-the-swiz-urlmapping-metadata-processor/) and even a [MediateSignalProcessor](http://code.google.com/p/foomonger-swizframework/). It all looked a bit in depth to me, I'm still what I would call an intermediate in my dev skills at this point, but I decided to take a crack at it.

Since most of what I do is based on the ESRI Flex API, I decided to try making a GeocodeProcessor. The idea is that you can set up a Processor that would act as your delegate to a geocoding service. This way, you could just move it around different projects using swiz and simplify the task. I pretty much just used the geocode example from the [samples pages](http://resources.esri.com/help/9.3/arcgisserver/apis/flex/samples/index.html).

You can view an [example here](http://odoe.net/thelab/flex/geocodeprocessor/GeocodeProcessor.html) and I also put it on github [here](http://github.com/odoe/GeocodeProcessor). By the way, my first github attempt, and I was quite lost for a bit. I'll need to learn how to use it for future projects. As for the application, when you search for an address, click the Center Map button up top. This is a hurdle I'll explain shortly.

First off, thank you to those who already created some custom processor examples. I would have been scratching my head for a while trying to find what works and what doesn't. First, part of the need to do something like a Geocode Processor requires that you be able to send a new address request to get updated information. I thought of using the idea of copying objects from the Mediate tag that was used in the URLMapping processor, but I couldn't figure out how to do that AND send an updated object back to the application.

I went a different route, and one that is probably not recommended and that was to make a public getter/setter in the GeocodeProcessor to hold the Address object that could be updated from my application. In my case, I added the object to my Swiz via binding as can be seen [here](http://github.com/odoe/GeocodeProcessor/blob/master/src/net/odoe/geocode/views/MainView.mxml). Then my processor would listen for changes on the object and run a new geocoding task as can be seen [here](http://github.com/odoe/GeocodeProcessor/blob/master/src/net/odoe/geocode/processors/GeocodeProcessor.as).

As I mentioned before, I had an issue that required I add a Center to Map button. For the life of me, I could not figure out how to let the map know that an address had been added to the map. I'm sure this is just a matter of finding the proper events to listen to or maybe setting my Swiz initialization, but I couldn't figure it out. I thought I should at least mention it.

I was actually a little surprised it worked, but also pretty happy with how simple the concept of using a custom processor is once you go through the process of writing one. For geogeek ESRI Flex devs, I can think of a couple of uses such as maybe a processor for creating a GraphicsLayer set that is commonly used in your organization or possible some other tasks. Like I said earlier, I'm still not completely happy with having a public variable on the processor that needs to be updated manually, but this was mostly just a proof of concept for me and a learning experience.

So if you're interested in the idea of custom processors, I say give it a shot. Go grab your source for Swiz [here](http://github.com/swiz/). Now that I've done it once, I think I may like to try doing some more.
