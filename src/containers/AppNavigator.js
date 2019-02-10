import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Auth } from 'aws-amplify';
import { StatusBar } from 'react-native';

import Profile from './Profile';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Welcome from './Welcome';
import Map from './Map';

import { login } from '../redux/actions/authActions';

// Основной стек навигации
export const NavigationStack = createBottomTabNavigator(
  {
    Map: {
      screen: Map,
    },
    About: {
      screen: Profile,
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#44A1A0',
      activeTintColor: '#FFFFFF',
      labelStyle: {
        fontSize: 16,
        textAlign: 'center',
      },
      tabStyle: {
        paddingBottom: 5,
      },
    },
  },
);

// Стек навигации, с которого происходит переход к основному, если юзер залогинился
export const LoginStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: {
      screen: SignUp,
    },
    SignIn: {
      screen: SignIn,
    },
    NavigationStack: {
      screen: NavigationStack,
      navigationOptions: {
        header: null,
      },
    },
    initialRouteName: 'Welcome',
    headerMode: 'screen',
  },
);

class AppNavigator extends Component {
  async componentDidMount() {
    StatusBar.setHidden(true);

    /*
    await Auth.currentAuthenticatedUser()
      .then(() => this.props.login())
      .catch(err => console.log(err));
    */
  }


  render() {
    if (this.props.auth) {
      return (
        <NavigationStack />
      );
    }

    return (
      <LoginStack />
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    // на этот проп завязан метод componentWillReceiveProps
    auth: state.authReducer.auth,
  });
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
