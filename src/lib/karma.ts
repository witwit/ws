import { debug } from 'loglevel';
import { yellow } from 'chalk';
import { join } from 'path';
import { ConfigOptions, Server } from 'karma';
import getIpAddress from './ip-address';
import { getBrowsers, getBrowsersFilteredByAvailability, isSauceLabsHost } from './selenium-grid';
import { project } from '../project';
import { launchSauceConnect } from './sauce-connect';

function toCustomLaunchersObject(customLaunchers, browser) {
  const id = `grid-${browser.browserName}-${browser.version}`;
  customLaunchers[id] = Object.assign({}, browser, {
    base: 'WebDriver',
    // allways inject <meta> to use edge mode for IE
    'x-ua-compatible': 'IE=edge',
    config: {
      hostname: project.ws.selenium.host,
      port: project.ws.selenium.port,
      user: project.ws.selenium.user,
      pwd: project.ws.selenium.password
    }
  });
  return customLaunchers;
}

interface EnhancedConfigOptions extends ConfigOptions {
  // with mocha
  mochaReporter: {
    showDiff: boolean
  };
  // with new formatError added in 1.3
  formatError?(msg: string): string;
}

const defaultConfig: EnhancedConfigOptions = {
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
  logLevel: 'WARN',
  singleRun: true,
  // see https://github.com/karma-runner/karma/issues/2119#issuecomment-239615791
  formatError(msg) {
    return msg
      .split('\n')
      .reduce((list, line) => {
        // filter node_modules
        if (line.includes('/~/')) {
          return list;
        }

        // show only source line (without webpack protocol)
        const sourceLine = line.split(' <- ')[0].replace('webpack:///', './');
        list.push(`    ${sourceLine}`);
        return list;
      }, [])
      .join('\n');
  }
};

export async function testAsync(options: { grid?: boolean } = {}) {
  debug(`Configure Karma...`);
  const karmaConfig = Object.assign({}, defaultConfig, {
    basePath: process.cwd(),
    files: [
      join(project.ws.distTestsDir, project.ws.i18n ? project.ws.i18n.locales[0] : '', 'index.js')
    ],
    preprocessors: {
      [join(project.ws.distTestsDir, 'index.js')]: [ 'sourcemap' ]
    }
  });

  let sauceConnectProcess;
  if (options.grid) {
    const {
      host,
      port,
      filterForAvailability
    } = project.ws.selenium;
    const browsersQuery = project.ws.browsers;
    const browsers = filterForAvailability ? await getBrowsersFilteredByAvailability() : getBrowsers();

    if (browsers.length === 0) {
      throw `No browsers are available on ${yellow(`${host}:${port}`)} given ${yellow(browsersQuery)}.`;
    }

    const customLaunchers = browsers.reduce(toCustomLaunchersObject, {});
    Object.assign(karmaConfig, {
      hostname: getIpAddress(),
      customLaunchers,
      browsers: Object.keys(customLaunchers)
    });

    if (isSauceLabsHost(host)) {
      const {
        user: username,
        password: accessKey
      } = project.ws.selenium;
      sauceConnectProcess = await launchSauceConnect({ username, accessKey });
    }
  }

  return new Promise((resolve, reject) => {
    const server = new Server(karmaConfig, (exitCode) => {
      debug(`Karma finished.`);
      if (sauceConnectProcess) {
        debug(`Tries to close Sauce Connect.`);
        sauceConnectProcess.close(() => {
          debug(`Closed Sauce Connect.`);
          resolve(exitCode);
        });
      } else {
        resolve(exitCode);
      }
    });

    debug(`Start Karma.`);
    server.start();
  });
}
