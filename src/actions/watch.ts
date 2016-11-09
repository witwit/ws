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
  spaDevOptions,
  spaRootI18nDevOptions,
  browserDevOptions
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
      await watchAsync(livereloadServer, nodeDevOptions, onChangeSuccess);
      break;
    case TYPE.SPA:
      if (project.ws.i18n) {
        await compileI18n();
        const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
        if (hasI18nEntry) {
          await watchAsync(livereloadServer, spaRootI18nDevOptions);
        }
      }
      await watchAsync(livereloadServer, spaDevOptions, onChangeSuccess);
      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileI18n();
      }
      await watchAsync(livereloadServer, browserDevOptions, onChangeSuccess);
      break;
  }

  info('Finished initial build.');

  const middlewares: Array<any> = [
    livereloadMiddleware({ port })
  ];
  await listenAsync(middlewares);
};
