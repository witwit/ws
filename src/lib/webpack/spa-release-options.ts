import spaOptions from './spa-options';
import {
  outputSpaRelease,
  indexHtmlPlugin,
  extractCssHashPlugin,
  defineProductionPlugin,
  minifyJsPlugin,
  devtoolProduction,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = Object.assign({}, spaOptions, {
  output: outputSpaRelease,
  plugins: [
    indexHtmlPlugin,
    extractCssHashPlugin,
    defineProductionPlugin,
    minifyJsPlugin
  ],
  devtool: devtoolProduction
});

export default options;
