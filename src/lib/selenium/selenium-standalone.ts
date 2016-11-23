import { install, start } from 'selenium-standalone';

/**
 * Starts a local selenium grid server.
 */
export function startSeleniumServer() {
  return new Promise<any>((resolve, reject) => {
    install(err => {
      if (err) {
        reject(err);
      } else {
        start((err, childProcess) => {
          if (err) {
            reject(err);
          } else {
            // kill selenium server on abrupt 'exit'
            process.on('exit', () => childProcess.kill());
            resolve(childProcess);
          }
        });
      }
    });
  });
}
