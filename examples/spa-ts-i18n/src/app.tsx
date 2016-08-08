import React from 'react';
import { NameComponent, ImageTestComponent } from 'ws-examples-browser-ts-react';
import { SomeComponent, OtherComponent } from 'ws-examples-browser-ts-react-i18n';
import {
  commonHello,
  commonDescribe,
  commonColor,
  commonJanuary,
  appLoading,
  appMessageFormatExample,
  appMessageFormatGender,
  appMessageFormatHomer,
  appMessageFormatName
} from './i18n';

// use intl polyfill for old browsers
require('intl');
require(`intl/locale-data/jsonp/${process.env.LOCALE.replace('_', '-')}.js`); // must be inlined

require('normalize.css/normalize.css');
require('./style.less');

/**
 * This is our app component.
 */
export const AppComponent = () => (
  <div>
    <NameComponent a={1} b={2} name="_otbe_" />
    <ImageTestComponent />
    {
      process.env.NODE_ENV === 'production'
        ? <p>Production Build</p>
        : <p>Dev Build</p>
    }
    {
      process.env.LOCALE === 'en_GB'
        ? <p>en_GB Build</p>
        : <p>NOT en_GB Build</p>
    }
    <SomeComponent />
    <OtherComponent />
    <p>{commonHello()}</p>
    <p>{commonDescribe()}</p>
    <p>{commonColor()}</p>
    <p>{commonJanuary()}</p>
    <p>{appLoading()}</p>
    <p>{appMessageFormatExample({ numPhotos: 0})}</p>
    <p>{appMessageFormatExample({ numPhotos: 1})}</p>
    <p>{appMessageFormatExample({ numPhotos: 2})}</p>
    <p>{appMessageFormatGender({ gender: 'f' })}</p>
    <p>{appMessageFormatGender({ gender: 'm' })}</p>
    <p>{appMessageFormatHomer({ name: 'Homer' })}</p>
    <p>{appMessageFormatHomer({ name: 'Foo' })}</p>
    <p>{appMessageFormatName({ first: 'John', last: 'Snow' })}</p>
  </div>
);

