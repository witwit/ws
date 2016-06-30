import log from 'npmlog';
import { join } from 'path';
import { ConfigOptions, Server } from 'karma';
import getIpAddress from './ip-address';
import { getBrowsers } from './selenium-grid';
import { project } from '../project';

function createCustomLauncherId({ browserName, version }) {
  return `grid-${browserName}-${version}`;
}

function toCustomLaunchersObject(customLaunchers, browser) {
  customLaunchers[createCustomLauncherId(browser)] = Object.assign({}, browser, {
    base: 'WebDriver',
    // allways inject <meta> to use edge mode for IE
    'x-ua-compatible': 'IE=edge',
    config: {
      hostname: project.ws.selenium.host,
      port: project.ws.selenium.port
    }
  });
  return customLaunchers;
}

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

export async function testAsync(options: { grid?: boolean } = {}) {
  const karmaConfig = Object.assign({}, defaultConfig, {
    basePath: process.cwd(),
    files: [
      join(project.ws.distTestsDir, project.ws.i18n ? project.ws.i18n.locales[0] : '', 'index.js')
    ],
    preprocessors: {
      [join(project.ws.distTestsDir, 'index.js')]: [ 'sourcemap' ]
    }
  });

  if (options.grid) {
    const browsers = await getBrowsers();
    log.verbose('karma', `Available browsers: ${browsers.map(browser => browser.id)}`);
    if (browsers.length === 0) {
      throw `No browsers are available on ${project.ws.selenium.host}:${project.ws.selenium.port}.`;
    }
    Object.assign(karmaConfig, {
      hostname: getIpAddress(),
      customLaunchers: browsers.reduce(toCustomLaunchersObject, {}),
      browsers: browsers.map(createCustomLauncherId)
    });
  }

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
