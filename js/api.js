import { SEND_DATA_URL } from './service/index.js';

export const getData = (url, onSuccess, onError) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });

export const sendData = (onSuccess, onError, body) =>
  fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
