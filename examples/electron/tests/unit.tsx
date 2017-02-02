import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-addons-test-utils';
import { HelloWorld } from '../src/HelloWorld';

describe('test my code', () => {
  it('should render a react component', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<HelloWorld/>);
    const output = renderer.getRenderOutput();

    expect(output.type).toBe('div');
    expect(output.props.children).toEqual('Hello World :)');
  });
});
