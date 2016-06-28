import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { NameComponent, ImageTestComponent } from 'ws-example-browser-react-component';
import { SomeComponent } from 'ws-example-browser-react-component-i18n';
import { AppComponent } from '../src/app';

describe('test my code', () => {
  it('should show my app', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<AppComponent />);
    const output = renderer.getRenderOutput();

    expect(output.type).toBe('div');
    expect(output.props.children).toEqual([
      <NameComponent a={1} b={2} name="_otbe_" />,
      <ImageTestComponent />,
      <p>Dev Build</p>,
      <p>en_GB Build</p>,
      <p>Hello user!</p>,
      <p>I'm an app.</p>,
      <p>colour</p>,
      <p>january</p>,
      <p>Loading app...</p>,
      <SomeComponent />
    ]);
  });
});
