/*
  Файл с экшнами для получения списка маркеров по API
*/

const FETCHING_MARKERS = 'FETCHING_MARKERS';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

// Экшн для показа спиннера
function getMarkers() {
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

    return (fetch('https://clover-moscow.herokuapp.com/bars?'
           + 'limit=10&'
           + 'll=55.73879,37.57097')
      .then(response => response.json())
      .then(json => dispatch(getMarkersSuccess(json)))
      .catch(err => dispatch(getMarkersFailure(err))));
  };
}
