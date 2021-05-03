---
title: "Intro to Blockchain with ArcGIS JSAPI"
description: "An intro to working with blockchain in your ArcGIS JSAPI apps"
published: true
author: Rene Rubalcava
date: 2021-05-03T10:00:00.000Z
coverImage: "cover.jpg"
tags: geodev, javascript, blockchain
---

You've probably heard of [blockchain](https://en.wikipedia.org/wiki/Blockchain) and [web 3.0](https://ethdocs.org/en/latest/introduction/web3.html) in passing. A huge benefit of working with a blockchain like Ethereum, is the ability to create [Smart Contracts](https://en.wikipedia.org/wiki/Smart_contract). A smart contract is basically code on the blockchain defining how you interact with it. Once a contract is deployed, you can only interact with it based on how it was written. I won't go into details about use cases, but suffice to say, this brings a lot of utility to building decentralized applications.

So how could a developer use something like this with an ArcGIS API for JavaScript application? I'm sure there are a number of scenarios you could think up, but one of the most basic ways might be to document an edit transaction. The contract could store the editor, the location, timestamp, and the globalId of the edited feature. Honestly, I don't know how useful that really is, but it's basic and something to easily grasp.

## Tools

In order to build a decentralized app (Dapp), there are a number of libraries and tools available to developers. For myself, I like using the [Truffle Suite](https://www.trufflesuite.com/). I use [Ganache](https://www.trufflesuite.com/ganache) to load a local blockchain on my machine to deploy contracts to and perform transactions. It also provides a ton of fake Ethereum to make me feel like a baller. To compile and deploy this contracts, I can use the [truffle](https://www.trufflesuite.com/truffle) library in my apps. I also need a local wallet to perform transactions with the blockchain. For that, I use [MetaMask](https://metamask.io/). There are some other web wallets, but I'm used to this one. To interact with the wallet and perform transactions, I can use a library called [web3js](https://web3js.readthedocs.io/en/v1.3.4/).

With the core tools out of the way, I can move on to trying to write a contact.

## Smart'ish Contract

I like to prototype writing contracts using [remixe.ethereum](https://remix.ethereum.org/). It will let me compile and deploy your contract to a test blockchain so I can test out ideas and make sure the contract works as expected before I start writing my application. In this case, I'm going to write a basic contract that can be used to hold an asset, in my case, a location or pair of coordinates. I'll be using [Solidity](https://soliditylang.org/) to write the smart contract. You don't have to use Solidity, smart contracts can be written in a number of languages from JavaScript and C#, to Haskell. Solidity is just kind of a standard way to write smart contracts, and I think it's fairly easy to work with. Granted, I am a complete Solidity noob, so what do I know.

Let's look at a very basic smart contract to hold a latitude and longitude.

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GeoAsset {
    
    string globalId;
    address user;
    string public lat;
    string public lon;
    STATUSES public status;
    
    enum STATUSES {
        CREATED,
        COMPLETE
    }
    
    event Action (
        string name,
        address account,
        uint timestamp
    );
    
    constructor(string memory _lat, string memory _lon) public {
        user = msg.sender;
        status = STATUSES.CREATED;
        lat = _lat;
        lon = _lon;
        
        emit Action("CREATED", user, block.timestamp);
    }
    
    
    function update(string memory _globalId) public {
        require(msg.sender == user);
        require(status == STATUSES.CREATED);
        
        globalId = _globalId;
        status = STATUSES.COMPLETE;
        
        emit Action("COMPLETE", user, block.timestamp);
    }
}
```

Ok, let's cover the basics here. First thing you might notice here is that my lat/long are stored as strings?? What am I thinking? Solidity doesn't have a [type](https://docs.soliditylang.org/en/develop/types.html) for numeric decimals. It has other ways handle currency of tokens, but for simplicity sake, I'll just store them as strings. When the contract is created, I can pass it the lat/long and store them. I'll also update the status of the contract and store the `msg.sender`, which would be the person creating the contract. `msg` is a global you work with in Solidity. Then I can emit a custom event that I can listen for in an application if I want. I also have an `update` method that can be used to update the `globalId` and updates the `status`. Notice the `require` methods used here. This is how Solidity adds some validity checks, in this case, in order for this function to execute, the user of the contract must be the same one calling the function, and the status must also be `CREATED`. The will prevent someone hijacking the contract or a user making erroneous updates.

Once I've tested this out on remix, I can copy the code to my application and [compile it with truffle](https://www.trufflesuite.com/docs/truffle/getting-started/compiling-contracts). Now, how would I create, deploy, and interact with this contact in an application?

## web3 for you and me

I'm going to be using a simple [create-react-app](https://create-react-app.dev/) app to get started here. I won't get into detail on the ArcGIS JSAPI bits of this application, I have plenty of content out there on that, so let's focus on the smart contract part.

```js
import GeoAsset from './contracts/GeoAsset.json'
import Web3 from 'web3';
```

When truffle compiles my `.sol` file, it will create a JSON file holding all the important bits of how to create the contract in my application. I have a method set up to ask for permission to connect to my MetaMask wallet to interact with my smart contract.

```js
const loadWeb3 = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Please install metamask");
    return;
  }
  // asks for wallet permission
  window.ethereum.enable();
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const contract = new web3.eth.Contract(GeoAsset.abi);
  if (account) {
    setWeb3State({
      account,
      contract,
      web3,
    });
  }
};
```

This snippet of code will prompt the MetaMask wallet to connect to my application, get access to a current MetaMask account, and create an instance of my smart contract. The contract is not deployed at this point, I've basically created an instance I can use to deploy the contract later. I'm not sure this is ideally how I want to do it, but again, I'm still learning, so if anyone sees flaws here, please let me know.

I should also point out that my MetaMask wallet is using an account that was created with Ganache, so it's filled with fake Ethereum I can use to pay for transactions to my local blockchain.

So here is the workflow I am looking at for my smart contract.

* Click on the map to get a lat/long
* Deploy the contract with the collected lat/long
* Save the edits to the FeatureLayer
* Update the contract with the globalId from the success of my edit

What does that look like?

```js
const { contract, account, web3 } = web3State;

