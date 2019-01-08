import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

import { Auth } from 'aws-amplify';
import config from '../../aws-exports';

import Button from '../components/Button';
import { logout } from '../redux/actions/authActions';

class Profile extends Component {

  handleOnPress() {
    Auth.signOut();
    this.props.logout();
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View>
        <Text>Profile screen - under construction</Text>
        <Button
          buttonText="Log out"
          onPress={() => this.handleOnPress()}
        />
      </View>
    );
  }
}

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
});

const mapStateToProps = state => ({
  auth: state.authReducer.auth,
});

function mapDispatchToProps(dispatch) {
  return ({
    logout: () => dispatch(logout()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
