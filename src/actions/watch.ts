import { info } from 'loglevel';
import { cyan } from 'chalk';
import moment from 'moment';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import { removeAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import { findAsync } from '../lib/openport';
import { listenAsync } from '../lib/express';
import { compile as compileI18n } from '../lib/i18n';
import { watchAsync } from '../lib/webpack/compiler';
import { getNodeBuildConfig } from '../lib/webpack/node';
import { getElectronBuildConfig } from '../lib/webpack/electron';
import { getSpaBuildConfig } from '../lib/webpack/spa';
import { getBrowserBuildConfig } from '../lib/webpack/browser';

export interface WatchOptions {
  locales: Array<string>;
}

export default async function watch() {
  await removeAsync(project.ws.distDir);

  const port = await findAsync({
    startingPort: 35729
  });

  // TODO: Maybe refactor this so the liverelodServer is created
  // *after* the initial build.
  const livereloadServer = livereload.createServer({ port });
  const onChangeSuccess = (stats: any) =>
    info(
      `Finished build at ${cyan(moment(stats.endTime).format('HH:mm:ss'))}.`
    );
  switch (project.ws.type) {
    case TYPE.NODE:
      await watchAsync(
        livereloadServer,
        getNodeBuildConfig(),
        'build',
        onChangeSuccess
      );
      break;
    case TYPE.ELECTRON:
      if (project.ws.i18n) {
        await compileI18n();
      }

      await watchAsync(
        livereloadServer,
        getElectronBuildConfig(),
        'build',
        onChangeSuccess
      );

      break;
    case TYPE.SPA:
      if (project.ws.i18n) {
        await compileI18n();
      }

      await watchAsync(
        livereloadServer,
        getSpaBuildConfig(),
        'build',
        onChangeSuccess
      );

      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileI18n();
      }

      await watchAsync(
        livereloadServer,
        getBrowserBuildConfig(),
        'build',
        onChangeSuccess
      );
      break;
  }

  info('Finished initial build.');

  const middlewares: Array<any> = [livereloadMiddleware({ port })];
  await listenAsync(middlewares);
}
