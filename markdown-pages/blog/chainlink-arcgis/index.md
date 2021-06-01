---
title: "Chainlink and ArcGIS"
description: "How to integrate ArcGIS with Chainlink"
published: true
author: Rene Rubalcava
date: 2021-06-01T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript, blockchain
---

In a previous post, I talked about how you can create a [dapp app](https://odoe.net/blog/intro-blockchain) for use with the ArcGIS JSAPI. In that case were deploying a smart contract to track edits in a feature service. That barely scratches the surface of what you can do with smart contracts. A limitation of working with smart contracts is they can't access external data. They operate in isolation of the blockchain network that they're deployed. To work around that, we can use an [oracle](https://en.wikipedia.org/wiki/Blockchain_oracle).

Probably the most popular oracle is [Chainlink](https://chain.link/). Chainlink provides a decentralized network that allows us to write hybrid smart contracts. The smart contracts can ask the oracle to request external data and then provide the results back to the contract. This could be used to do just about anything, pull in price data, validate user information, check the weather, access external sensors, you name it, you can do it!

I won't go over the details of setting up a local Chainlink node, The [docs](https://docs.chain.link/docs/running-a-chainlink-node/) cover the steps in great detail.I would also recommend the following videos on getting set up.

* [Setup a Chainlink Node on the GCP](https://youtu.be/t9Uknfw27IU)
* [Building and Using External Adapters](https://youtu.be/65NhO5xxSZc)
* [Ultimate Customization with External Adapters](https://youtu.be/4i75Dqbhjvw)

## Custom API

Once the Chainlink node up and running, I can move on to building my own external API that does something. I wanted to implement a geofence API.I was thinking of something I would want to implement when I get my [IoTeX Pebble](https://iotex.io/pebble) in a couple of months. My simple API will take a latitude and longitude, and check a feature service to see if the coordinate is in a set of polygons. It's a fairly straightforward, yet practical use case. You can refer to an earlier blog post for details on using the [ArcGIS API for JavaScript with Node](https://odoe.net/blog/jsapi-node), but you could write your API in Python or other languages too.

```js
import adapter from '@chainlink/external-adapter';
const { Requester, Validator } = adapter;
import "cross-fetch/dist/node-polyfill.js";
import "abort-controller/polyfill.js";

import esriConfig from "@arcgis/core/config.js";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Point from '@arcgis/core/geometry/Point.js';

esriConfig.request.useIdentity = false;

const itemId = 'd373ca438b7a40ac80733458236d02be';

const layer = new FeatureLayer({
  portalItem: {
    id: itemId
  }
});

// Define custom parameters to be used by the adapter.
const customParams = {
  lat: ['y', 'lat', 'latitude'],
  lon: ['x', 'lon', 'longitude']
}

export const createRequest = async(input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const latitude = Number(validator.validated.data.lat);
  const longitude = Number(validator.validated.data.lon);

  await layer.load();
  const q = {
    returnGeometry: true,
    where: '1=1'
  };
  const { features } = await layer.queryFeatures(q);
  const point = new Point({ latitude, longitude });

  const isValid = features.some((feature) => {
    return feature.geometry.contains(point);
  });

  const response = {
    jobRunID,
    data: {
      result: isValid
    },
    status: 200
  };

  callback(response.status, Requester.success(jobRunID, response));
}
```

A cool feature here is the `Validator` allows me to use alternate names for the parameters, such as using `lat`, `y`, `latitude`, interchangeably. I could probably just send the point with the request and check if I had any results, but I wanted to show how you can do some work inside your API.

With my custom API set up, I can add it as [an external adapter using a bridge](https://docs.chain.link/docs/node-operators/) to my Chainlink node. With the bridge in place, I can add a new job that will use my bridged service, and expose it to other users of my node.

## Smart Contract

I can use [remix.ethereum](https://remix.ethereum.org/) to write a smart contract to use my Chainlink job. I based my contract of the basic [example shown here](https://docs.chain.link/docs/make-a-http-get-request/). I supply the smart contract with my oracle contract address and the corresponding job id of my custom job.

```java
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract GeoFence is ChainlinkClient {
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    bool public result;
    constructor() public {
        setPublicChainlinkToken();
        // my testnet oracle contract address
        oracle = 0x316eF679Ed7b5F5Dbe9e10bC426f0D1DE15Dbfc0;
        jobId = "a10807bdfaf54a3e9969b0cd4741ba65";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }
    
    /**
     * Initial request
     */
    function requestGeoFence(string memory _lat, string memory _lon) public {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillGeoFence.selector);
        req.add("lat", _lat);
        req.add("lon", _lon);
        sendChainlinkRequestTo(oracle, req, fee);
    }
    
    /**
     * Callback function
     */
    function fulfillGeoFence(bytes32 _requestId, bool _result) public recordChainlinkFulfillment(_requestId) {
        result = _result;
    }
}
```

The contract takes the `_lat`, and `_lon` and build a Chainlink request for them.

Once that's done, I can submit the transaction to my node. I'm going to lie, it's not exactly the fastest operation to send this request through the node for the transaction. This is where events in my contract would come in handy, so I can listen for the when the results are ready. But when it is, I can verify my result in remix to see if my coordinates in my geofence!

If you're interested in viewing these steps in more detail, check out the video below!

<iframe width="100%" height="350" src="https://www.youtube.com/embed/ZDSvQLoABTo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>