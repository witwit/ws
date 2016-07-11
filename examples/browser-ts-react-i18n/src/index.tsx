import React, { Component } from 'react';
import { translation } from './i18n';

/**
 * This component shows a translated message.
 */
export class SomeComponent extends Component<{}, {}> {
  render() {
    return <p>{translation['some-content']}</p>;
  }
}
