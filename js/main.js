
import './form.js';
import './similar-offers.js';
import './map.js';

const getData = () => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      console.log(offers);
      return offers;
    });
};

const similarOffers = getData();

console.log(similarOffers);
