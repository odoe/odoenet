---

title: Using TypeScript with EsriJS 4
published: true
author: Rene Rubalcava
pubDate: 2016-05-16
tags: geodev, typescript
heroImage: '../../assets/blog/using-typescript-esrijs-4/images/esrijs-ts-1.png'
description: With the release of the ArcGIS API 4 for JavaScript and even
  leading up to the release, there has been a lot of interest in updated
  TypeScript Definition files.
---

With the release of the ArcGIS API 4 for JavaScript and even leading up to the
release, there has been a lot of interest in updated TypeScript Definition
files.

I'm pleased to let you know that when the ArcGIS API 4 was released, the new
[TypeScript definition files for 4.0](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript)
were also released.

Because of all the interest and questions I've gotten about using the definition
files, I thought it would be worth putting together a short video on a sample
application using the definition files.

<lite-youtube videoid="GcU14ksDWNE"></lite-youtube>

You can find the repo for the sample application
[on github](https://github.com/odoe/esrijs4-ts). This repo is using _.tsx_
files, which means that they are TypeScript files with JSX inside them. You can
learn more about this
[here](https://basarat.gitbooks.io/typescript/content/docs/jsx/tsx.html).
TypeScript has it's own compiler to turn TS to ES5, and a really cool feature is
being able to compile the JSX to ES5 for React components.

You can find info on the _dojo/typings_ [here](https://github.com/dojo/typings).

You can learn more about the _typings_ command line tool
[here](https://github.com/typings/typings).

Another great resource is the slides from the Esri Developer Summit on
[Using TypeScript with the ArcGIS API for JavaScript](http://odoe.github.io/presentations/2016-devsummit-typescript/#/).

There are some great short videos on TypeScript at
[TypeScript-Tacos](http://typescript-tacos.com/)!

I would highly recommend the
[Definitive TypeScript Guide on SitePen](https://www.sitepen.com/blog/2013/12/31/definitive-guide-to-typescript/).
SitePen has been doing some pretty great development with TypeScript, including
providing valuable feedback to the TypeScript team.

You can also check out some pretty awesome TypeScript code in the
[Dojo 2 repos, like dojo/core](https://github.com/dojo/core) to get an idea of
some of the cool stuff you can do with TypeScript.

Although, I have not come across a TypeScript book yet, mostly since it updates
so quickly, I have found
[Type-Driven Development with Idris](https://www.manning.com/books/type-driven-development-with-idris)
to be a great book and a great language to really embrace types. It's helped me
to become a better TypeScript developer, so I would recommend it as an adjacent
resource.
