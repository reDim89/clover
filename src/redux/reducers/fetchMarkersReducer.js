// const FETCHING_MARKERS = 'FETCHING_MARKERS';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const initialState = {
  markers: [],
  isLoading: false,
  error: false,
};

export default function fetchMarkersReduce(state = initialState, action) {
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
