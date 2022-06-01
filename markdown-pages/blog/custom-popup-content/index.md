---
title: "ArcGIS Popups CustomContent"
description: "Using CustomContent with the ArcGIS API for JavaScript"
published: false
author: Rene Rubalcava
date: 2022-06-01T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## Pop it up

I've always maintained that probably the most used widget in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/) is the Popup. _Aside from zoom..._ You're first instinct when you see a web map with features it try and click on them. Legends are great, and visualizations are incredibly powerful at telling a story with your data, but sometimes you just want info about a particular feature or location. This is where the Popup shines!

By default, the Popup will usually show you tabular information about the feature attributes. Quick, simple, and to the point. You could have charts, attachment information, even use Arcade expressions in your Popups. I highly recommend you take advantage of the [MapViewer](https://doc.arcgis.com/en/arcgis-online/create-maps/configure-pop-ups-mv.htm) to author your Popups. This way you get a real-time experience of what your Popups will look like. But, that doesn't mean you can't get a little creative building custom content for your popups. _Let's have some fun._

## Do what you want

As discussed, there are [various types of content](https://developers.arcgis.com/javascript/latest/api-reference/esri-popup-content-Content.html) you can use in Popups.The most interesting one for developers might be [CustomContent](https://developers.arcgis.com/javascript/latest/api-reference/esri-popup-content-CustomContent.html). Using CustomContent, you can return an HTML element, a widget, a string, anything that can be displayed. It also supports Promises, so you can execute numerous asynchronous tasks before returning the content. [This sample](https://developers.arcgis.com/javascript/latest/sample-code/popup-customcontent/) does a great job showing how you can run some statistics in the Popup and return a Search widget. Are you following me? _A widget in your Popup!_ You could even load another Map or Scene in the Popup if you want.

Maybe you would like to display weather information about the location for your Popup. There is a _completely free_ [weather API](https://www.weather.gov/documentation/services-web-api) you can use from the National Weather Service for something like this. You can get the coordinates from the graphic for your Popup and use it query the weather API to get a forecast of weather information.

> The code for this blog post is available on [codepen](https://codepen.io/odoe/pen/zYREygo?editors=1010)

Let's assume I have a FeatureLayer of cities, which is a pretty good use case for displaying some weather information. I might want to show both the tabular information for a single field, and my custom content of weather forecasts. I could define my PopupTemplate like this.

```js
const layer = new FeatureLayer({
  popupTemplate: {
    title: "{NAME}",
    outFields: ["*"],
    content: [
      new FieldsContent({
        fieldInfos: [
          {
            fieldName: "POPULATION",
            label: "Population",
            format: {
              places: 0,
              digitSeparator: true,
            },
          },
        ],
      }),
      new CustomContent({
        creator: async ({ graphic }) => {
          const { latitude, longitude } = graphic.geometry;
          const response = await fetch(
            `https://api.weather.gov/points/${latitude},${longitude}`
          );
          const results = await response.json();
          const { forecast } = results.properties;
          const forecastResponse = await fetch(forecast);
          const data = await forecastResponse.json();
          const { periods } = data.properties;
          const element = document.createElement("div");
          let fragment = `<h3>Weather Forecast</h3><br/>`;
          for (let a of periods) {
            fragment += `
                <image width="36" height="36" src=${a.icon}><br/>
                <strong>Name</strong>: <span>${a.name}</span><br/>
                <strong>Forecast</strong>: <span>${a.shortForecast}</span><br/>
                <strong>Temp</strong>: <span>${a.temperature}${a.temperatureUnit}</span><br/>
                <strong>Wind</strong>: <span>${a.windSpeed}, ${a.windDirection}</span><br/>
                <hr/>
            `;
          }
          element.innerHTML = fragment;
          return element;
        },
      }),
    ],
  },
  ...
});
```

Ok, let's take a step back here. We have an array for the `popupTemplate.content` that contains a `FieldsContent` and a `CustomContent`.

```js
new FieldsContent({
    fieldInfos: [
        {
        fieldName: "POPULATION",
        label: "Population",
        format: {
            places: 0,
            digitSeparator: true,
        },
        },
    ],
})
```

This will display a single `Population` field in tabular form. This is pretty simple. Let's take a look at the `CustomContent`.

```js
new CustomContent({
    creator: async ({ graphic }) => {
        const { latitude, longitude } = graphic.geometry;
        const response = await fetch(
          `https://api.weather.gov/points/${latitude},${longitude}`
        );
        const results = await response.json();
        const { forecast } = results.properties;
        const forecastResponse = await fetch(forecast);
        const data = await forecastResponse.json();
        const { periods } = data.properties;
        const element = document.createElement("div");
        let fragment = `<h3>Weather Forecast</h3><br/>`;
        for (let a of periods) {
        fragment += `
            <image width="36" height="36" src=${a.icon}><br/>
            <strong>Name</strong>: <span>${a.name}</span><br/>
            <strong>Forecast</strong>: <span>${a.shortForecast}</span><br/>
            <strong>Temp</strong>: <span>${a.temperature}${a.temperatureUnit}</span><br/>
            <strong>Wind</strong>: <span>${a.windSpeed}, ${a.windDirection}</span><br/>
            <hr/>
        `;
        }
        element.innerHTML = fragment;
        return element;
    },
})
```

The key here is using the `creator` method as an async function so that some data can be fetched from the weather API. We can pluck the latitude and longitude off the graphic geometry. Once we get the initial results from the weather API for this location, that result will provide various URLs for more detailed weather information such as the _forecast_ URL. We can send another request to the forecast URL and get a more detailed five day forecast for day and night weather information. It will even provide an icon that coincides with the weather conditions. We can use this information to construct a list of HTML elements to display in the Popup. You should get a Popup that looks similar to this!

[![Weather Popup](images/weather-popup.png)]

## Summary

At the end of the day, you can pretty much use whatever you want inside CustomContent for a Popup. Maybe you have some custom chart requirements, or want to run an analysis on nearby features. That's the beauty of using CustomContent, you can do whatever you need to do. I'm very curious to see what some developers might build with this, maybe even entire micro apps inside the Popup to process data!

You can see more details in the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/I2XMRxoWcZA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

