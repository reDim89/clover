//  Root container for home, map and profile screen
// Т.к. используется Redux, все приложение оборачивается в провайдер


import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';

import store from './redux/store';
import AppNavigator from './containers/AppNavigator';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
