import { join } from 'path';
// import genericOptions from './generic-options';
import spaOptions from './spa-options';
import { project } from '../../project';

export default Object.assign({}, spaOptions, {
  entry: [
    `./${project.ws.testsDir}/unit.${project.ws.entryExtension}`
  ],
  output: Object.assign({}, spaOptions.output, {
    path: join(process.cwd(), project.ws.distTestsDir) // must be absolute
  }),
  // module: spaOptions.module,
  devtool: 'inline-source-map'
});
