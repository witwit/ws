import path from 'path';
import log from 'npmlog';
import { removeAsync } from 'fs-extra-promise';
import { ActionError } from '../error';
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

const NAME = 'unit';

export default async function unit() {
  log.info(NAME, 'Run unit tests...');

  await removeAsync(project.ws.distTestsDir);
  switch (project.ws.type) {
    case TYPE.NODE:
      await compileAsync(nodeUnitOptions);
      const files = [
        path.join(nodeUnitOptions.output.path, nodeUnitOptions.output.filename)
      ];
      try {
        await mochaTestAsync(files);
      } catch (err) {
        throw new ActionError(NAME, 'Unit tests failed.');
      }
      break;
    case TYPE.SPA:
      if (project.ws.i18n) {
        await compileAsync(createLocaleSpecificOptions(spaUnitOptions, project.ws.i18n.locales[0]));
      } else {
        await compileAsync(spaUnitOptions);
      }
      try {
        await karmaTestAsync();
      } catch (err) {
        throw new ActionError(NAME, 'Unit tests failed.');
      }
      break;
    case TYPE.BROWSER:
      if (project.ws.i18n) {
        await compileAsync(createLocaleSpecificOptions(browserUnitOptions, project.ws.i18n.locales[0]));
      } else {
        await compileAsync(browserUnitOptions);
      }
      try {
        await karmaTestAsync();
      } catch (err) {
        throw new ActionError(NAME, 'Unit tests failed.');
      }
      break;
  }

  log.info(NAME, 'Unit testing was successful. ♥');
};
