import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { HelloWorld } from './HelloWorld';
import { SomeComponent, OtherComponent } from 'ws-examples-browser-ts-react-i18n';
import { getCwd } from 'ws-examples-node-ts';

render(
  <div>
    <SomeComponent />
    <OtherComponent />
    {getCwd()}
    <HelloWorld />
  </div>,
  document.getElementById('app'));

