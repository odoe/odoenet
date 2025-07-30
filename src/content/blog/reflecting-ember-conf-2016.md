---

title: Reflecting on Ember Conf 2016
published: true
author: Rene Rubalcava
pubDate: 2016-04-04
tags: geodev
heroImage: '../../assets/blog/reflecting-ember-conf-2016/images/globey-emberconf.png'
description: Last week I had the opportunity to attend EmberConf 2016 in
  Portland, Oregon from Esri. Ember is one of the frameworks used for
  application development here, so it was really good to catch up on current
  development in the community. First off, I had to fly, which I'm not a fan of,
  but I'm getting better. I didn't freak, so let's call it a win.
---

Last week I had the opportunity to attend
[EmberConf 2016](http://emberconf.com/) in Portland, Oregon from Esri. Ember is
one of the frameworks used for application development here, so it was really
good to catch up on current development in the community. First off, I had to
fly, which I'm not a fan of, but I'm getting better. I didn't freak, so let's
call it a win.

So for the past year or so, I've done a lot of Ember development. I even wrote a
[post about writing an ember-cli addon](https://odoe.net/blog/five-things-i-learned-writing-an-ember-cli-addon/).
I've dug in deep into the Ember guts, and let me tell you, it's pretty gutsy in
there.

Ember is an interesting framework. I would say that maybe two to three years
ago, it had an odd learning curve. It follows the
[convention over configuration](http://johnotander.com/ember/2015/02/03/convention-over-configuration/)
aspect of it. There are parts of your application that will be created for you
if you decide not to override their behavior and this could be a _WTF_ moment if
you aren't used to it. I think [ember-cli](http://ember-cli.com/) has helped to
simplify much of the learning curve issues with Ember. And it really is using
best practices for Ember development.

This was my first EmberConf, and one thing right off the bat I think I could
immediately see, was a strong community of users. Everyone was really friendly
and having a good time.

The keynote kicked kicked things off and it's pretty apparent there has been a
lot of work focused on increasing performance in Ember.
[Glimmer](https://github.com/tildeio/glimmer) was all the rage this year and for
good reason. _It's pretty damn fast_. Glimmer is the DOM engine developed for
Ember, but note, it doesn't look like you _have_ to use Ember for it. There's a
[demo app here](https://dbmonster.firebaseapp.com/) with
[source](https://github.com/wycats/dbmonster).

There were two tracks of sessions this year and I pretty much stayed in the
track 1 room, which seemed to cover some more technical details. There were some
really good presenters and it's tough to try and cover all the sessions in
detail. The Service Worker presentation was real interesting with lots of tips
on taking your apps offline and utilizing both AppCache and Service Workers and
the browser pains we all feel.

I was really interested in the presentation on building Electron apps with
Ember. This is something I've dabbled in and this talk gave me some ideas I'll
be testing out.

The one that stood out for me on day one the Dissecting an Ember CLI build talk.
This presentation went deep on the build steps and the
[broccoli](http://broccolijs.com/) steps used in Ember CLI. For anyone that has
done any addon development, this talk should definitely have been on your
must-see list.

On day two, we got to see more in depth stuff about Ember CLI and some updates
on what's to come. One of the things discussed was the idea of
[Ember Engines](https://github.com/emberjs/rfcs/pull/10). There is a repo
[here](https://github.com/dgeb/ember-engines). Here's a
[deck on it](https://speakerdeck.com/dgeb/introducing-ember-engines). Basically
engines is to help developers manage loading Ember apps in Ember apps, like
loading a blog page or maybe loading admin pages into your app. This is the kind
of stuff I've struggled with in Ember. Ember CLI wants you to build a single
JavaScript file for your application, aside from the _vendor_ file. It was even
brought up that some of these can get pretty big, such as 12MB and up. You may
have code that isn't needed by all pages of your app. You may even have pages
that are only needed for certain users based on authentication. It looks like
engines will help solve that problem. It's something I've tried working on using
the [ember-cli-amd](https://github.com/esri/ember-cli-amd) addon, for use with
the ArcGIS JS API. Plus, let's face it, asynchronousity is something needed for
large apps where you may want to bundle parts of your application. I'd have to
wait and get my hands dirty with engines myself, but it seems to me that a lot
of these issues could be alleviated if Ember CLI had some form of AMD support
via [RequireJS](http://requirejs.org/). The loader they use is pretty close to
being [almondjs](https://github.com/requirejs/almond). The whole loader is
synchronous, there is no async involved at the moment. I could take Ember on
it's own and use it with an AMD loader, but not in Ember CLI. I don't know, that
is of course just my opinion, but I'll have to actually try engines to get a
better feel for it.

The talk by [James Kyle](https://github.com/thejameskyle) of
[babeljs](https://babeljs.io/) fame was also really good. He basically crammed
the creation of a simple Lisp to JavaScript compiler into a 30 minutes session,
with some hand drawn slides. It added fuel to a fire I had with colleagues the
night before about the differences between a compiler and a _transpiler_. _Talk
about geek talk_.

There was an immutability talk that I thoroughly enjoyed, as it works really
well with the
[Data Down, Actions Up](https://dockyard.com/blog/2015/10/14/best-practices-data-down-actions-up)
that Ember embraces. I picked up some good tips from this talk as well. This is
one of those talks where I want to go over the samples in more depth. I follow
some similar patterns in my development and I'm always looking for some in-depth
perspective on these things.

It was at this point that I had to leave early to catch my flight. I missed the
Glimmer talk, which I heard went really in depth on the topic. I am really
looking forward to seeing this video and trying out Glimmer outside of an Ember
app.

So it was a great experience overall and it was definitely something I'll be
doing again next year. I also had quite a bit of fun with the
[snapchat filters](https://twitter.com/odoenet/status/714837664092987392) for
the event. Which, by the way you can find me on snapchat under **odoenet**.

Ember really is a very nice framework and it's pretty easy to onboard new
developers with and like I've always said, if you are in a team environment and
want everyone on the same page, it's tough to wrong with Ember. I look forward
to see what cool stuff comes out this year!
