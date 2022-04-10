import {createErrorMessage} from './util.js';

const ERROR_FORM_MESSAGE = 'Произошла ошибка загрузки объявлений. Попробуйте ещё раз позже';
const SERVER_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  const offersList = fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            onSuccess(offers);
          });
        return offersList;
      } else {
        createErrorMessage(ERROR_FORM_MESSAGE);
      }
    })
    .catch(() => {
      createErrorMessage(ERROR_FORM_MESSAGE);
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
