import { info } from 'loglevel';
import { removeAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import {
  compileAsync,
  createLocaleSpecificOptions,
  keepLocaleEnv,
  spaOptions,
  spaReleaseOptions,
  nodeOptions,
  browserOptions,
  browserReleaseOptions
} from '../lib/webpack';

export default async function build(options) {
  switch (project.ws.type) {
    case TYPE.NODE:
      await removeAsync(project.ws.distDir);
      await compileAsync(nodeOptions);
      break;
    case TYPE.SPA:
      if (options.production) {
        await removeAsync(project.ws.distReleaseDir);
        if (project.ws.i18n) {
          for (const locale of project.ws.i18n.locales) {
            info(`...for locale ${locale}.`);
            await compileAsync(createLocaleSpecificOptions(spaReleaseOptions, locale));
          }
        } else {
          await compileAsync(spaReleaseOptions);
        }
      } else {
        await removeAsync(project.ws.distDir);
        if (project.ws.i18n) {
          await compileAsync(createLocaleSpecificOptions(spaOptions, project.ws.i18n.locales[0]));
        } else {
          await compileAsync(spaOptions);
        }
      }
      break;
    case TYPE.BROWSER:
      await removeAsync(project.ws.distDir);
      if (project.ws.i18n) {
        // TODO: Do we still need this? We include every locale in the output know. Removing locales should be
        // solved by setting a correct process.env and using a minifier.
        for (const locale of project.ws.i18n.locales) {
          info(`...for locale ${locale}.`);
          await compileAsync(createLocaleSpecificOptions(browserOptions, locale));
          await compileAsync(createLocaleSpecificOptions(browserReleaseOptions, locale));
        }
        info(`...with all locales.`);
      }
      // commonjs build with uninitialized process.env to be consumed by other build tools:
      await compileAsync(keepLocaleEnv(browserOptions));
      // umd build for users without build tools:
      // even when we use locales, we create a default build containing *all* translations
      // users can select a locale with `window.process = { env: { LOCALE: 'en_GB' } };`, before they load
      await compileAsync(browserReleaseOptions);
      break;
  }
};
