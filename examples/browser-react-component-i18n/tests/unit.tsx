import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { SomeComponent } from '../src/index';

describe('test my code', () => {
  it('should show my i18n component', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<SomeComponent />);
    const output = renderer.getRenderOutput();

    expect(output.type).toBe('p');
    expect(output.props.children).toEqual([ 'Hello translated content!' ]);
  });
});
