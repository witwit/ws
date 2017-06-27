import { join } from 'path';
import globby from 'globby';
import { existsAsync } from 'fs-extra-promise';
import { createProgram } from 'typescript';
import { red } from 'chalk';
import { project } from '../project';
import { defaultFilePatterns } from './tslint';

export async function generateTypings(
  declarationDir: string,
  filePatterns = defaultFilePatterns
) {
  if (project.typings) {
    const filePaths = await globby(filePatterns);
    const options = {
      declaration: true,
      declarationDir
    };

    createProgram(filePaths, options).emit(
      undefined, // targetSourceFile
      undefined, // writeFile
      undefined, // cancellationToken
      true // emitOnlyDtsFiles
    );

    // check if they exist at the same place where it is configured in your package.json
    const exist = await existsAsync(join(process.cwd(), project.typings));
    if (!exist) {
      throw `${red('typings')} do not exist in ${project.typings}`;
    }
  }
}
