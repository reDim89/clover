// Редьюсер, управляющий видимостью поп-апа ввода смс-кода

const SHOW = 'SHOW';
const CLOSE = 'CLOSE';
const initialState = { visible: false };

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      return { visible: true };
    case CLOSE:
      return { visible: false };
    default:
      return state;
  }
};

export default popupReducer;
