import { Configuration } from 'webpack';
import {
  entry,
  outputUmd,
  tsLoader,
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
  postcssPlugin
} from './generic';

const options: Configuration = {
  entry,
  output: outputUmd,
  module: {
    loaders: [
      tsLoader,
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
