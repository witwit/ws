import path from 'path';
import nodeOptions from './node-options';
import { project } from '../../project';

export default Object.assign({}, nodeOptions, {
  entry:[
    'source-map-support/register',
    `./${project.ws.testsDir}/unit.${project.ws.entryExtension}`
  ],
  output: Object.assign({}, nodeOptions.output, {
    path: path.join(process.cwd(), project.ws.distTestsDir) // must be absolute
  })
});
