// this file was generated - do not modify it manually
const INTL_LOCALE = process.env.LOCALE.replace('_', '-');
const asts = require(`./${process.env.LOCALE}`).asts;
const IntlMessageFormat = require('intl-messageformat');

export interface TranslationData {
  /**
   * `en_GB`: Hello user!
   * `en_US`: Hello user!
   * `de_DE`: Hallo Nutzer!
   * `de_AT`: Hallo Nutzer!
   */
  'common.hello': () => string;
  /**
   * `en_GB`: I'm an app.
   * `en_US`: I'm an app.
   * `de_DE`: Ich bin eine Anwendung.
   * `de_AT`: Ich bin eine Anwendung.
   */
  'common.describe': () => string;
  /**
   * `en_GB`: january
   * `en_US`: january
   * `de_DE`: Januar
   * `de_AT`: Jänner
   */
  'common.january': () => string;
  /**
   * `en_GB`: colour
   * `en_US`: color
   * `de_DE`: Farbe
   * `de_AT`: Farbe
   */
  'common.color': () => string;
  /**
   * `en_GB`: Loading app...
   * `en_US`: Loading app...
   * `de_DE`: Lädt Anwendung...
   * `de_AT`: Lädt Anwendung...
   */
  'app.loading': () => string;
  /**
   * `en_GB`: You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}
   * `en_US`: You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}
   * `de_DE`: Du hast {numPhotos, plural, =0 {keine Fotos.} =1 {ein Foto.} other {# Fotos.}}
   * `de_AT`: Du hast {numPhotos, plural, =0 {keine Fotos.} =1 {ein Foto.} other {# Fotos.}}
   */
  'app.message-format.example': (data: { numPhotos: number }) => string;
  /**
   * `en_GB`: My name is {first} {last}.
   * `en_US`: My name is {first} {last}.
   * `de_DE`: Mein Name ist {first} {last}.
   * `de_AT`: Mein Name ist {first} {last}.
   */
  'app.message-format.name': (data: { first: string, last: string }) => string;
  /**
   * `en_GB`: {gender, select, f {She} m {He}} is great.
   * `en_US`: {gender, select, f {She} m {He}} is great.
   * `de_DE`: {gender, select, f {Sie} m {Er}} ist toll.
   * `de_AT`: {gender, select, f {Sie} m {Er}} ist toll.
   */
  'app.message-format.gender': (data: { gender: 'f' | 'm' }) => string;
  /**
   * `en_GB`: {name, select, Homer {D'oh!} other {Damn!}}
   * `en_US`: {name, select, Homer {D'oh!} other {Damn!}}
   * `de_DE`: {name, select, Homer {Nein!} other {Verdammt!}}
   * `de_AT`: {name, select, Homer {Nein!} other {Verdammt!}}
   */
  'app.message-format.homer': (data: { name: 'Homer' | string }) => string;
}

const lazyMessages = {};

export const i18n: TranslationData = {
  'common.hello': () => {
    if (!lazyMessages['common.hello']) {
      lazyMessages['common.hello'] = new IntlMessageFormat(asts['common.hello'], INTL_LOCALE);
    }
    return lazyMessages['common.hello'].format();
  },
  'common.describe': () => {
    if (!lazyMessages['common.describe']) {
      lazyMessages['common.describe'] = new IntlMessageFormat(asts['common.describe'], INTL_LOCALE);
    }
    return lazyMessages['common.describe'].format();
  },
  'common.january': () => {
    if (!lazyMessages['common.january']) {
      lazyMessages['common.january'] = new IntlMessageFormat(asts['common.january'], INTL_LOCALE);
    }
    return lazyMessages['common.january'].format();
  },
  'common.color': () => {
    if (!lazyMessages['common.color']) {
      lazyMessages['common.color'] = new IntlMessageFormat(asts['common.color'], INTL_LOCALE);
    }
    return lazyMessages['common.color'].format();
  },
  'app.loading': () => {
    if (!lazyMessages['app.loading']) {
      lazyMessages['app.loading'] = new IntlMessageFormat(asts['app.loading'], INTL_LOCALE);
    }
    return lazyMessages['app.loading'].format();
  },
  'app.message-format.example': (data) => {
    if (!lazyMessages['app.message-format.example']) {
      lazyMessages['app.message-format.example'] = new IntlMessageFormat(asts['app.message-format.example'], INTL_LOCALE);
    }
    return lazyMessages['app.message-format.example'].format(data);
  },
  'app.message-format.name': (data) => {
    if (!lazyMessages['app.message-format.name']) {
      lazyMessages['app.message-format.name'] = new IntlMessageFormat(asts['app.message-format.name'], INTL_LOCALE);
    }
    return lazyMessages['app.message-format.name'].format(data);
  },
  'app.message-format.gender': (data) => {
    if (!lazyMessages['app.message-format.gender']) {
      lazyMessages['app.message-format.gender'] = new IntlMessageFormat(asts['app.message-format.gender'], INTL_LOCALE);
    }
    return lazyMessages['app.message-format.gender'].format(data);
  },
  'app.message-format.homer': (data) => {
    if (!lazyMessages['app.message-format.homer']) {
      lazyMessages['app.message-format.homer'] = new IntlMessageFormat(asts['app.message-format.homer'], INTL_LOCALE);
    }
    return lazyMessages['app.message-format.homer'].format(data);
  }
};
