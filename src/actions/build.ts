import { join } from 'path';
import { info } from 'loglevel';
import { removeAsync, existsAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import {
  compileAsync,
  nodeDevOptions,
  getSpaDevOptions,
  spaReleaseOptions,
  spaRootI18nDevOptions,
  spaRootI18nReleaseOptions,
  getBrowserDevOptions,
  getBrowserReleaseOptions
} from '../lib/webpack';
import { compile as compileI18n } from '../lib/i18n';
import { copy } from '../lib/copy';
import { electronRootI18nOptions, electronRootI18nReleaseOptions, getElectronOptions, getElectronReleaseOptions } from '../lib/webpack/options';

export interface BuildOptions {
  locales: Array<string>;
  production?: true;
}

const copyAssets = async (distDir: string) => {
  if (project.ws.i18n) {
    // this is a quich fix to get relative path for assets in localized spa's working
    await Promise.all(project.ws.i18n.locales.map(locale =>
      copy(distDir, join(distDir, locale), '*.{zip,pdf,png,jpg,gif,svg,eot,woff,woff2,ttf,json,js}')));
    await Promise.all(project.ws.i18n.locales.map(locale =>
      copy(join(distDir, 'config'), join(distDir, locale, 'config'), '*.js')));
  }
};

export default async function build(options: BuildOptions) {
  switch (project.ws.type) {
    case TYPE.NODE:
      await removeAsync(project.ws.distDir);
      await compileAsync(nodeDevOptions);
      break;
    case TYPE.ELECTRON:
      await removeAsync(project.ws.distDir);

      if (options.production) {
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
          const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
          if (hasI18nEntry) {
            await compileAsync(electronRootI18nReleaseOptions);
          }
        }

        await compileAsync(getElectronReleaseOptions(options.locales));
        await copyAssets(project.ws.distDir);
      } else {
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
          const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
          if (hasI18nEntry) {
            await compileAsync(electronRootI18nOptions);
          }
        }

        await compileAsync(getElectronOptions(options.locales));
        await copyAssets(project.ws.distDir);
      }

      break;
    case TYPE.SPA:
      if (options.production) {
        await removeAsync(project.ws.distReleaseDir);
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
          const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
          if (hasI18nEntry) {
            await compileAsync(spaRootI18nReleaseOptions);
          }
        }
        await compileAsync(spaReleaseOptions);
        await copyAssets(project.ws.distReleaseDir);
      } else {
        await removeAsync(project.ws.distDir);

        // await verifyDll(options.locales);

        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
          const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
          if (hasI18nEntry) {
            await compileAsync(spaRootI18nDevOptions);
          }
        }
        await compileAsync(getSpaDevOptions(options.locales));
        await copyAssets(project.ws.distDir);
      }
      break;
    case TYPE.BROWSER:
      if (options.production) {
        await removeAsync(project.ws.distReleaseDir);
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
        }
        await compileAsync(getBrowserReleaseOptions());
      } else {
        await removeAsync(project.ws.distDir);
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
        }
        await compileAsync(getBrowserDevOptions(options.locales));
      }
      break;
  }
};
