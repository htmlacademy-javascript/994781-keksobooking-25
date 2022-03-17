import {getRandomIntegerFromRange, getRandomFloatNumber, getRandomArrayElement, getRandomArray} from './util.js';

const SIMILAR_OFFER_COUNT = 10;
const DIGIT = 5;
const Location = {
  MIN_LNG: 139.70000,
  MAX_LNG: 139.80000,
  MIN_LAT: 35.65000,
  MAX_LAT: 35.70000,
};

const Price =  {
  MIN: 1,
  MAX: 100000,
};
const Room = {
  MIN: 1,
  MAX: 15,
};
const Guest = {
  MIN: 1,
  MAX: 10,
};
const TITLES = [
  'Название 1',
  'Название 2',
  'Название 3',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_VARIANTS = ['12:00', '13:00', '14:00'];
const CHECKOUT_VARIANTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi','dishwasher','parking','washer','elevator','conditioner'];
const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];


const createOffer = (value, index) => {
  const lat = getRandomFloatNumber(Location.MIN_LAT, Location.MAX_LAT, DIGIT);
  const lng = getRandomFloatNumber(Location.MIN_LNG, Location.MAX_LNG, DIGIT);

  return {
    author: {
      avatar: `img/avatars/user${String(index + 1).padStart(2, '0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomIntegerFromRange(Price.MIN, Price.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntegerFromRange(Room.MIN, Room.MAX),
      guests: getRandomIntegerFromRange(Guest.MIN, Guest.MAX),
      checkin:  getRandomArrayElement(CHECKIN_VARIANTS),
      checkout: getRandomArrayElement(CHECKOUT_VARIANTS),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
      location: {
        lat: lat,
        lng: lng,
      },
    },
  };
};

const similarOffers = Array.from({length: SIMILAR_OFFER_COUNT}, createOffer);

export {similarOffers};
