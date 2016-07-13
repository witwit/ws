const join = require('path').join;
const existsSync = require('fs').existsSync;
const writeFileSync = require('fs').writeFileSync;
const execSync = require('child_process').execSync;

const cwd = join(__dirname, '..');
const pkgPath = join(cwd, 'package.json');
const pkg = require(pkgPath);
const stdio = 'inherit';
const execOptions = { cwd, stdio };

// check if this package is installed as a dependency of another package
// if this is the case "npm i" was called from a different directoy
const isInstalledAsDependency = process.cwd() !== cwd;

pkg.wasCalledByInstall = true;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

if (isInstalledAsDependency && !existsSync(join(cwd, 'dist'))) {
  console.log(`It seems ${pkg.name} was installed with Git. We need to build the package now.`);
  try {
    execSync('npm install', execOptions);
    execSync('npm run build', execOptions);
  } catch (err) {
    delete pkg.wasCalledByInstall;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    throw err;
  }
}
