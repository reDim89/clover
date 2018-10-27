// Store - контейнер, в котором хранится информация о states и reducers всего приложения

import { createStore } from 'redux';
import reducers from './reducers';

export default createStore(reducers);
