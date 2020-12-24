---
title: "Dojo 2 and Web Components"
published: true
author: Rene Rubalcava
date: "2017-09-28"
tags: geodev
coverImage: "dojo2-comps.jpg"
---

I've talked before about how I'm excited about the upcoming [Dojo 2](https://dojo.io/) official release. They've added some nice updates to the [tutorials pages](https://dojo.io/tutorials/), which are really cool!

One of the features I'm excited about revolves around the [dojo-cli](https://github.com/dojo/cli), which adds new scaffolding and build tools. I recommend the tutorials to get familar with those, but one awesome feature is hidden away in the `widget-core` doc and that is on exporting your widgets to [web-components](https://github.com/dojo/widget-core#web-components).

This is an awesome feature because it lets you write your widget with the `widget-core` tooling and then use the cli to export it to a web-compoent that can be used on any page or application you want without _having to import the dojo libs yourself_. The code runs and executes on it's own and will just work where you put it. You can drop it on any page and you're good to go.

You can find the repo for the demo app [here](https://github.com/odoe/dojo2-web-component).

Here is what my widget source code looks like.

```js
import { v } from '@dojo/widget-core/d';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/TwitterShare.m.css';

export interface TwitterProperties {
  handle: string;
}

@theme(css)
export class TwitterShare extends ThemeableMixin(WidgetBase)<TwitterProperties> {

  tweet() {
    window.open(`https://twitter.com/intent/tweet?text=Check out this awesome site at ${location.href} from ${this.properties.handle}`, '_blank');
  }

  protected render() {
    return v(
      'button',
      {
        classes: this.classes(css.twitterShareButton),
        onclick: this.tweet
      },
      ['Tweet Me!']
    );
  }
}

export default TwitterShare;

```

Then in the repo run the command...

```bash
dojo build --element=src/createTwitterShareElement.ts
```

_And you can now use this component in your web page like this_.

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- this will include all JS and CSS used by your widget -->
        <script src="https://rawgit.com/webcomponents/custom-elements/master/src/native-shim.js"></script>
        <link rel="import" href="./twitter-share/twitter-share.html" />
    </head>
    <body>
        <!-- this will actually create your widget -->
        <twitter-share id="twitter" handle="@odoenet"></twitter-share>
    </body>
</html>
```

That is pretty amazing! I'm a fan and really love this feature of the dojo-cli tooling.

Check out this video as I ~~stumble through~~ walk you through how I scaffolded the app, built the widget and exported it to a web component!

<iframe width="560" height="315" src="https://www.youtube.com/embed/bXvsGhNkXXU" frameborder="0" allowfullscreen></iframe>
