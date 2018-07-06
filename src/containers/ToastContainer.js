/*
Контейнер (презентер) для показа тостов
Подключен к стору, принимает изменение пропсов и использует их
как триггер для собственного показа/скрытия
*/

import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { hideToast } from '../redux/actions/toastActions';
import Toast from '../components/Toast';

class ToastContainer extends Component {
  constructor() {
    super();
    // В стейт входят: видим/невидим, сообщение, прозрачность (нужно для красивой анимации)
    this.state = {
      showToast: false,
      message: null,
      animateOpacityValue: new Animated.Value(0),
    };
  }

  // lifecycle-метод, который триггерится, если из родительского компонента
  // в стор передан экшн SHOW_TOAST
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      // Если в измененных пропсах передано сообщение (т.е. стор <- экшн с message)
      const dismissTimeout = setTimeout(() => {
        this.props.hideToast();
      }, nextProps.duration); // ставим таймер, по которому в стор уйдет экшн без message
      clearTimeout(this.state.dismissTimeout); // очищаем таймер, который был записан в стейт
      this.showToastFunction(nextProps.message, dismissTimeout); // вызываем ф-ию показа
    } else {
      this.hideToastFunction(); // вызываем ф-ию скрытия, если стор <- экшн без message
    }
  }

  showToastFunction = (message, dismissTimeout) => {
    this.setState( // запускаем анимацию показа тоста
      {
        showToast: true,
        animateOpacityValue: new Animated.Value(0),
        message,
        dismissTimeout,
      },
      () => { Animated.timing(this.state.animateOpacityValue, { toValue: 1 }).start(); },
    );
  }

  hideToastFunction = () => { // запускаем анимацию скрытия тоста
    Animated.timing(this.state.animateOpacityValue, { toValue: 0 }).start(() => {
      this.setState({ showToast: false, message: null, dismissTimeout: null });
    });
  }

  render() {
    if (this.state.showToast) { // рендерим вьюху или ничего
      return (
        <Toast
          toastMessage={this.state.message}
          animateOpacityValue={this.state.animateOpacityValue}
        />);
    } else {
      return null;
    }
  }
}

ToastContainer.propTypes = {
  duration: PropTypes.number,
  message: PropTypes.string,
  hideToast: PropTypes.func.isRequired,
};

ToastContainer.defaultProps = {
  duration: 4000,
  message: null,
};

const mapStateToProps = state => ({
  showToast: state.toastReducer.showToast,
  message: state.toastReducer.message,
  duration: state.toastReducer.duration,
});

const mapDispatchToProps = dispatch => ({
  hideToast: () => dispatch(hideToast()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastContainer);
