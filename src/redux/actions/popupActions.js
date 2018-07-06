const SHOW = 'SHOW';
const CLOSE = 'CLOSE';

export function showPopup() {
  return {
    type: SHOW,
  };
}

export function closePopup() {
  return {
    type: CLOSE,
  };
}
