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

export function updateNotifier(currentVersion: string) {
  return new Promise(resolve => {
    let state: 'pending' | 'timeout' | 'finished' = 'pending';

    const cmd = 'npm show @mercateo/ws dist-tags --json';
    const child = exec(cmd, (error, stdout, stderr) => {
      if (state === 'timeout') {
        warn(
          'Timeout while trying to check, if a new version of @mercateo/ws is available.'
        );
        return resolve();
      } else {
        state = 'finished';
      }

      if (error) {
        warn(`Couldn't check, if a new version of @mercateo/ws is available.`);
        warn(error);
        resolve();
      } else {
        if (stderr.trim()) {
          warn(stderr);
        }

        const distTags = JSON.parse(stdout) as DistTags;
        const currentVersionIsPrerelease = currentVersion.includes('-');

        const latestVersionIsGreater = gt(distTags.latest, currentVersion);
        const nextVersionIsGreater = gt(distTags.next, currentVersion);
        const hasRelevantUpdate = currentVersionIsPrerelease
          ? latestVersionIsGreater || nextVersionIsGreater
          : latestVersionIsGreater;
        const relevantVersion = latestVersionIsGreater
          ? distTags.latest
          : distTags.next;

        if (hasRelevantUpdate) {
          const emoji = magenta(getRandom(LOVE_EMOJI));
          const version = magenta(relevantVersion);
          const url = cyan(CHANGELOG_URL);
          info(`
  ${emoji} Update available. The newest version of @mercateo/ws is ${version}.
  See ${url} for details.
`);
        } else {
          debug('Your version of @mercateo/ws is up to date.');
        }
        resolve();
      }
    });

    // use timeout, so ws can be used without (or slow) internet connection
    setTimeout(() => {
      if (state === 'pending') {
        state = 'timeout';
        child.kill();
      }
    }, 3000);
  });
}
