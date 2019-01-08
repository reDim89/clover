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

// Основной стек навигации
export const NavigationStack = createBottomTabNavigator(
  {
    Map: {
      screen: Map,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#BEE2C2',
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
    if (this.state.isLoading) return null;
    let loggedIn = false;
    if (this.state.user.username) {
      loggedIn = true;
    }

    if (!this.props.auth) {
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
