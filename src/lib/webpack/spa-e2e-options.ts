import nodeOptions from './node-options';
import {
  entryE2e,
  outputTest,
  devtoolTest,
  WsWebpackConfiguration
} from './generic';

const options: WsWebpackConfiguration = Object.assign({}, nodeOptions, {
  entry: entryE2e,
  output: outputTest,
  devtool: devtoolTest
});

export default options;
