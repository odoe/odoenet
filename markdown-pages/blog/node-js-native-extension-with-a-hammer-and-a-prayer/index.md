---
title: "Node.js native extension with a hammer and a prayer"
published: true
author: Rene Rubalcava
date: "2011-10-20"
---

I get excited about dumb stuff when it comes to programming, so when I first heard about [Node.js](http://nodejs.org/), it seemed so out there I was like, _Ice Cream Ballz, I have to try this!_ I experimented, read the books, guides, [online tutorial](http://www.nodebeginner.org/)s and decided, I am in, you got me.

### When a good man goes to war

Node.js is built using the [Google V8 Engine](http://code.google.com/p/v8/). For most people that use Node.js, this probably doesn't matter to you at all. However, if you are interested in building native extensions to Node.js, you better learn to embrace it. The [Node.js docs](http://nodejs.org/docs/v0.4.12/api/addons.html) sort of cover a simple "Hello World" example of writing a native extension in C++. Then they link to the [node\_potsgres](https://github.com/ry/node_postgres) for an example of a real world project. This is like teaching a 5-year old how to drive a Tonka Truck, then giving him a big rig to drive around the block. Bless their hearts, but the node\_postgres extension is 600+ lines of [code](https://github.com/ry/node_postgres/blob/master/binding.cc) and although well documented, unless you familiarize yourself with some V8 stuff and review the Node.js source, you may as well be reading a Celtic translation of lorem ipsum. Or maybe you're just way smarter than me.

I decided at some point I wanted to build a native extension for Node.js using the ESRI C++ [File Geodatabase API](http://resources.arcgis.com/content/geodatabases/10.0/file-gdb-api). I'll write more details on this project at a later date when I can actually make it do something useful. For now, the point is I am a novice at C++ at best but very eager. I can struct, point and make, but I don't work in C++ on a day-to-day basis. So I did what anyone else would do. I raised the mighty Goolgle hammer and I pounded out "Hello World" examples and nailed down some erroneous errors in my attempts.

### WTF... I mean WAF

I did ok at first, knocking out some simple stuff. When I tried adding other libraries to a project was when I hit the first wall. Node.js uses [WAF](http://code.google.com/p/waf/) as it's build system for native extensions. You write a wscript file and use the _node-waf_ command. WAF as they state "... is provided for the ease of users". Sure, I use WAF all the time, great, this should be easy (I have never heard of WAF before). Turns out, WAF is a Python framework for compiling, similar to ANT, Make, and Rake. So time to switch from C++ mode to automation mode. Turns out WAF is pretty cool, and you can pretty much just assign your flags to a build object and let it rip. I had a tough time figuring out how to define some environment variables, and the stuff in [WAF book](http://docs.waf.googlecode.com/git/book_16/single.html) didn't quite work as expected, but once I had wrapped my head around WAF, I felt like I had conquered a small country.

### In search of the Node way...

When I got my first Node.js extension to compile, I was smiles ear to ear. It was a simple ext.speak("Say my name") and it would print "Say my name" in the console. But that did not seem like a non-blocking Node.js way of doing things. So I set off to figure out how to ride the callback train to crazy town. First, I attempted to replicate what was happening in the node-postgres project. They extend the EventEmitter which is part of Node.js and go from there. I still had trouble following as I had trouble figuring out if some functions came from the Node.js headers or the V8 headers. Then I came across [this issue](https://github.com/joyent/node/issues/1335) on the Node.js github page. That little comment was like a small spark as to how to handle an event in C++. Researching the EventEmitter lead me to an example on github called [node-event-emitter](https://github.com/bnoordhuis/node-event-emitter) that did exactly what I had been looking to do this entire time. It was the revelation I needed to continue. You don't have to write your Node.js native extension to extend EventEmitter, just write the handlers in C++, then use JavaScript to create a shim to inherit EventEmitter and voila! Remember that feeling you got when you first learned how to read? Me neither, but I imagine this is how I would have felt. Just to illustrate, below is a generic example of a JavaScript shim copied from [node-event-emitter](https://github.com/bnoordhuis/node-event-emitter/blob/master/event-emitter.js). [gist](https://gist.github.com/odoe/1301435)

### On the Node to find out

So what the hell is point of all this rambling? Well, I think I shared some pretty good resources and really I wanted to highlight some of the stuff you will probably encounter if you attempt to write some Node.js native extensions. There are a couple of really [good](http://syskall.com/how-to-write-your-own-native-nodejs-extension) [tutorials](https://www.cloudkick.com/blog/2010/aug/23/writing-nodejs-native-extensions/) out there to write an extension and really it's not that hard. My biggest stumbling block was trying to figure out how to write an asynchronous extension. There simply is not much guidance (that I could find) on how to accomplish this. Node.js is still very new and I have yet to see anything beyond a couple of blog posts on how to write native extensions. You won't find this stuff in any of the Node.js books available (as far as I know, if there is a book that covers some of this, please let me know). Granted, I did not hit the google groups or an IRC, which admittedly may have lead to quicker results. But at least I was forced to read lots of source code, get more familiar with some V8 Engine stuff and learned me some C++ along the way. By the way, don't attempt to learn C++ by diving into writing Node.js native extensions. Just my opinion, but maybe start with brisk walks before running a marathon.

In the end, I am well on my way to writing what I think could be a pretty cool Node.js native extension and if you want to check it out, you can find it [here](https://github.com/odoe/node_fgdb).

A really big thanks to [Ben Noordhuis](http://bnoordhuis.nl/) and his event-emitter example on [github](https://github.com/bnoordhuis). Without that example, I'd be wallowing in a sea of google search inferno.

Again, since I am new to this, if I have misinterpreted anything or lack understanding on some stuff, please point it out. I'm here to learn and I'm taking names.

I [posted](https://plus.google.com/u/0/102624738003057786173/posts/crWRrqgPPHj) on Google Plus for this too. Talk about recursive blogging.
