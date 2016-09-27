import {
  entryNode,
  outputCommon2,
  tsLoaderNode,
  externalsNode,
  resolveLoader,
  resolve,
  devtool,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = {
  entry: entryNode,
  output: outputCommon2,
  module: {
    loaders: [
      tsLoaderNode
    ]
  },
  externals: externalsNode,
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  resolveLoader,
  resolve,
  devtool
};

export default options;
