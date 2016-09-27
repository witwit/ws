import { debug } from 'loglevel';
import { join } from 'path';
import { ConfigOptions, Server } from 'karma';
import getIpAddress from './ip-address';
import { getBrowsers, isSauceLabsHost, launchSauceConnect } from './selenium';
import { project, SeleniumGridConfig } from '../project';

function toCustomLaunchersObject(customLaunchers, browser) {
  // at this place we know selenium config is set, no need for null checks
  const selenium = project.ws.selenium as SeleniumGridConfig;

  const id = `grid-${browser.browserName}-${browser.version}`;
  customLaunchers[id] = Object.assign({}, browser, {
    base: 'WebDriver',
    // allways inject <meta> to use edge mode for IE
    'x-ua-compatible': 'IE=edge',
    config: {
      hostname: selenium.host,
      port: selenium.port,
      user: selenium.user,
      pwd: selenium.password
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
      }, [] as Array<string>)
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
    // at this place we know selenium config is set, no need for null checks
    const selenium = project.ws.selenium as SeleniumGridConfig;
    const { host, port } = selenium;
    const browsers = await getBrowsers();

    const customLaunchers = browsers.reduce(toCustomLaunchersObject, {});
    Object.assign(karmaConfig, {
      hostname: getIpAddress(),
      customLaunchers,
      browsers: Object.keys(customLaunchers)
    });

    if (isSauceLabsHost(host)) {
      sauceConnectProcess = await launchSauceConnect(selenium);
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
