import { join } from 'path';
import { info } from 'loglevel';
import { removeAsync, existsAsync } from 'fs-extra-promise';
import { project, TYPE } from '../project';
import {
  compileAsync,
  nodeDevOptions,
  spaDevOptions,
  spaReleaseOptions,
  spaRootI18nDevOptions,
  spaRootI18nReleaseOptions,
  browserDevOptions,
  browserReleaseOptions
} from '../lib/webpack';
import { compileI18n } from '../lib/i18n-compile';
import { copy } from '../lib/copy';

export default async function build(options) {
  switch (project.ws.type) {
    case TYPE.NODE:
      await removeAsync(project.ws.distDir);
      await compileAsync(nodeDevOptions);
      break;
    case TYPE.SPA:
      if (options.production) {
        await removeAsync(project.ws.distReleaseDir);
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
          const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
          if (hasI18nEntry) {
            await compileAsync(spaRootI18nReleaseOptions);
          }
        }
        await compileAsync(spaReleaseOptions);
        if (project.ws.i18n) {
          // this is a quich fix to get relative path for assets in localized spa's working
          await Promise.all(project.ws.i18n.locales.map(locale =>
            copy(project.ws.distReleaseDir, join(project.ws.distReleaseDir, locale), '*.{png,jpg,gif,svg,eot,woff,woff2,ttf}')));
        }
      } else {
        await removeAsync(project.ws.distDir);
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
          const hasI18nEntry = await existsAsync(project.ws.srcI18nEntry);
          if (hasI18nEntry) {
            await compileAsync(spaRootI18nDevOptions);
          }
        }
        await compileAsync(spaDevOptions);
        if (project.ws.i18n) {
          // this is a quich fix to get relative path for assets in localized spa's working
          await Promise.all(project.ws.i18n.locales.map(locale =>
            copy(project.ws.distDir, join(project.ws.distDir, locale), '*.{png,jpg,gif,svg,eot,woff,woff2,ttf}')));
        }
      }
      break;
    case TYPE.BROWSER:
      if (options.production) {
        await removeAsync(project.ws.distReleaseDir);
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
        }
        await compileAsync(browserReleaseOptions);
      } else {
        await removeAsync(project.ws.distDir);
        if (project.ws.i18n) {
          await compileI18n();
          info('...build translations');
        }
        await compileAsync(browserDevOptions);
      }
      break;
  }
};
