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
const fillElementType = (element, type, className) => {
  if (type) {
    element.querySelector(className).textContent = nameOfType[type];
  } else {
    element.querySelector(className).remove();
  }
};

const fillElementCapacity = (element, rooms, guests, className) => {
  if (rooms && guests >= 0) {
    let message = `${rooms} комнаты для ${guests} гостей.`;
    if (guests === 0) {
      message = 'Не для гостей.';
    }

    element.querySelector(className).textContent = message;
  } else {
    element.querySelector(className).remove();
  }
};

const fillElementTime = (element, checkin, checkout, className) => {
  if (checkin && checkout){
    element.querySelector(className).textContent = `Заезд после ${checkin}, выезд до ${checkout}.`;
  } else {
    element.querySelector('className').remove();
  }
};

const fillFeaturesList = (element, features, className) => {
  const featuresContainerElement = element.querySelector(className);
  const featuresListFragment = document.createDocumentFragment();
  if (features) {
    features.forEach((offerFeatures) => {
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

const fillElementAvatar = (element, avatar, className) => {
  if (avatar) {
    element.querySelector(className).src = avatar;
  } else {
    element.querySelector(className).remove();
  }
};
const fillElementPhotos = (element, photos, className) => {
  const popupPhotoContainerElement = element.querySelector(className);
  const popupPhotoFragment= document.createDocumentFragment();
  if (photos) {
    photos.forEach((offerPhotos) => {
      const offerContainer = popupPhotoContainerElement.cloneNode(true);
      offerContainer.querySelector('.popup__photo').src = offerPhotos;
      const popupPhotoItem = offerContainer.querySelector('.popup__photo');
      if (photos) {
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
