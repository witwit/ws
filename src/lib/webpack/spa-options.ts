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
  devtool
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
    extractCssPlugin
  ],
  resolveLoader,
  resolve,
  devtool
};

export default options;
