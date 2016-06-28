import { join } from 'path';
import webpack from 'webpack';
import log from 'npmlog';
import { removeAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import {
  compileAsync,
  createLocaleSpecificOptions,
  spaOptions,
  spaReleaseOptions,
  nodeOptions,
  browserOptions,
  browserReleaseOptions
} from '../lib/webpack';

const NAME = 'build';

export default async function build(options) {
  log.info(NAME, 'Build project...');

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
            log.info(NAME, `...for locale ${locale}.`);
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
        for (const locale of project.ws.i18n.locales) {
          log.info(NAME, `...for locale ${locale}.`);
          await compileAsync(createLocaleSpecificOptions(browserOptions, locale));
          await compileAsync(createLocaleSpecificOptions(browserReleaseOptions, locale));
        }
        log.info(NAME, `...with all locales.`);
      }
      // even when we use locales, we create a default build containing *all* translations
      // users can select a locale with `window.process = { env: { LOCALE: 'en_GB' } };`, before they load
      // our component (this is mostly for users without build tools)
      await compileAsync(browserOptions);
      await compileAsync(browserReleaseOptions);
      break;
  }

  log.info(NAME, 'Finished build.');
};
