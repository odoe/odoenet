---

title: "Esri Dev Summit 2015: Aftermath"
published: true
author: Rene Rubalcava
pubDate: 2015-03-16
tags: geodev
heroImage: '../../assets/blog/esri-dev-summit-2015-aftermath/images/devsummit_summary.jpg'
description: Ok, this will be my last post on the Esri Developer Summit for
  2015, _I promise_. I had put up a post a day all last week for the Esri Dev
  Summit at the end of each day, but now I've had a whole weekend to let it all
  set in and kind of let the bubbles settle. Here are some of the things I think
  really stood out for me last week.
---

Ok, this will be my last post on the Esri Developer Summit for 2015, _I
promise_. I had put up a post a day all last week for the Esri Dev Summit at the
end of each day, but now I've had a whole weekend to let it all set in and kind
of let the bubbles settle. Here are some of the things I think really stood out
for me last week.

### How to lie with maps

One of the big things that was stressed this year was
[data visualization](http://www.amazon.com/How-Lie-Maps-2nd-Edition/dp/0226534219).
So much so that Esri even has a
[Data Viz App Challenge](http://www.esri.com/landing-pages/DatVizAppChalz) that
opened last week with some big prizes. This ties in to the new
[Smart Mapping](https://www.youtube.com/watch?v=HlIzMHo1jNg&feature=youtu.be)
features that Esri introduced in the latest 3.13 release of the
[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/jshelp/whats_new.html).
I haven't had time yet to really dig into these features yet, but the gist of it
is that it will make applying renderers to your data much easier. From the looks
of it, it will work out your mean and standard deviations of your data for you
given a method. This will be more familiar with people that are used to
visualizing data in ArcMap where you can just apply a _quantile_ classification
and avoid most of the math. This is a great sounding feature. It doesn't let you
off the hook of checking your data and maybe cleaning it up, but it I can see
this is a productivity boost for a lot of devs.

### Geometry Engine

The other neat feature of the 3.13 API for JavaScript release is the
[Geometry Engine](https://developers.arcgis.com/javascript/jsapi/esri.geometry.geometryengine-amd.html).
This is similar to the kind of functionality you can find in
[TurfJS](http://turfjs.org/static/docs/), which I am a
[big fan of](https://odoe.net/blog/exploring-new-turf/). What is very
interesting is that there is a
[version of the Geometry Engine](https://developers.arcgis.com/javascript/jsapi/esri.geometry.geometryengineasync-amd.html)
that is asynchronous and uses
[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage).
That is a very nice feature. This is still a beta feature of the API, but it
does allow us to start doing some spatial analysis in the ArcGIS API for
JavaScript without having to do the GeoJSON conversions to work with Turf. I
like options.

### Desktop

I'm mainly a web guy, but I did notice a lot of cool things coming out of
desktop features. [ArcGIS Pro](http://pro.arcgis.com/en/pro-app/) has been in
the users hands for a little while and I heard some really good stuff from other
actual users of this product that wasn't just more marketing material. Basically
people I talked to that are using, really like it. I haven't had a chance to use
it outside of a demo island, but if these folks like it, I'm eager to get my
hands on it. From what I saw, there was a lot of emphasis on authoring your data
for online use in ArcGIS Pro, such as exporting vector tiles. Again this year,
they reiterated that ArcGIS Pro is not replacing ArcMap, but come on, in my
opinion, _the writing is on the wall_. It may not be this year, but maybe at a
version 11 or 11.1, we'll see.

### SDKs

I don't have to do much native dev, but even I can appreciate the support for
[Xamarin](http://xamarin.com/) from Esri. It makes sense for shops that don't
have staff or budgets to maintain multiple codebases. Also because of the work
done on the ArcGIS runtim SDKs, we now how
[AppStudio](http://doc.arcgis.com/en/appstudio/). I am very interested in this.
It uses [Qt](http://www.qt.io/developers/) to do cross-platform development. The
demos they showed were very impressive. I'm not very familiar with Qt and C++
isn't my strongest language, but I'm excited to put some time aside to play with
this.

### Hack time

So those are the main things I took away from the Developer Summit this year. As
has been the case for many years, the scripted demos always look great, so it's
up to the developers and users to put all this stuff through the ringer and see
how things pan out.

### P S

I had asked about running ArcGIS Server in Docker and apparently I wasn't the
only one. It doesn't seem to work..._yet_. If anyone out there makes any
progress on this, I'd love to hear about it. It could make for some fun dev
playground antics.
