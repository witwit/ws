import {
  WebpackConfig,
  externalsBrowser,
  enzymeExternals,
  baseConfig,
  releaseConfig,
  getEntryAndOutput,
  getModuleAndPlugins
} from './options';
import { BaseOptions } from '../../options';

export const getBrowserBuildConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...getEntryAndOutput('browser', 'build'),
  ...getModuleAndPlugins('browser', 'build', options),
  externals: externalsBrowser
});

export const getBrowserReleaseConfig = (
  options: BaseOptions
): WebpackConfig => ({
  ...baseConfig,
  ...releaseConfig,
  ...getEntryAndOutput('browser', 'build -p'),
  ...getModuleAndPlugins('browser', 'build -p', options),
  externals: externalsBrowser
});

export const getBrowserUnitConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...getEntryAndOutput('browser', 'unit'),
  ...getModuleAndPlugins('browser', 'unit', options),
  externals: enzymeExternals
});
