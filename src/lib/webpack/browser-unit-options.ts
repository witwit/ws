import { join } from 'path';
import genericOptions from './generic-options';
import browserOptions from './browser-options';
import { project } from '../../project';

export default Object.assign({}, browserOptions, {
  entry: [
    `./${project.ws.testsDir}/unit.${project.ws.entryExtension}`
  ],
  output: Object.assign({}, genericOptions.output, {
    path: join(process.cwd(), project.ws.distTestsDir) // must be absolute
  }),
  externals: [],
  devtool: 'inline-source-map'
});
