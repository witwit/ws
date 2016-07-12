import React from 'react';
import { NameComponent, ImageTestComponent } from 'ws-examples-browser-ts-react';
import { SomeComponent, OtherComponent } from 'ws-examples-browser-ts-react-i18n';
import { i18n } from './i18n';

// use intl polyfill for old browsers
const INTL_LOCALE = process.env.LOCALE.replace('_', '-');
require('intl');
require(`intl/locale-data/jsonp/${INTL_LOCALE}.js`);

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
    <p>{i18n['common.hello']()}</p>
    <p>{i18n['common.describe']()}</p>
    <p>{i18n['common.color']()}</p>
    <p>{i18n['common.january']()}</p>
    <p>{i18n['app.loading']()}</p>
    <p>{i18n['app.message-format.example']({ numPhotos: 0})}</p>
    <p>{i18n['app.message-format.example']({ numPhotos: 1})}</p>
    <p>{i18n['app.message-format.example']({ numPhotos: 2})}</p>
    <p>{i18n['app.message-format.gender']({ gender: 'f' })}</p>
    <p>{i18n['app.message-format.gender']({ gender: 'm' })}</p>
    <p>{i18n['app.message-format.homer']({ name: 'Homer' })}</p>
    <p>{i18n['app.message-format.homer']({ name: 'Foo' })}</p>
    <p>{i18n['app.message-format.name']({ first: 'John', last: 'Snow' })}</p>
  </div>
);

