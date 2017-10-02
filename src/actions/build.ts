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
      await compileAsync(getNodeBuildConfig(), 'build');
      break;
    case TYPE.ELECTRON:
      if (options.production) {
        await compileAsync(getElectronReleaseConfig(), 'build -p');
      } else {
        await compileAsync(getElectronBuildConfig(), 'build');
      }
      break;
    case TYPE.SPA:
      if (options.production) {
        await compileAsync(getSpaReleaseConfig(), 'build -p');
      } else {
        await compileAsync(getSpaBuildConfig(), 'build');
      }
      break;
    case TYPE.BROWSER:
      if (options.production) {
        await compileAsync(getBrowserReleaseConfig(), 'build -p');
      } else {
        await compileAsync(getBrowserBuildConfig(), 'build');
      }
      break;
  }

  // typings (will be only genereated, if typings are set in package.json)
  if (options.production) {
    await generateTypings(project.ws.distReleaseDir);
  } else if (project.ws.type === TYPE.NODE) {
    await generateTypings(project.ws.distDir);
  }
}
