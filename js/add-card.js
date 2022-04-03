const cardTemplate = document.querySelector('#card').content.querySelector('.popup');


const createCard = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const fillElementData = (value, className, unit = '') => {
    if (value) {
      cardElement.querySelector(className).textContent = `${value} ${unit}`;
    } else {
      cardElement.querySelector(className).remove();
    }
  };
  fillElementData(offer.title, '.popup__title');
  fillElementData(offer.address, '.popup__text--address');
  fillElementData(offer.price, '.popup__text--price', '₽/ночь.');
  fillElementData(offer.description, '.popup__description');

  const fillElementType = () => {
    const nameOfType = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец', hotel: 'Отель'};
    if (offer.type) {
      cardElement.querySelector('.popup__type').textContent = nameOfType[offer.type];
    } else {
      cardElement.querySelector('.popup__type').remove();
    }
  };
  fillElementType();

  if (offer.rooms && offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }
  if (offer.checkin && offer.checkout){
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }

  const fillFeaturesList = () => {
    const featuresContainer = cardElement.querySelector('.popup__features');
    const featuresListFragment= document.createDocumentFragment();
    if (offer.features) {
      offer.features.forEach((offerFeatures) => {
        const featureListItem = featuresContainer.querySelector(`.popup__feature--${offerFeatures}`);
        if (featureListItem) {
          featuresListFragment.append(featureListItem);
        }
      });
      featuresContainer.innerHTML = '';
      featuresContainer.append(featuresListFragment);
    } else {
      featuresContainer.remove();
    }
  };
  fillFeaturesList();


  if (author.avatar) {
    cardElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').remove();
  }

  const fillElementPhotos = () => {
    const popupPhotoContainer = cardElement.querySelector('.popup__photos');
    const popupPhotoFragment= document.createDocumentFragment();
    if (offer.photos) {
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
    } else {
      popupPhotoContainer.remove();
    }
  };
  fillElementPhotos();
  return cardElement;
};

export {createCard};
