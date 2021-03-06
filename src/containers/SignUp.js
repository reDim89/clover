import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Импорт компонентов, необходимых для регистрации юзеров
import { Auth } from 'aws-amplify';
import awsmobile from '../../aws-exports';

// Импорт вьюх и других компонентов

import Button from '../components/Button';
import SignUpForm from '../components/SignUpForm';
import ModalConfirm from './ModalConfirm';
import ToastContainer from './ToastContainer';

// Импорт экшнов, которые отправляются в стор с данного компонента
import { login, logout } from '../redux/actions/authActions';
import { showPopup } from '../redux/actions/popupActions';
import { showToast } from '../redux/actions/toastActions';
import LoginForm from './SignIn';

class SignUp extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: '#0D5C63',
      color: '#FFFFFA',
    },
    headerTintColor: '#fff',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
    };
    this.setUsernameFromInput = this.setUsernameFromInput.bind(this);
    this.setPassFromInput = this.setPassFromInput.bind(this);
    this.setEmailFromInput = this.setEmailFromInput.bind(this);
  }

  // Вызов поп-апа подтверждения регистрации
  showModalConfirm() {
    const {
      username,
      password,
      email,
    } = this.state;
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
      .then(() => {
        this.props.showPopup();
        this.pushToDatabase(username, firstname, lastname);
        this.props.showPopup();
      })
      .catch(error => this.errorToast(error));
  }

  errorToast(error) {
    if (typeof error === 'object') {
      return this.props.showToast(error.message, 2000)
    }
    return this.props.showToast(error, 2000)
  }

  setUsernameFromInput(text) {
    this.setState({ username: text });
  }

  setPassFromInput(text) {
    this.setState({ password: text });
  }

  setEmailFromInput(text) {
    this.setState({ email: text });
  }

  render() {
    const {
      username,
      firstname,
      lastname,
    } = this.state;
    return (
      <View style={styles.containerStyle}>
        <ModalConfirm
          visible={this.props.visible}
          username={username}
          firstname={firstname}
          lastname={lastname}
          hintText="We have sent confirmation code to your email"
          navigation={this.props.navigation}
        />
        <SignUpForm
          onChangeUsername={this.setUsernameFromInput}
          onChangePassword={this.setPassFromInput}
          onChangeEmail={this.setEmailFromInput}
        />
        <Button
           buttonText="Sign Up"
           onPress={() => this.showModalConfirm()}
        />
        <ToastContainer />
      </View>
    );
  }
}

SignUp.defaultProps = {
  visible: false,
  username: '',
  password: '',
  phone: '',
  email: '',
};

// Функция, которая маппит стэйты из стора Redux в пропсы контейнера
// Они хранятся в this.props
const mapStateToProps = state => ({
  buttonText: state.authReducer.buttonText,
  auth: state.authReducer.auth,
  popup: state.popupReducer.visible,
});


// Функция, которая маппит отправку конкретного экшна в пропсы контейнера
// Это по сути шорт-кат, чтобы не писать везде this.props.dispatch
const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  logout,
  showPopup,
  showToast,
},
dispatch);


const styles = StyleSheet.create({
  textInput: {
    justifyContent: 'center',
    margin: 10,
    height: 40,
    borderColor: '#7DA5A1',
    borderWidth: 2,
    borderRadius: 10,
  },
  halfSizeInput: {
    justifyContent: 'center',
    margin: 10,
    height: 40,
    width: 170,
    borderColor: '#7DA5A1',
    borderWidth: 2,
    borderRadius: 10,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: '#0D5C63',
  },
  formContainerStyle: {
    flex: 0.7,
  },
  buttonContainerStyle: {
    flex: 0.2,
  },
  inputContainerStyle: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
