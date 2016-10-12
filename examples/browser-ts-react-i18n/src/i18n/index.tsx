// this file was generated - do not modify it manually
const INTL_LOCALE = process.env.LOCALE.replace('_', '-');
const asts = require(`./${process.env.LOCALE}`).asts;
const IntlMessageFormat = require('intl-messageformat');

const lazyMessages: { [s: string]: any } = {};

/**
 * `en_GB`: Hello translated content!
 * `en_US`: Hello translated content!
 * `de_DE`: Hallo übersetzter Inhalt!
 * `de_AT`: Hallo übersetzter Inhalt!
 */
export const someContent = (): string => {
  if (!lazyMessages['someContent']) {
    lazyMessages['someContent'] = new IntlMessageFormat(asts['someContent'], INTL_LOCALE);
  }
  return lazyMessages['someContent'].format();
};

/**
 * `en_GB`: You have {count, plural, =0 {nothing.} =1 {one.} other {#.}}
 * `en_US`: You have {count, plural, =0 {nothing.} =1 {one.} other {#.}}
 * `de_DE`: Du hast {count, plural, =0 {nichts.} =1 {eins.} other {#.}}
 * `de_AT`: Du hast {count, plural, =0 {nichts.} =1 {eins.} other {#.}}
 */
export const contentWithMessageFormat = (data: { count: number }): string => {
  if (!lazyMessages['contentWithMessageFormat']) {
    lazyMessages['contentWithMessageFormat'] = new IntlMessageFormat(asts['contentWithMessageFormat'], INTL_LOCALE);
  }
  return lazyMessages['contentWithMessageFormat'].format(data);
};
