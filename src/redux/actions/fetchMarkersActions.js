/*
  Файл с экшнами для получения списка маркеров по API
*/

import Config from 'react-native-config';


const FETCHING_MARKERS = 'FETCHING_MARKERS';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

// Экшн для показа спиннера
function getMarkers() {
  console.log(Config);
  return {
    type: FETCHING_MARKERS,
  };
}

// Экшн для успешного отображения данных
function getMarkersSuccess(payload) {
  return {
    type: FETCH_SUCCESS,
    payload,
  };
}

// Экшн для отображения ошибки
function getMarkersFailure(err) {
  return {
    type: FETCH_FAILURE,
    err,
  };
}

// Основная функция, которая сначала отправляет экшн ожидания,
// чтобы можно было крутить спиннеры
export default function fetchMarkers() {
  return (dispatch) => {
    dispatch(getMarkers());

    return (fetch('https://api.foursquare.com/v2/venues/explore?'
           + `client_id=${Config.CLIENT_ID}&`
           + `client_secret=${Config.CLIENT_SECRET}&`
           + 'v=20181103&ll=55.730149,37.61556&section=drinks&limit=10')
      .then(response => response.json())
      .then(json => dispatch(getMarkersSuccess(json.response.groups[0].items)))
      .catch(err => dispatch(getMarkersFailure(err))));
  };
}
