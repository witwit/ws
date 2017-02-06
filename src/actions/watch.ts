import { join } from 'path';
import { info } from 'loglevel';
import { cyan } from 'chalk';
import moment from 'moment';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import { removeAsync, existsAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import { findAsync } from '../lib/openport';
import { listenAsync } from '../lib/express';
import {
  watchAsync,
  nodeDevOptions,
  getSpaDevOptions,
  spaRootI18nDevOptions,
  getBrowserDevOptions
} from '../lib/webpack';
import { compile as compileI18n } from '../lib/i18n';
import { copy } from '../lib/copy';
import { electronRootI18nOptions, getElectronOptions } from '../lib/webpack/options';

export interface WatchOptions {
  locales: Array<string>;
}

const copyAssets = async () => {
  if (project.ws.i18n) {
    // this is a quich fix to get relative path for assets in localized spa's working
    await Promise.all(project.ws.i18n.locales.map(locale =>
      copy(project.ws.distDir, join(project.ws.distDir, locale), '*.{zip,pdf,png,jpg,gif,svg,eot,woff,woff2,ttf,json,js}')));
    await Promise.all(project.ws.i18n.locales.map(locale =>
      copy(join(project.ws.distDir, 'config'), join(project.ws.distDir, locale, 'config'), '*.js')));
  }
};

export default async function watch(options: WatchOptions) {
  await removeAsync(project.ws.distDir);

  const port = await findAsync({
    startingPort: 35729
  });

  const livereloadServer = livereload.createServer({ port });
  const onChangeSuccess = (stats: any) => info(`Finished build at ${cyan(moment(stats.endTime).format('HH:mm:ss'))}.`);
  switch (project.ws.type) {
    case TYPE.NODE:
      await watchAsync(livereloadServer, nodeDevOptions, onChangeSuccess);
      break;
    case TYPE.ELECTRON:
      // await verifyDll(options.locales);

      if (project.ws.i18n) {
        await compileI18n();
        const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
        if (hasI18nEntry) {
          await watchAsync(livereloadServer, electronRootI18nOptions);
        }
      }

      await watchAsync(livereloadServer, getElectronOptions(options.locales), async (stats: any) => {
        onChangeSuccess(stats);
        await copyAssets();
      });

      await copyAssets();

      break;
    case TYPE.SPA:
      // await verifyDll(options.locales);

      if (project.ws.i18n) {
        await compileI18n();
        const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
        if (hasI18nEntry) {
          await watchAsync(livereloadServer, spaRootI18nDevOptions);
        }
      }

      await watchAsync(livereloadServer, getSpaDevOptions(options.locales), async (stats: any) => {
        onChangeSuccess(stats);
        await copyAssets();
      });

      await copyAssets();
      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileI18n();
      }
      await watchAsync(livereloadServer, getBrowserDevOptions(options.locales), onChangeSuccess);
      break;
  }

  info('Finished initial build.');

  const middlewares: Array<any> = [
    livereloadMiddleware({ port })
  ];
  await listenAsync(middlewares);
};
