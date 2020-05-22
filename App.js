import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'

const store = ConfigureStore()

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>

  );
}


