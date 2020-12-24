---
title: "Using AngularJS with ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2013-07-10"
---

## A developers inner crisis

[![angular-esri](images/angular-esri-logo.png)](https://odoe.net/blog/wp-content/uploads/angular-esri-logo.png) If you have worked at all with the [ArcGIS API for JavaScript](https://developers.arcgis.com/en/javascript/), then you know that it is built with [Dojo Toolkit](http://dojotoolkit.org/). This gives us quite a bit of utility when developing applications, including but not limited to the [Dojo AMD loader](http://dojotoolkit.org/reference-guide/1.9/loader/amd.html), and various [APIs baked right in](http://dojotoolkit.org/api/). If you want to be proficient with the ArcGIS API for JavaScript, then it really benefits you as a developer to get pretty good with Dojo. That being said, there has always been a desire by many developers to just let them "work with it their way", meaning we want to use the API with other libraries like [jQuery](http://jquery.com/), [Backbone](http://backbonejs.org/) or something else. Esri has provided some guidance on [using jQuery](https://developers.arcgis.com/en/javascript/jssamples/framework_jquery.html), although at the moment it's a bit outdated. There has even been some really great examples of using [Backbone](http://blog.davebouwman.com/2013/02/20/part-1-app-design-and-page-layout) with the API. I myself have gone through some ups and downs with third-party libraries in my ArcGIS JS development. For a while there, I felt like I was relying far too much on jQuery/Backbone to do the heavy lifting for me. So I decided to remove all third-party libraries from my workflow. I didn't only go pure Dojo, but I didn't use anything Dojo I didn't need to. I wouldn't bother with dojo.forEach() or dojo.map(), I wrote my own for-loops my way... bah. I went Dijit nutty, using the full force of [dijit/_TemplatedMixin](http://dojotoolkit.org/documentation/tutorials/1.9/recipes/custom_widget/) and I really learned a lot about Dojo internals. Now, I am fully embracing the wealth and variety of toolkits in my JavaScript utility belt, utilizing APIs right out of [dojox](http://dojotoolkit.org/reference-guide/1.9/dojox/index.html) to get stuff done easily and more importantly to me, clearly. One of these external libraries I have come to embrace since the beginning of the year has been [AngularJS](http://angularjs.org/). Sure it's the popular kid on the block and I'm pretty sure even my mom uses it, but after really diving into it, I understand why. I won't try to teach AngularJS in this single post, but for better reference check out the [docs](http://docs.angularjs.org/#!/api/), this [Pluralsight course](http://www.pluralsight.com/training/Courses/TableOfContents/angularjs-fundamentals), this [TekPub series](http://tekpub.com/products/angular) or the man who put some of the best free content out there on [egghead.io](http://www.egghead.io/#/). I do have to say that even though the Angular docs are a great resource (they are the source, duh) the Tutorial section and much of the Developer guide are just not up to snuff, at least not when first trying to learn how to use it.

## Shut up and show me something

What I am going to attempt to do is go through code how to load Angular into your project, use it with AMD style loading used in the ArcGIS API for JavaScript and how to separate the parts of your application, at least how I've grown accustomed to doing it. Angular also makes extensive use of [dependency injection](http://docs.angularjs.org/#!/guide/di) to pass controllers, services and directives around, which is really powerful stuff.

**The set up** The source code for this project is [here](https://github.com/odoe/angular-esri). A demo of the application is [here](http://www.odoe.net/apps/angular-esri/).

Now when starting the project, I'm going to add the ArcGIS API for JavaScript as normal including the stylesheet as well some bootstrap. I do this because I'm also going to use an Angular extension called [Angular-UI for Bootstrap](http://angular-ui.github.io/bootstrap/) to create a search tool.

In the [main.js](https://github.com/odoe/angular-esri/blob/master/js/main.js) file I prefer to define angular as an AMD module. I only do this so that my code will Lint properly and it makes me feel warm inside. ` define('angular', function () { if (angular) { return angular; } return {}; }); `

Once my config is all set up, I use a bootstrap method to load up all my AngularJS modules. I don't know if this is standard practice or not. I saw something similar done in the [TekPub](http://tekpub.com/products/angular) vids, liked it and it stuck.

` define([ 'angular', 'controllers/AppController', 'widgets/search/SearchBootstrap' ], function (angular, AppController, SearchBootstrap) {

function init() { var App = angular.module('app', ['ui.bootstrap']); AppController.start(App); SearchBootstrap.start(App); // need to bootstrap angular since we wait for dojo/DOM to load angular.bootstrap(document.body, ['app']); return App; }

return { start: init };

}); `

In here I create an Angular module. A module will have it's own scope and that [scope](http://docs.angularjs.org/#!/guide/scope#!) can be shared among controllers and directives create by this module.

## Get this party started

So the first thing I do is load a general AppController for my application. If you look back at the [index.html](https://github.com/odoe/angular-esri/blob/master/index.html) file, you'll see I defined a controller for the body of the page. `

` The [ng-controller](http://docs.angularjs.org/#!/api/ng.directive:ngController) attribute is how Angular basically scopes your page. So my AppCtrl will be good for anything inside the body of the page. If that doesn't quite click, it will after you use it a couple of times.

This controller is fairly simple. It creates a new map and attaches is to the $scope of my module. ` define([ 'angular', 'esri/map' ], function (angular, Map) {

function mapConfigs() { return { basemap: 'streets', center: [-118.1704035141802, 34.03597014510993], zoom: 15 }; }

function mapGen(elem) { return new Map(elem, mapConfigs()); }

function AppController($scope) { $scope.map = mapGen('map'); }

function init(App) { App.controller('AppCtrl', ['$scope', AppController]); return AppController; }

return { start: init };

}); `

Notice how I create the controller. ` App.controller('AppCtrl', ['$scope', AppController]); ` This is important in particular when you minify your JavaScript files as minification renaming schemes can and will break your application, so trust me, do it this way.

## It's all just widgets anyway

The next step is to load up a widget. I have gotten into the habit of creating parts of my applications as widgets. It could be an editing widget, a label widget or a search widget. I basically group the [Directive](http://docs.angularjs.org/#!/guide/directive), the [Controller](http://docs.angularjs.org/#!/guide/dev_guide.mvc.understanding_controller#!) and the [Service](http://docs.angularjs.org/#!/guide/dev_guide.services.creating_services) under a single directory. I felt a little better about doing this after seeing [others do it too](http://joelhooks.com/blog/2013/05/22/lessons-learned-kicking-off-an-angularjs-project/). For each widget, I make it's own bootstrap module. This makes it simpler for me to come back and edit the bootstrap later on and keeps my main bootstrap module a lot cleaner. In this case I made a [SearchBootstrap](https://github.com/odoe/angular-esri/blob/master/js/widgets/search/SearchBootstrap.js) module for my search widget.

**The Service** Let's look at the [service](https://github.com/odoe/angular-esri/blob/master/js/widgets/search/Search.js) being used for the search widget. ` define([ 'dojo/_base/lang', 'esri/tasks/QueryTask', 'esri/tasks/query' ], function (lang, QueryTask, Query) {

var url = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5', qTask = new QueryTask(url);

function queryGen(params) { return lang.mixin(new Query(), params); }

function stateQuery(name, sr) { return queryGen({ where: ["STATE_NAME LIKE '%", name, "%'"].join(''), outFields: ['\*'], returnGeometry: true, outSpatialReference: sr }); }

function SearchService($q) {

return { getState: function (name, sr) { var deferred = $q.defer(); qTask.execute(stateQuery(name, sr)).then( function (featureSet) { deferred.resolve(featureSet); }, function (error) { deferred.reject(error); }); return deferred.promise; } };

}

function init(App) { App.factory('SearchSrvc', ['$q', SearchService]); return SearchService; }

return { start: init };

}); `

One thing to understand about services in Angular is that _they are a singleton_, so there will only ever be one of them. Because of this, I would advise against trying to keep some sort of incremental count in your service as it may not behave as expected if you use it in different controllers. This basic service uses a [QueryTask](https://developers.arcgis.com/en/javascript/jsapi/querytask-amd.html), but could have easily used a [FindTask](https://developers.arcgis.com/en/javascript/jsapi/findtask-amd.html) to do the searching.

**The Promise** You may notice I am using a [$q](http://docs.angularjs.org/#!/api/ng.$q) property to create a promise. This is an Angular Promise, which is different from the [Promise API in Dojo](http://dojotoolkit.org/reference-guide/1.9/dojo/promise.html) or a [Dojo deferred](http://dojotoolkit.org/reference-guide/1.9/dojo/Deferred.html). I could have just used a callback in in the deferred object returned from the QueryTask execute method, but it would mean I would need to do an extra step after updating my $scope.items array in order for it to be reflected back into my application. This has to do with the [Angular scope digest cycle](http://docs.angularjs.org/#!/api/ng.$rootScope.Scope). [This](http://www.bennadel.com/blog/2449-Directive-Link-observe-And-watch-Functions-Execute-Inside-An-AngularJS-Context.htm) and [this](http://onehungrymind.com/notes-on-angularjs-scope-life-cycle/) are pretty good write-ups on the Angular digest cycle.

Now when that QueryTask is done it will resolve my promise and return the result to whatever controller may have called it. This is it's only job, so this is all it does.

**The Controller** Looking at the [SearchController](https://github.com/odoe/angular-esri/blob/master/js/widgets/search/SearchController.js), I have added a couple of methods to the scope. ` define([ 'dojo/_base/array', 'helpers/symbolhelper' ], function (array, sym) {

function mappedItems(feature) { return { label: feature.attributes.STATE_NAME, value: feature.attributes.STATE_NAME, feature: feature }; }

function handler(data, func) { return array.map(data, func); }

function setSymbol(graphic) { graphic.setSymbol(sym.polygonSymbol()); return graphic; }

function SeachController($scope, $log, SearchSrvc) { $scope.items = [{ label: '' }];

$scope.find = function (name) { $log.info('perform search in controller: ', name); SearchSrvc.getState(name, $scope.map.spatialReference) .then(function (featureSet) { $log.info('query results', featureSet); $scope.items = handler(featureSet.features, mappedItems); }); };

$scope.zoom = function (item) { $log.info('add to map and zoom', item); $scope.map.graphics.clear(); $scope.map.graphics.add(setSymbol(item.feature)); $scope.map.setExtent(item.feature.geometry.getExtent(), true); }; }

function init(App) { App.controller('SearchCtrl', ['$scope', '$log', 'SearchSrvc', SeachController]); return SeachController; }

return { start: init };

}); `

The find() function calls the service which Angular injects into my Controller. When the service is complete, it takes the returned result, formats it to be used in an auto-complete box we'll look at in a minute and also stores the graphic that was returned. The zoom() function is passed an item from the scope.items array and we add the graphic we saved in the item to the map and zoom to it. Using Angular we have been able to completely separate this functionality out from the rest of the application. The controller does not need to know who is calling it, it's their to do it's job and that's it.

**Hail the Directive!** The last piece is probably one of the coolest parts of Angular and that is the Directive. This is my [SearchDirective](https://github.com/odoe/angular-esri/blob/master/js/widgets/search/SearchDirective.js).

` define([ 'dojo/_base/array', 'text!widgets/search/template/search.tpl.html' ], function (array, tpl) {

function head(t) { return t[0]; }

function matchedItem(items, val) { return head(array.filter(items, function (item) { return item.label === val; })); }

function SearchDirective($timeout, $log) { return { restrict: 'A', template: tpl, controller: 'SearchCtrl', link: function (scope, element) {

scope.$watch('selected', function (val) { if (val) { scope.zoom(matchedItem(scope.items, val)); } });

element.bind('keyup', function (e) { var term = e.target.value; if (term.length & gt; 0) { $log.info('search for something', term); scope.find(term); } else { $log.info('reset list of items'); scope.items.length = 0; } });

scope.getItems = function () { return $timeout(function () { $log.info('return items', scope.items); return scope.items; }, 300); }; } }; } `

There is a lot happening here, so I'll try to explain the pieces. An Angular directive can be [declared a few different ways](http://docs.angularjs.org/#!/guide/directive). You define this in the _restrict_ property. It can either be an element (E), an attribute (A), class (C), or a comment (M). I usually use attribute to avoid any weirdness with Internet Explorer. Next is the _template_, which I load from an [HTML file](https://github.com/odoe/angular-esri/blob/master/js/widgets/search/template/search.tpl.html) as plain text. The directive will compile this template and process any Angular data attributes it needs to. The _controller_ property lets me name the controller I want to use in this directive, again using that handy Angular dependency injection. The _link_ method is used to link functionality to the directive. In this case I am listening for a 'keyup' event in order to call the find() function on the controller. There is also a scope.$watch method in here that looks to see of the selected value changes in my auto-complete and then zooms to that value. I also use the Angular [$timeout](http://docs.angularjs.org/#!/api/ng.$timeout) to return the scope.items to the directive, just to give the service a little time to update the array.

**Results!** The results of all this can be seen [here](http://www.odoe.net/apps/angular-esri/). And for reference, all the [source code is here](https://github.com/odoe/angular-esri). _Edit - It's been pointed out that you have to Capitalize the first letter of a state for search to work correctly. I'll try to switch it out for a FindTask later on which should fix the issue._

## Mind blown

I would highly recommend all the resources I listed above to get familiar with AngularJS and using it in your ArcGIS API for JavaScript applications. I also have a [couple](http://shop.oreilly.com/product/0636920028055.do) of [books](http://www.manning.com/bford/) on hand I flip through to keep things fresh that are pretty good. A web search will yield plenty of results, but I recommend [Mr. Scott Allen's posts](http://odetocode.com/blogs/all) to get up to speed.

This post wasn't meant to be a full on AngularJS tutorial, but I wanted to present in the context of developers using the ArcGIS API to demonstrate that you don't need to be tied down to only using Dojo. I haven't even got into testing it yet which could be a hefty post on its own. I think being a former (currently a maintainer) Flex developer and [Robotlegs](http://www.robotlegs.org/) user, I feel pretty at home with Angular when it comes to dependency injection and the clear separation of responsibilities among my modules. I've got a couple of projects in use now built this way, a large one coming up and plenty of prototypes and I learn something new every time I run into a roadblock.

I've seen a few other ArcGIS JS developers out there talk about trying AngularJS in their apps and would love to see some code or get some input on how I'm doing things. I'm always in doubt, but ignorance is bliss.
