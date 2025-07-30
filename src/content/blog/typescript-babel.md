---

title: Compile TypeScript with Babel
description: Do you like Babel? Do you like TypeScript? Have I got news for you!
published: true
author: Rene Rubalcava
pubDate: 2021-01-20T10:00:00.000Z
heroImage: '../../assets/blog/typescript-babel/images/cover.jpg'
tags: typescript, javascript
---

## Use TypeScript

I might be a little biased, but I'm a big fan of TypeScript. I use TypeScript, I
write about TypeScript, I speak about TypeScript, you get the idea. I've also
used Babel quite a bit. Babel is more of a plug and play ecosystem. It can be
really simple, or have lots of configuration. You can target specific browser
capabilities and transformations, all in the name of optimization. That's cool.

Not too long ago, or 100 years ago in development time,
[you could start using Babel with TypeScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html).
You might want to use certain Babel plugins for your project, or you prefer how
Babel compiles to JavaScript, or multiple output targets. This let's you get the
best of both worlds. The one drawback to this workflow, is you lose type
checking in the build pipeline. You can still use `tsc` to check your types, but
Babel don't care. Besides, most editors, from VSCode to vim, will run tsserver
in the background and type check as you write your code anyway. Babel also
doesn't generate `.d.ts`, so this might not be the best workflow for library
projects, but building apps, knock yourself out.

## Getting Started

I would install a few basic packages to get started.

```bash
npm i typescript @babel/cli @babel/core @babel/preset-env @babel/preset-typescript
```

Now, I'm going to want to use webpack and the ArcGIS JSAPI for my app.

```bash
npm i @arcgis/core webpack webpack-cli webpack-dev-server @arcgis/webpack-plugin babel-loader html-webpack-plugin css-loader mini-css-extract-plugin
```

This is stuff you would most likely use for a very basic project, not just
spitting out JavaScript.

A basic `tsconfig.json` might look like this.

```json
{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true
  },
  "include": [
    "src/"
  ]
}
```

This won't emit any files, it will just pass the results to Babel and let Babel
go nuts. Now let's get a `webpack.config.js`.

```js
// webpack.config.js
const ArcGISPlugin = require("@arcgis/webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = function build(env, arg) {
  const config = {
    entry: {
      index: ["./src/index.ts"],
    },
    output: {
      path: path.join(__dirname, "dist"),
      chunkFilename: "chunks/[id].js",
      publicPath: "",
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3001,
      writeToDisk: true,
    },
    mode: arg.mode,
    devtool: "source-map",
    module: {
      rules: [
        // let babel transform typescript
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[id].css",
      }),

      new ArcGISPlugin(),

      new HtmlWebPackPlugin({
        title: "ArcGIS Template Application",
        template: "src/index.html",
        filename: "index.html",
      }),
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, "/src"),
        path.resolve(__dirname, "node_modules/"),
      ],
      extensions: [".ts", ".tsx", ".js", ".css"],
    },
  };

  return config;
};
```

Okay, okay, there's a lot going on here. But not really. The important bits are
in the module section.

```js
module: {
    rules: [
        // let babel transform typescript
        {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        ...
    ],
},
```

I could probably just post that. But then I would get messages that I should
provide the whole config. So... there you go. This basically tells webpack,
_when you come across a `.ts` or `.tsx` file, load it with the `babel-loader`_.

What's Babel going to do though? We can set that up in a `.babelrc` or directly
in the `package.json`, which is my preference.

```json
{
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-typescript"
    ]
  }
}
```

If you happen to do something like, use classes or async/await, you'll need to
add some plugins or helpers. Babel is pretty good about giving you build errors
when it comes across some code that requires something extra.

My `index.ts` is pretty simple.

```ts
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import "./index.css";

const map = new ArcGISMap({
  basemap: "streets-vector",
});

const view = new MapView({
  map,
  container: "viewDiv",
});

view.when(() => {
  console.log("view ready");
});
```

At this point, I can build the app and everything works. Now you can try adding
a [browserlist](https://github.com/browserslist/browserslist) to your project,
and Babel will recognize it. This could help you do a bit of optimization for
your app to remove stuff not needed for newer browsers. I have a
[sample project here](https://github.com/odoe/ts-babel-webpack) that also
includes eslint and prettier.

You can watch a video where I walk through these steps below!

<lite-youtube videoid="c9iAWw9oqK4"></lite-youtube>
