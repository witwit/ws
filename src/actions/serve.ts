import log from 'npmlog';
import { listenAsync } from '../lib/express';
import { project } from '../project';

const NAME = 'serve';

export default async function serve(options) {
  log.info(NAME, 'Serve project...');

  if (options.production) {
    await listenAsync([], project.ws.distReleaseDir);
  } else {
    await listenAsync();
  }
};
