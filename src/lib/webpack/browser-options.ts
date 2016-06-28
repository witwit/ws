import path from 'path';
import webpack from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import OmitTildeWebpackPlugin from 'omit-tilde-webpack-plugin';
import { resolve } from '../resolve';
import genericOptions from './generic-options';
import { project } from '../../project';

// by default we mark every `dependency` as external by setting `{ 'external-module': true }`
// see https://webpack.github.io/docs/configuration.html#externals
const defaultExternals = Object.keys(project.dependencies || {}).reduce((target, key) => {
  target[key] = true;
  return target;
}, {});

export default Object.assign({}, genericOptions, {
  entry: [
    `./${project.ws.srcDir}/index.${project.ws.entryExtension}`
  ],
  output: Object.assign({}, genericOptions.output, {
    libraryTarget: 'umd',
    library: project.name
  }),
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        loader:
          `babel-loader?` +
          `presets[]=${resolve('babel-preset-es2015')},` +
          `presets[]=${resolve('babel-preset-react')},` +
          `presets[]=${resolve('babel-preset-stage-0')}&` +
          `plugins[]=${resolve('babel-plugin-transform-decorators-legacy')}` +
          `!ts-loader?silent=true`
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // styles
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract('css-loader?sourceMap')
      },
      {
        test: /\.less/,
        loader: ExtractTextWebpackPlugin.extract('css-loader?sourceMap!less-loader?sourceMap')
      },
      // assets
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      }
    ]
  },
  plugins: [
    new OmitTildeWebpackPlugin({
      include: [ 'package.json' ]
    }),
    new ExtractTextWebpackPlugin('style.css')
  ],
  externals: [
    Object.assign(defaultExternals, project.ws.externals)
  ]
});
