---

title: CIMbology
description: Using the CIM Builder for ArcGIS JSAPI
published: true
author: Rene Rubalcava
pubDate: 2021-04-01T10:00:00.000Z
heroImage: '../../assets/blog/cimbology/images/cover.jpg'
tags: geodev, javascript
---

The [CIM spec](https://github.com/Esri/cim-spec) allows you to create some
amazing and sometimes complex symbols for use in your ArcGIS apps. We've been
able to use them in the ArcGIS API for JavaScript via the
[CIMSymbol](https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-CIMSymbol.html)
for a while now. Ideally, you could use a
[DictionaryRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-DictionaryRenderer.html)
using some predefined symbols.But you could definitely build your own custom CIM
in your apps with the API.

I'm not going to lie, it can get complex pretty quick. CIM symbols are defined
very similar to SVG. You define geometry in symbol space. You can have multiple
layers in the symbol, even text labels. And to top it all off, these can be data
driven, even using
[Arcade expressions](https://developers.arcgis.com/javascript/latest/sample-code/cim-primitive-overrides/)!
_Mind blown._

Here's an [old sample](https://codepen.io/odoe/pen/vYNvvZB?editors=0010) I made
where I attempted to draw hospital beds by hand. I learned a lot writing it, but
not it's definitely not the kind of complex symbol I would want to do again.

<iframe height="450" style="width: 100%;" scrolling="no" title="Graphics - CIM" src="https://codepen.io/odoe/embed/preview/vYNvvZB?height=440&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/vYNvvZB'>Graphics - CIM</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Enter the
[CIM Symbol Builder](https://developers.arcgis.com/javascript/latest/cim-builder/).
This tool is amazing. You can add as many layers as you want, change the color,
even add a picture to the symbol. It's great, because when you are ready, you
can copy the JSON for the CIM, use it as-is, or modify it with expressions or
any other crazy stuff you want to do. This simple little tool is a map-making
lifesaver. Combine this with the
[Symbol playground](https://developers.arcgis.com/javascript/latest/sample-code/playground/)
and you have all your symbol needs covered.

You can see a quick video where I stumble my way through the CIM builder below.

<lite-youtube videoid="2cJCDPZ08Jc"></lite-youtube>
