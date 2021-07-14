import {
  showAlert
} from './service/index.js';

export const getData = (onSuccess) => fetch('https://23.javascript.pages.academy/kekstagram/data', { method: 'GET' })

  .then((response) => response.json())
  .then((data) => onSuccess(data));


export const sendData = (onSuccess, onFail, body) => fetch('https://23.javascript.pages.academy/kekstagram', { method: 'POST', body })
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      showAlert('Не удалось отправить форму.Попробуйте ещё раз');
    }
  })
  .catch(() => showAlert('Не удалось отправить форму.Попробуйте ещё раз'));
