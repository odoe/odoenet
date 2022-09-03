---
layout: "../../layouts/BlogPost.astro"
title: "My Secret ArcGIS Identity"
description: "A look at how you can leverage Identity in ArcGIS API for JavaScript apps"
published: true
author: Rene Rubalcava
pubDate: 2022-07-29T10:00:00.000Z
coverImage: "cover.jpg"
tags: javascript, geodev
---

## Your Identity Matters

There will probably come a time when you are tasked to include private data in ArcGIS web mapping applications. There are different types of [Identity](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/arcgis-identity/) you can work with depending on your organization or account. I won't get into Developer Accounts and API Keys here, but I have [talked about that before](https://odoe.net/blog/api-keys). This workflow is for the organization devs that need use OAuth for their apps.

> The source for the code in this post can be found on [github](https://github.com/odoe/jsapi-identity).

## OAuth Flow

When working with the ArcGIS API for JavaScript, you're going to want to use the [IdentityManager](https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html). The IdentityManager is going to handle all your OAuth needs. It will even kick in by default, if your application hits a service that requires authentication and you have not set it up. The drawback here is that the credentials won't get saved for next time if you don't do the set up. So let's walk through the basics of what you probably want to do in your application.

1. [Set up authentication.](#setting-up-oauth)
2. [Check if user is signed in.](#check-if-the-user-is-signed-in)
3. [Provide a way to sign in.](#let-a-user-sign-in)
4. [Provide a way to sign out.](#sign-out)

I've done this enough times that I have a [module](https://github.com/odoe/jsapi-identity/blob/main/oauth.js) I use frequently.

## Setting up OAuth

Before we dive in to the various steps, let's quickly talk about setting up your OAuth. First thing you will want to do is [register your application](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/tutorials/register-your-application/) in your account. This will provide your with the client ID you will need to register it with the IdentityManager. This can be done with the OAuthInfo module, via the [appId](https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-OAuthInfo.html#appId) property.

```js
export const initialize = (appId) => {
    const oauthInfo = new OAuthInfo({ appId });
    IdentityManager.registerOAuthInfos([oauthInfo]);
    return oauthInfo;
};
```

## Check if the user is signed in

Just our luck, the IdentityManager provides a method we can use to [check the sign in status](https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html#checkSignInStatus). This method will check if we signed in to the designated portal url and return the credentials if we are.

```js
export const checkCurrentStatus = async (oauthInfo) => {
    try {
        const credential = await IdentityManager.checkSignInStatus(
            `${oauthInfo.portalUrl}/sharing`
        );
        return credential;
    } catch (error) {
        console.warn(error);
    }
};
```

## Let a user sign in

Now that we have a way to check if the user is signed in, we can use it as part of our workflow to allow a user to sign in. When the user signs in, we can do our due diligence and check if they have any existing credentials. If they don't, we can kick off the workflow to fetch those credentials and this will load the OAuth sign process.

```js
export const signIn = async (oauthInfo) => {
    try {
        const credential = await checkCurrentStatus(oauthInfo)
            || await fetchCredentials(oauthInfo);
        return credential;
    } catch (error) {
        const credential = await fetchCredentials(oauthInfo);
        return credential;
    }
};
```

The `fetchCredentials` method used here looks like this.

```js
export const fetchCredentials = async (oauthInfo) => {
    try {
        const credential = await IdentityManager.getCredential(
            `${oauthInfo.portalUrl}/sharing`
        );
        return credential;
    } catch (error) {
        console.warn(error);
    }
};
```

When you registered your application in step one, you would have set up a redirect URI, that would allow your application be authenticated. I _highly recommend_ you have a client ID for development, and another for production. Your development client ID would redirect to your local development URI. Your production to your production location. There are numerous ways you can set this up in your build tooling using environment variables, and build scripts.

When you use the [`IdentityManager.getCredential`](https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html#getCredential) method, this will either open a popup with the ArcGIS Oauth login or direct the current page to the OAuth login, depending on how you set up your [OAuthInfo](https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-OAuthInfo.html). If you are have the `popup` set to `true` in OAuthInfo, you will need this [oauth-callback](https://github.com/Esri/jsapi-resources/tree/master/oauth) page hosted with your application.

## Sign out

With a way to sign in, now we need a way to sign out. Lucky for us, the IdentityManager simplifies this step with the [destroyCredentials](https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html#destroyCredentials) method.

```js
export const signOut = async () => {
    IdentityManager.destroyCredentials();
    window.location.reload();
};
```

Once you destroy the credentials, you will also want to reload the page. It's important to note, if you are logged in to ArcGIS Online or Enterprise in your browser as well, this _will not_ log you out of those pages. But this will provide you with a pretty basic sign out process.

## Summary

Working with Identity in any application can seem a little daunting at first, but the ArcGIS API for JavaScript provides all the tooling you'll need to set it up in your apps as needed. Ideally, this will help to simplify the login process for you as a developer and your users. As I mentioned earlier, there can be various Identity workflows. If you have Enterprise, this could include various implementations I haven't covered, and honestly, I am not familiar with many of them. Usually, in that environment, authentication is pass through and should just work. But don't quote me on that.

You can see more in the video below!

<lite-youtube videoid="t2XUubHgSp0"></lite-youtube>
