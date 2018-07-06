import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';

// Импорт компонентов, необходимых для регистрации юзеров
import Amplify, { Auth } from 'aws-amplify';
import config from '../../aws-exports';

// Импорт вьюх и других компонентов
import Button from '../components/Button';
import ModalConfirm from './ModalConfirm';
import ToastContainer from './ToastContainer';

// Импорт экшнов, которые отправляются в стор с данного компонента
import { userLogin, userLogout } from '../redux/actions/userActions';
import { showPopup } from '../redux/actions/popupActions';
import { showToast } from '../redux/actions/toastActions';

Amplify.configure(config);

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      phone: null,
      email: null,
    };
  }

  // Вызов поп-апа подтверждения регистрации
  handleOnPress() {
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        phone_number: this.state.phone,
        email: this.state.email,
      },
    })
      .then(() => this.props.showPopup())
      .catch(err => this.props.showToast(err, 2000));

  }

  // Показ тоста-нотификации
  notify() {
    this.props.showToast('default message', 2000);
  }


  render() {
    return (
      <View>
        <ModalConfirm visible={this.props.visible} username={this.state.username} />
        <TextInput
          style={styles.textInput}
          placeholder="Login"
          autoFocus
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone"
          value={this.state.phone}
          onChangeText={text => this.setState({ phone: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <Button
          buttonText={this.props.buttonText}
          onPress={() => this.handleOnPress()}
        />
        <Button
          buttonText="Show toast"
          onPress={() => this.notify()}
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
const mapStateToProps = (state) => {
  return {
    buttonText: state.authReducer.buttonText,
    auth: state.authReducer.auth,
    popup: state.popupReducer.visible,
  };
};

// Функция, которая маппит отправку конкретного экшна в пропсы контейнера
// Это по сути шорт-кат, чтобы не писать везде dispatch
function mapDispatchToProps(dispatch) {
  return ({
    login: () => dispatch(userLogin()),
    logout: () => dispatch(userLogout()),
    showPopup: () => dispatch(showPopup()),
    showToast: (message, duration) => dispatch(showToast(message, duration)),
  });
}

const styles = StyleSheet.create({
  textInput: {
    margin: 15,
    height: 40,
    borderColor: '#673149',
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
