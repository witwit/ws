import { warn } from 'loglevel';
import path from 'path';
import { removeAsync, existsAsync } from 'fs-extra-promise';
import { cyan, yellow } from 'chalk';
import { project, TYPE } from '../project';
import {
  compileAsync,
  nodeUnitOptions,
  spaUnitOptions,
  getBrowserUnitOptions
} from '../lib/webpack';
import { testAsync as karmaTestAsync } from '../lib/karma';
import { testAsync as mochaTestAsync } from '../lib/mocha';
import { compile as compileI18n } from '../lib/i18n';
import { electronUnitOptions } from '../lib/webpack/options';

export default async function unit(options: any) {
  const hasUnitTests = await existsAsync(project.ws.unitEntry);
  if (!hasUnitTests) {
    warn(`${yellow('warn!')} You tried to run unit tests, but ${yellow(project.ws.unitEntry)} doesn't exist.`);
    return;
  }

  await removeAsync(project.ws.distTestsDir);

  let exitCode = 0;
  switch (project.ws.type) {
    case TYPE.NODE:
      await compileAsync(nodeUnitOptions);
      const files = [
        path.join(nodeUnitOptions.output.path, nodeUnitOptions.output.filename)
      ];
      exitCode = await mochaTestAsync(files);
      break;
    case TYPE.ELECTRON:
      if (project.ws.i18n) {
        await compileI18n();
      }
      await compileAsync(electronUnitOptions);
      exitCode = await karmaTestAsync(options);

      break;
    case TYPE.SPA:
      if (project.ws.i18n) {
        await compileI18n();
      }
      await compileAsync(spaUnitOptions);
      exitCode = await karmaTestAsync(options);
      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileI18n();
      }
      await compileAsync(getBrowserUnitOptions());
      exitCode = await karmaTestAsync(options);
      break;
  }

  if (exitCode !== 0) {
    throw `${cyan('unit')} failed.`;
  }
}
