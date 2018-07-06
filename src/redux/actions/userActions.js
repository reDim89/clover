
// Экшны - js-функции, которые возвращают тип
// На основании типа редьюсер изменяет стэйт
// Также внутри экшна может передаваться доп. инфа

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export function userLogin() {
  return {
    type: LOG_IN,
  };
}

export function userLogout() {
  return {
    type: LOG_OUT,
  };
}
