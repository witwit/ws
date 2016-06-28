import React from 'react';
import { NameComponent, ImageTestComponent } from 'ws-example-browser-react-component';
import { SomeComponent } from 'ws-example-browser-react-component-i18n';
import { translation } from './i18n';

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
    <p>{translation['common.hello']}</p>
    <p>{translation['common.describe']}</p>
    <p>{translation['common.color']}</p>
    <p>{translation['common.january']}</p>
    <p>{translation['app.loading']}</p>
    <SomeComponent />
  </div>
);

