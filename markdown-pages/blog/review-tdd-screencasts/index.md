---
title: "Review: TDD Screencasts"
published: true
author: Rene Rubalcava
date: "2010-07-24"
---

I was going to title this post TDD Porn, but it seemed inappropriate, still very fitting though.

Test-Driven Development is exactly what it says it is. You develop your project with the tests driving you in the desired direction. There’s [tons](http://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530) of [material](http://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627) on TDD out [there](http://www.agiledata.org/essays/tdd.html), so I won’t cover too many details.

The [screencasts offered by The Pragmatic Bookshelf](http://www.pragprog.com/screencasts/v-kbtdd/test-driven-development) are done by [Mr. Kent Beck](http://www.threeriversinstitute.org/) himself. Go read about him, he knows a thing or two about this kind of stuff.

A great message I got from the screencasts is that your tests should tell a story. You compose that narrative in steps, so as to not trip yourself up. Many times you are probably required to develop against a backend service or directly with a database. So that's how the story starts. Hello Mr. Database, are you there? May I put something in you?

In this case, Mr. Beck is using [Tokyo-Tyrant](http://1978th.net/tokyotyrant/) as the database for this example. By the way, my OCD kicked in 5 minutes into the first screencast and I fired up my Ubuntu server, and spent a good 30-45 minutes toying with installing Tokyo-Tyrant. As there is no debian package that I could find and if you are so inclined, follow [these instructions](http://gissolved.blogspot.com/2009/07/installating-tokyo-cabinet-and-ruby-on.html) which are good for TokyoCabinet and Tokyo-Tyrant. Or you could not worry about it and just watch the videos like a sensible person might.

Back to our regularly schedule ramblings. I have read a few of the TDD books out there and I try to be a good TDD'er in my Flex Projects, but I happen to be the type of person that does well with visual aids. I can do all the reading in the world, but something about reinforcing that reading by actually watching someone do it just makes it click. This is probably why pair-programming is such an effective tool (I should try it sometime if I ever meet another Flex developer in person and can trick… I mean convince them to show me how a pro does it). It also helps that although the tutorial is done in Java, the syntax is similar enough to Actionscript that I was pretty comfortable following along. If at first you’re wondering why in the video when tests are run, the video kind of fades, they are trying to highlight the [JUnit](http://www.junit.org/) results in the lower-left hand corner. I didn’t figure this out until the second screencast, but chances are you’re not as slow as I am.

**Episode 1: Starter Tests** , is a good intro to the adage of TTD, _Red, Green, Refactor_, which you get to see in action in the screencasts. You write out a test, it fails. You write just enough code to get the test to pass, then you refactor to remove that nasty code smell. For me, the snag is usually in writing a meaning full test. We get to see first-hand how a simple test of connecting and writing to a database clarifies the intent and drives the narrative of the story being told. I know I have some tests that just check to make sure a function accepted an argument, but I don’t test what happens when it does not. I think everyone can take something away from the first screencast alone, and it gets better with each installment.

**Episode 2: Isolated Tests**, this is where the motto of the game is _leave the world in the same state as you found it_. If you’re going to test against a database, it should look exactly the same after your test as it did before you test. After all, you’re going to ideally run your tests for every refactor, so you’d hate to get a nasty phone call from your DB administrator wondering why you populated the database with hundreds of entries of a testDEEZNUTZ value (never happened to me and you can't prove it). In this video, Kent Beck gives a good demonstration of building on your current tests, refactoring out the naughty bits and you get to see a Java Class take shape, fully supported by those tests.

**Episode 3: Big Feature** is all about building some complex functionality by using TDD to break it down into fun size bites. You start to get some real meat in this screencast and see how Kent Beck handles building on top of tests and the logic behind his decisions.

**Episode 4: Finishing** is where we clean up the code and make it presentable. This is also where Kent Beck provides a review of previous screencasts. In the first half of the video you end up with a functional map for Tyrant. The last half of the video is a summary of the series and you get some great insight and tips from a pro point of view on design decisions. Pros always make it seem so easy.

Even if you’re familiar with TDD and have been using it in your projects, I think you’d probably still be able to find some gems of information in these screencasts. You might be able to pick up some tips from Kent Becks style (the guy’s got style) and I would even say there are some great tips in these videos on refactoring your code and cleaning it up.

If you’re new to TDD, you have to start somewhere and I think these videos would be a great starting point before diving into the written material that's available out there. I'm a kid of the 80's, I was raised on visual aids.

One of the best things about the videos is that you get the sense that it’s not just a scripted screencast. I’m sure Mr. Beck had an outline, but as he’s writing the tests and implementations you can tell he’s working through problems in his head and is probably crossing his fingers for a passing test as much as you might. This makes the videos very personable and you almost feel like you’re sitting in the chair next to him just trying to soak in the knowledge via proximity osmosis.

The screencast are available for a reasonable price as a [package deal](http://www.pragprog.com/screencasts/v-kbtdd/test-driven-development) or separately, but why bother buying just one, _gotta catch them all_.
