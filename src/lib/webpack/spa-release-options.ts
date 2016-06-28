import { join } from 'path';
import { DefinePlugin, optimize } from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import spaOptions from './spa-options';
import { project } from '../../project';

export default Object.assign({}, spaOptions, {
  output: Object.assign({}, spaOptions.output, {
    path: join(process.cwd(), project.ws.distReleaseDir), // must be absolute
    filename: 'index-[hash].js'
  }),
  plugins: spaOptions.plugins.filter(plugin => !(plugin instanceof ExtractTextWebpackPlugin)).concat([
    new ExtractTextWebpackPlugin('style-[contenthash].css'),
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
