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
  devtool
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
    extractCssPlugin
  ],
  externals: externalsBrowser,
  resolveLoader,
  resolve,
  devtool: 'cheap-module-inline-source-map'
};

export default options;
