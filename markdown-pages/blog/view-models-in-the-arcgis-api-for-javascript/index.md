---
title: "View Models in the ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
date: "2019-02-10"
tags: geodev
coverImage: "view-models.jpg"
---

The [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/index.html) has powerful support for [ArcGIS Platform](https://developers.arcgis.com/labs/what-is-arcgis/) features like geocoding, printing, directions and more. Most of these capabilities are exposed via the out-of-the-box widgets provided with the API. This makes it really easy for you as a developer to integrate these features into your own applications so you can focus on the bits that make your application awesome without having to reinvent the wheel!

Now if you wanted to work with some of these platform features on your own, you could usually handle this via some of the tasks modules provided in the API. There is a [RouteTask](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-RouteTask.html) for directions, a [PrintTask](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-PrintTask.html) for printing, a [Locator](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-Locator.html) for geocoding, and more. These are the low-level tasks used in the widgets and they are incredibly powerful tools. The provide some fine-grained control you might need for an advanced application... or maybe you need something in-between. You don't need a full blow widget, but you don't need the low-level flexibility of the tasks either.

That's where the ViewModels in the API can help. A ViewModel in the API is just a model for the widget view. It handles all the business logic and communication with a given map or scene view if needed. You could build your own [custom widgets](https://odoe.net/blog/view-models-in-arcgis-js-api/) with them if you wanted. But they also present an opportunity for you to do some cool stuff with little configuration.

Let's take a look at the [Search View Model](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search-SearchViewModel.html). Assume I have a requirement in my application that when I click on the map, I want to reverse geocode where I clicked. I could instantiate a SearchViewModel and use it's built in [search](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search-SearchViewModel.html#search) function to do exactly this.

```js
const searchVM = new SearchViewModel({ view });

view.on("click", (event) => {
  searchVM.search(event.mapPoint);
});
```

Using the ViewModel like this, I can now simply click on the map and I'll automatically get a popup with geocoded information. Here is a sample of this application in action.

https://codepen.io/odoe/pen/omqGMe?editors=0010

Now that's pretty cool right? I didn't have to configure a Locator, create any parameters or get any more detailed than I needed for this simple task.

Let's think of another one. Maybe I don't need a full-blow [Print widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Print.html). My boss just wants a print button, nothing fancy, no fooling around. I can use the [Print View Model](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Print-PrintViewModel.html) to do this with minimal work. It has one function, [print](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Print-PrintViewModel.html#print). _Can't go wrong with that_. I can add a button to my application and when that button is clicked, just print my map.

```js
const printVM = new PrintViewModel({
  view,
  printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
});

printBtn.addEventListener("click", () => {
  printVM.print()
    .then(response => {
      window.open(response.url, "_blank");
    })
    .catch(error => console.warn(error));
});
```

Now a user can save this image to their local machine and embed it in a report, pretty much do whatever they want. You can see it in action below.

https://codepen.io/odoe/pen/OdvxjE?editors=0010

It's pretty straightforward, and if you need to adjust the size of the print or anything else, you can pass a [PrintTemplate](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-PrintTemplate.html) to the print function.

There's plenty more you can do with View Models in your applications. You could even use the [Directions View Model](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions-DirectionsViewModel.html) for routing using the aptly named [getDirections](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions-DirectionsViewModel.html#getDirections) method!

The ArcGIS API for JavaScript can be used to get pretty low-level for times you really need those advanced features, or you can take advantage of tools like View Models that wrap up some of that advanced functionality and makes these tasks even simpler.

Have fun and build some awesome mapping applications!
