import {
  entryI18n,
  output,
  tsLoaderBrowser,
  jsonLoader,
  cssLoader,
  lessLoader,
  imageLoader,
  eotLoader,
  woffLoader,
  ttfLoader,
  indexHtmlI18nPlugin,
  extractCssPlugin,
  resolveLoader,
  resolve,
  devtool,
  postcssPlugin,
  defineLocalesPlugin,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = {
  entry: entryI18n,
  output,
  module: {
    loaders: [
      tsLoaderBrowser,
      jsonLoader,
      cssLoader,
      lessLoader,
      imageLoader,
      eotLoader,
      woffLoader,
      ttfLoader
    ]
  },
  plugins: [
    indexHtmlI18nPlugin,
    extractCssPlugin,
    postcssPlugin,
    defineLocalesPlugin
  ],
  resolveLoader,
  resolve,
  devtool
};

export default options;
