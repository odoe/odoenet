---

title: CoffeeScript, Visual Studio and Sublime Text 2
published: true
author: Rene Rubalcava
pubDate: 2012-06-07
description: I had previously written about simplifying your dev environment.
  Most of the day to day work that I do, I can manage with vim just fine. But I
  also use Visual Studio quite a bit for ASP/MVC3 and (don't laugh) Silverlight.
  So when I do web dev in Visual Studio, I like to set up my environment in a
  way that makes me effective and productive. I never really thought about this
  process until I started doing some pair-programming and had to share this
  convoluted information with another human being. I'm going to do this
  step-by-step, so there's no confusion (please don't get confused).
---

I had previously written about
[simplifying your dev environment](https://odoe.net/blog/?p=200). Most of the
day to day work that I do, I can manage with vim just fine. But I also use
Visual Studio quite a bit for ASP/MVC3 and (don't laugh) Silverlight. So when I
do web dev in Visual Studio, I like to set up my environment in a way that makes
me effective and productive. I never really thought about this process until I
started doing some pair-programming and had to share this convoluted information
with another human being. I'm going to do this step-by-step, so there's no
confusion (please don't get confused).

## 1: MVC 3

Of course you'll need Visual Studio 2010. In my case, I work mainly with ASP.NET
MVC 3 when using Visual Studio, so be sure to install that
[here](http://www.asp.net/mvc/mvc3).

## 2: Mindscape Workbench

You can get Mindscape Workbench
[here](http://www.mindscapehq.com/products/web-workbench). It's a great plugin
for Visual Studio that allows you to create CoffeeScript files as well as
Less/Sass files. We'll also need to install CoffeeScript and Sass/Compass for
this to work. You can read more about the plugin from Scott Hanselman
[here](http://www.hanselman.com/blog/CoffeeScriptSassAndLESSSupportForVisualStudioAndASPNETWithTheMindscapeWebWorkbench.aspx).
One drawback it has is that there is no intellisense for CoffeeScript files.
This is the next step.

## 3: Sublime Text 2

This is not a required step, you could just as easily use vim or some other text
editor, but I wanted to set things up in a somewhat easier to use environment
for someone that doesn't care about vim power. Download it
[here](http://www.sublimetext.com/2). Leave it alone for now, we'll come back to
this later.

## 4: Git

Now the fun begins, install Git for Windows from
[here](http://git-scm.com/downloads). From here on out, I recommend using the
Git Bash shell for simplicity sake. Now the tricky part is working with these
command line tools behind a proxy. If you're lucky, you don't work behind a
proxy, if you're not, these command line tools will not automatically be aware
if your internet settings, so you need to manually set them up. You can use the
following command or git as discussed in
[this Stackoverflow question](http://stackoverflow.com/questions/128035/how-do-i-pull-from-a-git-repository-through-an-http-proxy).

```bash
git config --global http.proxy http://proxy_host:port
```

## 5: Ruby

This is a simple one, install Ruby from [here](http://rubyinstaller.org/). The
Ruby installer comes with [gem](http://rubygems.org/). Once again, per
instructions
[here](http://stackoverflow.com/questions/4418/how-do-i-update-ruby-gems-from-behind-a-proxy-isa-ntlm)
and
[here](http://www.nigelthorne.com/2007/02/how-to-update-gems-from-behind-proxy.html),
we may need to set up gem behind a proxy. Run this command before using gem.

```bash
set HTTP_PROXY=http://proxy_host:port
```

This should set HTTP_PROXY for this current bash session, so you'll do it each
time you reopen bash before running gem. I tried setting up a permanent
environment variable for this, but it interfered with my internet connection.
You may have better luck. I could have sworn there was a config file you could
create that gem could read for proxy info, but can't remember it.

## 6: Node.js

Simple enough these days, use the windows installer for
[Node.js](http://nodejs.org/) and you should be all set. Before the windows
installer, this process sucked, I would say run Linux in a Virtual Box and spare
the stress. Thanks Node devs for making this a clean process for Windows guys.
The installer comes with [npm](http://npmjs.org/), so if you need to work behind
a proxy, read [this](https://github.com/isaacs/npm/issues/2119) and do the
following.

```bash
npm config set proxy http://proxy_host:port npm config set registry "http://registry.npmjs.org/"
```

## 7: CoffeeScript

Now you can install [CoffeeScript](http://coffeescript.org/), finally!

```bash
npm install -g coffee-script
```

Now you the Mindbench plugin for Visual Studio can compile your Less/Sass files.

## 8: Sass/Compass

Install Compass per
[these instructions](http://thesassway.com/beginner/getting-started-with-sass-and-compass).

```bash
gem install compass
```

## 9: CoffeeScript bundle for Sublime Text 2

Get the CoffeeScript bundle
[here](https://github.com/jashkenas/coffee-script-tmbundle). Sublime Text 2 can
use Textmate bundles, so this works great. On Windows 7, you are looking for
_$HOME/AppData/Roaming/SublimeText 2/packages/_, where $HOME is your user
documents and settings folders.
[Turn on the ability to show hidden files and folders](http://windows.microsoft.com/en-us/windows-vista/Show-hidden-files)
if you don't see the AppData folder. Run the following command.

```bash
git clone git://github.com/jashkenas/coffee-script-tmbundle CoffeeScript
```

Add the ability to build the CoffeeScript files per
[this link](http://www.feanorian.net/site/sublime_text_and_coffeescript). Open
the CoffeeScript/Commands folder and look for a file named
CoffeeScript.sublime-build. Make sure it looks like this. I did not need to have
the "path" option for it to work for me.

```json
{ "cmd": ["coffee.cmd","-c","$file"], "file_regex": "^(...\*?):([0-9]\*):?([0-9]\*)", "selector": "source.coffee" }
```

Now when you edit a \*.coffee file in Sublime Text 2, you can use ctrl+b to
build and save the file at the same time.

## 10: Take it for a spin

At this point, start up Visual Studio, start a new MVC 3 Web project. Add a new
item, and you should have the option to add CoffeeScript files. Right click the
CoffeeScript file -> Open With, choose "Sublime Text 2", if not an option,
browse to the sublime.exe in _Program Files\\Sublime Text 2_. Set it as the
default and now all \*.coffee files will open in Sublime Text 2 when
double-clicked in Visual Studio. Again, press ctrl+b in Sublime Text 2 to build
and save the \*.coffee files and you should be good to go.

## Whew

Ok, I know this whole process seemed a little long, but I find it to be
worthwhile in my dev workflow. The trickiest part for me was getting everything
working behind a proxy. After I had to do this on a couple of machines and asked
to explain it, I thought I should document this somehow. Many of the search
results out there are also written specific to OS X and Linux users, so there
are little bits here and there that took some translating to Windows, not much,
but slight nuances like installing the CoffeeScript bundle. I hope everything
works for you. If you run into to trouble, I'll see if I can help, but some
Google-fu worked when I got stuck.

I did not cover each tool in much detail, like how to use git or the benefits of
npm and gem. I would encourage you to read on these subjects further if you are
interested. I would like to state that Node.js and Ruby are more than
development languages (Ok, Node is a library, give me a break), but they open up
a whole world of tools that you can use in your day to day development, like
[testing](https://github.com/pivotal/jasmine-gem),
[building](http://requirejs.org/docs/node.html) of your web applications.

I hope someone finds this information useful. It took me hours to figure out
when I first started it some time ago, so hopefully I saved you some time.
