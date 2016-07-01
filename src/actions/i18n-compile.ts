import { debug } from 'loglevel';
import { parse } from 'properties';
import { join } from 'path';
import { readFileAsync, outputFileAsync, removeAsync } from 'fs-extra-promise';
import { concatLanguages, isMatchingLocaleOrLanguage } from '../lib/i18n';
import { project } from '../project';

function readTranslation(locale: string, feature: string) {
  const readPath = join(process.cwd(), project.ws.i18n.dir, feature, `${locale}.properties`);

  debug(`Read from ${readPath}.`);

  return readFileAsync(readPath, 'utf8')
    .then(parse)
    .catch(err => {
      if (err.code === 'ENOENT') {
        // translations can be "empty"
        return {};
      } else {
        throw err;
      }
    }).then(data => ({ data, locale }));
}

function writeTranslation(translation) {
  const filename = join(project.ws.srcDir, project.ws.i18n.dir, `${translation.locale}.js`);
  const data = `// this file was generated - do not modify it manually
module.exports.translation = ${JSON.stringify(translation.data, null, '  ')};`;

  return outputFileAsync(filename, data);
}

export default async function i18nCompile() {
  const features = project.ws.i18n.features || [ '' ];
  const locales = project.ws.i18n.locales;
  const localesAndLanguages = concatLanguages(locales);

  const readPromises = [];
  features.forEach(feature => localesAndLanguages.forEach(localeOrLanguage => {
    readPromises.push(readTranslation(localeOrLanguage, feature));
  }));

  const translations = await Promise.all(readPromises);
  const groupedTranslations = locales.map(locale => ({
    locale,
    translations: translations.filter(translation => isMatchingLocaleOrLanguage(translation.locale, locale))
  }));
  const mergedTranslations = groupedTranslations.map(({ locale, translations }) => ({
    locale,
    data: translations.reverse().reduce((acc, translation) => Object.assign(acc, translation.data), {})
  }));

  await removeAsync(join(project.ws.srcDir, project.ws.i18n.dir));
  await Promise.all(mergedTranslations.map(writeTranslation));
  await outputFileAsync(join(project.ws.srcDir, project.ws.i18n.dir, `index.${project.ws.entryExtension}`),
`// this file was generated - do not modify it manually
const specificTranslation = require(\`./\${process.env.LOCALE}\`).translation;

export const translation${project.ws.entryExtension !== 'js' ? ': { [key: string]: string }' : ''} = specificTranslation;
`);
};
