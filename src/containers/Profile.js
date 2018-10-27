import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Amplify, { Auth } from 'aws-amplify';
import config from '../../aws-exports';

import Button from '../components/Button';
import { logout } from '../redux/actions/authActions';

Amplify.configure(config);

class Profile extends Component {

  handleOnPress() {
    Auth.signOut();
    this.props.logout();
  }

  render() {
    return (
      <View>
        <Text>Profile screen - under construction</Text>
        <Button
          text="Log out"
          onPress={() => this.handleOnPress()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer.auth,
});

function mapDispatchToProps(dispatch) {
  return ({
    logout: () => dispatch(logout()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
