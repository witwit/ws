import { install, start } from 'selenium-standalone';
import { warn } from 'loglevel';

const TIMEOUT_LIMIT = 10000;

const timeout = duration =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('TIMEOUT')), duration)
  );

const installAsync = () =>
  new Promise((resolve, reject) => {
    install(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const safeInstallAsync = async () => {
  try {
    await Promise.race([installAsync(), timeout(10000)]);
  } catch (err) {
    if (err.message === 'TIMEOUT') {
      warn(`Timeout! Couldn't install or update Selenium in 10s.`);
      warn(`We'll try to run Selenium in the case it is locally available.`);
    } else {
      throw err;
    }
  }
};

const startAsync = () =>
  new Promise<any>((resolve, reject) => {
    start((err, childProcess) => {
      if (err) {
        reject(err);
      } else {
        // kill selenium server on abrupt 'exit'
        process.on('exit', () => childProcess.kill());
        resolve(childProcess);
      }
    });
  });

/**
 * Run a local selenium server.
 */
export async function runSeleniumServer() {
  await safeInstallAsync();
  return startAsync();
}
