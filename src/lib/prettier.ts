import { format } from 'prettier';
import { readFileAsync, writeFileAsync } from 'fs-extra-promise';
import globby from 'globby';
import { error } from 'loglevel';
import { red } from 'chalk';
import { sourceFilePatterns } from '../project';

const options = {
  singleQuote: true,
  parser: 'typescript'
};

export async function formatAsync(filePatterns = sourceFilePatterns) {
  const filePaths = await globby(filePatterns, { absolute: true });
  const contents = await Promise.all(
    filePaths.map(filePath => readFileAsync(filePath, 'utf8'))
  );

  const fixedFiles: string[] = [];
  await Promise.all(
    filePaths.map(async (filePath, index) => {
      const content = contents[index];
      let formattedContent;

      try {
        formattedContent = format(content, options);
      } catch (err) {
        error(`Couldn't format ${red(filePath)}.`);
        throw err;
      }

      if (content !== formattedContent) {
        fixedFiles.push(filePath);
        await writeFileAsync(filePath, formattedContent);
      }
    })
  );

  return fixedFiles;
}
