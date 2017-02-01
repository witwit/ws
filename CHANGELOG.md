The changelog is currently handwritten.

# 1.0.1-56 (2017-02-01)

- Added some new linter rules. I hope we can get [this feature request](https://github.com/palantir/tslint/issues/2163) in tslint to integrate custom rules, too.
- Removed postinstall script for `phantomjs-prebuilt` for now. I hope we don't need it anymore and it was sometimes called in the wrong directory.

# 1.0.1-55 (2017-01-30)

- Use [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) (again), because it is faster than [ts-loader](https://github.com/TypeStrong/ts-loader) currently. (But fallback to ts-loader to generate declaration files. This is currently not supperted in awesome-typescript-loader.)
- You can now lazily load modules with `import()`! Note that there are problems when you load images inside CSS. This happens when we use Source Maps. This is a known problem in style-loader. It looks like there are at least two PRs which could fix this (see [here](https://github.com/webpack-contrib/style-loader/pull/96) and [here](https://github.com/webpack-contrib/style-loader/pull/124)), but they aren't merged yet :(

# 1.0.1-54 (2017-01-12)

- Build translations before e2e tests.

# 1.0.1-53 (2017-01-09)

- Support `targets` from [`babel-preset-env`](https://github.com/babel/babel-preset-env). Thanks [@otbe](https://github.com/otbe)! Use it inside you `package.json` as `ws.targets.node` and `ws.targets.browsers`. This **removes** the support of `ws.browsers`, too!

# 1.0.1-52 (2017-01-06)

- Remove `copy` alias, so only `copy-loader` is allowed. This matches native loaders which need a `-loader` suffix.

# 1.0.1-51 (2017-01-06)

- You can now use a `copy-loader` which is an alias to `file-loader`. Idea from [here](https://www.npmjs.com/package/copy-loader)! Cool.

# 1.0.1-50 (2017-01-06)

- Don't reject, if update notifier doesn't work.

# 1.0.1-49 (2017-01-02)

- Only show [webpack performance warnings](https://medium.com/webpack/webpack-performance-budgets-13d4880fbf6d) for production builds.

# 1.0.1-48 (2017-01-02)

- Updated dependencies (e.g. `webpack@2.2.0-rc.3`).

# 1.0.1-47 (2017-01-02)

- Just a small bug fix which copies json files in localized apps to the correct directory.

# 1.0.1-46 (2016-12-13)

- Modified translation exports so they work in more edge cases.

# 1.0.1-45 (2016-12-12)

- Changed translations templates to have better compability with older browsers. (It seems they aren't transpiled correctly for now?)

# 1.0.1-44 (2016-12-09)

- Remove buggy postinstall.

# 1.0.1-43 (2016-12-09)
# 1.0.1-42 (2016-12-09)

- Allow production build for browser components. You need to run `ws build --production` to do that. Note that you probably **must** update your `"main"` and `"typings"` to point to `dist-release/` and `dist-release/` should **not** be included in your `.npmignore`.
- Localized dev builds default to a single locale to speed up development. E.g. `ws build` only builds the first locale mentioned in your `package.json`. Run `ws build --locales de_DE` to manually build the `'de_DE'` locale in this example.
- Update notification for new versions.
- Module imports like `glamor/react` are now treated as external and aren't included in UMD builds of browser components.
- Switched from `awesome-typescript-loader` to `ts-loader` to get support for TypeScript 2.1.4.
- Updated dependencies (e.g. `tslint` to `4.0.0`).

# 1.0.1-41 (2016-11-28)

- Fixed CLI for some linux systems.

# 1.0.1-40 (2016-11-25)

- Max heap is increased by default.
- You can now use Enzyme in unit tests.

Thanks @otbe!

# 1.0.1-39 (2016-11-24)

- `.zip` and `.pdf` files be copied for localized apps.

# 1.0.1-38 (2016-11-18)

- Fixed some flaky paths.

# 1.0.1-37 (2016-11-18)

- Minor performance improvements.

# 1.0.1-36 (2016-11-15)

- ws is now compatible with `webpack@2.1.0-beta.27`.
- You can now set `--browsers` when running E2E tests on a grid. (Thanks @wuan!)

# 1.0.1-35 (2016-11-15)

- Changed the way how translations are merged, so dependencies are less important.
