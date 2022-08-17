---
layout: "../../layouts/BlogPost.astro"
title: "Code coverage in your apps"
published: true
author: Rene Rubalcava
pubDate: "2017-06-27"
tags: geodev
coverImage: "code-cov.png"
---

Ok, so this post isn't necessarily about geodev, but it's related in that I'm sure a lot of us don't write enough tests.

I'm working on this, and I recently, _for some odd reason_, got really into code coverage and tooling. Using it as a tool to help guide me to focus on writing my tests.

Here is a video I did on [Intern with the ArcGIS API for JavaScript](https://www.youtube.com/watch?v=Lbu02Py3q68).

I tried to write my tests very modularly, focusing on a single unit to test, but even so it may touch other parts of my code, so that helps me figure out _hey, maybe this test is too general, so not useful_ or _this percentage of a file is covered by other tests, don't worry about writing more_.

The tools I use:

- [Intern](https://theintern.github.io/)
- [Istanbul](https://github.com/gotwarlost/istanbul)
- [remap-istanbul](https://github.com/SitePen/remap-istanbul)

Here are the npm scripts I use to run my code coverage.

```json
{
    ...
    "coverage:start": "intern run -w --config ./dist/tests/intern-local.js reporters=Pretty reporters=node_modules/remap-istanbul/lib/intern-reporters/JsonCoverage && npm run coverage:after",
    "coverage:after": "npm run coverage:html && npm run coverage:remap && del coverage-final.json && npm run coverage:text && npm run coverage:clean",
    "coverage:clean": "del coverage-mapped.json",
    "coverage:html": "node_modules/.bin/remap-istanbul -i coverage-final.json -t html -o html-report",
    "coverage:remap": "node_modules/.bin/remap-istanbul -i coverage-final.json -o coverage-mapped.json",
    "coverage:text": "istanbul report text",
        ...
}
```

What the above does, starting with `coverage:start` runs intern with a webdriver, so Chrome pops up in auto-nutso mode and runs all my tests and also runs with remap-istanbul to create a json report of my code coverage that intern will generate. It's the _remap_ part that is key to let me know what parts of my source TypeScript files might be missing coverage.

Then from there, I generate an HTML report of the code coverage I can admire and click through and see the actual source code with color highlighting let me know if I have zero or partial coverage of certain functions and branches.

Then I print the results of the coverage to the console because I'm lazy.

There's some cleanup in there to remove the output json files from my project.

Here is a [wiki](https://github.com/SitePen/remap-istanbul/wiki/Intern-How-To) from remap-istanbul on using it with Intern.

This works out real nicely for me and since I struggled a bit with some of the tooling, like how to use Istanbul, remap-istanbul and some of the APIs and how reports are generated, I thought maybe others could benefit as well.

So go forth and test my friends!

<iframe width="560" height="315" src="https://www.youtube.com/embed/GSZrZ3ZxbvU" frameborder="0" allowfullscreen></iframe>
