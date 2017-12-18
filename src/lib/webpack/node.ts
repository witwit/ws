import {
  WebpackConfig,
  baseConfig,
  nodeConfig,
  getEntryAndOutput,
  getModuleAndPlugins
} from './options';
import { BaseOptions } from '../../options';

export const getNodeBuildConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...nodeConfig,
  ...getEntryAndOutput('node', 'build'),
  ...getModuleAndPlugins('node', 'build', options)
});

export const getNodeUnitConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...nodeConfig,
  ...getEntryAndOutput('node', 'unit'),
  ...getModuleAndPlugins('node', 'unit', options)
});
