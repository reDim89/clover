import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Button from '../components/Button';

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.headerTextStyle}>
          Welcome to Clover!!!
        </Text>
        <Button
          buttonText="Sign In"
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={styles.textStyle}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

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
