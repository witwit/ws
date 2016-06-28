import path from 'path';
import webpack from 'webpack';
import WebpackNodeExternals from 'webpack-node-externals';
import { resolve } from '../resolve';
import genericOptions from './generic-options';
import { project } from '../../project';

export default Object.assign({}, genericOptions, {
  entry: [
    'source-map-support/register',
    `./${project.ws.srcDir}/index.${project.ws.entryExtension}`
  ],
  module: {
    loaders: [
      // scripts
      {
        test: /\.ts(x?)$/,
        loader:
          `babel-loader?` +
          `presets[]=${resolve('babel-preset-nodejs-lts')},` +
          `presets[]=${resolve('babel-preset-stage-0')}&` +
          `plugins[]=${resolve('babel-plugin-transform-decorators-legacy')}` +
          `!ts-loader?silent=true`
      }
    ]
  },
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [
    // require json files with nodes built-in require logic
    function(context, request, callback) {
      if (/\.json$/.test(request)) {
        callback(null, 'commonjs ' + request);
      } else {
        callback();
      }
    },
    // in order to ignore all modules in node_modules folder
    WebpackNodeExternals()
  ]
});
