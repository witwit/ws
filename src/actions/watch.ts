import log from 'npmlog';
import { cyan } from 'chalk';
import moment from 'moment';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import { removeAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import { listenAsync } from '../lib/express';
import { watchAsync, nodeOptions, spaOptions } from '../lib/webpack';

const NAME = 'watch';

export default async function watch() {
  log.info(NAME, 'Watch project...');

  await removeAsync(project.ws.distDir);
  const livereloadServer = livereload.createServer();
  const onChangeSuccess = (stats) => log.info(NAME, `Finished build at ${cyan(moment(stats.endTime).format('HH:mm:ss'))}.`);
  switch (project.ws.type) {
    case TYPE.NODE:
      await watchAsync(livereloadServer, nodeOptions, onChangeSuccess);
      break;
    case TYPE.SPA:
      await watchAsync(livereloadServer, spaOptions, onChangeSuccess);
      break;
    case TYPE.BROWSER:
      await watchAsync(livereloadServer, spaOptions, onChangeSuccess);
      break;
  }

  log.info(NAME, 'Finished initial build.');

  const middlewares = [
    livereloadMiddleware()
  ];
  await listenAsync(middlewares);
};
