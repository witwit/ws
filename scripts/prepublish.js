const join = require('path').join;
const writeFileSync = require('fs').writeFileSync;
const execSync = require('child_process').execSync;

const cwd = join(__dirname, '..');
const pkgPath = join(cwd, 'package.json');
const pkg = require(pkgPath);
const stdio = 'inherit';
const execOptions = { cwd, stdio };

// don't run prepublish within install
// see https://github.com/npm/npm/issues/3059
if (pkg.wasCalledByInstall) {
  delete pkg.wasCalledByInstall;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
} else {
  execSync('npm run build', execOptions);
}
