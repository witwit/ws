import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { NameComponent, ImageTestComponent } from 'ws-examples-browser-ts-react';
import { SomeComponent, OtherComponent } from 'ws-examples-browser-ts-react-i18n';
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
      <SomeComponent />,
      <OtherComponent />,
      <p>Hello user!</p>,
      <p>I'm an app.</p>,
      <p>colour</p>,
      <p>january</p>,
      <p>Loading app...</p>,
      <p>You have no photos.</p>,
      <p>You have one photo.</p>,
      <p>You have 2 photos.</p>,
      <p>She is great.</p>,
      <p>He is great.</p>,
      <p>D'oh!</p>,
      <p>Damn!</p>,
      <p>My name is John Snow.</p>
    ]);
  });
});
