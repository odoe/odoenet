---
layout: "../../layouts/BlogPost.astro"
title: "Development Tools for ArcGIS API for JavaScript"
published: true
author: Rene Rubalcava
pubDate: "2015-09-07"
tags: geodev, dojo
coverImage: "esrijs-app-tools.png"
---

For the past few months, I have been using [ember-cli](http://www.ember-cli.com/) for some development projects. I even talked about [how you can use ember-cli with the ArcGIS API for JavaScript](http://odoe.net/blog/ember-with-arcgis-api-for-javascript/).

One of the things I really like about ember is the tooling it provides to developers. It's a great workflow. You just use the command-line to generate an app and it has other built in generators to develop other pieces of your application as you need them. Under the hood the ember-cli is powered by tons of node and [broccoli](https://github.com/broccolijs/broccoli).

So I had been thinking, why can't I do something similar with [Yeoman](http://yeoman.io/)? After all, it may be blasphemy, but ember-cli is like a beefed up Yeoman generator. So ok, I set out to build a Yeoman generator for ArcGIS API for JavaScript apps.

I had some basic goals for this generator.

- All code to be written in [ES6/ES2015](https://babeljs.io/docs/learn-es2015/)
- Testing built in
- Provide a Dojo build process
- Simple component structure
- Easy development workflow

## ES6/ES2015

There's hardly any reason you shouldn't be writing your code in ES6. Tools like [Babel](https://babeljs.io/) and [Traceur](https://github.com/google/traceur-compiler) make this an easy decision. It will compile down to whatever level of JavaScript you need for your browser support and you can even shim some more advanced features if you need them. Since this generator is using ES6/ES2015, it also includes [ESLint](http://eslint.org/) to help you write cleaner code. You're welcome.

## Testing

I just did a recent write up on [testing your code](https://geonet.esri.com/people/odoe/blog/2015/09/02/testing-your-code). So to help you a bit with that, [intern3](https://theintern.github.io/) is included as the default testing library. For every component you generate, you'll also get an accompanying unit test. I'd recommend reading over the [Sitepen blog](https://www.sitepen.com/blog/?s=intern) for more detailed intern info. By default, tests are written in [chai bdd style](http://chaijs.com/api/bdd/) with [sinon-chai](https://github.com/domenic/sinon-chai) for spies and mocks as needed. The generated app also includes a local [selenium](http://docs.seleniumhq.org/) driver so you can run functional tests locally without a [SauceLabs](http://saucelabs.com/) account if you want. For more info on functional tests, check out [intern recorder](https://www.sitepen.com/blog/2015/08/07/working-with-intern-recorder/). Functional tests can be run using **grunt e2e** in the command line.

## Dojo build process

For a long time, I found the [Dojo build process](http://dojotoolkit.org/documentation/tutorials/1.10/build/) to be this mysterious, difficult thing to grasp. When you get the basics down, it starts to fall into place and becomes simpler. It has a lot of options though and various settings that could be tweaked depending on what it is you want to do. I wanted to kind of simplify this for developers by setting up all the basics and keep the process as easy as possible.

The generator uses [grunt-dojo](https://github.com/phated/grunt-dojo) to execute the Dojo build. Here is a snippet from the provided Gruntfile. [gist](https://gist.github.com/odoe/fe04197e6dc33c2403ba)

And here is [a link to the build profile](https://github.com/odoe/esrijs-generator-demo/blob/master/profiles/build.profile.js). One of the important parts of the [profile](https://dojotoolkit.org/reference-guide/1.9/build/profiles.html) is the layers portion. [gist](https://gist.github.com/odoe/6f12053b7492d84d500f)

This is pretty much taken from [Tom Wayson's sample](https://github.com/tomwayson/esri-slurp-example). If you find that Dojo is still lazy-loading some files after the build process, you can add them the **include** section of the **layers** in the profile to include them in the single-file build. Also, if you really want that mythical single-file build, be sure to include any locales you need to support in the **includeLocales** list.

One more note on the Dojo build bits. When running the Dojo build via grunt use **grunt release --force**. There is something up with some files in the ArcGIS API not being recognized as AMD when using [grunt-esri-slurp](https://github.com/steveoh/grunt-esri-slurp) to add them to the project. I'm hoping to alleviate this issue _in the near future_. I'm working on it, I swear, sorry for the delays.

## Simple component structure

The output structure of the generated app is as follows.

```js
app/
...components/
...helpers/
...models/
...styles/
...templates/
......Application.html
......Application.js
...app.profile.js
...config.js
...main.js
...package.json
...router.js
```

So this structure is again very Ember-inspired. The _components_ folder is essentially where widgets would go. Each component has it's own _templates_ and _css_ folder and is defined by a _View.js_ file. Very standard structure. Except for the _Map_ component. This has a _MapView_ and _WebMap_ view you can use depending on whether or not you are creating a map from scratch or using a WebMap itemid to generate a map. This might change in the future.

The _helpers_ folder is basically where small helper utilities would go. The _models_ folder would be used for any common models used in your application. The generator utilizes [dmodel](https://github.com/SitePen/dmodel) for model generation. I'm still thinking through this. I'm not sure if models explicitly would be needed or if it would be better to have a _stores_ module using [dstore](http://dstorejs.io/). I've also implemented a _services_ folder in a couple of projects, so that might make it's way into the generator, although I have to think of a way to design it that would work for everyone.

There is a _styles_ folder for all the common css for your application. [Stylus](https://learnboost.github.io/stylus/) is used as the css preprocessor for the generated application.

The templates folder would contain global areas of your application. There is an _Application.html_ and _Application.js_ that are the base of the application. You may also want to put other files in here for multiple routes of your application. The dojo/router is used for routing in the generated app. I wrote more about it [here](http://odoe.net/blog/dojo-router-for-your-esri-javascript-maps/). I'm considering switching this out for a different routing library though to simplify passing model data around to routes.

The _main.js_ just wires the whole application together. The _config.js_ has various configuration bits of the application. I'm kind of moving away from the whole [configuration-based widget generation](https://github.com/odoe/esri-js-starterkit) that I have done in the past. Mainly due to every application needing slight tweaks to individual modules that requires forking a module and that this configuration based workflow requires more work in the build process. I'm a bit on the fence on this one, but for now I think the generator is best without it. The _app.profile.js_ and _package.json_ are used for the Dojo build process to define the _app_ folder as a package.

## Easy development workflow

Once you've installed Yeoman and other dependencies as needed you can use the generator to create your application.

**yo arcgis-js-app**

You'll be prompted for some basic info, such as what version of the ArcGIS JS API esri-slurp should download, name of project and your email address. It will then start the process of downloading all npm and bower dependencies and when done do an initial compile of your ES6 to a _dist_ folder. At this point you can run _grunt dev_ and it will start a local server where you can view your application at `http://localhost:8282/dist/`. It will automatically inject a [livereload](http://livereload.com/) script into your page so if you have it installed in your browser it will turn on without you needing to activate it. It's also set up so that as you make changes to your code, it will recompile your ES6 code to ES5 and livereload will reload your page. You can also view your tests at `http://localhost:8282/node_modules/intern/client.html?config=tests/intern`. I like to keep two browser windows open, one for my app, the other for my tests.

You can generate additional components by using **yo arcgis-js-app:components ComponentName**. As I said, it will add the component to your app and also add the tests to intern for the component.

Check out a demo application built using the generator [here on github](https://github.com/odoe/esrijs-generator-demo).

When you are ready to release, you can run **grunt release --force** and it will take a few minutes or so run the Dojo build process on your application. The build output will be a _release_ folder. The intermediate build is located in a _built_ folder. When the build is done it will automatically copy the _dojo/dojo.js_ file into the release folder as _app.js_. It will also use a new grunt plugin I wrote called [grunt-css-url-copy](https://github.com/odoe/grunt-css-url-copy) to scan the _app/styles/main.css_ file for all url references and copy them into a _release/resources_ folder. It will then create a _release/app.css_ with modified url references to point to the new _resources_ folder. The _index.html_ file copied into the release folder is modified to point to these new files and stripped of the _livereload_ script and _dojoConfig_, since the _dojoConfig_ is baked into the _app.js_ file during the build. This gives you the following folder structure for release.

```js
release/
...index.html
...app.css
...app.js
...resources/
```

This is all you need to deploy for your application. Rather than all the built files the Dojo build will generate. Remember, you need to include all locales you want to support into the build or it will try to lazy-load them as needed. If any other files are trying to be lazy-loaded, you can read back on the build section of this post to see how to add them to your build.

I'm thinking this is a good starting point for most people. I might try to offer some options during the generator portion on whether you want this single-file build or maybe a build where all the EsriJS/Dojo stuff is a _vendor.js_, your code is _app.js_. Or that could be left up to the user to decide after the fact.

## Conclusion

As you can see, you get a lot of simple to use tooling from this generator. I looked at other generators like the [generator-dojo-class](https://github.com/stdavis/generator-dojo-class) and [generator-dojo-widget](https://github.com/steveoh/generator-dojo-widget) as samples. I should point out, I had issues with the Dojo build process using empty nls files, so I removed them from the generator. These should probably be created by the developer anyway if they need them or I can include them with some dummy strings that I think will fix the build.

I'm hoping this generator can help simplify the workflow for developers that want to build [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) apps and also have all the tooling to help them build larger applications that can be easily deployed. If you have any feedback, want to contribute or have issues, please [fork and pull or submit issues](https://github.com/odoe/generator-arcgis-js-app). As the [ArcGIS JS API 4.0beta](https://developers.arcgis.com/javascript/beta/) progresses, I'll probably port the generator over to a newer version for 4.0. I'm very tempted to make it [TypeScript](http://www.typescriptlang.org/) by default, but I'll leave it as ES6... _for now_.
