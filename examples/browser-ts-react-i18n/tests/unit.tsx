import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { SomeComponent, OtherComponent } from '../src/index';

// polyfill intl for cross-browser tests
// if a spa uses our components, it should inclue the polyfill itself, if old browsers should be supported
const INTL_LOCALE = process.env.LOCALE.replace('_', '-');
require('intl');
require(`intl/locale-data/jsonp/${INTL_LOCALE}.js`);

describe('test my i18n components', () => {
  it('should render <SomeComponent />', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<SomeComponent />);
    const output = renderer.getRenderOutput();

    expect(output.type).toBe('p');
    expect(output.props.children).toEqual([ 'Hello translated content!' ]);
  });

  it('should render <OtherComponent />', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<OtherComponent />);
    const output = renderer.getRenderOutput();

    expect(output.type).toBe('p');
    expect(output.props.children).toEqual([ 'You have one.' ]);
  });
});
