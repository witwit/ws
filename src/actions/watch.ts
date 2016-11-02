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
  createLocaleSpecificOptions,
  nodeOptions,
  spaOptions,
  spaI18nOptions,
  browserOptions
} from '../lib/webpack';
import { compileI18n } from '../lib/i18n-compile';

export default async function watch() {
  await removeAsync(project.ws.distDir);

  const port = await findAsync({
    startingPort: 35729
  });

  const livereloadServer = livereload.createServer({ port });
  const onChangeSuccess = (stats) => info(`Finished build at ${cyan(moment(stats.endTime).format('HH:mm:ss'))}.`);
  switch (project.ws.type) {
    case TYPE.NODE:
      await watchAsync(livereloadServer, nodeOptions, onChangeSuccess);
      break;
    case TYPE.SPA:
      if (project.ws.i18n) {
        await compileI18n();
        await watchAsync(livereloadServer, createLocaleSpecificOptions(spaOptions, project.ws.i18n.locales[0]), onChangeSuccess);

        const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
        if (hasI18nEntry) {
          await watchAsync(livereloadServer, spaI18nOptions);
        }
      } else {
        await watchAsync(livereloadServer, spaOptions, onChangeSuccess);
      }
      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileI18n();
        await watchAsync(livereloadServer, createLocaleSpecificOptions(browserOptions, project.ws.i18n.locales[0]), onChangeSuccess);
      } else {
        await watchAsync(livereloadServer, browserOptions, onChangeSuccess);
      }
      break;
  }

  info('Finished initial build.');

  const middlewares: Array<any> = [
    livereloadMiddleware({ port })
  ];
  await listenAsync(middlewares);
};
