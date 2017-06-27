import expect from 'expect';
import React from 'react';
import { SomeComponent, OtherComponent } from '../src/index';
import { mount } from 'enzyme';
import { Translations } from '@mercateo/ws-intl';

describe('test my i18n components', () => {
  it('should render <SomeComponent />', () => {
    const wrapper = mount(
      <Translations messages={require('../dist-i18n/en_GB')}>
        <SomeComponent />
      </Translations>
    );

    expect(wrapper.text()).toEqual('Hello translated content!');
  });

  it('should render <OtherComponent />', () => {
    const wrapper = mount(
      <Translations messages={require('../dist-i18n/en_GB')}>
        <OtherComponent />
      </Translations>
    );

    expect(wrapper.text()).toEqual('You have one.');
  });
});
