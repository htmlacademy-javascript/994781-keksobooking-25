const nameOfType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
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

  const fillElementType = () => {
    if (offer.type) {
      cardElement.querySelector('.popup__type').textContent = nameOfType[offer.type];
    } else {
      cardElement.querySelector('.popup__type').remove();
    }
  };

  const fillElementCapacity = () => {
    if (offer.rooms  && offer.guests >= 0) {
      if (offer.guests === 0) {
        cardElement.querySelector('.popup__text--capacity').textContent = 'Выбранный тип жилья не подходит для гостей.';
      } else {
        cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
      }
    } else {
      cardElement.querySelector('.popup__text--capacity').remove();
    }
  };


  const fillElementTime = () => {
    if (offer.checkin && offer.checkout){
      cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
    } else {
      cardElement.querySelector('.popup__text--time').remove();
    }
  };

  const fillFeaturesList = () => {
    const featuresContainerElement = cardElement.querySelector('.popup__features');
    const featuresListFragment = document.createDocumentFragment();
    if (offer.features) {
      offer.features.forEach((offerFeatures) => {
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

  const fillElementAvatar = () => {
    if (author.avatar) {
      cardElement.querySelector('.popup__avatar').src = author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').remove();
    }
  };

  const fillElementPhotos = () => {
    const popupPhotoContainerElement = cardElement.querySelector('.popup__photos');
    const popupPhotoFragment= document.createDocumentFragment();
    if (offer.photos) {
      offer.photos.forEach((offerPhotos) => {
        const offerContainer = popupPhotoContainerElement.cloneNode(true);
        offerContainer.querySelector('.popup__photo').src = offerPhotos;
        const popupPhotoItem = offerContainer.querySelector('.popup__photo');
        if (offer.photos) {
          popupPhotoFragment.append(popupPhotoItem);
        }
      });
      popupPhotoContainerElement.innerHTML = '';
      popupPhotoContainerElement.append(popupPhotoFragment);
    } else {
      popupPhotoContainerElement.remove();
    }
  };
  fillElementData(offer.title, '.popup__title');
  fillElementData(offer.address, '.popup__text--address');
  fillElementData(offer.price, '.popup__text--price', '₽/ночь.');
  fillElementData(offer.description, '.popup__description');
  fillElementType();
  fillElementCapacity();
  fillElementTime();
  fillFeaturesList();
  fillElementAvatar();
  fillElementPhotos();

  return cardElement;
};

export {createCard};
