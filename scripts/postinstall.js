// called by postinstall hook
const join = require('path').join;
const existsSync = require('fs').existsSync;
const writeFileSync = require('fs').writeFileSync;
const unlinkSync = require('fs').unlinkSync;

const cwd = join(__dirname, '..');
const isWithinPostinstallFile = join(__dirname, 'is-within-postinstall'); // avoid infinite loop

if (!existsSync(join(cwd, 'dist')) && !existsSync(isWithinPostinstallFile)) {
  console.log(`It seems ${require('../package.json').name} was installed with Git. We need to build the package now.`);
  try {
    writeFileSync(isWithinPostinstallFile, '');
    const execSync = require('child_process').execSync;

    const stdio = 'inherit';
    const execOptions = { cwd, stdio };

    execSync('npm install --no-optional', execOptions);
    // surprise! `npm install` will also trigger `npm prepublish` which will build our package
    unlinkSync(isWithinPostinstallFile);
  } catch (err) {
    unlinkSync(isWithinPostinstallFile);
    throw err;
  }
}
