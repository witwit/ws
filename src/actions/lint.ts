import log from 'npmlog';
import { ActionError } from '../error';
import { lintAsync } from '../lib/tslint';

const NAME = 'lint';

export default async function lint() {
  log.info(NAME, 'Run linter...');

  const failures = await lintAsync();
  if (failures.length) {
    failures.forEach(failure => console.log(failure.output));
    throw new ActionError(NAME, 'Linter failed.');
  }

  log.info(NAME, 'Linting was successful. ♥');
};