view.when(async () => {
  view.on("click", async ({ mapPoint }) => {
    const lat = mapPoint.latitude;
    const lon = mapPoint.longitude;

    let contractAddress;

    await contract
      .deploy({
        data: GeoAsset.bytecode,
        arguments: [lat.toString(), lon.toString()],
      })
      .send({
        from: account,
      })
      .once("receipt", async (receipt) => {
        // save address for later
        contractAddress = receipt.contractAddress;
      });

    // create contract
    const geoAsset = new web3.eth.Contract(GeoAsset.abi, contractAddress);

    const { addFeatureResults } = await layer.applyEdits({
      addFeatures: [
        {
          attributes: {
            IncidentType: 3,
            IncidentDescription: contractAddress,
          },
          geometry: {
            type: "point",
            latitude: lat,
            longitude: lon,
          },
        },
      ],
    });

    const { globalId } = addFeatureResults[0];
    await geoAsset.methods.update(globalId).send({
      from: account,
    });

    const latitude = await geoAsset.methods.lat().call();
    const longitude = await geoAsset.methods.lon().call();

    console.log("lat/lon", latitude, longitude);
  });
});
```

Ok, I know this is a lot to take in at once. I'm using the `contract.deploy()` method to deploy my contract to the blockchain with the data from my compiled contract, and passing the lat/long to it. Notice I then have to use the `send()` method and let the contact know it's coming from my current account. This will cost a transaction fee since I am interacting with the blockchain network. This is commonly referred to as a gas fee. On the live Ethereum network, depending on how congested the network is at the time, this could be costly. Any time I use the `send()` method, this is a transaction with costs associated. I can then wait for the `receipt` of this transaction and save the contract address.

After I perform my edit, I can retrieve the contract from the saved `contractAddress` and now I can use the `update()` method to update the globalId of the contract. Again, this is a transaction, so I need to pay a gas fee. When the contract has been updated, I can retrieve public properties, but instead of using the `send()` method, I can use the `call()` method. This is not a transaction, I'm just reading data from the contract, so there is no gas fee associated with this method.

That was a lot. If I were smart, I would probably write this contract in such a way to limit the number of transactions to cut down on the gas fees, but I really just wanted to demonstrate a workflow of using a smart contract in this kind of scenario.

## Summary

The code for this project can be [found on github](https://github.com/odoe/arcgis-simple-dapp).

Lately, I have become really interested in the technology of smart contracts and working with the blockchain. Most blockchain projects have to do with decentralized finance or something similar. But there are quite a few projects focused on asset management, internet of things, and more that I find have some interesting uses. [Foam](https://foam.space/) is a project that uses the blockchain for points of interest and networks. I don't know the current status of the project, but the frontend is written in PureScript and I think the backend is in Haskell, so I really dig that.

I should also point out that I've spent quite a few hours going over videos from [DappUniversity](https://www.dappuniversity.com/) on Youtube. It was a great start for me to get my feet wet in working with web3 and smart contracts.

I have some other ideas for stuff I want to try with smart contracts and using the ArcGIS API for JavaScript, so expect some more content like this in the future.

If you want to learn more about this Dapp in detail, check out my vide below.

<iframe width="100%" height="350" src="https://www.youtube.com/embed/0oQNvZvG43M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
