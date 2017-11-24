// Lerna is flaky on Travis :(
// see https://github.com/lerna/lerna/issues/1131

/*
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

console.log('Update example dependencies...');
execSync('yarn', options);

console.log('Run actions...');
execSync('yarn lint', options);
execSync('yarn build:production', options);
execSync('yarn build', options);
execSync('yarn unit', options);

console.log('Updated all examples ♥');
*/

// Use this non-Lerna script for Travis
const join = require('path').join;
const existsSync = require('fs').existsSync;
const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;
const rimrafSync = require('rimraf').sync;

const examples = [
  'browser-js',
  'browser-less',
  'browser-ts',
  'browser-ts-react',
  'browser-ts-react-i18n',
  'node-ts',
  'node-ts-2',
  // 'electron-ts',
  // 'electron-ts-i18n',
  'spa-ts',
  'spa-ts-i18n',
  'spa-ts-lazy-import'
];

const stdio = 'inherit';

execSync('yarn', { cwd: join(process.cwd(), 'examples'), stdio });

examples.forEach(example => {
  console.log(`Update "${example}":`);
  try {
    // fresh start
    const cwd = join(process.cwd(), 'examples', 'packages', example);
    rimrafSync(join(cwd, 'dist'));
    rimrafSync(join(cwd, 'dist-tests'));
    rimrafSync(join(cwd, 'dist-release'));

    // test commands
    execSync('npm run -s ws -- build', { cwd, stdio });
    if (
      example.includes('spa') ||
      example.includes('browser') ||
      example.includes('electron') ||
      example === 'ws-intl'
    ) {
      execSync('npm run -s ws -- build --production', { cwd, stdio });
    }
    execSync('npm run -s ws -- lint', { cwd, stdio });
    if (
      existsSync(join(cwd, 'tests', 'unit.ts')) ||
      existsSync(join(cwd, 'tests', 'unit.js')) ||
      existsSync(join(cwd, 'tests', 'unit.tsx'))
    ) {
      execSync('npm run -s ws -- unit', { cwd, stdio });
    }
    // test grid
    // if (example === 'spa-ts') {
    //   const server = spawn('npm', [ 'run', '-s', 'ws', '--', 'serve'], { cwd, stdio });
    //   execSync('npm run -s ws -- e2e --browsers ff', { cwd, stdio });
    //   // execSync('npm run -s ws -- e2e -g', { cwd, stdio });
    //   // execSync('npm run -s ws -- unit -g', { cwd, stdio });
    //   server.kill();
    // }
  } catch (err) {
    throw `[ERROR] Couldn't update "${example}"!`;
  }
  console.log(`Finished updating "${example}".`);
});

console.log('Updated all examples ♥');
