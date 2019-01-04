/*
  Редьюсер, который записывает в стейт приложения маркеры из ответа API Foursquare
*/

// const FETCHING_MARKERS = 'FETCHING_MARKERS';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const initialState = {
  markers: [],
  markerDetails: {},
  isLoading: false,
  error: false,
};

export default function fetchMarkersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        markers: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
