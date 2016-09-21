[![Build Status](https://travis-ci.org/Mercateo/ws.svg?branch=master)](https://travis-ci.org/Mercateo/ws)

A tool which helps you to build, document and test web projects.

# Is this a build tool?

When you say _build tool_ and mean a tool like Grunt, Gulp or Webpack - no. It is a pre-configured and opinionated wrapper or facade around existing tools _like_ Grunt, Gulp or Webpack. Think of it like a `Gruntfile.js`, `webpack.config.js` or a big `"scripts"` configuration inside `package.json` which can be shared across projects and is versioned.

We used `ws` internally for years and it used Grunt, Gulp and now we switched to Webpack. But while we changed the tools _inside_ `ws` it didn't really changed the way how we used and called `ws`. But we gained new features like better compilation speed, better minification, tree shaking and so on in  every change.

# Should I use it?

Have you `npm install`'ed and `require`'d a `Gruntfile.js` from a different project in the past? I guess the chances for that are pretty low. But maybe you _wanted_ to do that.

To answer the question. You _can_ use it. If you need or want the same tools like we use, you can install `ws`. But it is **highly possible** that we make a change in the future which you don't want. So use it at your own risk.

# Why is this a public tool, if I probably shouldn't use it?

Most of us know how complex configuration for Grunt or Webpack and similar tools can become. How often did you looked into _other_ Webpack configs to find out how they solved a specific problem? We did that a lot. So here is our project to learn from it, fork it or... use it. If you want.

While you can use `@mercateo/ws` I would guess many companies, organizations or single people would want to create their own _scoped_ `ws` tool. You can think of it like a `.bash_profile`: highly custom and specific, but also so useful for others that many people make their [dotfiles public](https://dotfiles.github.io/).

Maybe one day we could have a `@standard/ws` which could be used for 90% of all projects. A `ws` which is very generic. Maybe a little bit like [`feross/standard`](https://github.com/feross/standard), but for tooling best practices and conventions instead of code formatting.

# Features

Our `ws` tool helps you writing single page applications (SPAs), browser components or Node modules. You can write every project in TypeScript. Non-Node code is tested in real browsers via using Selenium directly or Sauce Labs. All projects can be localized.

# Why one tool for such different projects like a Node module or a SPA?

We want to make it *really* easy to create examples for your projects. Writing tests and documentation for your project is great and you should still do it, but in our experience the best way _to get started_ with a different project is by reading examples.

Mabe you write a Node server with a REST API. Now you can create several standalone SPAs as clients in your examples - all using different frameworks or dependencies (an `Angular` app using `$http` or a `React` app using `fetch`) and every example shows how your server is used. Or you write a _date picker_ component with `React` and you create different examples how you can use it. A little bit like [`react-storybook`](https://github.com/kadirahq/react-storybook), but not tied to `React` and more generic.

Best thing about it: You write your library and all your example with the same tool.

And you could use your examples to test a component with Selenium as an E2E test, because your example is a standalone SPA.

Besides that we think that most of our code and our dependencies of `ws` are shared between all project types.

# How to get started?

1. `$ npm install --save-dev @mercateo/ws@next`
2. Add `"ws": { "type": "spa" }` (or `"node"` or `"browser"`) to your `package.json`, depending on the project you have.
3. Optionally: Create a `tsconfig.json` to use TypeScript. Highly recommended!
4. Optionally: Add a `"jsx"` setting to your `tsconfig.json`.

If you use TypeScript your entry point to your project will be `src/index.ts`. If you use TypeScript with JSX your entry point will be `src/index.tsx`. If you don't use TypeScript, your entry point will be `src/index.js`.

If you create a SPA you'll want to add a `src/index.html`, too.

Have a look at our [`examples/`](examples) to find out more.

# Documentation

Currently we have no in-depth documentation for `ws` as long as we try to add more features to it and use several frameworks like TypeScript oder Webpack which are currently in a beta phase. But you can check out the included examples to get started.

I'll probably write an article about the motivation behind building `ws` in the future.
