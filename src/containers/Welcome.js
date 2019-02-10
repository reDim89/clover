import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Auth } from 'aws-amplify';

import Button from '../components/Button';

class Welcome extends Component {
  static getUser() {
    Auth.currentAuthenticatedUser()
      .then(user => console.log(user))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.headerTextStyle}>
          WELCOME TO CLOVER
        </Text>
        <Text style={styles.textStyle}>
          This app helps you to find best bars around. Enjoy!
        </Text>
        {/*
        <Button
          buttonText="Sign In"
          onPress={() => this.props.navigation.navigate('SignIn')}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={styles.textStyle}>
            Sign Up
          </Text>
        </TouchableOpacity>
        */}
        <Button
          buttonText="Go to map"
          onPress={() => this.props.navigation.navigate('NavigationStack')}
        />
      </View>
    );
  }
}

const goToMainStack = NavigationActions.navigate({
  routeName: 'NavigationStack',
  action: NavigationActions.navigate({ routeName: 'NavigationStack' }),
});

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#94DCD4',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 24,
    color: '#0D5C63',
  },
  textStyle: {
    fontSize: 14,
    color: '#FFFFFA',
  },
});

export default Welcome;
