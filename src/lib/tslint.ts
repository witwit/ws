import { Linter, ILinterOptions, Configuration } from 'tslint';
import { join } from 'path';

// relative from dist/index.js
const configPath = join(__dirname, '..', 'tslint.json');

const lintOptions: ILinterOptions = {
  formatter: 'codeFrame',
  rulesDirectory: [],
  formattersDirectory: '',
  fix: true
};

const program = Linter.createProgram('tsconfig.json');

export async function tslintAsync() {
  const files = Linter.getFileNames(program);
  const results = files.map(file => {
    const fileContents = program.getSourceFile(file).getFullText();
    const configuration = Configuration.findConfiguration(configPath, file)
      .results;
    const linter = new Linter(lintOptions, program);
    linter.lint(file, fileContents, configuration);
    return linter.getResult();
  });

  const errors = results
    .filter(result => !!result.errorCount)
    .map(({ output }) => output);
  const errorsCount = results.reduce(
    (count, result) => count + result.failures.length,
    0
  );
  const fixedFiles = results.reduce(
    (count, result) => count + (result.fixes && result.fixes.length ? 1 : 0),
    0
  );

  return { errors, errorsCount, fixedFiles };
}
