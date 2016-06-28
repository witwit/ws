import { join } from 'path';
import { DefinePlugin, optimize } from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import browserOptions from './browser-options';

export default Object.assign({}, browserOptions, {
  output: Object.assign({}, browserOptions.output, {
    filename: 'index.min.js'
  }),
  plugins: browserOptions.plugins.filter(plugin => !(plugin instanceof ExtractTextWebpackPlugin)).concat([
    new ExtractTextWebpackPlugin('style.min.css'),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new optimize.OccurenceOrderPlugin(true)
  ]),
  devtool: 'source-map'
});
