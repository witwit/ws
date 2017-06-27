import { warn } from 'loglevel';
import path from 'path';
import { removeAsync, existsAsync } from 'fs-extra-promise';
import { cyan, yellow } from 'chalk';
import { project, TYPE } from '../project';
import { testAsync as karmaTestAsync } from '../lib/karma';
import { testAsync as mochaTestAsync } from '../lib/mocha';
import { compile as compileI18n } from '../lib/i18n';
import { compileAsync } from '../lib/webpack/compiler';
import { getNodeUnitConfig } from '../lib/webpack/node';
import { getElectronUnitConfig } from '../lib/webpack/electron';
import { getSpaUnitConfig } from '../lib/webpack/spa';
import { getBrowserUnitConfig } from '../lib/webpack/browser';

export default async function unit(options: any) {
  const hasUnitTests = await existsAsync(project.ws.unitEntry);
  if (!hasUnitTests) {
    warn(
      `${yellow('warn!')} You tried to run unit tests, but ${yellow(
        project.ws.unitEntry
      )} doesn't exist.`
    );
    return;
  }

  await removeAsync(project.ws.distTestsDir);

  let exitCode = 0;
  switch (project.ws.type) {
    case TYPE.NODE:
      const config = getNodeUnitConfig();
      await compileAsync(config);
      const files = [path.join(config.output.path, 'index.js')];
      exitCode = await mochaTestAsync(files);
      break;
    case TYPE.ELECTRON:
      if (project.ws.i18n) {
        await compileI18n();
      }

      await compileAsync(getElectronUnitConfig());
      exitCode = await karmaTestAsync(options);

      break;
    case TYPE.SPA:
      if (project.ws.i18n) {
        await compileI18n();
      }

      await compileAsync(getSpaUnitConfig());
      exitCode = await karmaTestAsync(options);

      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileI18n();
      }

      await compileAsync(getBrowserUnitConfig());
      exitCode = await karmaTestAsync(options);

      break;
  }

  if (exitCode !== 0) {
    throw `${cyan('unit')} failed.`;
  }
}
