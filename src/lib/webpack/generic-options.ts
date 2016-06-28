import path from 'path';
import { project } from '../../project';

export default {
  output: {
    path: path.join(process.cwd(), project.ws.distDir), // must be absolute
    filename: 'index.js',
    // don't use webpack:/// protocol for source maps
    devtoolModuleFilenameTemplate: './[resource-path]',
    sourcePrefix: ''  // removes tabs before multiline strings
  },
  resolveLoader: {
    root: [
      // if you symlink the ws tool (e.g. while development), you want to resolve loaders
      // relative to the ws tool first (just like a normale `require()` would work)
      path.join(__dirname, '..', 'node_modules'), // relative to `dist/index.js`
      path.join(process.cwd(), 'node_modules')
    ]
  },
  resolve: {
    // include typescript extensions
    extensions: [
      '',
      '.ts',
      '.tsx',
      '.js'
    ]
  },
  devtool: 'cheap-module-inline-source-map'
};
