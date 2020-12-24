---
title: "Simple What3Words Widget in ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2015-11-09"
tags: geodev
coverImage: "esri-w3w.png"
---

Recently, there was an [announcement that Esri and What3Words](http://esri.what3words.com/) were partnering up and that What3Words would be coming to ArcGIS Online and Desktop and Server. I have no idea how that integration is going to play out, but hey, you can start using What3Words in your ArcGIS JS Apps today.

## What is What3Words

If you're unfamiliar with it, [What3Words](http://what3words.com/) provides location information based on three words. So instead of saying you are at latitude 33.54 and longitude -118.34, you would say you are at _intelligences, fingerboard and tingled_. I'm sure this is a mnemonic's dream come true.

I'll be honest, I'm still not quite sure about how it all plays out, _but_, I don't think I'm the audience for this. Thinking of countries that don't have an address system or at least not a manageable one. Maybe the population is incredibly spread out. This isn't something really meant to replace a coordinate system, it's really something to replace a lacking address system. If you give someone your address, the probably have no idea where that is. You don't go around giving people your _coords_, or maybe you do _geonerd_.

## Cool, now what

The first thing you want to do is visit the [What3Words developer site](http://developer.what3words.com/). Sign up for an API key and now you can get crazy.

The API couldn't be simpler. Convert 3 words to a location _or_ convert a location to 3 words. That's a clean API, no fuss no muss.

So now, let's build a simple widget to use with the [ArcGIS JS API Beta](https://developers.arcgis.com/javascript/beta/) because _3.x is so yesterday_.

[gist](https://gist.github.com/odoe/bfb5964f0087a733b704)

This isn't too complicated. We basically have a button that can hide the result window. When the result window is shown, we activate a handler to listen to the _mousemove_ event of the View container. We convert screen coordinates to latitude and longitude, then make a request to the What3Words API. Those results are placed in the result window. We are debouncing the handler for the _mousemove_ event, so we don't fire a request for every little movement of the mouse or you're results will take way too long to return when they pile up.

You can see a demo of this application here. [JS Bin on jsbin.com](http://jsbin.com/woyure/7/embed?css,js,output)

If this demo stops working at some point, it's probably because you guys used up my API limit, so if you want to play with this, take this code and use your own API key.

After I put this together, I found [another repo that integrates the Search Widget with What3Words](https://github.com/JamesMilnerUK/esri-what3words) to search for words and show locations on the map from [James Milner](https://github.com/JamesMilnerUK). So check that one out as well to get an idea of how you may integrate What3Words into your applications.

## Use your words

Like I said, I had a tough time kind of grasping What3Words, but I think it's starting to click for me. I think the real benefits are seen in areas that have no formal addressing system. But if you want to start looking at how to integrate What3Words into your application, as you can see, the API is incredibly straightforward. So play with it, try it out and see if it's something that may work well with your workflow.
