import path from 'path';
import { removeAsync } from 'fs-extra-promise';
import { cyan } from 'chalk';
import { project, TYPE } from '../project';
import {
  compileAsync,
  createLocaleSpecificOptions,
  nodeUnitOptions,
  spaUnitOptions,
  browserUnitOptions
} from '../lib/webpack';
import { testAsync as karmaTestAsync } from '../lib/karma';
import { testAsync as mochaTestAsync  } from '../lib/mocha';

export default async function unit(options) {
  await removeAsync(project.ws.distTestsDir);

  let exitCode;
  switch (project.ws.type) {
    case TYPE.NODE:
      await compileAsync(nodeUnitOptions);
      const files = [
        path.join(nodeUnitOptions.output.path, nodeUnitOptions.output.filename)
      ];
      exitCode = await mochaTestAsync(files);
      break;
    case TYPE.SPA:
      if (project.ws.i18n) {
        await compileAsync(createLocaleSpecificOptions(spaUnitOptions, project.ws.i18n.locales[0]));
      } else {
        await compileAsync(spaUnitOptions);
      }
      exitCode = await karmaTestAsync(options);
      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileAsync(createLocaleSpecificOptions(browserUnitOptions, project.ws.i18n.locales[0]));
      } else {
        await compileAsync(browserUnitOptions);
      }
      exitCode = await karmaTestAsync(options);
      break;
  }

  if (exitCode !== 0) {
    throw `${cyan('unit')} failed.`;
  }
};
