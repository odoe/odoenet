---
layout: "../../layouts/BlogPost.astro"
title: "Animate a drawer in ArcGIS JSAPI 4"
published: true
author: Rene Rubalcava
pubDate: "2017-11-27"
tags: geodev
coverImage: "animated-drawer.gif"
---

Every now and then I come across some odd UI use case where I want to do something I'm not sure how to do.

_This pretty much happens to me all the time._

A while ago, I wanted to add the Legend for my [ArcGIS API 4 for JS](https://developers.arcgis.com/javascript/) app into a sidebar, but I wanted to get _fancy_ and animate the sidebar when I open it.

At some point, I came across [this post on SE](http://codereview.stackexchange.com/questions/106946/simple-animation-method-with-requestanimationframe-code-structure) that worked really well and was pretty simple. So I adapted it for a simple animated drawer in my application.

I won't get into too much detail, but it basically utilizes [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to increase or decrease the margin of the sidebar on each frame. I can also animate the [ViewPadding](https://developers.arcgis.com/javascript/latest/sample-code/view-padding/) of my map as part of the animation.

The tricky part is to do the animation smoothly. That's where [easing functions](http://easings.net/) come in to play. Combining requestAnimationFrame with an easing function and that code snippet above, I was able to get a nice smooth animated drawer for my application.

You can check it out here.

<iframe height="300" style="width: 100%;" scrolling="no" title="Animate Drawer" src="https://codepen.io/odoe/embed/zPJKeE?height=300&theme-id=39013&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/zPJKeE'>Animate Drawer</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
