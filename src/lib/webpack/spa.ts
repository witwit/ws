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

export const getSpaBuildConfig = (): WebpackConfig => ({
  ...baseConfig,
  ...getEntryAndOutput('spa', 'build'),
  ...getModuleAndPlugins('spa', 'build'),
  externals: externalsSpa
});

export const getSpaReleaseConfig: () => WebpackConfig = () => ({
  ...baseConfig,
  ...releaseConfig,
  ...getEntryAndOutput('spa', 'build -p'),
  ...getModuleAndPlugins('spa', 'build -p')
});

export const getSpaUnitConfig: () => WebpackConfig = () => ({
  ...baseConfig,
  ...getEntryAndOutput('spa', 'unit'),
  ...getModuleAndPlugins('spa', 'unit'),
  externals: enzymeExternals
});

export const getSpaE2eConfig: () => WebpackConfig = () => ({
  ...baseConfig,
  ...nodeConfig,
  ...getEntryAndOutput('node', 'e2e'),
  ...getModuleAndPlugins('node', 'e2e')
});
