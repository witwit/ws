import { yellow, grey, cyan } from 'chalk';
import { error } from 'loglevel';
import { lintAsync } from '../lib/tslint';

const sourceFileLines = {};

export default async function lint() {
  const fileFailures = await lintAsync();
  if (fileFailures.length) {
    // log all failures with some basic formatting
    error('');
    for (const fileFailure of fileFailures) {
      error(`Found ${yellow(fileFailure.failureCount.toString())} failure(s) in ${yellow(fileFailure.failures[0].getFileName())}:`);
      for (const failure of fileFailure.failures) {
        const fileName = failure.getFileName();
        if (!sourceFileLines[fileName]) {
          // attention: sourceFile is a private property!
          sourceFileLines[fileName] = (failure as any).sourceFile.text.split('\n');
        }
        const lines = sourceFileLines[fileName];

        const { line, character } = failure.getStartPosition().getLineAndCharacter();
        error(`  ${failure.getFailure()} ${grey(`(at [${line + 1}:${character + 1}]: ${lines[line].trim()})`)}`);

      }
      error('');
    }
    throw `${cyan('lint')} failed.`;
  }
};
