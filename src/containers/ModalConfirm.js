/*
Всплывающее окно, появляющееся при подтверждении регистрации через смс.
Состояние "показать/скрыть" управляется поп-ап редьюсером
*/

import React, { Component } from 'react';
import {
  Modal,
  TextInput,
  View,
  Button,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

// Импорт экшна скрытия и функции для подключения контейнера к стору
import { connect } from 'react-redux';
import { closePopup } from '../redux/actions/popupActions';

// Импорт компонентов, необходимых для регистрации юзеров
import Amplify, { Auth } from 'aws-amplify';
import config from '../../aws-exports';

Amplify.configure(config);

class ModalConfirm extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
  }

  // Функци, скрывающая поп-ап по кнопке
  closeModal() {
    return this.props.closePopup();
  }

  confirmSignup() {
    const { authCode } = this.state;
    Auth.confirmSignUp(this.props.username, authCode)
      .then(data => console.log(data), this.props.closePopup())
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
              onChangeText={text => this.setState({ authCode: text })}
            />
            <Button
              title="Confirm sign up"
              color="#84c7da"
              onPress={() => this.confirmSignup()}
            />
            <Button
              title="Close"
              color="#84c7da"
              onPress={() => this.closeModal()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.popupReducer.visible,
});

function mapDispatchToProps(dispatch) {
  return ({
    closePopup: () => dispatch(closePopup()),
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
    justifyContent: 'center',
    width: 300,
    height: 300,
    backgroundColor: '#fff',
  },
  textInput: {
    margin: 15,
    height: 40,
    borderColor: '#673149',
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
