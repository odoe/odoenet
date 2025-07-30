---

title: Look ma, no wires!
published: true
author: Rene Rubalcava
pubDate: 2010-01-22
description: Recently, I have been using Swiz on a couple of smaller projects
  that are in the works. Swiz is a great little framework that is incredibly
  light weight. You can see some great examples using Swiz as well as some good
  discussion in the google groups. I am still using 0.6.4, but the 1.0 alpha is
  out and offers a new direction for Swiz, especially one that I welcomes that
  eliminates the need to instantiate Swiz. As I understand it, you just need
  your Beans and SwizConfig. All other code can be written with the simple use
  of metadata tags, that Swiz 1.0 alpha will also be offering some neat
  features.
---

Recently, I have been using [Swiz](http://swizframework.org/docs/) on a couple
of smaller projects that are in the works. Swiz is a great little framework that
is incredibly light weight. You can see some great
[examples](http://swizframework.org/examples/) using Swiz as well as some good
discussion in the
[google groups](http://groups.google.com/group/swiz-framework). I am still using
0.6.4, but the
[1.0 alpha](http://swizframework.org/2009/12/swiz-1-0-0-alpha-released/) is out
and offers a new direction for Swiz, especially one that I welcomes that
eliminates the need to instantiate Swiz. As I understand it, you just need your
[Beans](http://swizframework.org/docs/ioc-container/) and
[SwizConfig](http://swizframework.org/docs/configuration/). All other code can
be written with the simple use of metadata tags, that Swiz 1.0 alpha will also
be offering some
[neat features](http://swizframework.org/2009/12/swiz-1-0-reflection-api-and-custom-metadata-processors/).

So as I was working on some items, I remembered a
[20-minute Swiz vide](http://www.firemoss.com/index.cfm/2009/10/21/Swiz-in-20-minutes-video--byebye-boilerplate)o
that Joe Rinheart had posted that helped me out when I first started looking at
Swiz. In that video, as a shortcut, Joe had simply binded a service to a
delegate inside his BeanLoader to eliminate the need to Autowire an object in a
Delegate. This got me thinking about the need to use Autowire with the metadata
tag in my applications. When you Autowire an object using Swiz, the object has
to be public anyway. The BeanLoader is already an
[IoC](http://martinfowler.com/bliki/InversionOfControl.html) container. So why
use it? After I had read
[Clean Code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882),
I began to look at keeping my code as minimal as possible to get the job done.
Although, an Autowire metadata tag was no big deal, I just felt like it was one
more item I could eliminate from my code.

You could accomplish this in your BeanLoader.
`<controls:RequestController id="requestController" eventDispatcher="{ this.dispatcher }" service="{ mockDelegate }"/>`

`<services:MockMainServiceDelegate id="mockDelegate" eventDispatcher="{ this.dispatcher }" />`

Now I have eliminated the need to Autowire the mockDelegate object in my
RequestController.

I have built a simple example that can be found
[here](https://odoe.net/thelab/flex/swiznowires/Index.html), with
[view source](https://odoe.net/thelab/flex/swiznowires/srcview/index.html)
enabled. You'll notice that I don't use the Autowire metadata tag anywhere,
allowing the BeanLoader to do the Autowire for me. Well . . . not quite true. I
was not able to get away from using Autowire in a Mediator for my views, even if
I tried to add them to my BeanLoader and bind them in there. I used a simplified
version of an AbstractMediator class that Brian Riley used in his
[Swiz Passive View example](http://www.webappsolution.com/wordpress/2010/01/06/swiz-passive-view-example-part-1/).
If anyone has any ideas as to why I had to Autowire this view, I would love to
hear it, it was driving me nuts. Anyway, as you can see, all I used in my
example was the Mediate metadata tag to mediate my events. That's what I call
simple and clean. As an aside, I am also using the
[ESRI Flex API](http://resources.esri.com/arcgisserver/apis/flex/), with some
mock data that is built using the
[FeatureSet.convertFromJSON](http://resources.esri.com/help/9.3/arcgisserver/apis/flex/apiref/com/esri/ags/tasks/FeatureSet.html#convertFromJSON())
method, which comes in real handy. This is the main API I use for day to day
work.

Now is this really necessary? Probably not, but it does keep my MVC code lean.
That's a great strength for Swiz, is the ability to adapt it to your style. This
allows me to really focus on building my custom objects that will really do the
grunt work that my MVC will simply delegate.
