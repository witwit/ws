import browserOptions from './browser-options';
import {
  outputUmdMin,
  extractCssMinPlugin,
  defineProductionPlugin,
  minifyJsPlugin,
  devtoolProduction,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = Object.assign({}, browserOptions, {
  output: outputUmdMin,
  plugins: [
    extractCssMinPlugin,
    defineProductionPlugin,
    minifyJsPlugin
  ],
  devtool: devtoolProduction
});

export default options;
