import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { HelloWorld } from './HelloWorld';
import { NameComponent, ImageTestComponent } from 'ws-examples-browser-ts-react';

render(
  <div>
    <NameComponent a={1} b={2} name="_otbe_" />
    <ImageTestComponent />
    <HelloWorld />
  </div>,
  document.getElementById('app'));
