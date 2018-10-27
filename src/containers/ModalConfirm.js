/*
Всплывающее окно, появляющееся при подтверждении регистрации через смс.
Состояние "показать/скрыть" управляется попап-редьюсером
*/

import React, { Component } from 'react';
import {
  Modal,
  TextInput,
  View,
  Button,
  StyleSheet,
  Text,
} from 'react-native';

import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

// Импорт компонентов, необходимых для регистрации юзеров
import Amplify, { Auth } from 'aws-amplify';
import config from '../../aws-exports';


// Импорт экшна скрытия и функции для подключения контейнера к стору
import { closePopup } from '../redux/actions/popupActions';
import { login } from '../redux/actions/authActions';

Amplify.configure(config);

class ModalConfirm extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
  }

  // Запись данных формы в базу данных
  // https://facebook.github.io/react-native/docs/network.html
  static pushToDatabase(username, firstname, lastname) {
    return fetch('http://52.15.80.99:8000/users', {
      method: 'POST',
      headers: {
        ContentType: 'Application/JSON',
      },
      body: JSON.stringify({
        nickname: username,
        first_name: firstname,
        last_name: lastname,
      }),
    })
      .then(response => console.log(response.json()))
      .catch(error => console.error(error));
  }

  // Функция, скрывающая поп-ап по кнопке
  closeModal() {
    return this.props.closePopup();
  }

  // Подтверждение авторизации
  confirmSignup() {
    const { authCode } = this.state;
    const {
      username,
      firstname,
      lastname,
    } = this.props;
    Auth.confirmSignUp(username, authCode)
      .then(() => {
        ModalConfirm.pushToDatabase(username, firstname, lastname);
        this.closeModal();
        this.props.navigation.dispatch(goToMainStack);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.visible}
      >
        <View style={styles.containerView}>
          <View style={styles.innerView}>
            <TextInput
              style={styles.textInput}
              placeholder="Confirmation code"
              onChangeText={text => this.setState({ authCode: text })}
            />
            <Text style={styles.hintText}>
              {this.props.hintText}
            </Text>
            <Button
              title="Confirm sign up"
              color="#fff"
              onPress={() => this.confirmSignup()}
            />
            <Button
              title="Close"
              color="#fff"
              onPress={() => this.closeModal()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const goToMainStack = NavigationActions.navigate({
  routeName: 'NavigationStack',
  action: NavigationActions.navigate({ routeName: 'NavigationStack' }),
});

const mapStateToProps = state => ({
  visible: state.popupReducer.visible,
  auth: state.authReducer.auth,
});

function mapDispatchToProps(dispatch) {
  return ({
    closePopup: () => dispatch(closePopup()),
    login: () => dispatch(login()),
  });
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000BF',
    opacity: 50,
    zIndex: 100,
  },
  innerView: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#94DCD4',
    borderRadius: 6,
  },
  textInput: {
    margin: 15,
    height: 40,
    borderColor: '#673149',
    borderWidth: 2,
    borderRadius: 10,
  },
  hintText: {
    flex: 0.1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    color: '#B2B2B2',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
