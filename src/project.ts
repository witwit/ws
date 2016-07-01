import { join } from 'path';
import { yellow } from 'chalk';
import { readJsonSync } from 'fs-extra-promise';

const unvalidatedProject = readJsonSync(join(process.cwd(), 'package.json'));
let tsconfig;
try {
  tsconfig = readJsonSync(join(process.cwd(), 'tsconfig.json'));
} catch (err) {
  // re-throw any error except 'ENOENT', because tsconfig is purely optional
  if (err.code !== 'ENOENT') {
    throw err;
  }
}

export const TYPE = {
  SPA: 'spa' as 'spa',
  NODE: 'node' as 'node',
  BROWSER: 'browser' as 'browser'
};

const TYPES = [
  TYPE.SPA,
  TYPE.NODE,
  TYPE.BROWSER
];

export interface IProject {
  /**
   * The name of your project taken from `package.json`.
   */
  name: string;
  /**
   * The dependencies of your project.
   */
  dependencies?: { [dependency: string]: string; };
  /**
   * This is the `ws` configuration used in the projects `package.json`.
   */
  ws: {
    /**
     * We currently support three types of projects: `'spa'`, `'node'` and `'browser'`.
     */
    type: 'spa' | 'node' | 'browser';
    /**
     * The file extension of your entry file. Either `js`, `ts` or `tsx`.
     */
    entryExtension: 'js' | 'ts' | 'tsx';
    /**
     * Probably only needed for 'browser' projects currently.
     * See https://webpack.github.io/docs/configuration.html#externals.
     */
    externals?: any;
    /**
     * The directory where your source code is located.
     */
    srcDir: string;
    /**
     * The directory where your tests are located.
     */
    testsDir: string;
    /**
     * The directory where your development build is generated.
     * If you have a browser components project, optimized files will live here, too.
     */
    distDir: string;
    /**
     * The directory where your tests build is generated.
     */
    distTestsDir: string;
    /**
     * The directory where your production build is generated (only SPAs).
     */
    distReleaseDir: string;
    /**
     * Our selenium settings. Only needed if you run tests in selenium.
     */
    selenium?: {
      /**
       * The host of selenium.
       */
      host: string;
      /**
       * The port of selenium.
       */
      port: number;
      /**
       * A list of browser which should *never* be used for tests. Use browser id's like
       * `[ 'chrome-50', 'firefox-45', 'internet explorer-9' ]`.
       */
      blacklist: string[];
      /**
       * A list of browser which should *only* be used for tests (if available). Use browser id's
       * like `[ 'chrome-50', 'firefox-45', 'internet explorer-9' ]`.
       */
      whitelist: string[];
    };
    /**
     * Our i18n settings. Only needed for translated projects.
     */
    i18n?: {
      /**
       * The locales your project supports. A locale consists of a language code (expressed
       * by two lower case characters), a `_` and a country code (expressed by two upper case
       * characters). E.g. valid locales are `'en_GB'`, `'de_AT'`, `'it_IT'` and so on.
       *
       * Note that you can save shared translations of a language in a `.properties` file without
       * a country code (e.g. if `'de_DE'` and `'de_AT'` share translations, they can be stored
       * in a `de.properties` file). That way you don't have to save duplicates.
       */
      locales: string[];
      /**
       * If you want to have the benefits of i18n like using the message format, but you _really_
       * just want to support _one_ locale, you can generate your projects as if you would not
       * support any locale at all (e.g. generated SPAs aren't nested in a directory for every
       * locale).
       */
      isSingleLocale?: boolean;
      /**
       * The directory where your `.properties` with translations are located. Defaults to `i18n`.
       */
      dir: string;
      /**
       * You can group translations in so called _features_ (e.g. `common`, `errors`, `forms`).
       *
       * Note that the translation keys must be unique, because every feature is merged into
       * _one_ translation file at the end. We do that on purpose, so we can reuse a translated
       * feature like `common-errors` across several projects, but override certain keys with a
       * translated feature like `specific-errors`, if we need to.
       *
       * Features are _optional_.
       */
      features?: string[];
      /**
       * If you translations aren't maintained in your repository, you can optionally provide
       * a _templated URL_ and we try to download the translations. You can set `{locale}` and
       * `{feature}` in your URL as params (e.g. `https://foo.com/i18n?language={locale}&project={feature}`).
       */
      importUrl?: string;
    };
  };
}

export function validate(pkg): IProject {
  if (!pkg.ws) {
    throw (
`Your ${yellow('package.json')} needs a ${yellow('ws')} config. It could look like this:
  {
    "ws": {
      "type": "${TYPES.join('" | "')}"
    }
  }`
    );
  }

  if (!pkg.ws.type) {
    throw `You need to specify a ${yellow('type')}. This can be any of the following values: ${yellow(TYPES.join(', '))}.`;
  }

  if (!TYPES.some(type => type === pkg.ws.type)) {
    throw `Your type ${yellow(pkg.ws.type)} doesn't match any of the valid values: ${yellow(TYPES.join(', '))}.`;
  }

  if (!pkg.name) {
    throw `You need to specify a ${yellow('name')} in your packae.json.`;
  }

  if (!pkg.ws.srcDir) {
    pkg.ws.srcDir = 'src';
  }

  if (!pkg.ws.testsDir) {
    pkg.ws.testsDir = 'tests';
  }

  if (!pkg.ws.distDir) {
    pkg.ws.distDir = 'dist';
  }

  if (!pkg.ws.distTestsDir) {
    pkg.ws.distTestsDir = 'dist-tests';
  }

  if (!pkg.ws.distReleaseDir) {
    pkg.ws.distReleaseDir = 'dist-release';
  }

  if (pkg.ws.i18n && !pkg.ws.i18n.dir) {
    pkg.ws.i18n.dir = 'i18n';
  }

  // check if this project is using typescript and tsx
  if (!tsconfig) {
    pkg.ws.entryExtension = 'js';
  } else if (!(tsconfig.compilerOptions && tsconfig.compilerOptions.jsx)) {
    pkg.ws.entryExtension = 'ts';
  } else {
    pkg.ws.entryExtension = 'tsx';
  }

  // defaults for selenium
  if (pkg.ws.selenium) {
    if (!pkg.ws.selenium.blacklist) {
      pkg.ws.selenium.blacklist = [];
    }
    if (!pkg.ws.selenium.whitelist) {
      pkg.ws.selenium.whitelist = [];
    }
  }

  return pkg;
}

export const project = validate(unvalidatedProject);
