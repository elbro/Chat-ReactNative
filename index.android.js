/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/App';

const ChatApp = () => (
  <App />
);

export default ChatApp;

AppRegistry.registerComponent('ChatApp', () => ChatApp);
