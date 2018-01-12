import { info } from 'loglevel';
import chalk from 'chalk';
import moment from 'moment';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import hotClient from 'webpack-hot-client';
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
import { BaseOptions } from '../options';

const { cyan } = chalk;

export interface WatchOptions extends BaseOptions {
  hot?: true;
}

// only for spa for now via opt-in (experimental feature)
async function watchHot(options: WatchOptions) {
  if (project.ws.i18n) {
    await compileI18n();
  }

  const config = getSpaBuildConfig(options);
  const compiler = getCompiler(config, 'build');

  const getWebpackServer = require('webpack-serve/lib/server');
  const history = require('connect-history-api-fallback');
  const convert = require('koa-connect');

  const { publicPath, distDir: root } = project.ws;
  const serverOptions = {
    content: [],
    dev: { publicPath },
    host: 'localhost',
    hot: {},
    http2: false,
    https: false,
    index: 'index.html',
    logLevel: 'info',
    logTime: false,
    open: false,
    port: 8080,
    protocol: 'http',
    compiler,
    add: (app: any, middleware: any, options: any) => {
      app.use(convert(history()));
    }
  };

  const { close, server, start } = getWebpackServer(serverOptions);
  hotClient(compiler, { port: 8082 });
  start(serverOptions);

  const onClose = () => close(process.exit);
  process.on('SIGINT', onClose);
  process.on('SIGTERM', onClose);
}

export default async function watch(options: WatchOptions) {
  await removeAsync(project.ws.distDir);

  if (options.hot) return watchHot(options);

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
        getNodeBuildConfig(options),
        'build',
        onChangeSuccess
      );
      break;
    case TYPE.ELECTRON:
      await watchAsync(
        livereloadServer,
        getElectronBuildConfig(options),
        'build',
        onChangeSuccess
      );

      break;
    case TYPE.SPA:
      await watchAsync(
        livereloadServer,
        getSpaBuildConfig(options),
        'build',
        onChangeSuccess
      );

      break;
    case TYPE.BROWSER:
      await watchAsync(
        livereloadServer,
        getBrowserBuildConfig(options),
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
