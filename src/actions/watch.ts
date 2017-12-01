import { info } from 'loglevel';
import chalk from 'chalk';
import moment from 'moment';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { HotModuleReplacementPlugin } from 'webpack';
import { removeAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import { findAsync } from '../lib/openport';
import { listenAsync } from '../lib/express';
import { compile as compileI18n } from '../lib/i18n';
import {
  watchAsync,
  getCompiler,
  getStatsOptions
} from '../lib/webpack/compiler';
import { getNodeBuildConfig } from '../lib/webpack/node';
import { getElectronBuildConfig } from '../lib/webpack/electron';
import { getSpaBuildConfig } from '../lib/webpack/spa';
import { getBrowserBuildConfig } from '../lib/webpack/browser';
import { resolve } from '../lib/resolve';
import { nodemonAsync } from '../lib/nodemon';

const { cyan } = chalk;

export interface WatchOptions {
  hot?: true;
}

// only for spa for now via opt-in (experimental feature)
async function watchHot() {
  if (project.ws.i18n) {
    await compileI18n();
  }

  const config = getSpaBuildConfig();
  const { index } = config.entry;
  config.entry.index = [
    'react-hot-loader/patch',
    resolve('webpack-hot-middleware/client')
  ].concat(Array.isArray(index) ? index : [index]);
  config.plugins = config.plugins || [];
  config.plugins.push(new HotModuleReplacementPlugin());
  const compiler = getCompiler(config, 'build');

  const middlewares: Array<any> = [
    webpackDevMiddleware(compiler, {
      publicPath: project.ws.publicPath,
      stats: getStatsOptions(),
      noInfo: true
    }),
    webpackHotMiddleware(compiler)
  ];
  await listenAsync(middlewares);
}

export default async function watch(options: WatchOptions) {
  await removeAsync(project.ws.distDir);

  if (options.hot) return watchHot();

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

  if (project.ws.i18n) {
    await compileI18n();
  }

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
      await watchAsync(
        livereloadServer,
        getElectronBuildConfig(),
        'build',
        onChangeSuccess
      );

      break;
    case TYPE.SPA:
      await watchAsync(
        livereloadServer,
        getSpaBuildConfig(),
        'build',
        onChangeSuccess
      );

      break;
    case TYPE.BROWSER:
      await watchAsync(
        livereloadServer,
        getBrowserBuildConfig(),
        'build',
        onChangeSuccess
      );
      break;
  }

  info('Finished initial build.');

  if (project.ws.type === TYPE.NODE) {
    await nodemonAsync();
  } else {
    const middlewares: Array<any> = [livereloadMiddleware({ port })];
    await listenAsync(middlewares);
  }
}
