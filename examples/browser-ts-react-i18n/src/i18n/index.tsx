// this file was generated - do not modify it manually
const INTL_LOCALE = process.env.LOCALE.replace('_', '-');
const asts = require(`./${process.env.LOCALE}`).asts;
const IntlMessageFormat = require('intl-messageformat');

export interface TranslationData {
  /**
   * `en_GB`: Hello translated content!
   * `en_US`: Hello translated content!
   * `de_DE`: Hallo übersetzter Inhalt!
   * `de_AT`: Hallo übersetzter Inhalt!
   */
  'some-content': () => string;
  /**
   * `en_GB`: You have {count, plural, =0 {nothing.} =1 {one.} other {#.}}
   * `en_US`: You have {count, plural, =0 {nothing.} =1 {one.} other {#.}}
   * `de_DE`: Du hast {count, plural, =0 {nichts.} =1 {eins.} other {#.}}
   * `de_AT`: Du hast {count, plural, =0 {nichts.} =1 {eins.} other {#.}}
   */
  'content-with-message-format': (data: { count: number }) => string;
}

const lazyMessages = {};

export const i18n: TranslationData = {
  'some-content': () => {
    if (!lazyMessages['some-content']) {
      lazyMessages['some-content'] = new IntlMessageFormat(asts['some-content'], INTL_LOCALE);
    }
    return lazyMessages['some-content'].format();
  },
  'content-with-message-format': (data) => {
    if (!lazyMessages['content-with-message-format']) {
      lazyMessages['content-with-message-format'] = new IntlMessageFormat(asts['content-with-message-format'], INTL_LOCALE);
    }
    return lazyMessages['content-with-message-format'].format(data);
  }
};
