---

title: ArcGIS Online, Maps SDK for JavaScript & AI
description: ArcGIS Online, Maps SDK, and AI collaboration!
published: true
author: Rene Rubalcava
pubDate: 2026-09-07T10:00:00.000Z
heroImage: '../../assets/blog/ago-to-comps/images/cover.png'
tags: geodev, javascript
---

I know it's been a while since I've posted anything. Between a few releases of
the ArcGIS Maps SDK for JavaScript and just life in general, I haven't had much
time to write! But I recorded a series of videos recently that covers something
I get asked about a lot, how do you go from "I have some data" to an actual
published web map to a working custom app, start to finish. So I figured I'd
write it up too. And because I wanted to have some fun, I let AI for most of the
work... then I fixed it.

The dataset I used is the
[EPA's Toxic Release Inventory (TRI)](https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present),
which tracks facilities that release certain chemicals into the environment. I'd
actually worked with this data before, way back around 2008 for a geography
thesis, so it was fun to dig back into it. Fair warning, I am not an EPA data
expert. I hadn't touched this dataset in years and some of the choices I made
below were "let's see what happens" rather than "I know exactly what this field
means."

## Getting the data into ArcGIS Online

The TRI site gives you a CSV per year (I grabbed 2024, which turned out to be
the whole US, not just the state I thought I'd downloaded, yaaaay). The raw file
has about 122 fields, most of them numbered like `1.1`, `6.2`, `M56`, which I
later discovered maps to sections in reporting document. I didn't discover in
time, but you know... I cleaned up most of the numbering in the field names
before uploading, though I left a few of the section-style ones in place since I
wasn't totally sure what they referenced.

From there it's the usual ArcGIS Online flow: new item, upload the CSV, let it
analyze the fields, point it at latitude and longitude, and it builds you a
hosted feature layer. I kept the CSV item around too instead of deleting it
after the layer was created, mostly out of laziness, but that's an option if you
want a cleaner item list. The entire publishing step is pretty nice, you should
give it a shot!

Once the layer was up, I opened it in
[Map Viewer](https://www.arcgis.com/apps/mapviewer/index.html) and started
poking around. A few fields immediately stood out, "fugitive air release" and
"stack air release," which the EPA report page suggested were worth visualizing
together, thank you EPA! I built a size and color visualization off those two
fields and immediately got a map that was completely dominated by one facility
(a coal plant, if I remember right) with a release number so large it flattened
every other value into nothing. I filtered that one record out. I want to be
clear I wasn't trying to make a judgment call about that facility specifically,
I just don't know enough about their reporting to say anything meaningful, but
visually it was making the rest of the map useless.

A couple of smaller things worth calling out because they're easy to skip:

- **Cache control.** Map Viewer has a "review map" tool now that checks your web
  map for efficiency, and one of its first suggestions was to bump my layer's
  cache age. This data isn't changing, so there's no reason to leave it at a
  short cache window. I set it to an hour and the review flipped to all green
  checks.
- **Embedding.** You can grab the embed snippet straight from the map's item
  page and drop it into any HTML page. It's genuinely just a script tag with an
  `arcgis-embedded-map`
  [component](https://developers.arcgis.com/javascript/latest/references/embeddable-components/components/arcgis-embedded-map/)
  with your web map's item ID:

```html
<arcgis-embedded-map item-id="YOUR_WEBMAP_ID"></arcgis-embedded-map>
```

That's the whole embed. No API key wiring, no map instantiation code, nothing.

## Finishing the web map and standing up a real app

Before jumping into a custom app, I went back into Map Viewer and configured the
pop-up (swapping the default field dump for actual formatted text about stack
and fugitive releases) and added a bar chart of site counts by state. The one
thing that people might skip, once you configure a chart on the layer be sure to
save the layer item afterward for that chart config to actually travel with the
layer.

With that done, I used the
[ArcGIS Create CLI](https://www.npmjs.com/package/@arcgis/create) to scaffold a
React app:

```bash
pnpm create arcgis-app tri-sites-app
```

It gives you a working default app with a sample point already on the map. I
stripped that out, swapped in my web map's item ID, and pointed the chart
component at the layer's item ID (a separate ID from the web map itself, worth
double checking if your chart doesn't show up). At that point I had a working
app with the exact map, symbology, pop-up, and chart I'd already built in Map
Viewer, and I hadn't written a single line of chart or pop-up logic myself.
Everything I configure in Map Viewer just comes along for the ride. _No code,
easy mode!_

## Bringing in Claude and Codex

This is where things got more interesting. Before writing any new features, I
had Claude generate a set of Claude Skills for this repo, using a prompt I found
floating around the Claude subreddit (a "repository skill library builder" style
prompt that turns your codebase into a set of agent-readable playbooks). I ran
`claude init` first to get a starting `CLAUDE.md`, symlinked it to `AGENTS.md`
so Codex and other tools could read the same context, and did the same trick
with the skills folder so both tools stay in sync as they learn things about the
app.

Codex reviewed the generated skill and caught a real gap in it (it wasn't
checking staged or unstaged working tree changes, only committed ones), so I had
it fix its own skill before doing anything else. Small thing, but it's a nice
example of the tooling improving itself before you even ask it to build a
feature.

The actual feature I wanted was a sidebar listing TRI sites currently in the
map's extent, something you could glance at quickly next to the map instead of
clicking around blind. I had Codex build it, pointing it at the
[`reactiveUtils`](https://developers.arcgis.com/javascript/latest/references/core/core/reactiveUtils/)
docs and the
[layer's query methods](https://developers.arcgis.com/javascript/latest/references/core/layers/FeatureLayer/#querying).
It got there, using the layer view's `updating` property to know when to
re-query, though it hit a couple of the usual rough edges, it initially reached
for the old `__esri` global type (removed since 5.0, you have to import types
directly now), and it needed to explicitly widen `outFields` because a layer
view by default only carries the fields needed to draw the symbology, not
whatever extra fields your query wants.

Once that was in, I had Claude do a full code review of what Codex wrote. It ran
for about twelve minutes and came back with a written summary plus a JSON
breakdown of confirmed, plausible, and refuted findings, which is genuinely
useful if you want to hand that output to another tool or just fix it yourself.
A few of the findings were real (a UI flicker as the site count crossed a
threshold, some watch handles that could be orphaned on unmount), a couple were
flagged as refuted after Claude checked the actual SDK typings, and I had it fix
the confirmed ones and then the plausible ones as a second pass.

## Fixing what the AI broke

Once I let myself sober up from chugging AI output, I came back to actually use
the app, and panning the map had gotten noticeably sluggish. This turned out to
be a direct side effect of the earlier `outFields` fix. Widening the layer's
`outFields` to satisfy the sidebar's address query meant every single feature
drawn on the map, on every pan, now carried a much heavier payload, since that
setting affects the whole layer, not just my one query.

```js
// what got added to satisfy the sidebar's address/city query
triLayer.outFields = [
  ...triLayer.outFields,
  "street_address",
  "city",
  "state",
];
```

The fix was to back that out entirely and instead query the actual feature layer
(not the layer view) whenever I needed fields the layer view doesn't carry by
default. One-line change, and panning went from noticeably janky to instant.
This is the kind of thing that's easy to miss if you don't actually read the
diff, since the app "worked" the whole time, it just quietly got slower.

_Review your AI code sometimes._

While I had things open I tried a couple of other tools for a smaller feature
(clicking a site in the sidebar list zooms the map to it and opens its pop-up),
first with OpenCode running DeepSeek. It got there eventually but was noticeably
slower than Claude or Codex for the same kind of task, and I ended up doing some
of the wiring myself, like using the map element's `openPopup` method directly
instead of poking at the pop-up component, which is the approach I'd have
reached for from the start. I know some things.

## Caching, virtualization, and tying it together

The last round of work came after another longer break. Coming back to the app,
the sidebar list had a real problem, it relied on the layer view for its data,
which is fast because the data's already in the map, but a layer view only keeps
the fields it needs to draw the map. No address, no facility name. Getting those
meant a fresh query to the actual service on every single pan, and extent-based
queries like that aren't cacheable server side the way tiled queries are, so it
was hitting the service constantly for data that barely changes. This is
something that should be avoided, trust me.

I had Claude build a single upfront query for every site, without geometry,
cache the result in `localStorage`, and reconcile that full list against
whatever's currently visible using object ID as the join key between the cached
list and the layer view's live query results.

```js
try {
  const raw = localStorage.getItem(TRI_SITES_CACHE_KEY);
  if (!raw) return null;

  const parsed: unknown = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as TriSite[]) : null;
} catch {
  return null;
}
```

That solved the network chatter, but exposed the next problem: rendering
thousands of list items into a `calcite-list` at once is its own kind of slow,
even if you can only see a dozen of them on screen. Calcite's list component
doesn't have built-in virtualization, so I had Claude build a simple windowed
version, rendering a bit more than what's visible in the viewport and growing
that window as you scroll. It's the same idea as any manual list virtualization
I've built before, just applied to a Calcite component instead of a plain
`<ul>`. This worked out pretty well, thanks Claude!

There were a couple of smaller fixes along the way, a regression where clicking
a list item stopped opening the pop-up properly (fixed by waiting on the layer
view before trying to reference the feature), and once that was sorted I had it
update the existing test suite to match the new pop-up behavior instead of
writing that by hand myself.

## Where that leaves things

Zooming out, here's the whole path.

- Take a CSV from a government site
- Upload it to ArcGIS Online
- Get a hosted feature layer
- Build out symbology and pop-ups and a chart entirely in Map Viewer
- Consume all of that in a custom React app with basically no extra code
- Use Claude and Codex to add real features on top and catch each other's
  mistakes along the way

None of this replaces actually understanding your code. Codex introduced a real
performance regression while fixing a real bug, and I wouldn't have caught it
without watching the app behave differently and going back through the diff.
Having Claude review Codex's work (and vice versa, in earlier rounds) genuinely
surfaced things I'd have missed, but it also flagged a couple of things that
turned out to be non-issues once checked against the actual SDK docs. These
tools are good at writing code fast. They are not a substitute for reading it.
If you're going to vibe code your way through an app like this, do yourself a
favor and actually look at what gets written before you commit it.

## Summary

This was a fun series! AI tooling highlighted some cool features for me, virtual
lists, some React handling and all. Sure it wasn't perfect, but neither is my
first few passes at building an app and writing code. I won't judge too hard.
Some of of these AI tools kinda ate so many tokens for baic tasks though...
looking at you Codex! I can't really say one worked better than the other, but
using them together to review each others output... I dig that! So give it a
shot sometime. Get your data in ArcGIS Online, do most of your authoring in your
WebMap and then consume in your apps. Serisouly, less code to write most of the
time the more you do in Online.

You can watch the videos in this series below!

<lite-youtube playlistid="PLVxV_dGKMpNU"></lite-youtube>
