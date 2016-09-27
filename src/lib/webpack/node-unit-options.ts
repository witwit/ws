import nodeOptions from './node-options';
import { entryNodeUnit, outputTest, WsWebpackConfiguration } from './generic';

const options: WsWebpackConfiguration = Object.assign({}, nodeOptions, {
  entry: entryNodeUnit,
  output: outputTest
});

export default options;
