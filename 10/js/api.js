import {createErrorMessage} from './util.js';

const ErrorFormMessage = 'Произошла ошибка загрузки объявлений. Попробуйте ещё раз позже';
const serverUrl = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  const offersList = fetch(`${serverUrl}/data`)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            onSuccess(offers);
          });
        return offersList;
      } else {
        createErrorMessage(ErrorFormMessage);
      }
    })
    .catch(() => {
      createErrorMessage(ErrorFormMessage);
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    serverUrl,
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
