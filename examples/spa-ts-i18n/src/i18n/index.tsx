// this file was generated - do not modify it manually
const INTL_LOCALE = process.env.LOCALE.replace('_', '-');
const asts = require(`./${process.env.LOCALE}`).asts;
const IntlMessageFormat = require('intl-messageformat');

const lazyMessages: { [s: string]: any } = {};

/**
 * `en_GB`: Hello user!
 * `en_US`: Hello user!
 * `de_DE`: Hallo Nutzer!
 * `de_AT`: Hallo Nutzer!
 */
export const commonHello = (): string => {
  if (!lazyMessages['commonHello']) {
    lazyMessages['commonHello'] = new IntlMessageFormat(asts['commonHello'], INTL_LOCALE);
  }
  return lazyMessages['commonHello'].format();
};

/**
 * `en_GB`: I'm an app.
 * `en_US`: I'm an app.
 * `de_DE`: Ich bin eine Anwendung.
 * `de_AT`: Ich bin eine Anwendung.
 */
export const commonDescribe = (): string => {
  if (!lazyMessages['commonDescribe']) {
    lazyMessages['commonDescribe'] = new IntlMessageFormat(asts['commonDescribe'], INTL_LOCALE);
  }
  return lazyMessages['commonDescribe'].format();
};

/**
 * `en_GB`: january
 * `en_US`: january
 * `de_DE`: Januar
 * `de_AT`: Jänner
 */
export const commonJanuary = (): string => {
  if (!lazyMessages['commonJanuary']) {
    lazyMessages['commonJanuary'] = new IntlMessageFormat(asts['commonJanuary'], INTL_LOCALE);
  }
  return lazyMessages['commonJanuary'].format();
};

/**
 * `en_GB`: colour
 * `en_US`: color
 * `de_DE`: Farbe
 * `de_AT`: Farbe
 */
export const commonColor = (): string => {
  if (!lazyMessages['commonColor']) {
    lazyMessages['commonColor'] = new IntlMessageFormat(asts['commonColor'], INTL_LOCALE);
  }
  return lazyMessages['commonColor'].format();
};

/**
 * `en_GB`: Loading app...
 * `en_US`: Loading app...
 * `de_DE`: Lädt Anwendung...
 * `de_AT`: Lädt Anwendung...
 */
export const appLoading = (): string => {
  if (!lazyMessages['appLoading']) {
    lazyMessages['appLoading'] = new IntlMessageFormat(asts['appLoading'], INTL_LOCALE);
  }
  return lazyMessages['appLoading'].format();
};

/**
 * `en_GB`: You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}
 * `en_US`: You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}
 * `de_DE`: Du hast {numPhotos, plural, =0 {keine Fotos.} =1 {ein Foto.} other {# Fotos.}}
 * `de_AT`: Du hast {numPhotos, plural, =0 {keine Fotos.} =1 {ein Foto.} other {# Fotos.}}
 */
export const appMessageFormatExample = (data: { numPhotos: number }): string => {
  if (!lazyMessages['appMessageFormatExample']) {
    lazyMessages['appMessageFormatExample'] = new IntlMessageFormat(asts['appMessageFormatExample'], INTL_LOCALE);
  }
  return lazyMessages['appMessageFormatExample'].format(data);
};

/**
 * `en_GB`: My name is {first} {last}.
 * `en_US`: My name is {first} {last}.
 * `de_DE`: Mein Name ist {first} {last}.
 * `de_AT`: Mein Name ist {first} {last}.
 */
export const appMessageFormatName = (data: { first: string, last: string }): string => {
  if (!lazyMessages['appMessageFormatName']) {
    lazyMessages['appMessageFormatName'] = new IntlMessageFormat(asts['appMessageFormatName'], INTL_LOCALE);
  }
  return lazyMessages['appMessageFormatName'].format(data);
};

/**
 * `en_GB`: {gender, select, f {She} m {He}} is great.
 * `en_US`: {gender, select, f {She} m {He}} is great.
 * `de_DE`: {gender, select, f {Sie} m {Er}} ist toll.
 * `de_AT`: {gender, select, f {Sie} m {Er}} ist toll.
 */
export const appMessageFormatGender = (data: { gender: 'f' | 'm' }): string => {
  if (!lazyMessages['appMessageFormatGender']) {
    lazyMessages['appMessageFormatGender'] = new IntlMessageFormat(asts['appMessageFormatGender'], INTL_LOCALE);
  }
  return lazyMessages['appMessageFormatGender'].format(data);
};

/**
 * `en_GB`: {name, select, Homer {D'oh!} other {Damn!}}
 * `en_US`: {name, select, Homer {D'oh!} other {Damn!}}
 * `de_DE`: {name, select, Homer {Nein!} other {Verdammt!}}
 * `de_AT`: {name, select, Homer {Nein!} other {Verdammt!}}
 */
export const appMessageFormatHomer = (data: { name: 'Homer' | string }): string => {
  if (!lazyMessages['appMessageFormatHomer']) {
    lazyMessages['appMessageFormatHomer'] = new IntlMessageFormat(asts['appMessageFormatHomer'], INTL_LOCALE);
  }
  return lazyMessages['appMessageFormatHomer'].format(data);
};
