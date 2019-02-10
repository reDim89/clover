/*
Контейнер с бизнес-логикой залогина
*/

import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import Button from '../components/Button';
import ToastContainer from './ToastContainer';

import { login } from '../redux/actions/authActions';
import { showToast } from '../redux/actions/toastActions';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Sign In',
    headerStyle: {
      backgroundColor: '#0D5C63',
      color: '#FFFFFA',
    },
    headerTintColor: '#fff',
  };

  constructor(props) {
    super(props);
    // Переменные стейта, в которые записывается ввод логина/пароля в формы
    this.state = {
      username: '',
      password: '',
      loading: false,
    };
    /*
    Привязка функций к контексту. Нужно, чтобы передать их в пропсы дочернего компонента
     и вызывать из дочернего компонента, меняя стейт родительского
    */
    this.setUsernameFromInput = this.setUsernameFromInput.bind(this);
    this.setPassFromInput = this.setPassFromInput.bind(this);
  }

  componentDidUpdate() {
    // Проверка залогиновости, если залогин - отправляем на карту
    // Залогиновость - общее состояние приложения, поэтому лежит в сторе Redux
    if (this.props.auth) {
      this.props.navigation.navigate('NavigationStack');
    }
  }

  async onPressSignIn() {
    // Логинимся, если успех - отправялем экшн в стор
    const { username, password } = this.state;
    this.setState({ loading: true });
    await Auth.signIn(username, password)
      .then(() => this.setState({ loading: false }))
      .then(() => this.props.login())
      .catch(err => this.errorToast(err));
  }

  setUsernameFromInput(text) {
    // Метод, который вызывается в дочернем компоненте при вводе символов в логин
    this.setState({ username: text });
  }

  setPassFromInput(text) {
    // Метод, который вызывается в дочернем компоненте при вводе символов в пароль
    this.setState({ password: text });
  }

  errorToast(error) {
    const { showToast } = this.props;
    if (typeof error === 'object') {
      return showToast(error.message, 2000);
    }
    return showToast(error, 2000);
  }

  render() {
    // Рендерим форму логина и передаем методы
    const { loading } =  this.state;
    if (loading) {
      return (
        <View>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 30 }}
          />
        </View>
      );
    }
    return (
      <View style={styles.signInFormStyle}>
        <LoginForm
          onChangeUsername={this.setUsernameFromInput}
          onChangePass={this.setPassFromInput}
        />
        {
          // На кнопку вешаем коллбэк авторизации
        }
        <Button
          buttonText="Login"
          onPress={() => this.onPressSignIn()}
        />
        <ToastContainer />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  showToast: (message, duration) => dispatch(showToast(message, duration)),

});

const mapStateToProps = state => ({
  auth: state.authReducer.auth,
});

const styles = StyleSheet.create({
  signInFormStyle: {
    flex: 1,
    backgroundColor: '#0D5C63',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
