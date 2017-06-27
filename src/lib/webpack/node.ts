import {
  WebpackConfig,
  baseConfig,
  nodeConfig,
  getEntryAndOutput,
  getModuleAndPlugins
} from './options';

export const getNodeBuildConfig = (): WebpackConfig => ({
  ...baseConfig,
  ...nodeConfig,
  ...getEntryAndOutput('node', 'build'),
  ...getModuleAndPlugins('node', 'build')
});

export const getNodeUnitConfig = (): WebpackConfig => ({
  ...baseConfig,
  ...nodeConfig,
  ...getEntryAndOutput('node', 'unit'),
  ...getModuleAndPlugins('node', 'unit')
});
