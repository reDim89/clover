// В этом файле все редьюсеры объединяются в корневой

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import popupReducer from './popupReducer';
import toastReducer from './toastReducer';
import fetchMarkersReducer from './fetchMarkersReducer';

// Стандартная функция combineReducers

const rootReducer = combineReducers({
  authReducer,
  popupReducer,
  toastReducer,
  fetchMarkersReducer,
});

export default rootReducer;
