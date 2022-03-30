import {createErrorMessage} from './util.js';


const getData = (onSuccess) => {
  const ads = [];
  const offersList = fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            onSuccess(offers);
          });
        ads.push(offersList);
      } else {
        createErrorMessage('Произошла ошибка загрузки объявлений. Попробуйте ещё раз позже');
      }
    })
    .catch(() => {
      createErrorMessage('Произошла ошибка загрузки объявлений. Попробуйте ещё раз позже');
    });
};


export {getData};
