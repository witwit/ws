import { yellow, cyan } from 'chalk';
import { error } from 'loglevel';
import { existsAsync, readdirAsync } from 'fs-extra-promise';
import { join } from 'path';
import { lintAsync } from '../lib/tslint';
import { project } from '../project';

export default async function lint() {
  // typescript
  const typescriptFileFailures = await lintAsync();
  if (typescriptFileFailures.length) {
    error('');
    for (const fileFailure of typescriptFileFailures) {
      error(fileFailure.output);
      error('');
    }
  }

  // documentation
  const documentationFailures: Array<string> = [];
  if (!project.private) {
    if (!(await existsAsync(join(process.cwd(), 'README.md')))) {
      documentationFailures.push(`You have ${yellow('no README.md')}.`);
    }
    if (!project.keywords || !project.keywords.length) {
      documentationFailures.push(`You have ${yellow('no keywords')} set in your ${yellow('package.json')}.`);
    }
    if (!project.description) {
      documentationFailures.push(`You have ${yellow('no description')} set in your ${yellow('package.json')}.`);
    }
    if (!(await existsAsync(join(process.cwd(), 'examples')))) {
      documentationFailures.push(`You have ${yellow('no examples/')} directory.`);
    } else {
      const contents = (await readdirAsync(join(process.cwd(), 'examples'))).filter(content => content !== '.DS_Store');
      if (!contents.length) {
        documentationFailures.push(`Your ${yellow('examples/')} directory ${yellow('is empty')}.`);
      }
    }
  }
  if (documentationFailures.length) {
    error('');
    error(`You're project ${yellow(`isn't private`)}, but it has ${yellow(documentationFailures.length.toString())} documentation failure(s).`);
    documentationFailures.forEach(msg => error(`  ${msg}`));
    error('');
  }

  if (typescriptFileFailures.length || documentationFailures.length) {
    throw `${cyan('lint')} failed.`;
  }
};
