import Mocha from 'mocha';

export function testAsync(files: string[]) {
  const mocha = new Mocha();
  files.forEach(file => mocha.addFile(file));
  return new Promise((resolve, reject) => {
    mocha.run(exitCode => {
      if (exitCode === 0) {
        resolve(exitCode);
      } else {
        reject(exitCode);
      }
    });
  });
}
