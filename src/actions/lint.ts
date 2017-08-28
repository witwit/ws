import { yellow, cyan, red } from 'chalk';
import { error, info } from 'loglevel';
import { existsAsync, readdirAsync } from 'fs-extra-promise';
import { join } from 'path';
import plur from 'plur';
import { tslintAsync } from '../lib/tslint';
import { eslintAsync } from '../lib/eslint';
import { formatAsync } from '../lib/prettier';
import { project } from '../project';

const smile = cyan('(~‾▿‾)~');
const files = (count: number) => plur('file', count);
const errors = (count: number) => plur('error', count);

export default async function lint() {
  // prettier
  const formattedFiles = await formatAsync();

  // tslint
  const tsintResult = await tslintAsync();
  if (tsintResult.errorsCount) {
    error('');
    error(tsintResult.errors.join('\n'));
    error('');
  }

  // eslint
  const eslintResult = await eslintAsync();
  if (eslintResult.errorsCount) {
    error('');
    error(eslintResult.errors.join('\n'));
    error('');
  }

  // documentation
  const docsErrors: Array<string> = [];
  if (!project.private) {
    if (!await existsAsync(join(process.cwd(), 'README.md'))) {
      docsErrors.push(`You have ${yellow('no README.md')}.`);
    }
    if (!project.keywords || !project.keywords.length) {
      docsErrors.push(
        `You have ${yellow('no keywords')} set in your ${yellow(
          'package.json'
        )}.`
      );
    }
    if (!project.description) {
      docsErrors.push(
        `You have ${yellow('no description')} set in your ${yellow(
          'package.json'
        )}.`
      );
    }
    if (!await existsAsync(join(process.cwd(), 'examples'))) {
      docsErrors.push(`You have ${yellow('no examples/')} directory.`);
    } else {
      const contents = (await readdirAsync(
        join(process.cwd(), 'examples')
      )).filter(content => content !== '.DS_Store');
      if (!contents.length) {
        docsErrors.push(
          `Your ${yellow('examples/')} directory ${yellow('is empty')}.`
        );
      }
    }
  }
  if (docsErrors.length) {
    error('');
    error(
      `You're project ${yellow(
        `isn't private`
      )}, but it has the following ${errors(docsErrors.length)}.`
    );
    docsErrors.forEach(msg => error(`  ${msg}`));
    error('');
  }

  // result
  const totalFixes =
    formattedFiles + tsintResult.fixedFiles + eslintResult.fixedFiles;
  if (totalFixes) {
    const count = cyan(totalFixes.toString());
    info(`automatically fixed ${count} ${files(totalFixes)} ${smile}`);
  }

  const totalErrors =
    tsintResult.errorsCount + docsErrors.length + eslintResult.errorsCount;
  if (totalErrors) {
    const count = red(totalErrors.toString());
    error(`found ${count} ${errors(totalErrors)}`);
    error('');
    throw `${cyan('lint')} failed.`;
  }
}
