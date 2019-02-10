// Reducer - js-функция, которая слушает экшны от компонентов
// и меняет state соответственно

// Список возможных экшнов определяется через константы
// Почему так: https://redux.js.org/recipes/reducing-boilerplate

export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CONFIRM_SIGNUP = 'CONFIRM_SIGNUP';
export const CONFIRM_SIGNUP_SUCCESS = 'CONFIRM_SIGNUP_SUCCESS';
export const CONFIRM_SIGNUP_FAILURE = 'CONFIRM_SIGNUP_FAILURE';

export const CONFIRM_LOGIN = 'CONFIRM_LOGIN';
export const CONFIRM_LOGIN_SUCCESS = 'CONFIRM_LOGIN_SUCCESS';
export const CONFIRM_LOGIN_FAILURE = 'CONFIRM_LOGIN_FAILURE';


// Начальное состояние на момент загрузки приложения

const initialState = { auth: false };

// Любой редьюсер принимает на вход текущий стэйт и экшн и возвращает новый стэйт

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { auth: true };
    case LOG_OUT:
      return { auth: false };
    default:
      return state;
  }
};

export default authReducer;
