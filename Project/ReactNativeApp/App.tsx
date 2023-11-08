/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { Store } from './src/store';
import { SafeAreaView } from 'react-native';

function App(): JSX.Element {
  return (
    <MobxProvider {...Store}>
      <SafeAreaView></SafeAreaView>
    </MobxProvider>
  );
}

export default App;
