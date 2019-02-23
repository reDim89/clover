//  Root container for home, map and profile screen
// Т.к. используется Redux, все приложение оборачивается в провайдер


import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import SplashScreen from 'react-native-splash-screen';

import store from './redux/store';
import AppNavigator from './containers/AppNavigator';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

export default class App extends Component {

  componentDidMount(): void {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
