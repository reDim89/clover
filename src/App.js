//  Root container for home, map and profile screen
// Т.к. используется Redux, все приложение оборачивается в провайдер


import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import SplashScreen from 'react-native-splash-screen';
import { PermissionsAndroid } from 'react-native';

import store from './redux/store';
import AppNavigator from './containers/AppNavigator';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

export default class App extends Component {
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Clover needs access to your location ' +
            'so you can get tips for bars wherever you are.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount(): void {
    SplashScreen.hide();
    this.requestLocationPermission();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
