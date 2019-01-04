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

// Экшн для успешного отображения данных списка маркеров
function getMarkersSuccess(payload) {
  return {
    type: FETCH_SUCCESS,
    payload,
  };
}

// Экшн для отображения ошибки получения списка маркеров
function getMarkersFailure(err) {
  return {
    type: FETCH_FAILURE,
    err,
  };
}

// Функция для получения списка маркеров
export default function fetchMarkers(ll) {
  return (dispatch) => {
    // Cначала отправляет экшн ожидания, чтобы можно было крутить спиннеры
    dispatch(getMarkers());
    // Далее происходит получение маркеров по параметру latlng
    return (fetch('https://clover-moscow.herokuapp.com/bars?'
           + 'limit=10&'
           + `ll=${ll}`)
      .then(response => response.json())
      .then(json => dispatch(getMarkersSuccess(json)))
      .catch(err => dispatch(getMarkersFailure(err))));
  };
}
