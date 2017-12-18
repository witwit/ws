import {
  WebpackConfig,
  enzymeExternals,
  externalsSpa,
  baseConfig,
  nodeConfig,
  releaseConfig,
  getEntryAndOutput,
  getModuleAndPlugins
} from './options';
import { BaseOptions } from '../../options';

export const getSpaBuildConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...getEntryAndOutput('spa', 'build'),
  ...getModuleAndPlugins('spa', 'build', options),
  externals: externalsSpa
});

export const getSpaReleaseConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...releaseConfig,
  ...getEntryAndOutput('spa', 'build -p'),
  ...getModuleAndPlugins('spa', 'build -p', options)
});

export const getSpaUnitConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...getEntryAndOutput('spa', 'unit'),
  ...getModuleAndPlugins('spa', 'unit', options),
  externals: enzymeExternals
});

export const getSpaE2eConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...nodeConfig,
  ...getEntryAndOutput('node', 'e2e'),
  ...getModuleAndPlugins('node', 'e2e', options)
});
