import log from 'npmlog';
import path from 'path';
import { ConfigOptions, Server } from 'karma';
import { spaUnitOptions } from './webpack';
import getIpAddress from './ip-address';
import { project } from '../project';

interface ConfigOptionsWithMocha extends ConfigOptions {
  mochaReporter: {
    showDiff: boolean
  };
}

const defaultConfig: ConfigOptionsWithMocha = {
  // explicitly set plugins here, so they aren't just loaded from karmas sibling directories
  // (this is less error prone)
  plugins: [
    'karma-mocha',
    'karma-phantomjs-launcher',
    'karma-webdriver-launcher',
    'karma-sourcemap-loader',
    'karma-mocha-reporter'
  ],
  frameworks: [
    'mocha'
  ],
  reporters: [
    'mocha'
  ],
  mochaReporter: {
    showDiff: true
  },
  browsers: [
    'PhantomJS'
  ],
  singleRun: true
};

export async function testAsync() {
  const karmaConfig = Object.assign({}, defaultConfig, {
    basePath: process.cwd(),
    files: [
      path.join(project.ws.distTestsDir, project.ws.i18n ? project.ws.i18n.locales[0] : '', 'index.js')
    ],
    preprocessors: {
      [path.join(project.ws.distTestsDir, 'index.js')]: [ 'sourcemap' ]
    }
  });

  return new Promise((resolve, reject) => {
    const server = new Server(karmaConfig, exitCode => {
      if (exitCode === 0) {
        resolve(exitCode);
      } else {
        reject(exitCode);
      }
    });
    server.start();
  });
}
