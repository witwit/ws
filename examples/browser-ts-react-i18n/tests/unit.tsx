import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { SomeComponent, OtherComponent } from '../src/index';

// use intl polyfill for IE 10 and Safari 9
import 'intl';
require(`intl/locale-data/jsonp/${process.env.INTL_LOCALE}`);

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
