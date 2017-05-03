import { exec } from 'child_process';
import { gt } from 'semver';
import { debug, warn, info } from 'loglevel';
import { cyan, magenta } from 'chalk';

interface DistTags {
  next: string;
  latest: string;
}

const CHANGELOG_URL = 'https://github.com/Mercateo/ws/blob/master/CHANGELOG.md';
const LOVE_EMOJI = [
  '(☞ﾟヮﾟ)☞',
  '( ˘ ³˘)♥',
  '(ᵔᴥᵔ)'
];

const getRandom = (arr: Array<any>): any => arr[Math.floor(Math.random() * arr.length)];

export function updateNotifier(currentVersion: string) {
  return new Promise((resolve) => exec(`npm show @mercateo/ws dist-tags --json`, (error, stdout, stderr) => {
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
      const hasRelevantUpdate = currentVersionIsPrerelease ? (latestVersionIsGreater || nextVersionIsGreater) : latestVersionIsGreater;
      const relevantVersion = latestVersionIsGreater ? distTags.latest : distTags.next;

      if (hasRelevantUpdate) {
        info(`
  ${magenta(getRandom(LOVE_EMOJI))} Update available. The newest version of @mercateo/ws is ${magenta(relevantVersion)}.
  See ${cyan(CHANGELOG_URL)} for details.
`);
      } else {
        debug('Your version of @mercateo/ws is up to date.');
      }
      resolve();
    }
  }));
}
