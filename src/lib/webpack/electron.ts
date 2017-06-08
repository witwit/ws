import {
  WebpackSingleConfig,
  outputDev,
  getModuleConfig,
  indexHtmlPlugin,
  extractCssPlugin,
  loaderOptionsPlugin,
  resolveLoader,
  devtool,
  resolve,
  defineProductionPlugin,
  outputTest,
  enzymeExternals
} from './options';
import { project } from '../../project';

export const getElectronDevOptions = (): Array<WebpackSingleConfig> => {
  const mainProcessConfig: WebpackSingleConfig = {
    entry: {
      electron: project.ws.srcElectronEntry
    },
    output: {
      ...outputDev,
      filename: '[name].js'
    },
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false
    },
    module: getModuleConfig('build'),
    plugins: [indexHtmlPlugin, extractCssPlugin, loaderOptionsPlugin],
    externals: project.ws.externals ? [project.ws.externals] : [],
    resolveLoader,
    performance: {
      hints: false
    },
    resolve,
    devtool
  };

  return [
    mainProcessConfig,
    {
      ...mainProcessConfig,
      target: 'electron-renderer',
      entry: {
        index: project.ws.srcEntry
      }
    }
  ];
};

export const getElectronReleaseOptions = () => {
  const options = getElectronDevOptions();

  return options.map(config => ({
    ...config,
    plugins: [...config.plugins!, defineProductionPlugin]
  }));
};

export const electronUnitOptions: WebpackSingleConfig = {
  entry: project.ws.unitEntry,
  output: outputTest,
  module: getModuleConfig('unit'),
  plugins: [extractCssPlugin, loaderOptionsPlugin],
  target: 'electron-renderer',
  externals: enzymeExternals.concat(
    project.ws.externals ? [project.ws.externals] : []
  ),
  performance: {
    hints: false
  },
  resolveLoader,
  resolve,
  devtool
};
