---
title: "Getting modular with the ArcGIS JavaScript API"
published: true
author: Rene Rubalcava
date: "2012-03-17"
---

Maybe it's all the time I've spent using frameworks like Swiz and Robotlegs in my Flex development, but I usually strive to try and keep my code modular. Breaking it up into smaller manageable pieces, not necessarily so that I could reuse files but mostly for my own sanity.

Have you ever caught yourself starting a simple application, just keeping everything in a single file or two only to find it has grown into a beast where you get an error on line 292 but it could have carried over from something on line 5? That's a clue you probably should look into breaking up your code. If you're not quite sure about modular JavaScript, please go read up on it [here](http://addyosmani.com/writing-modular-js/). It's worth it and every JavaScript developer should read it.

The first piece to this little bit I'd like to introduce is Require.js. Require.js uses the [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) (Asynchronous Module Definition) API to load JavaScript files or modules as they are called. If you have used Dojo 1.7+, you might recognize it. It's a pretty nifty way of loading your modules. It will even work with [CommonJS](http://www.commonjs.org/) typed files if you [need it to](http://requirejs.org/docs/whyamd.html#commonjs).  I won't get int to AMD vs CommonJS, pick one and go with it, you'll probably use both at some point anyway. I picked AMD. Require.js files will typically look like the following

```js
define(['tools/myTool'], function(MyTool) {
    var tool = new MyTool()
    /// do stuff
})
```

Easy sauce. Simple and clean. You can read about the details on their [API page](http://requirejs.org/docs/api.html).

Moving on, the next piece to modular nirvana is [Backbone.js](http://documentcloud.github.com/backbone/). Let me start off by saying that I was not a big fan of Backbone the first time I looked at it. It seemed to be too much trouble for little return. Then when I looked at samples of using with Require.js I was flat out ready to just say forget it. But I powered through the initial learning curve and now, I can say that Backbone.js is my most favorite little framework since jQuery. But it's not jQuery and I'll get to that in a second. The only hard dependency of Backbone is [Underscore](http://documentcloud.github.com/underscore/), which has a bunch of neat little utilities one of which is a template generator (if that's the correct way to describe it). Backbone provides a framework to build your applications using models, views and collections. Backbone really shines when you tie your models to REST endpoinst, but that is beyond the scope of this little intro. It does not do DOM manipulation, but the views components can use jQuery to bind to a view that is rendered on the DOM. Once you start using it, it will kick in and you're going to want to send me lots of beer for encouraging you to use it.

The next step, which took the most brain matter for me to really kind of tear apart and piece back together to make sense of it was on how to use these tools together with the [ArcGIS JavaScript API](http://help.arcgis.com/en/webapi/javascript/arcgis/). Well, as usual with the internet there's a [page for that](http://backbonetutorials.com/organizing-backbone-using-modules/). I followed this model to build my first test applications. That link goes over in detail on how to load external scripts and set up your bootstrapping for your application. Basically what you end up doing is creating aliases to library paths and use the aliases.

So you can follow along, I placed the [code](https://github.com/odoe/bbdemo) for this article on github. Here is my run.js bootstrap file.

```js
/* #This is essentially where you do #your bootstrapping for your application. #Define aliases for the paths to your #JavaScript libraries or other folders #you may use. */

require({ baseUrl: 'javascripts', paths: { loader: 'libs/backbone/loader', jQuery: 'libs/jquery/jquery', Underscore: 'libs/underscore/underscore', Backbone: 'libs/backbone/backbone', dojo: 'libs/esri/dojo', templates: '../templates' }, cach: {} }, ['main']); `

The interesting stuff then happens in the loader.js file. ` define(['order!http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.7', 'order!libs/jquery/jquery.min', 'order!http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js', 'order!libs/underscore/underscore-min', 'order!libs/backbone/backbone-min'], function() { return { Backbone: Backbone.noConflict(), _: _.noConflict(), $: jQuery.noConflict(), dojo: dojo }; });
```

This loader file defines where your libraries come from, local files or external, doesn't matter. When the files are loaded, the loader will return an object that contains a reference to the libraries like Backbone, jQuery or dojo. The link above that I based this off of explains these concepts in more detail, the important thing to know is that the loader loads libraries. One thing to note is that the only time you ever have to reference the ESRI API url. When the API is loaded anywhere, it goes global, so dojo is available throughout your whole application now. There is a special case for this, but I won't go into detail on that, if it happens to you, you'll know.

I know this seems like a lot of upfront effort, but it's really not so bad when you get the idea of what is happening. Once I've bootstrap the application, the 'main.js' file gets loaded. I use this file to make a couple of tweaks to the way Underscore does it's templating and I start the application.

```js
define(['require'], function(require) { return require(['app', 'Underscore'], function(app, _) { _.templateSettings = { interpolate: /\\{\\{(.+?)\\}\\}/g, evaluate: /\\{\\#(.+?)\\}\\}/g }; return app.start(); }); });
```

I won't go into detail on the app.js file, but I do want to move on to some specific Backbone stuff. The sample application I have put together shows a map of the United States. There is a sidebar that list the name o each state. Clicking on a name will zoom you in to that state on the map. Pretty straightforward operation.

Here is my Backbone model for the state item.

```js
define(['Backbone'], function(Backbone) { var State; return State = Backbone.Model.extend({ initialize: function(state) { this.state = state; return { defaults: { name: "", graphic: null, map: null } }; }, zoom: function() { var extent; this.state.map.graphics.clear(); this.state.map.graphics.add(this.state.graphic); extent = this.state.graphic.geometry.getExtent(); return this.state.map.setExtent(extent, true); } }); });
```

This model has a reference to a graphic and the map. It's not a copy, just a reference, so it's not like you're using up extra memory here. This allows the model to have it's own zoom function to zoom in to itself on the map. I use this technique a lot when I need to populate a list with items from a map, click on the list and zoom to it. It's a pretty straightforward function and this pattern simplifies it for you.

But wait, you don't need to interact directly with the model, there's a Backbone collection for that.

```js
define(['Backbone', 'models/State'], function(Backbone, State) { var StateCollection; StateCollection = Backbone.Collection.extend({ model: State, zoomByCid: function(cid) { var state; state = this.getByCid(cid); return state.zoom(); } }); return new StateCollection; });
```

The cid is a unique id that the collection will assign to each model that is added to it. You can use this cid in the collection find the correct model and access it's zoom function that we assigned to it. But how do I interact with the collection? Bear with me a second. If this seems a little confusing, don't worry, it took me a while to kind of grasp how the pieces all fit together.

We can access the collection from our view.

```js
define(['jQuery', 'Underscore', 'Backbone', 'collections/StateCollection', 'text!templates/forms/StateListView.html'], function($, _, Backbone, stateCollection, viewTemplate) { /* # This list view will # handle rendering and events # of the sidebar list */ var ListView; ListView = Backbone.View.extend({ el: $("#sidebar>ul"), tagName: "ul", initialize: function() { return this.collection = stateCollection; }, events: { "click a": "clicked" }, clicked: function(evt) { var cid; evt.preventDefault(); cid = $(evt.currentTarget).data("id"); return this.collection.zoomByCid(cid); }, render: function() { var data, template; data = { states: this.collection.models, _: _ }; template = _.template(viewTemplate, data); $(this.el).html(""); return $(this.el).append(template); } }); return new ListView; });
```

This view holds a reference to the collection that we are using. When the view is rendered, we use Underscore.js to load a template and render it to the view. `template = _.template(viewTemplate, data); ` There are a couple of things happening in the view. First you'll notice this line in out define. ` 'text!templates/forms/StateListView.html' ` This will load an html file that has a little function to load each data from each model into the view. This view also handles the events of the view using jQuery. When an item in the list is clicked, it will find the cid we discussed earlier by searching for the data id attribute tag we assigned in the template and use the collection function we made called zoomByCid() to zoom to that location. It all fits together in a neat little package.

Just to give you an idea of what it looks like, here is template.

```js
{# _.each(states, function(state) { }}- [{{ state.get("name") }}](#)
{# }); }}
```

This uses an Underscore utility function to iterate the array of models and render each one to a list item and passes model information into the anchor. If you've done jQuery templating this look very familiar to you. As a matter of fact you could use jQuery templates in the view if that's what you're comfortable with.

You can see a working demo of this application [here](https://odoe.net/thelab/js/bbdemo/index.html).

Ok, I think I've covered a the basics of how you might use Require.js and Backbone.js with the ArcGIS JavaScript API. I know this might all seem like a lot of work, but imagine building a more complicated application with multiple views, maybe a couple of more collections and you can see how this pattern can simplify that task for you. There is definitely more to Require.js and Backbone.js that you could learn about and I encourage you to look up more examples. For example, I recently used Backbone.js with .NET MV3 REST endpoints and the ArcGIS JavaScript API and the workflow is incredibly simple. Backbone.js shines with REST endpoints.

By the way, the [source](https://github.com/odoe/bbdemo) for this example uses CoffeeScript and Sass/Compass for css. Don't worry about that, I'll get to Sass/Compass stuff later.

I hope I was able to introduce you to some tools that you can add to your development toolbox and use wisely. Go forth, and make cool shit.
