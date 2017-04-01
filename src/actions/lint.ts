import { yellow, cyan } from 'chalk';
import { error } from 'loglevel';
import { existsAsync, readdirAsync } from 'fs-extra-promise';
import { join } from 'path';
import { lintAsync } from '../lib/tslint';
import { project } from '../project';

export default async function lint() {
  // typescript
  const typescriptFileErrors = await lintAsync();
  if (typescriptFileErrors.length) {
    error('');
    for (const fileFailure of typescriptFileErrors) {
      error(fileFailure.output);
      error('');
    }
  }

  // documentation
  const documentationErrors: Array<string> = [];
  if (!project.private) {
    if (!(await existsAsync(join(process.cwd(), 'README.md')))) {
      documentationErrors.push(`You have ${yellow('no README.md')}.`);
    }
    if (!project.keywords || !project.keywords.length) {
      documentationErrors.push(`You have ${yellow('no keywords')} set in your ${yellow('package.json')}.`);
    }
    if (!project.description) {
      documentationErrors.push(`You have ${yellow('no description')} set in your ${yellow('package.json')}.`);
    }
    if (!(await existsAsync(join(process.cwd(), 'examples')))) {
      documentationErrors.push(`You have ${yellow('no examples/')} directory.`);
    } else {
      const contents = (await readdirAsync(join(process.cwd(), 'examples'))).filter(content => content !== '.DS_Store');
      if (!contents.length) {
        documentationErrors.push(`Your ${yellow('examples/')} directory ${yellow('is empty')}.`);
      }
    }
  }
  if (documentationErrors.length) {
    error('');
    error(`You're project ${yellow(`isn't private`)}, but it has ${yellow(documentationErrors.length.toString())} documentation failure(s).`);
    documentationErrors.forEach(msg => error(`  ${msg}`));
    error('');
  }

  if (typescriptFileErrors.length || documentationErrors.length) {
    throw `${cyan('lint')} failed.`;
  }
}
