import { join } from 'path';
import { existsAsync, copyAsync, readJsonAsync, writeJsonAsync, removeAsync } from 'fs-extra-promise';
import { compileAsync } from './index';
import { getSpaBuildDllOptions } from './options';
import { project } from '../../project';
import globby from 'globby';
import { info } from 'loglevel';

const md5File = require('md5-file/promise');

export const wsCache = join(process.cwd(), 'node_modules', '.ws-cache');
export const wsCacheMetadata = join(wsCache, 'metadata.json');
export const dllCache = join(wsCache, 'dll');

interface CacheMetdata {
  dependencyHash: string;
}

const buildDll = async () => {
  await removeAsync(dllCache);
  await compileAsync(getSpaBuildDllOptions());
  await writeJsonAsync(wsCacheMetadata, {
    dependencyHash: await getDependencyHash()
  });
  info('...build dll');
};

const getDependencyHash = async (): Promise<string> => {
  try {
    return await md5File(join(process.cwd(), 'yarn.lock'));
  } catch (e) {
    try {
      return await md5File(join(process.cwd(), 'package.json'));
    } catch (e) {
      throw 'Missing yarn.lock or package.json detected';
    }
  }
};

export const verifyDll = async (locales: Array<string>) => {
  const exists = await existsAsync(dllCache);

  if (!exists) {
    await buildDll();
  } else {
    const persistedDepHash = (await readJsonAsync(wsCacheMetadata) as CacheMetdata).dependencyHash;
    const currentDepHash = await getDependencyHash();

    if (persistedDepHash !== currentDepHash) {
      await buildDll();
    }
  }

  // copy dll assets to locale dist dirs
  const files = await globby('**/*', { cwd: dllCache });

  // support unlocalized SPAs
  if (locales == null || locales.length === 0) {
    locales = [''];
  }

  await Promise.all(
    locales.map(locale =>
      Promise.all(
        files.map(file => copyAsync(join(dllCache, file), join(project.ws.distDir, locale, file)))
      )
    )
  );
};
