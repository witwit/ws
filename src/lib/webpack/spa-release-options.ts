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

const webpack = require('webpack');

const options: WsWebpackConfiguration = Object.assign({}, spaOptions, {
  output: outputSpaRelease,
  plugins: [
    indexHtmlPlugin,
    extractCssHashPlugin,
    defineProductionPlugin,
    minifyJsPlugin,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  devtool: devtoolProduction
});

export default options;
