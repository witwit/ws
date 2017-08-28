import { readJsonSync, writeFileAsync, readFileAsync } from 'fs-extra-promise';
import { join, relative } from 'path';
import { dim, red } from 'chalk';
import { CLIEngine } from 'eslint';
import codeFrame from 'babel-code-frame';
import { project } from '../project';

// relative from dist/index.js
const configPath = join(__dirname, '..', '.eslintrc.json');
const config = readJsonSync(configPath);
// learn about the caveats of `config.fix = true` here: https://github.com/eslint/eslint/issues/9147
config.fix = true;
const engine = new CLIEngine(config);

const defaultFilePatterns = [
  `${project.ws.srcDir}/**/*.tsx`,
  `${project.ws.srcDir}/**/*.ts`,
  `${project.ws.testsDir}/**/*.tsx`,
  `${project.ws.testsDir}/**/*.ts`
];

interface Message {
  ruleId: string;
  severity: 0 | 1 | 2;
  message: string;
  line: number;
  column: number;
  nodeType: string;
  source: string;
  endLine: number;
  endColumn: number;
}

interface Result {
  filePath: string;
  messages: Array<Message>;
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  output: string;
}

interface Stats {
  results: Array<Result>;
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
}

const formatter = async (result: Result) => {
  if (!result.messages || !result.messages.length) return '';

  const fileContent = await readFileAsync(result.filePath, 'utf8');

  const messagesOutput = result.messages.map(message => {
    const ruleId = dim(`(${message.ruleId})`);
    const msg = red(message.message);

    return [
      `${msg} ${ruleId}`,
      `${codeFrame(fileContent, message.line, message.column, {
        highlightCode: true
      })}`
    ].join('\n');
  });

  const filename = relative('.', result.filePath);

  return `${filename}\n${messagesOutput.join('\n\n')}`;
};

export async function eslintAsync(filePatterns = defaultFilePatterns) {
  const stats: Stats = engine.executeOnFiles(filePatterns);

  let fixedFiles = 0;
  await Promise.all(
    stats.results.map(async result => {
      const wasFixed = result.output !== undefined;
      if (wasFixed) {
        await writeFileAsync(result.filePath, result.output);
        fixedFiles += 1;
      }
    })
  );

  const errorsCount = stats.errorCount;
  const errors = await Promise.all(stats.results.map(formatter));
  return { errors, errorsCount, fixedFiles };
}
