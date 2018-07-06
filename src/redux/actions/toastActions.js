
// Экшны для показа и скрытия тоста
// В доп. информации - длительность показа и сообщение

const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

export function showToast(message, duration = 4000) {
  return {
    type: SHOW_TOAST,
    payload: {
      message,
      duration,
    },
  };
}

export function hideToast() {
  return {
    type: HIDE_TOAST,
  };
}
