import spaI18nOptions from './spa-i18n-options';
import {
  outputSpaRelease,
  indexHtmlI18nPlugin,
  extractCssHashPlugin,
  defineProductionPlugin,
  minifyJsPlugin,
  devtoolProduction,
  defineLocalesPlugin,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = Object.assign({}, spaI18nOptions, {
  output: outputSpaRelease,
  plugins: [
    indexHtmlI18nPlugin,
    extractCssHashPlugin,
    defineProductionPlugin,
    defineLocalesPlugin,
    minifyJsPlugin
  ],
  devtool: devtoolProduction
});

export default options;
