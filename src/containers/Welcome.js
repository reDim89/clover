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
          Welcome to Clover!!!
        </Text>
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
        <TouchableOpacity
          onPress={() => Welcome.getUser()}
        >
          <Text style={{ color: 'red' }}>
            Get user
          </Text>
        </TouchableOpacity>
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
    flex: 0.6,
    fontSize: 24,
    color: '#FFFFFF',
  },
  textStyle: {
    fontSize: 14,
    marginVertical: 10,
    color: '#FFFFFF',
  },
});

export default Welcome;
