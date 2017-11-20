const join = require('path').join;
const rimrafSync = require('rimraf').sync;
const execSync = require('child_process').execSync;

const cwd = join(process.cwd(), 'examples');

console.log('Reset old test artefacts...');
rimrafSync(join(cwd, '**', 'dist'));
rimrafSync(join(cwd, '**', 'dist-tests'));
rimrafSync(join(cwd, '**', 'dist-release'));

const stdio = 'inherit';
const options = { cwd, stdio };

console.log('Update deps...');
execSync('yarn', options);

console.log('Run actions...');
execSync('yarn lint', options);
execSync('yarn build:production', options);
execSync('yarn build', options);
execSync('yarn unit', options);

console.log('Updated all examples ♥');
