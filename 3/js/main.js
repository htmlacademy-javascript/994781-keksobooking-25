function getRandomIntegerFromRange (min, max) {
  if (min < max && min >= 0) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return (`Неверно указан диапазон от ${  min  } до ${  max}`);
}
getRandomIntegerFromRange(0, 20);

function getRandomFloatNumber (min, max, digits) {
  if (min < max && min >= 0) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(digits);
  }
  return (`Неверно указан диапазон от ${  min  } до ${  max}`);
}

// возвращает рандомный элемент массива
function getRandomArrayElement(array) {
  return array[getRandomIntegerFromRange(0, array.length - 1)];
}

// возвращает массив случайной длинны из неповторяющихся значений
function getRandomArray(array) {

  const copyArray = array.slice();
  const newArray = [];

  for (let i = 0; i <= getRandomIntegerFromRange(0, copyArray.length - 1); i++) {
    newArray[i] = copyArray.splice(getRandomIntegerFromRange(0, copyArray.length - 1), 1).join();
  }

  return newArray;
}

const title = [
  'Название 1',
  'Название 2',
  'Название 3',
];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi','dishwasher','parking','washer','elevator','conditioner'];
const description = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const SIMILAR_OFFER_COUNT = 10;

const createOffer = (value, index) => {
  const lat = getRandomFloatNumber(35.65000, 35.70000, 5);
  const lng = getRandomFloatNumber(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${  String(index+1).padStart(2, '0')  }.png`,
    },
    offer: {
      title: getRandomArrayElement(title),
      address: `${lat  }, ${  lng}`,
      price: getRandomIntegerFromRange(1, 100000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomIntegerFromRange(1, 15),
      guests: getRandomIntegerFromRange(1, 10),
      checkin:  getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(description),
      photos: getRandomArray(PHOTOS),
      location: {
        lat: lat,
        lng: lng,
      },
    },
  };
};

const similarOffer = Array.from({length: SIMILAR_OFFER_COUNT}, createOffer);

//Временное решение, для задействовать переменную
const someFunc = () => similarOffer;
someFunc();
