// Редьюсер для показа тоста

const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';
const initialState = { showToast: false, message: null, duration: null };

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST: return (
      {
        showToast: true,
        message: action.payload.message,
        duration: action.payload.duration,
      });
    case HIDE_TOAST: return { showToast: false };
    default: return state;
  }
};

export default toastReducer;
