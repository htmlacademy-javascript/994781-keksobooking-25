const nameOfType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const fillElementData = (element, value, className, unit = '') => {
  if (value) {
    element.querySelector(className).textContent = `${value} ${unit}`;
  } else {
    element.querySelector(className).remove();
  }
};
const fillElementType = (element, value, className) => {
  if (value) {
    element.querySelector(className).textContent = nameOfType[value];
  } else {
    element.querySelector(className).remove();
  }
};

const fillElementCapacity = (element, firstValue, secondValue, className) => {
  if (firstValue && secondValue >= 0) {
    let message = `${firstValue} комнаты для ${secondValue} гостей.`;
    if (secondValue === 0) {
      message = 'Не для гостей.';
    }

    element.querySelector(className).textContent = message;
  } else {
    element.querySelector(className).remove();
  }
};

const fillElementTime = (element, firstValue, secondValue, className) => {
  if (firstValue && secondValue){
    element.querySelector(className).textContent = `Заезд после ${firstValue}, выезд до ${secondValue}.`;
  } else {
    element.querySelector('className').remove();
  }
};

const fillFeaturesList = (element, value, className) => {
  const featuresContainerElement = element.querySelector(className);
  const featuresListFragment = document.createDocumentFragment();
  if (value) {
    value.forEach((offerFeatures) => {
      const featureListItem = featuresContainerElement.querySelector(`.popup__feature--${offerFeatures}`);
      if (featureListItem) {
        featuresListFragment.append(featureListItem);
      }
    });
    featuresContainerElement.innerHTML = '';
    featuresContainerElement.append(featuresListFragment);
  } else {
    featuresContainerElement.remove();
  }
};

const fillElementAvatar = (element, value, className) => {
  if (value) {
    element.querySelector(className).src = value;
  } else {
    element.querySelector(className).remove();
  }
};
const fillElementPhotos = (element, value, className) => {
  const popupPhotoContainerElement = element.querySelector(className);
  const popupPhotoFragment= document.createDocumentFragment();
  if (value) {
    value.forEach((offerPhotos) => {
      const offerContainer = popupPhotoContainerElement.cloneNode(true);
      offerContainer.querySelector('.popup__photo').src = offerPhotos;
      const popupPhotoItem = offerContainer.querySelector('.popup__photo');
      if (value) {
        popupPhotoFragment.append(popupPhotoItem);
      }
    });
    popupPhotoContainerElement.innerHTML = '';
    popupPhotoContainerElement.append(popupPhotoFragment);
  } else {
    popupPhotoContainerElement.remove();
  }
};

const createCard = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  fillElementData(cardElement, offer.title, '.popup__title');
  fillElementData(cardElement, offer.address, '.popup__text--address');
  fillElementData(cardElement, offer.price, '.popup__text--price', '₽/ночь.');
  fillElementData(cardElement, offer.description, '.popup__description');
  fillElementType(cardElement, offer.type, '.popup__type');
  fillElementCapacity(cardElement, offer.rooms, offer.guests, '.popup__text--capacity');
  fillElementTime(cardElement, offer.checkin, offer.checkout, '.popup__text--time');
  fillFeaturesList(cardElement, offer.features, '.popup__features');
  fillElementAvatar(cardElement, author.avatar, '.popup__avatar');
  fillElementPhotos(cardElement, offer.photos, '.popup__photos');

  return cardElement;
};

export {createCard};
