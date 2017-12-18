import {
  WebpackConfig,
  enzymeExternals,
  baseConfig,
  electronMainConfig,
  electronRendererConfig,
  externalsSpa,
  getEntryAndOutput,
  getModuleAndPlugins
} from './options';
import { BaseOptions } from '../../options';

export const getElectronBuildConfig = (
  options: BaseOptions
): WebpackConfig[] => {
  const mainConfig: WebpackConfig = {
    ...baseConfig,
    ...electronMainConfig,
    ...getEntryAndOutput('electron-main', 'build'),
    ...getModuleAndPlugins('electron-main', 'build', options),
    externals: externalsSpa // is this needed here?
  };

  const rendererConfig: WebpackConfig = {
    ...baseConfig,
    ...electronRendererConfig,
    ...getEntryAndOutput('electron-renderer', 'build'),
    ...getModuleAndPlugins('electron-renderer', 'build', options),
    externals: externalsSpa // is this needed here?
  };

  return [mainConfig, rendererConfig];
};

export const getElectronReleaseConfig = (
  options: BaseOptions
): WebpackConfig[] => {
  const mainConfig: WebpackConfig = {
    ...baseConfig,
    ...electronMainConfig,
    ...getEntryAndOutput('electron-main', 'build -p'),
    ...getModuleAndPlugins('electron-main', 'build -p', options),
    externals: externalsSpa // is this needed here?
  };

  const rendererConfig: WebpackConfig = {
    ...baseConfig,
    ...electronRendererConfig,
    ...getEntryAndOutput('electron-renderer', 'build -p'),
    ...getModuleAndPlugins('electron-renderer', 'build -p', options),
    externals: externalsSpa // is this needed here?
  };

  return [mainConfig, rendererConfig];
};

export const getElectronUnitConfig = (options: BaseOptions): WebpackConfig => ({
  ...baseConfig,
  ...electronRendererConfig,
  ...getEntryAndOutput('electron-renderer', 'unit'),
  ...getModuleAndPlugins('electron-renderer', 'unit', options),
  externals: enzymeExternals
});
