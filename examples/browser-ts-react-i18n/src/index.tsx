import React, { Component } from 'react';
import { someContent, contentWithMessageFormat } from 'mercateo/i18n';
// import { someContent, contentWithMessageFormat } from 'glamor/react';
const glamorReact = require('glamor/react');
glamorReact.makeTheme();

/**
 * This component shows a translated message.
 */
export class SomeComponent extends Component<{}, {}> {
  render() {
    return <p>{someContent()}</p>;
  }
}

/**
 * This component shows a the usage of the message format.
 */
export class OtherComponent extends Component<{}, {}> {
  render() {
    return <p>{contentWithMessageFormat({ count: 1 })}</p>;
  }
}
