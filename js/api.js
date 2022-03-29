const getData = (onSuccess) => {
  const ads = [];
  const offersList = fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    });
  ads.push(offersList);
};

export {getData};
