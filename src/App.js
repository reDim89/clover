//  Root container for home, map and profile screen
// Т.к. используется Redux, все приложение оборачивается в провайдер


import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import AppNavigator from './containers/AppNavigator';
import Map from './containers/Map';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
