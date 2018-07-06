// Store - контейнер, в котором хранится информация о states и reducers всего приложения

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import { middleware } from '../utils/redux';

export default createStore(reducers, applyMiddleware(middleware));
