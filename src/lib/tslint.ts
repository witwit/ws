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

export async function tslintAsync() {
  const program = Linter.createProgram('tsconfig.json');
  const linter = new Linter(lintOptions, program);
  const files = Linter.getFileNames(program);

  const results = files.map(file => {
    const fileContents = program.getSourceFile(file).getFullText();
    const configuration = Configuration.findConfiguration(configPath, file)
      .results;
    linter.lint(file, fileContents, configuration);
    const result = linter.getResult();
    return { result, file };
  });

  const errors = results
    .filter(({ result }) => !!result.errorCount)
    .map(({ result }) => result.output);

  const errorsCount = results.reduce(
    (count, { result }) => count + result.failures.length,
    0
  );

  const fixedFiles = results
    .filter(({ result }) => result.fixes && result.fixes.length)
    .map(({ file }) => file);

  return { errors, errorsCount, fixedFiles };
}
