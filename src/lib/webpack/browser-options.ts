import {
  entry,
  outputCommon2,
  tsLoaderBrowser,
  jsonLoader,
  cssLoader,
  lessLoader,
  imageLoader,
  eotLoader,
  woffLoader,
  ttfLoader,
  extractCssPlugin,
  externalsBrowser,
  resolveLoader,
  resolve,
  devtool,
  postcssPlugin,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = {
  entry,
  output: outputCommon2,
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
    extractCssPlugin,
    postcssPlugin
  ],
  externals: externalsBrowser,
  resolveLoader,
  resolve,
  devtool
};

export default options;
