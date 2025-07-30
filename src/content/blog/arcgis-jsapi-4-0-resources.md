---

title: ArcGIS JSAPI 4.0 Resources
published: true
author: Rene Rubalcava
pubDate: 2016-05-03
tags: geodev
heroImage: '../../assets/blog/arcgis-jsapi-4-0-resources/images/esrijs-4.0-release.png'
description: I've talked about it for months, guided you through betas and dug
  deep into new features, and today the ArcGIS JavaScript API 4.0 was released.
---

I've talked about it for months, guided you through betas and dug deep into new
features, and today the
[ArcGIS JavaScript API 4.0 was released](https://developers.arcgis.com/javascript/).

There's a really extensive
[blog post](https://blogs.esri.com/esri/arcgis/2016/05/03/arcgis-api-for-javascript-4-0-released/)
on the Esri blogs that you should go read for more information, it's packed full
of really good stuff.

I wanted to talk a little bit about some of the new resources out with this
release.

## Documentation

First of all, _if you didn't notice_, the documentation has been totally
revamped. Check out the
[reference page](https://developers.arcgis.com/javascript/latest/api-reference/index.html)
to sample the new search capabilities. That search is _fast_.

Not only the reference, but the guide is extremely extensive. You can view the
[What's New section](https://developers.arcgis.com/javascript/latest/guide/whats-new/index.html)
to see how detailed it is. There is a _Working with the API_ section that covers
tons of material, even how to use
[Bower](https://developers.arcgis.com/javascript/latest/guide/using-bower/index.html)
and
[PhoneGap](https://developers.arcgis.com/javascript/latest/guide/using-phonegap/index.html).

### Samples

You should really start digging around the
[samples page](https://developers.arcgis.com/javascript/latest/sample-code/index.html).
_There are a lot of samples with this release_. I mean a lot. And the search on
this page is just as fast as the rest of the documentation.

These aren't just simple samples either. Check out some of the
[3D Visualization samples](https://developers.arcgis.com/javascript/latest/sample-code/visualization-vv-extrusion/index.html)
or if you want to get deep with WebGL, you can
[extend 3D with it](https://developers.arcgis.com/javascript/latest/sample-code/scene-external-renderer/index.html),
now that's serious.

You will get a lot of really great information out of perusing the samples and
seeing what you can do with 4.0!

## Other Resources

Now let's diverge from the documentation a little bit.

The [jsapi-resources](https://github.com/Esri/jsapi-resources) has been
reorganized to accommodate both 3.x and 4.x resources. The README has even been
updated to provide easier navigation to resources. If you want to see a couple
of samples on using the
[JSAPI 4.0 Bower release](https://github.com/Esri/arcgis-js-api/releases/tag/4.0.0),
you can check them out
[here](https://github.com/Esri/jsapi-resources/tree/master/4.x/bower). There
isn't too much difference in the build process for 3.x, but you can build a full
3D application with stars and all the 3D goodness that comes with it into about
a 2MB JavaScript file. For the capabilities you get with it, that's a pretty
good size.

One of the other additions people have been asking for with the ArcGIS JS API
4.0 betas has been TypeScript definition files, and that
[has landed with the release of 4.0](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript).

If you are using TypeScript, I'm going to guess that you know how to use these.
Here's a simple
[gist](https://gist.github.com/odoe/de06ae8db349e82216a716bf2b2a5198) using
JSAPI 4.0 in TypeScript with React.

These are just some of the resources you can find for 4.0 documentation and
github.

There is a
[Discover the Next-Generation ArcGIS API 4 for JavaScript](http://training.esri.com/Gateway/index.cfm?fa=seminars.viewDetails&course_id=252)
live training seminar next week you may also want to check out to dig in
further!

Happy hacking!
