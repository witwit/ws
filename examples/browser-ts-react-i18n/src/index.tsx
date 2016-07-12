import React, { Component } from 'react';
import { i18n } from './i18n';

/**
 * This component shows a translated message.
 */
export class SomeComponent extends Component<{}, {}> {
  render() {
    return <p>{i18n['some-content']()}</p>;
  }
}

/**
 * This component shows a the usage of the message format.
 */
export class OtherComponent extends Component<{}, {}> {
  render() {
    return <p>{i18n['content-with-message-format']({ count: 1 })}</p>;
  }
}
