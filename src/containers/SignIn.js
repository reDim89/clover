/*
Контейнер с бизнес-логикой залогина
*/

import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { View } from 'react-native';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import Button from '../components/Button';

import { login } from '../redux/actions/authActions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    // Переменные стейта, в которые записывается ввод логина/пароля в формы
    this.state = {
      username: '',
      password: '',
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
    await Auth.signIn(username, password)
      .then(user => console.log(user))
      .then(() => this.props.login())
      .catch(err => console.log(err));
  }

  setUsernameFromInput(text) {
    // Метод, который вызывается в дочернем компоненте при вводе символов в логин
    this.setState({ username: text });
    console.log(this.state.username);
  }

  setPassFromInput(text) {
    // Метод, который вызывается в дочернем компоненте при вводе символов в пароль
    this.setState({ password: text });
    console.log(this.state.password);
  }

  render() {
    // Рендерим форму логина и передаем методы
    return (
      <View>
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
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
});

const mapStateToProps = state => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
