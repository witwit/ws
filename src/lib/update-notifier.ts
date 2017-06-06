import { exec } from 'child_process';
import { gt } from 'semver';
import { debug, warn, info } from 'loglevel';
import { cyan, magenta } from 'chalk';

interface DistTags {
  next: string;
  latest: string;
}

const CHANGELOG_URL = 'https://github.com/Mercateo/ws/blob/master/CHANGELOG.md';
const LOVE_EMOJI = ['(☞ﾟヮﾟ)☞', '( ˘ ³˘)♥', '(ᵔᴥᵔ)'];

const getRandom = (arr: Array<any>): any =>
  arr[Math.floor(Math.random() * arr.length)];

export function updateNotifier(version: string) {
  return new Promise(resolve =>
    exec(`npm show @mercateo/ws dist-tags --json`, (error, stdout, stderr) => {
      if (error) {
        warn(`Couldn't check, if a new version of @mercateo/ws is available.`);
        warn(error);
        resolve();
      } else {
        if (stderr.trim()) {
          warn(stderr);
        }

        const distTags = JSON.parse(stdout) as DistTags;
        const isPrerelease = version.includes('-');
        const remoteVersion = isPrerelease ? distTags.next : distTags.latest;
        if (gt(remoteVersion, version)) {
          info(`
  ${magenta(
    getRandom(LOVE_EMOJI)
  )} Update available. The newest version of @mercateo/ws is ${magenta(
            remoteVersion
          )}.
  See ${cyan(CHANGELOG_URL)} for details.
`);
        } else {
          debug('Your version of @mercateo/ws is up to date.');
        }
        resolve();
      }
    })
  );
}
