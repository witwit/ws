const path = require('path');
const webpack = require('webpack');
const WebpackNodeExternals = require('webpack-node-externals');

const babelConfig = {
  presets: [
    [
      'babel-preset-env',
      {
        targets: { node: '6.10' },
        useBuiltIns: true
      }
    ],
    'babel-preset-stage-0'
  ],
  plugins: ['babel-plugin-transform-decorators-legacy']
};

module.exports = {
  // `stats` only available when used with webpack cli
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    children: false
  },
  entry: ['source-map-support/register', './src/index.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    sourcePrefix: '' // removes tabs before multiline strings
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: Object.assign({}, babelConfig, { cacheDirectory: true })
          },
          {
            loader: 'ts-loader',
            options: {
              logLevel: 'warn'
            }
          }
        ]
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
        callback(null, `require('${request}')`);
      } else {
        callback();
      }
    },
    // in order to ignore all modules in node_modules folder
    WebpackNodeExternals()
  ],
  devtool: 'cheap-module-inline-source-map',
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  }
};
