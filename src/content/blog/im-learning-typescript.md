---

title: I'm learning TypeScript
published: true
author: Rene Rubalcava
pubDate: 2015-08-17
tags: geodev, typescript
heroImage: '../../assets/blog/im-learning-typescript/images/esrijs-ts.png'
description: A couple of months back, I talked about how I was trying to learn
  TypeScript. Well, _I'm really learning TypeScript and getting my hands dirty_.
  One of the things that made this a little easier for me was that the latest
  official 1.5 release supports more ES6 features, such as ES6 modules. This
  means that instead of writing import foo = require('foo');, I can just write
  import foo from 'foo'; just like I would in ES6. That is pretty cool and
  _keeps my head in the same zone_ as I'm normally used to.
---

A couple of months back, I talked about how I was
[trying to learn TypeScript](http://odoe.net/blog/trying-to-learn-typescript/).
Well, _I'm really learning TypeScript and getting my hands dirty_. One of the
things that made this a little easier for me was that the
[latest official 1.5 release](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#typescript-15)
supports more ES6 features, such as
[ES6 modules](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#es6-modules).
This means that instead of writing **import foo = require('foo');**, I can just
write **import foo from 'foo';** just like I would in ES6. That is pretty cool
and _keeps my head in the same zone_ as I'm normally used to.

The other really cool part of 1.5 that should be of interest to people using the
ArcGIS JS API, is the official support for
[AMD dependencies](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#amd-dependency-optional-names).
You can read more about this in this awesome
[Sitepen blog post](https://www.sitepen.com/blog/2013/12/31/definitive-guide-to-typescript/).
This allows you to use loader plugins and easily add AMD modules to your app.
Something like this:

[gist](https://gist.github.com/odoe/3b4664019d6d757d95e2)

As you can see, I load my AMD modules via the **amd-dependency** tag, then use
**declare var module:any** to be able to use it in my code. If you look at this,
aside from the dependency tags and typings, this looks just almost identical to
ES6. The dojo definition files I'm currently using complain about not naming my
**dojoDeclare**, but I think if I switched to a different one, this might go
away. That's another one you may notice. **declare** is a keyword in TypeScript,
so you'll need to refer to it as **dojoDeclare** or something else in your code.
As of right now, you still need _dojo/\_base/declare_* for some bits since
TypeScript doesn't support multiple inheritance. I'm sure this will be addressed
via some mechanism in the future.

If you are only going to extend a single module, you can use a TypeScript
**class**.

[gist](https://gist.github.com/odoe/73d1e9f19cf2a52c9c41)

In this case, I am only extending a single class, which is defined in the dojo
TypeScript definition file. This is a lot cleaner to do.

I'm still learning best practices when using
[Interfaces](https://github.com/Microsoft/TypeScript/wiki/Interfaces) and also
when to best use **export foo** or **export = foo** or **export default foo**
and to import them into modules.

I've put up a [demo app here](https://github.com/odoe/esrijs-typescript-demo).

The [SitePen blog](https://www.sitepen.com/blog/) has been a really good
resource for TypeScript info and the
[wiki](https://github.com/Microsoft/TypeScript/wiki) has all the latest info.
SitePen has really been pushing a lot of TypeScript stuff as
[Dojo2](https://github.com/dojo/core) will be all TypeScript. Here's a cool
[recent video from a SitePen employee talking about TypeScript](https://skillsmatter.com/skillscasts/6517-typescript-or-how-i-learned-to-stop-worrying-and-love-microsoft).

I'm a big fan of ES6 and if I can get some extra developer boosts from using TS,
with typings and interfaces, I may just be doing my apps in TS, if for nothing
more than experimentation, which is what I do. I know there are folks out there
using TypeScript right now for their ArcGIS JS development, so I'd love to hear
from you on your experience and any tips and tricks you may have. In the
meantime, _I'll keep on learning_.
