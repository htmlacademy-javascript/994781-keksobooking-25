const SERVER_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  const offersList = fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            onSuccess(offers);
          });
        return offersList;
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
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
