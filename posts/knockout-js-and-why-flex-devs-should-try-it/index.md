---
title: "Knockout.js and why Flex devs should try it."
published: true
author: Rene Rubalcava
date: "2011-06-23"
---

Being primarily a Flex developer at work, I take great pleasure in the opportunities I have at the workplace to use different technologies to get the job done. Recently, I developed a simple internal application that I could have done in Flex, but really, it was fairly straightforward and I wanted to brush up on my JavaScript skills, so I built the app using the [ESRI JavaScript API](http://help.arcgis.com/EN/webapi/javascript/arcgis/index.html). (Sorry, it's an internal app, so I can't really share, but trust me, it's really simple).

So working with HTML/JavaScript, I was really trying to find a comfortable manner in which I could write my app in a way closer to what I was used to. I know some people have some very strong feelings about JavaScript and it's evils.

But if you're writing ActionScript, you're already half-way there. I'm a big fan of frameworks and utilities when developing. The ESRI API uses, [Dojo](http://dojotoolkit.org/), which I have heard the JavaScript mention before was due to it's rich API for working with web services. I'm not a huge fan of Dojo dijits, so like many I use jQuery for DOM specific manipulation or handling. Many times I found myself doing a lot of element.innerHTML = "blahblah" stuff, and it just felt a bit dirty. I know there are some very talented JavaScript/Web developers out there. I'm not really one of them (yet!).

As I began to clean up my HTML markup, using more CSS I sought out something that could help me tie my HTML to my data. That's when I found [Knockout.js](http://knockoutjs.com/). This is a great lightweight utility that utilizes a Model-View-View Model (MVVM) pattern to update your UI. I know this is the recommended pattern for use when developing [Windows Phone 7 applications](http://codingsolutions.blogspot.com/2010/03/windows-phone-7-tdd-kata-using-mvvm-and.html) as well.

As I began to work with it, it felt very familiar and finally it hit me. It was just like Binding a Presentation Model to an MXML view in some Flex stuff I had done. I first used a [presentation model](http://www.benclinkinbeard.com/2009/05/swiz-example-application-with-presentation-model-pattern/) when working with [Swiz](http://swizframework.org/) and it's a nice way of binding Model data to your View and capturing View events. It's not exactly the same, but the familiarity of it alone was enough to make using JavaScript enjoyable.

I put a sample page up [here](http://www.odoe.net/thelab/js/koforflex/).

Let's look at some of it.

[gist id=1043313]

Notice the 'data-bind' tag that I use. This would be similar to binding values in MXML via <s:comp text={'bindableModel.value'}/>.

Then in my JavaScript, I define a viewModel with some attributes and even a method. When I started using stuff like  'data-bind="click: search' which points to a function in my viewModel, that is when it all started to click for me. Now, I have bound my view to a method in the viewModel and that method can access other items in the viewModel to perform it's task. I don't need to find the value of a DOM element that may have been updated earlier or anything like that. This is a really simple example when you look at it, but I think it demonstrates some powerful features of Knockout.js. You can review how to use ko.observable and ko.observableArray in the [Knockout.js documentation](http://knockoutjs.com/documentation/introduction.html).

If you look at the JavaScript of the sample app, you could see that to update an observable, by simple calling viewModel.osmCopyURL("myUrl"). The update to the model is automatically and seamlessly updated to the View. No need to use jQuery or search for DOM element by id. You can have a clean separation of your logic from your view.

I have barely scratched the surface of Knockout.js, but I would highly recommend that anyone looking to take on a new project using JavaScript check it out and definitely would recommend it to any Flex developers that are dabbling/transitioning to JavaScript, as I found it to be a great tool that provided familiar patterns and functionality.
