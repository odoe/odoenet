---
layout: "../../layouts/BlogPost.astro"
title: "Simplify dev (for the ArcGIS developer): Part 1"
published: true
author: Rene Rubalcava
pubDate: "2012-02-22"
---

This is a short series of posts aimed mainly at development using the [ESRI JavaScript API](http://help.arcgis.com/EN/webapi/javascript/arcgis/index.html). Although, it could apply to development in general I'm a stickler for streamlining my workflow. Whether it's writing build scripts or automating testing, I really enjoy tools that make my work easier or help me learn a new language or library. I thought I would share my experience in pursuit of trying to be a better developer.

### Part 1: Simplify your development environment

I'll keep part 1 of this series short, since I think it's the simplest.

Coming from a heavily .NET and Flex background I was used to using big IDEs like Flash Builder or Visual Studio, all fantastic tools for the right job (except maybe Flash Builder). After some time though, I became fascinated with developers that used plain text editors as their primary development tools. There is a multitude to choose from [Notepad++](http://notepad-plus-plus.org/), [Textmate](http://macromates.com/) (Mac only), [SublimeText 2](http://www.sublimetext.com/2) and of course the classics, [vim](http://www.vim.org/) and [emacs](http://www.gnu.org/software/emacs/). I finally came to settle on vim as primary development tool. I would recommend downloading [gVim](http://www.vim.org/download.php#pc) on Windows and [MacVim](http://code.google.com/p/macvim/) for Mac. I won't go over installation instructions, I'll [leave](http://net.tutsplus.com/articles/web-roundups/25-vim-tutorials-screencasts-and-resources/) [that](http://spf13.com/post/ultimate-vim-config) up to you. Now let me tell you why I think every ESRI Developer (or any developer really) should spend some time using a plain old text editor to write their code.

Most text editors will provide auto-complete (based on code you've already written), snippets, syntax highlighting and various shortcuts. Not to mention the number of plugins. Vim has been around for a while in heavy use. There are no shortage of plugins for various languages and tasks. I'm not going to lie, when I first started using vim, I was slow. I didn't know the commands or how to use various plugins. But I learned, and as I learned, I not only got faster, but I began to do something I'm sure most devs never really do. _I started reading docs!_ That's right, with no code assist to guide you as you write your code, you'll find that you spend a lot more time going over the docs for your various language/API or in this case the [ESRI JavaScript API docs](http://help.arcgis.com/EN/webapi/javascript/arcgis/help/jsapi_start.htm). I've seen people post online or overheard at [Dev Summit](http://www.esri.com/events/devsummit/index.html) about how the lack of an updated plugin for Aptana code assist doesn't work with the latest API release or something similar. Well, when you are left without that, you'll end up really reading the docs and getting more familiar with the workings of the API. At this point, I could work in pretty much any editor and not have to rely on code assist, auto-complete or other tools of the IDE.

Another interesting side-effect of not using an IDE is that you'll find ways to build your applications. It could be using make, rake, waf, ant, maven or any other method of building. You could even compile some simple .NET dlls via command line. Most of us are used to simply clicking on a build button and letting the IDE do whatever it is the IDE does. For example, Flash Builder uses a template ant file to build your Flex application. There is nothing stopping you from learning how to write your own ant file that can build, test and deploy your application via a single command-line option.

I like the philosophy that Zed Shaw uses for his [Learn Code the Hard Way](http://learncodethehardway.org/) series. Basically, it boils down to typing. Lots of typing to learn to code. The tactile nature of typing reinforces the learning experience. Removing the middleman of the IDE between you and your code will help make you a better developer. In my not so educated opinion, of course.

I would encourage every developer to spend some time working in a plain old text editor like vim or Textmate. I'm not saying abandon your IDE, but roll up your sleeves and get your hands a little dirty. If you have some patience, I think you'll reap some great benefits from the experience.

The next part of this series will be on Simplifying your code.
