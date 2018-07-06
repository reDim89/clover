import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Auth } from 'aws-amplify';
import { StatusBar } from 'react-native';

import Profile from './Profile';
import Map from './MapView';
import SignUp from './SignUp';
import Welcome from './Welcome';

// Основной стек навигации
export const NavigationStack = createStackNavigator({
  Map: {
    screen: Map,
  },
  Profile: {
    screen: Profile,
  },
});

// Стек навигации, с которого происходит переход к основному, если юзер залогинился
export const LoginStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
    SignUp: {
      screen: SignUp,
    },
    NavigationStack: {
      screen: NavigationStack,
    },
  },
  {
    initialRouteName: 'Welcome',
  },
);

class AppNavigator extends Component {
  state = {
    user: {},
    isLoading: true,
  };

  async componentDidMount() {
    StatusBar.setHidden(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  async componentWillReceiveProps() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user });
    } catch (err) {
      this.setState({ user: {} });
    }
  }

  render() {
    console.log(this.props);
    if (this.state.isLoading) return null;

    let loggenIn = false;
    if (this.state.user.username) {
      loggenIn = true;
    }

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
    auth: state.authReducer,
  });
};

export default connect(mapStateToProps)(AppNavigator);
