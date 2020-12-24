---
title: "Swiz and the ESRI API, we meet again."
published: true
author: Rene Rubalcava
date: "2009-10-24"
tags: geodev
---

So, I spent quite a bit of time this week really trying to wrap my head around using the Swiz framework with the ESRI Flex API. I found the actual [Swiz website](http://swizframework.org/), which somehow never came up in all my earlier research. It gave me some details on things I wasn't clear on before.

I also found this video by Joe Rinehart, [Swiz in 20 minutes](http://www.firemoss.com/index.cfm/2009/10/21/Swiz-in-20-minutes-video--byebye-boilerplate).

Videos like this are great, because it just helps to hear and see someone go through it from start to finish. With my new found information, I was ready to tackle a new version of the application I posted earlier. What I have found, is the Swiz framework really gives you a lot of freedom in how you actually want to write your code. How I use it in my style, may not work for someone else's style. I really like that. You can also get a good explanation of the framework and metadata [here](http://swizframework.org/docs/getting-started/).

So, rewrote my previous example, to incorporate a tighter distinction between views and controllers. Found [here](https://odoe.net/thelab/flex/swizmapsimple/SwizMapSimple.html) (source available).

I now make liberal use of the Autowire metadata, which links all my functions and variables through my beans. I'm also making good use of the Mediate tag, that will capture events.

For example, in my Controller, I have this.

```js
public static const QUERY_LAYER : String = "queryLayer";
```

Then, from any other view or controller, I can use this.

```java
Swiz.dispatchEvent( new Event( LayerController.QUERY_LAYER ) );
```

In my Controller, I have this.

```java
[Mediate(event = "queryLayer")]
public function queryStateLayer(): void {
    trace("begin queryStateLayer");
    Swiz.dispatchEvent(new Event(LayerController.LOAD _STARTED));
    var query: Query = new Query();
    query.returnGeometry = false;
    query.outFields = ["STATE_NAME", "AREA"]
    query.where = "STATE_NAME <> ''";
    AsyncToken(stateDelegate.execute(query).addResponder(new Responder(state_results, state_fault)));

}
```

Using the Mediate metadata, telling it to watch for the "queryLayer" event, it will fire this function whenever that occurs.

As can be seen above, I am using the AsynToken function to call a delegate that will execute my query task. You don't need to use a delegate. You could execute your task directly in the controller. I like to keep my delegates separate only because it makes sense to me, as my first framework was Cairngorm and that was pretty standard. I also think it keeps the controller a little cleaner.

My biggest hurdles were trying to interpret many of the Swiz tutorials to fit into an application with an ESRI Map control, where you want interaction between the map, the layers and your controls. Swiz now supports adding Views to your beans, although from what I have read, you may want to do so only in special circumstances. But that could be another option, is to add the Map into your beans and open it up to all controllers and functions in your application.

One big hurdle that I have not been able to figure out is Unit Testing with the Swiz framework. I have tried with Fluint and Flex Unit to no avail, although I have heard that the Autowire and separation of controllers should really make this a simple task, especially in Fluint. When I try in Fluint, I load my beans in override setUp. I Autowire my controller and models as I think I should. I can dispatch an event to my controller and my trace show that my app runs just as it should, but when I check an Autowired value such as an ArrayCollection, it's null, even though it should not be. It's driving me nuts. I'm having the same issue with Flex Unit, my application traces show everything runs, but at the end, my Autowire values are still null.

If someone could look at my example and maybe write a quick Fluint or Flex Unit test for say the StateListCollection, I would be eternally grateful as it would really just push me in the right direction. I was hoping to incorporate unit testing from the very beginning of all my future applications, but this is really just killing me now.
