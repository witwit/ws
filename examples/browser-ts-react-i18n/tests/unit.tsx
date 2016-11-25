import expect from 'expect';
import React from 'react';
import { SomeComponent, OtherComponent } from '../src/index';
import { shallow } from 'enzyme';

describe('test my i18n components', () => {
  it('should render <SomeComponent />', () => {
    const comp = shallow(<SomeComponent />);

    expect(comp.type()).toBe('p');
    expect(comp.props().children).toEqual([ 'Hello translated content!' ]);
  });

  it('should render <OtherComponent />', () => {
    const comp = shallow(<OtherComponent />);

    expect(comp.type()).toBe('p');
    expect(comp.props().children).toEqual([ 'You have one.' ]);
  });
});
