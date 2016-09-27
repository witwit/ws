import browserOptions from './browser-options';
import {
  entryUnit,
  outputTest,
  devtoolTest,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = Object.assign({}, browserOptions, {
  entry: entryUnit,
  output: outputTest,
  externals: [],
  devtool: devtoolTest
});

export default options;
