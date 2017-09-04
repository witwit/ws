import { Linter, ILinterOptions, Configuration } from 'tslint';
import { join } from 'path';
import { uniq } from 'lodash';

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

  files.forEach(file => {
    const fileContents = program.getSourceFile(file).getFullText();
    const conf = Configuration.findConfiguration(configPath, file).results;
    linter.lint(file, fileContents, conf);
  });

  const result = linter.getResult();
  const errors = result.output;
  const errorsCount = result.errorCount;
  const fixedFiles = uniq((result.fixes || []).map(({ fileName }) => fileName));

  return { errors, errorsCount, fixedFiles };
}
