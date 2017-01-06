The changelog is currently handwritten.

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
