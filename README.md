[![Build Status](https://travis-ci.org/Mercateo/ws.svg?branch=master)](https://travis-ci.org/Mercateo/ws)

A tool which helps you to build, document and test web projects.

# Is this a build tool?

When you say _build tool_ and mean a tool like Grunt, Gulp or Webpack - no. It is a pre-configured and opinionated wrapper or facade around existing tools _like_ Grunt, Gulp or Webpack. Think of it like a `Gruntfile.js`, `webpack.config.js` or a big `"scripts"` configuration inside `package.json` which can be shared across projects and is versioned.

We used `ws` internally for years and it used Grunt, Gulp and now we switched to Webpack. But while we changed the tools _inside_ `ws` it didn't really changed the way how we used and called `ws`. But we gained new features like better compilation speed, better minification, tree shaking and so on in  every change.

# Should I use it?

Have your `npm install`'ed and `require`'d a `Gruntfile.js` from a different project? I guess the chances for that are pretty low. But maybe you wanted to do that.

To answer the question. You _can_ use it. If you need or want the same tools like we use, you can install `ws`. But it is **highly possible** that we make a change in the future which you don't want. So use it at your own risk.

# Why is this a public tool, if I probably shouldn't use it?

Most of us know how complex configuration for Grunt or Webpack and similar tools can become. How often did you looked into _other_ Webpack configs to find out how they solved a specific problem? We did that a lot. So here is our project to learn from it, fork it or... use it. If you want.

While you can use `@mercateo/ws` I would guess many companies, organizations or single people would want to create their own _scoped_ `ws` tool. You can think of it like a `.bash_profile`: highly custom and specific, but also so useful for others that many people make their [dotfiles public](https://dotfiles.github.io/).

Maybe one day we could have a `@standard/ws` which could be used for 90% of all projects. A `ws` which is very generic. Maybe a little bit like [`feross/standard`](https://github.com/feross/standard), but for tooling best practices and conventions instead of code formatting.

# Features

Our `ws` tool helps you writing single page applications (SPAs), browser components or Node modules. You can write every project in TypeScript. Non-Node code is tested in real browsers via using Selenium directly or Sauce Labs. All projects can be localized.

# Documentation

Currently we have no in-depth documentation for `ws` as long as we try to add more features to it and use several frameworks like TypeScript oder Webpack which are currently in a beta phase. But you can check out the included examples to get started.

I'll probably write an article about the motivation behind building `ws` in the future.
