import {similarOffers} from './data.js';

const mapElement = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const createOfferElement = ({author, offer}) => {
  const offerElement = similarOfferTemplate.cloneNode(true);
  if (offer.title) {
    offerElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    offerElement.querySelector('.popup__title').remove();
  }
  if (offer.address) {
    offerElement.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    offerElement.querySelector('.popup__text--address').remove();
  }
  if (offer.price) {
    offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь.`;
  } else {
    offerElement.querySelector('.popup__text--price').remove();
  }
  const createPopupType = () => {
    const nameOfType = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец', hotel: 'Отель'};
    if (offer.type) {
      offerElement.querySelector('.popup__type').textContent = nameOfType[offer.type];
    } else {
      offerElement.querySelector('.popup__type').remove();
    }
  };
  createPopupType();

  if (offer.rooms && offer.guests) {
    offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  } else {
    offerElement.querySelector('.popup__text--capacity').remove();
  }
  if (offer.checkin && offer.checkout){
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
  } else {
    offerElement.querySelector('.popup__text--time').remove();
  }

  const createFeaturesList = () => {
    const featuresContainer = offerElement.querySelector('.popup__features');
    const featuresListFragment= document.createDocumentFragment();
    offer.features.forEach((offerFeatures) => {
      const featureListItem = featuresContainer.querySelector(`.popup__feature--${offerFeatures}`);
      if (featureListItem) {
        featuresListFragment.append(featureListItem);
      }
    });
    featuresContainer.innerHTML = '';
    featuresContainer.append(featuresListFragment);
  };
  createFeaturesList();

  if(offer.description){
    offerElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    offerElement.querySelector('.popup__description').remove();
  }
  if(author.avatar){
    offerElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    offerElement.querySelector('.popup__avatar').remove();
  }

  const createPopupPhotos = () => {
    const popupPhotoContainer = offerElement.querySelector('.popup__photos');
    const popupPhotoFragment= document.createDocumentFragment();

    offer.photos.forEach((offerPhotos) => {
      const offerContainer = popupPhotoContainer.cloneNode(true);
      offerContainer.querySelector('.popup__photo').src = offerPhotos;
      const popupPhotoItem = offerContainer.querySelector('.popup__photo');
      if (offer.photos) {
        popupPhotoFragment.append(popupPhotoItem);
      }
    });
    popupPhotoContainer.innerHTML = '';
    popupPhotoContainer.append(popupPhotoFragment);
  };
  createPopupPhotos();
  return offerElement;
};

mapElement.appendChild(createOfferElement(similarOffers[5]));
