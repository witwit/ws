import { Configuration } from 'webpack';
import {
  entry,
  output,
  tsLoader,
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
  postcssPlugin
} from './generic';

const options: Configuration = {
  entry,
  output,
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
    indexHtmlPlugin,
    extractCssPlugin,
    postcssPlugin
  ],
  resolveLoader,
  resolve,
  devtool
};

export default options;
