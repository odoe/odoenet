---
title: "Unit Testing with JSAPI"
description: "A quick look at how to write unit tests with the ArcGIS API for JavaScript"
published: false
author: Rene Rubalcava
date: 2022-02-22T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript
---

## Unit Tests

I'm a firm believer that shippable code should have some sort of testing component. That could be sanity tests, usability tests, and of course unit tests. I can sense the collective shrug of the readers now. I'm not the best at being consistent in this regard. One of the rules of [Extreme Programming](http://www.extremeprogramming.org/rules/testfirst.html), is to test driven development. I think it's a good practice to try it, maybe even start a project like that, you might be surprised. The reality of it is though, that sometimes, you need to get stuff done, tests fall to the wayside and you fall out of habit. That's ok, but if you are shipping code, you should at minimum add tests after you write code. Please.

There has been a long list of testing frameworks for JavaScript over the years, but one of the most popular today is probably [Jest](https://jestjs.io/). I'll preface this at saying Jest isn't perfect, but no testing framework is. I do however like how Jest can handle mocking. All testing frameworks face the same issue today, working with a mix of CommonJS, and modern ES Modules. This is an issue beyond this post in the node space anyway, but you should know, it requires a little finesse on your part when setting up Jest.

## Setup

First step is to set up your project with Jest to work with ES Modules.

```js
// package.json
{
    "type": "module"
}
```

This is going to let your local node installation know to treat `.js` files as ESM. If not, you'd have to use the `.mjs` extension for stuff, and I just don't feel like it. Jest has [experimental ESM support](https://jestjs.io/docs/ecmascript-modules), but I've always had something go wrong or fail for some other reason. Then I found [this gist](https://gist.github.com/rstacruz/511f43265de4939f6ca729a3df7b001c) someone posted. This cleared up a lot of issues for me, so big props to [Rico Sta. Cruz](https://github.com/rstacruz) for this one.

```js
// jesgt.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.*\\.(tsx?|js)$': 'ts-jest', // let ts-jest load external JS
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transformIgnorePatterns: ['/(?!(@arcgis|@esri|@stencil|@popperjs)/)'],
  moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFiles: ['./jest.setup.js'],
};
```

In the Jest configuration, I'm letting `ts-jest` process the `.js` files into Jest for me. This gets passed the ESM/CommonJS issues that typically show up. Recently, I have also had to add a Jest setup file to handle some global mocking.

```js
// jest.setup.js
// global mocks
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
```

Since we're on the subject of mocks, let's dive in a little more here.

## Writing Tests

Considering that [`@arcgis/core`](https://www.npmjs.com/package/@arcgis/core) is a pure ESM library, you have a couple of [options](https://jestjs.io/docs/mock-functions) to get it working with Jest. The first is using a `__mocks__` folder in your application. Honestly, this could get a little tedious, because you need to create a file and mock class/method for each module you use from the JSAPI. I tend to avoid this method if I can. But the other way is using `jest.mock('path/module/name')` to mock a module.

First thing I like to do when I'm working on something is write out some steps.

1. Write an `initialize` method to create the map and view
2. Add function to zoom to a location

So I might start writing my test like this.

```ts
// map.spec.ts
import * as map from './map'
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

jest.mock('@arcgis/core/Map')
jest.mock('@arcgis/core/views/MapView')

describe('data/map', () => {
    it('will initialize the map and view', async () => {
    })

    it('will zoom to a location', async () => {
    })
})
```

This is just some empty tests. So I'll create the module to test.

```ts
// map.ts
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

const app: any = {}

export async function initialize(container: HTMLDivElement) {
}

export function zoomToLocation(point: {type: string, x: number, y: number}) {
}
```

This is the basics of something I know I need. So I can continue with tests.

```ts
// map.spec.ts
...
describe('data/map', () => {
    it('will initialize the map and view', async () => {
        const container = document.createElement('div')
        await map.initialize(container)
        expect(ArcGISMap).toHaveBeenCalledTimes(1)
        expect(MapView).toHaveBeenCalledTimes(1)
    })

    it('will zoom to a location', async () => {
    })
})
```

I've written the test to show what I expect to happen. When I call the `map.initialize()` method, I should instantiate both `ArcGISMap` and the `MapView` classes. This test will currently fail, so now I can make it pass.

```ts
// map.ts
..
export async function initialize(container: HTMLDivElement) {
    const map = new ArcGISMap({
        basemap: 'streets-vector'
    })
    const view = new MapView({
        container,
        map,
        center: [-118, 34],
    })
    app.view = view
    return view
}
...
```

Now, this test will pass. I have tested that those classes were instantiated, but the details aren't really important to me. I just know I wanted to create a map and view. I don't need to test that anything about the Map and the View work in a certain way, because that's not my code. I'm sure this is a rule somewhere, but you don't test third-party code, just your code and how it might interact with that third-party code. This is where mocks for the next test come in.

For the next test, I want a function that will zoom the view for me. The MapView has a `goTo()` method, so I just want to check that my code will call that method with what I want.

```ts
// map.spec.ts
const mock_goTo = jest.fn()

import * as map from './map'
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

jest.mock('@arcgis/core/Map')
jest.mock('@arcgis/core/views/MapView', () => {
	return jest.fn().mockImplementation(() => {
		return {
			goTo: mock_goTo
		}
	})
})

describe('data/map', () => {
    ...
    it('will zoom to a location', async () => {
        const container = document.createElement('div')
        await map.initialize(container)
        const point = {
            type: 'point',
            x: 65,
            y: 65
        }
        map.zoomToLocation(point)
        expect(mock_goTo).toHaveBeenCalledWith({
            target: point
        })
    })
})
```

For this test, I create a `mock_goTo` method. Don't give me crap about the snake case, for mocks, it makes sense to me. I have to place it at the top of the file, because `jest.mock()` calls are hoisted to the top of the file by Jest, so if my mock declarations aren't manually at the top, it fails. This is one of those little gotchas of writing tests, _it is what it is_.

In order for this method to work as expected, I call the initialize method, then I call my `zoomToLocation()`. I expect that this method will call the `view.goTo()` with the `point` I pass to it. Now, I can make this test pass.

```ts
// map.ts
..
export function zoomToLocation(point: {type: string, x: number, y: number}) {
    app.view.goTo({
        target: point
    })
}
```

Awesome! Now my test will pass. Normally, you follow the pattern of red, green, refactor. I didn't really demonstrate the refactor part too much here, but my code was fairly simple to begin with. You could typically get your tests passing via the simplest steps possible, then refactor to refine your code while keeping the tests passing along the way.

## Summary

You don't need to test every little detail of your application and every single line of code. Tests are your guide, and your insurance policy against your future self from breaking stuff. I've broken lots of things, many of which could have been caught with better tests. So make sure you test the write stuff. It might not be glamorous work, but it's valuable, and a skill I think all devs should work on.

For more info, you can check out the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/mFESI6VHkfI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
