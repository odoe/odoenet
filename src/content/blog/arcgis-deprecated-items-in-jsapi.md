---

title: Identify Deprecated Items with ArcGIS JSAPI
description: You might want to let users of your applications know if a layer in
  the application has been deprecated. I'll show you how.
published: true
author: Rene Rubalcava
pubDate: 2020-12-30T12:00:00.000Z
heroImage: '../../assets/blog/arcgis-deprecated-items-in-jsapi/images/jsapi-deprecated.jpg'
tags: geodev
---

## What are deprecated items

When you build an app on the
[ArcGIS Online Platform](https://www.esri.com/en-us/arcgis/products/arcgis-online/overview),
you not only get to use data that _you_ publish, but also data _others_ publish.
There's a wealth of awesome curated data in the
[Living Atlas](https://livingatlas.arcgis.com/), and it's exciting to have
access to everything at your fingertips. However, sometimes, data becomes
[deprecated](https://enterprise.arcgis.com/en/portal/latest/use/item-details.htm#ESRI_SECTION3_5B0AA740695F424792447B4D1B600B27)
for various reasons, either new data is published as a new item, or some other
reason unbeknownst to me. Whatever the reason, when the item is marked as
deprecated, and you are using it in an application, it would be cool to figure
that out. If you're lucky, they added `deprecated` to the title. Sometimes, they
don't.

## Do what you need to do

First thing you need to know is that when an item has been deprecated, it's
added as a tag to the item. That means you can check the
[`tags`](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalItem.html#tags)
property of the portal item. Any webmap or layer that was created from a portal
item will have a
[`.portalItem`](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalItem.html)
property. That means you can check the tags to see if it's been deprecated.

```js
if (layer.portalItem && layer.portalItem.tags.includes("deprecated")) {
  // do something
  // let the user know
  // set off an alarm
}
```

You can decide how you want to let your users know if an item is deprecated, but
if I may. The
[LayerList](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList.html)
widget offers a unique and user-friendly way to do something like this. You can
customize the
[ListItem](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList-ListItem.html)
via the
[ListItemPanel](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList-ListItemPanel.html)
to add some custom UI elements. This is done by add a
[`listItemCreated`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList.html#listItemCreatedFunction).
You can look at
[this sample](https://developers.arcgis.com/javascript/latest/sample-code/widgets-layerlist-actions/index.html)
to how it's used to add custom actions.

You can modify this sample to add a deprecation notice too!

```js
const layerList = new LayerList({
    view: view,
    listItemCreatedFunction: defineActions
});

// Creates actions in the LayerList
function defineActions(event) {
    const item = event.item;

    ...

    if (event.item.layer.portalItem) {
        if (event.item.layer.portalItem.tags.includes("deprecated")) {
            const elem = document.createElement("div");
            elem.classList.add("error");
            elem.classList.add("message");
            elem.innerText = "Item Deprecated";
            item.panel = {
                content: elem,
                className: "esri-icon-notice-triangle error"
            };
        }
    }
}
```

This will add a warning icon to the LayerList and a message about the deprecated
item. That's pretty cool right!

I think this is a pretty straightforward way to let users know about deprecated
items that might show up in your apps. Of course, they can now contact _you_ and
_you_ can update the data in your app! It's a win-win for everyone!

## Try it yourself

You can view a demo of how this works below.

<iframe height="500" style="width: 100%;" scrolling="no" title="LayerList widget Show Deprecated" src="https://codepen.io/odoe/embed/preview/BaKeWbq?height=500&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/BaKeWbq'>LayerList widget Show Deprecated</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

And what do you know, I made a video about this too!

<lite-youtube videoid="HF_5gpcPoa8"></lite-youtube>

Enjoy!
