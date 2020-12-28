---
title: "ArcGIS JS API with TypeScript and Babel"
published: true
author: Rene Rubalcava
date: "2019-08-29"
tags: geodev, typescript
coverImage: "arcgis-ts-babel.jpg"
---

Last year, the TypeScript team had [announced](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/) that they collaborated with the [Babel](https://babeljs.io/) team to make using TypeScript with Babel easier! At the time, I had tried using the TypeScript to Babel workflow to build some ArcGIS API for JavaScript apps. I had initially run into some issues mainly with some of the babel plugins using node globals, which are neither here nor there. But, on a whim, I decided to try it again recently, and was pleasantly surprised to find that it works!

## Get Started

To test this out, I used the [@arcgis/cli](https://github.com/Esri/arcgis-js-cli) to scaffold a React application.

arcgis create jsapi-ts-babel -t react

## package.json

Once that was done, I had to start making some modifications. First thing I had to do was install the required babel modules.

```json
// package.json 
{
   "name": "jsapi-ts-babel",
   "version": "1.0.0",
   "devDependencies": {
+    "@babel/cli": "^7.2.3",
+    "@babel/core": "^7.4.0",
+    "@babel/plugin-proposal-class-properties": "^7.4.0",
+    "@babel/plugin-proposal-decorators": "^7.4.4",
+    "@babel/plugin-proposal-numeric-separator": "^7.2.0",
+    "@babel/plugin-proposal-object-rest-spread": "^7.4.0",
+    "@babel/plugin-transform-modules-amd": "^7.5.0",
+    "@babel/plugin-transform-react-jsx": "^7.3.0",
+    "@babel/preset-env": "^7.4.1",
+    "@babel/preset-typescript": "^7.3.3",
     "@testing-library/react": "^9.1.3",
     "@types/arcgis-js-api": "~4.12.0",
     "@types/react": "^16.8.2",
     "@types/react-dom": "^16.8.0",
     "@types/sinon": "^7.0.11",
     "@typescript-eslint/eslint-plugin": "^1.7.0",
     "@typescript-eslint/parser": "^1.7.0",
+    "babel-loader": "^8.0.4",
 ...
   "dependencies": {
     "@arcgis/webpack-plugin": "~4.12.1",
     "react": "^16.8.1",
- "react-dom": "^16.8.1"
+    "react-dom": "^16.8.1",
+    "regenerator-runtime": "^0.13.3"
   },
```

## webpack config

With the babel dependencies installed, I needed to make some changes to my webpack configuration.

```js
// webpack.config.js 
module.exports = function(_, arg) {
     const config = {
         entry: {
- index: ['@dojo/framework/shim/Promise', './src/css/main.scss', './src/worker-config.ts', './src/index.tsx'],
+            index: ['regenerator-runtime', '@dojo/framework/shim/Promise', './src/css/main.scss', './src/worker-config.ts', './src/index.tsx'],
         },
         output: {
             filename: '[name].[chunkhash].js',
@@ -44,10 +44,8 @@ module.exports = function(_, arg) {
             rules: [
                 {
                     test: /\\.tsx?$/,
- loader: 'ts-loader',
- options: {
- transpileOnly: true,
- },
+                    exclude: /node_modules/,
+                    loader: 'babel-loader'
                 },
                 {
                     test: /\\.html$/,
```

I need to add the regenerator-runtime as a dependency to the webpack build and also tell webpack to use babel-loader to load the TypeScript files now.

## tsconfig

In order for babel to be able to compile the TypeScript files, we need to let TypeScript output esnext JavaScript code. This is going to transpile our TypeScript to modern JavaScript and validate typings.

```json
// tsconfig.json
 {
   "compilerOptions": {
     "lib": ["dom", "es2015.promise", "es5", "es6"],
- "target": "es5",
- "module": "amd",
+    "module": "esnext",
+    "target": "esnext",
     "noImplicitAny": true,
     "removeComments": true,
     "jsx": "react",
```

Ok, we are almost there!

## babel

The last step is to set up babel with the correct presets and plugins. For that we can create a .babelrc file that babel will read when it compiles the TypeScript files.

```json
// .babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-modules-amd",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-react-jsx",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/proposal-class-properties", { "loose": true }]
  ]
}
```

We are going to use the [@babel/preset-env,](https://babeljs.io/docs/en/babel-preset-env) which is smart preset to transform the JavaScript for browser support. You could specify legacy or specific browsers here if you want. The next important one is [@babel/typescript](https://babeljs.io/docs/en/babel-preset-typescript). This will let babel compile your typescript for you!

The plugins used are to handle some JavaScript features being used and to compile the output to amd modules for the [@arcgis/webpack-plugin](https://github.com/Esri/arcgis-webpack-plugin).

## Build it

At this point, you can now build your application!

```bash
# development
npm start
# production
npm run build
```

Your application should now build like normal!

## Summary

You can find the demo application using babel with TypeScript [here](https://github.com/odoe/jsapi-babel-typescript).

This workflow is really intended for those developers that are comfortable with babel to build their apps, but are also interested in using TypeScript. I did not notice much of a difference in the size of the build output, even after trying to tweak some presets for evergreen browser support. But it's all about having choices, and now you have another build workflow choice! Enjoy and happy geohacking!
