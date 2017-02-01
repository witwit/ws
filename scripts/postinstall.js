const join = require('path').join;
const resolveFrom = require('resolve-from');
const execSync = require('child_process').execSync;

const phantom = resolveFrom(join(__dirname, '..'), 'phantomjs-prebuilt/install.js');
execSync(`node ${phantom}`, { stdio: 'inherit' });
