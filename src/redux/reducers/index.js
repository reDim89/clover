// В этом файле все редьюсеры объединяются в корневой

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import popupReducer from './popupReducer';
import toastReducer from './toastReducer';

// Стандартная функция combineReducers

const rootReducer = combineReducers({
  authReducer,
  popupReducer,
  toastReducer,
});

export default rootReducer;
