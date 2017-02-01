const join = require('path').join;
const execSync = require('child_process').execSync;
const existsSync = require('fs').existsSync;

const phantom = 'node_modules/phantomjs-prebuilt/install.js';
const depDir = join('..', phantom);
const parentDir = join('..', '..', phantom);

if (existsSync(depDir)) {
  execSync(`node ${depDir}`);
} else {
  execSync(`node ${parentDir}`);
}
