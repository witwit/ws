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

export const getElectronBuildConfig = () => {
  const mainConfig: WebpackConfig = {
    ...baseConfig,
    ...electronMainConfig,
    ...getEntryAndOutput('electron-main', 'build'),
    ...getModuleAndPlugins('electron-main', 'build'),
    externals: externalsSpa // is this needed here?
  };

  const rendererConfig: WebpackConfig = {
    ...baseConfig,
    ...electronRendererConfig,
    ...getEntryAndOutput('electron-renderer', 'build'),
    ...getModuleAndPlugins('electron-renderer', 'build'),
    externals: externalsSpa // is this needed here?
  };

  return [mainConfig, rendererConfig];
};

export const getElectronReleaseConfig = () => {
  const mainConfig: WebpackConfig = {
    ...baseConfig,
    ...electronMainConfig,
    ...getEntryAndOutput('electron-main', 'build -p'),
    ...getModuleAndPlugins('electron-main', 'build -p'),
    externals: externalsSpa // is this needed here?
  };

  const rendererConfig: WebpackConfig = {
    ...baseConfig,
    ...electronRendererConfig,
    ...getEntryAndOutput('electron-renderer', 'build -p'),
    ...getModuleAndPlugins('electron-renderer', 'build -p'),
    externals: externalsSpa // is this needed here?
  };

  return [mainConfig, rendererConfig];
};

export const getElectronUnitConfig = (): WebpackConfig => ({
  ...baseConfig,
  ...electronRendererConfig,
  ...getEntryAndOutput('electron-renderer', 'unit'),
  ...getModuleAndPlugins('electron-renderer', 'unit'),
  externals: enzymeExternals
});
