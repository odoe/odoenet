---

title: Draggable ScaleBar in ArcGIS API for JavaScript
description: Ever wanted to just drag your ScaleBar around your map? You will now!
published: true
author: Rene Rubalcava
pubDate: 2022-10-12T10:00:00.000Z
heroImage: '../../assets/blog/draggable-scalebar/images/cover.jpg'
tags: geodev, javascript
---

## Scale it up

There are some standard things you might find on a web map. A legend, some form
of navigation tools, _attribution_, and yes... a
[scalebar](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-ScaleBar.html).
I'll admit, I usually think of a scalebar as something I would only want on a
printed map, but it does help provide some contexts in your webmaps as well. The
scalebar is interesting in an interactive map because as you navigate the map
without changing the scale, it _can_ change, depending on the spatial reference
you are using, typically as you navigate north and south. So it ocurred to me,
what if I could just drag the scalebar around my map and get some quick
measurements. I mean you have the
[measurement](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Measurement.html)
widget, but you do you boo.

## Writing a Custom Element

If I'm going to do something with some custom behavior, you better believe I'm
going to make a
[custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
The custom element is going to allow me to wrap content in a container that will
allow me to drag it around the page. Moving an element across a page require
some work listening to DOM events, not just on my own custom element, but the
window in general.

The first thing I want to do is create an anchor that I can use to drag the
container around. I can add this to the
[shadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot)
of my custom element.

```js
const template = document.createElement("template");
template.innerHTML = `
        <div class="drag-container-template">
            <slot></slot>
            <span class="drag-container__btn">
            <svg/></svg>
            </span>
        </div>`;
this.shadowRoot.appendChild(style);
this.shadowRoot.appendChild(template.content.cloneNode(true));
```

Next I need to start binding some events. I need to listen to a `mousedown`
event on the anchor to kick off the work I need to do to drag the element around
the page. Then I need to listen for window events to know where I am dragging
the mouse, and can move the element to.

```js
connectedCallback() {
    const button = this.shadowRoot.querySelector(".drag-container__btn");
    button.addEventListener("mousedown", this._onMouseDown.bind(this));
    window.addEventListener("mouseup", this._onMouseUp.bind(this));
    window.addEventListener("mousemove", this._onMouseMove.bind(this));
}

_onMouseDown() {
    this.mouseDown = true;
}

_onMouseUp() {
    this.mouseDown = false;
}

_onMouseMove(event) {
    if (this.mouseDown) {
        this.style.top = event.clientY - this.clientHeight + 10 + "px";
        this.style.left = event.clientX - this.clientWidth + 10 + "px";
        this.dispatchEvent(new CustomEvent("dragging"));
    }
}
```

You can see in this snippet here, I am managing some state here by toggling a
boolean `mouseDown` property on my element. Then depending on where the mouse is
on the `mousemove` event, I can update the `style.top` and `style.left` values
of the element to move it around the page. I know my anchor icon is `20px` in
height and width, so I use an offset of `10px` when I calculate it, so that my
cursor is in the middle of the anchor and not in the corner. This adds just a
little bit better of a user experience.

Here is the whole custom element.

```js
class DragContainer extends HTMLElement {
  constructor() {
    super();
    this.mouseDown = false;
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
    :host {
        width: max-content;
    }
    .drag-container-template {
        display: flex;
        align-items: center;
    }
    .drag-container__icon:hover {
        cursor: pointer;
        filter: 
        invert(0.5)
        saturate(6)
        brightness(1);
    }
    `;
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="drag-container-template">
    <slot></slot>
    <span class="drag-container__btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="drag-container__icon" width="20px" height="20px" viewBox="0 0 32 32"><path d="M16.5 29.8A13.3 13.3 0 1 0 3.2 16.5a13.3 13.3 0 0 0 13.3 13.3zm0-25.6A12.3 12.3 0 1 1 4.2 16.5 12.3 12.3 0 0 1 16.5 4.2zm0 20.6a8.3 8.3 0 1 1 8.3-8.3 8.309 8.309 0 0 1-8.3 8.3z"/><path fill="none" d="M0 0h32v32H0z"/></svg>
    </span>
    </div>`;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector(".drag-container__btn");
    button.addEventListener("mousedown", this._onMouseDown.bind(this));
    window.addEventListener("mouseup", this._onMouseUp.bind(this));
    window.addEventListener("mousemove", this._onMouseMove.bind(this));
  }

  disconnectedCallback() {
    const button = this.shadowRoot.querySelector(".drag-container__btn");
    button.removeEventListener("mousedown", this._onMouseDown.bind(this));
    window.removeEventListener("mouseup", this._onMouseUp.bind(this));
    window.removeEventListener("mousemove", this._onMouseMove.bind(this));
  }

  _onMouseDown() {
    this.mouseDown = true;
  }

  _onMouseUp() {
    this.mouseDown = false;
  }

  _onMouseMove(event) {
    if (this.mouseDown) {
      this.style.top = event.clientY - this.clientHeight + 10 + "px";
      this.style.left = event.clientX - this.clientWidth + 10 + "px";
      this.dispatchEvent(new CustomEvent("dragging"));
    }
  }
}

customElements.define("drag-container", DragContainer);
```

## Using the Custom Element

The beauty of custom elements is that they should be simple to use. I should be
able to just add it to the page, treat it like any other native DOM element, and
maybe listen to some events and interact with it. Not to say custom elements
can't be more complex, but from a user standpoint, I like simple.

```html
<div id="viewDiv">
    <drag-container>
        <div id="scalebar-container"></div>
    </drag-container>
</div>
```

```js
const map = new ArcGISMap({
  basemap: "gray-vector",
});

const view = new MapView({
  container: "viewDiv",
  map,
  zoom: 1,
});

view.when(() => {
  const scalebar = new ScaleBar({
    view,
    container: "scalebar-container",
  });
  // reference to custom element
  const drag = document.querySelector("drag-container");
  drag.addEventListener("dragging", () => {
    scalebar.renderNow();
  });

  view.ui.add(drag, "manual");
});
```

There's a little css sprinkled in here as well, but these are the key bits. At
this point, I can start dragging my scalebar around the map and you can watch it
change as it scurries around the map. You can view it in action
[here](https://codepen.io/odoe/pen/oNdmNBe?editors=0010).

## Summary

I know this blog post is about dragging the scalebar around the map, but it was
secretly about creating a draggable custom element. _Gotcha!_ You can use this
custom element with anything, doesn't even need to be a widget, but the idea
really did spring up from, _I want to drag the scalebar around the map_ and it
fits, because you can see the impact it has right away. This was a fun
experiment in building a custom element, and I hope it inspires you to give
custom elements a try.

You can watch a video on this topic below!

<lite-youtube videoid="rMtrROgtOo0"></lite-youtube>
