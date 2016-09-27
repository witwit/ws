import {
  entry,
  output,
  tsLoaderBrowser,
  jsonLoader,
  cssLoader,
  lessLoader,
  imageLoader,
  eotLoader,
  woffLoader,
  ttfLoader,
  indexHtmlPlugin,
  extractCssPlugin,
  resolveLoader,
  resolve,
  devtool,
  postcssPlugin,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = {
  entry,
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
    indexHtmlPlugin,
    extractCssPlugin,
    postcssPlugin
  ],
  resolveLoader,
  resolve,
  devtool
};

export default options;
