---
title: "Modularized ArcGIS JS, overboard."
published: true
author: Rene Rubalcava
date: "2013-12-19"
---

## I got problems

Sometimes I'm not sure what I enjoy doing more, writing code or working with build tools. I recently went on a caffeine fueled bender trying to figure out how to best solve a problem that I run into all too often. _Managing changes and fixes in my codebase along all my projects_. So let me explain what my typical workflow is like for a project.

1. Copy base application.
2. Add any new widgets that may be needed.
3. Update css, sometimes leaving unused stuff in place.
4. Fix any new bugs that I may find.
5. Remember to update base application for next project.

It's that last step that usually gets me. I don't always remember to update my template application, nor do I always remember to fix any bugs I found to my other projects, until of course they come up there, then I add the fix as fast as I can.

## Going with a new flow

I realize this is a workflow problem, that I should be better organized or maybe keep better track of these things. It hit me the other day, why not break out all my widgets into their own git repos? I already keep all my widgets in separate folders with templates, I was just keeping all the css in a root css folder with other stuff. This lead to having unused css in my stylesheets, unused widgets in my widgets folder since not all would be used and it just made me feel bad about myself. Other than that, I really how I've come to a point where I treat almost all features of my ArcGIS JS development as a module/widget. So how could I maintain that modular philosophy, but also keep all core widgets in sync? Git of course.

## Breaking up the band

So I began the process of moving all my common widgets to github. I still maintain private repos for the client stuff, in case any are reading (or my partners), so don't worry. I moved all css/less files related to each widget into the folder as well, following a similar pattern as some of the [Esri widgets](https://github.com/driskull/arcgis-dijit-locate-button-js) on github at the moment. The compiled css for all these widgets gets placed into a single main.css my application uses. I'll even place my test \*Spec.js files in these folders and exclude them from the build process.

## The starter kit

The next step was to figure out how to make an [application](https://github.com/odoe/esri-js-starterkit) to demonstrate how to pull in all these repos. I basically kept the same format as I use in production applications, as a matter of fact the [Gruntfile](https://github.com/odoe/esri-js-starterkit/blob/master/Gruntfile.js) is nearly identical to what I use everyday. For anything that is a dependency that is not a git repo I can edit, I just [bower](http://bower.io/) to load, such as the [Dojo-Bootstra](https://github.com/xsokev/Dojo-Bootstrap)p library.

The cool thing is, I can be working on any project, go into the submodule of a repo,

git checkout master

and work on it like any other git repo. Push my updates, then from other projects that use that same repo as a submodule

git submodule update

and I'm all synced up. That is very appealing to me.

## The after party

I already pushed this workflow out to a couple of production application I have and did some small edits in one that propagated to the other without issue. I did run into some problems trying to change the source for a submodule, but I think it had to with my version of git. By the time I figured it out, I scratched it and started over, so this method is not without some risks and growing pains. I highly suggest your work extensively in a branch for these purposes, don't touch master until you have to.

So check it out on github [here](https://github.com/odoe/esri-js-starterkit), let me know what you think even if you think this is a ridiculous way to do it.
