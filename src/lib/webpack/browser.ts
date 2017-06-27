import {
  WebpackConfig,
  externalsBrowser,
  enzymeExternals,
  baseConfig,
  releaseConfig,
  getEntryAndOutput,
  getModuleAndPlugins
} from './options';

export const getBrowserBuildConfig = (): WebpackConfig => ({
  ...baseConfig,
  ...getEntryAndOutput('browser', 'build'),
  ...getModuleAndPlugins('browser', 'build'),
  externals: externalsBrowser
});

export const getBrowserReleaseConfig = (): WebpackConfig => ({
  ...baseConfig,
  ...releaseConfig,
  ...getEntryAndOutput('browser', 'build -p'),
  ...getModuleAndPlugins('browser', 'build -p'),
  externals: externalsBrowser
});

export const getBrowserUnitConfig = (): WebpackConfig => ({
  ...baseConfig,
  ...getEntryAndOutput('browser', 'unit'),
  ...getModuleAndPlugins('browser', 'build -p'),
  externals: enzymeExternals
});
