import { info } from 'loglevel';
import { removeAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import { compile as compileI18n } from '../lib/i18n';
import { compileAsync } from '../lib/webpack/compiler';
import { getNodeBuildConfig } from '../lib/webpack/node';
import {
  getElectronReleaseConfig,
  getElectronBuildConfig
} from '../lib/webpack/electron';
import { getSpaReleaseConfig, getSpaBuildConfig } from '../lib/webpack/spa';
import {
  getBrowserReleaseConfig,
  getBrowserBuildConfig
} from '../lib/webpack/browser';
import { generateTypings } from '../lib/typescript';

export interface BuildOptions {
  locales: Array<string>;
  production?: true;
}

export default async function build(options: BuildOptions) {
  // clean up
  if (options.production) {
    await removeAsync(project.ws.distReleaseDir);
  } else {
    await removeAsync(project.ws.distDir);
  }

  // prepare i18n
  if (project.ws.i18n) {
    await compileI18n();
    info('...build translations');
  }

  // build
  switch (project.ws.type) {
    case TYPE.NODE:
      await compileAsync(getNodeBuildConfig());
      break;
    case TYPE.ELECTRON:
      if (options.production) {
        await compileAsync(getElectronReleaseConfig());
      } else {
        await compileAsync(getElectronBuildConfig());
      }
      break;
    case TYPE.SPA:
      if (options.production) {
        await compileAsync(getSpaReleaseConfig());
      } else {
        await compileAsync(getSpaBuildConfig());
      }
      break;
    case TYPE.BROWSER:
      if (options.production) {
        await compileAsync(getBrowserReleaseConfig());
      } else {
        await compileAsync(getBrowserBuildConfig());
      }
      break;
  }

  // typings (only if typings are set in package.json)
  if (options.production) {
    await generateTypings(project.ws.distReleaseDir);
  }
}
