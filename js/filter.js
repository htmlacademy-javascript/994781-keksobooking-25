import {initialAds, OFFERS_COUNT, createMarker, markerGroup} from './map.js';
import {debounce} from './util.js';

const FILTER_DELAY = 500;

const filterElement = document.querySelector('.map__filters-container');
const filterTypeElement = document.querySelector('[name="housing-type"]');
const filterPriceElement = document.querySelector('[name="housing-price"]');
const filterRoomsElement = document.querySelector('[name="housing-rooms"]');
const filterGuestsElement = document.querySelector('[name="housing-guests"]');
const featureElements = Array.from(document.querySelectorAll('[name="features"]'));


//фильтрация по типу жилья
const filterType = (ad) => {
  const filterTypeValue = filterTypeElement.value;
  if (filterTypeValue === 'any') {
    return true;
  }
  return filterTypeValue === ad.offer.type;
};

//фильтрация по цене
const FilterPrices = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: 100000,
  },
};
const filterPrice = (ad) => {
  const filterPriceValue = filterPriceElement.value;
  if (filterPriceValue === 'any') {
    return true;
  }
  return ad.offer.price > FilterPrices[filterPriceValue].MIN && ad.offer.price < FilterPrices[filterPriceValue].MAX;
};

//филтрация по числу комнат
const filterRooms = (ad) => {
  const filterRoomsValue = filterRoomsElement.value;
  if (filterRoomsValue === 'any') {
    return true;
  }
  return filterRoomsValue === String(ad.offer.rooms);
};

//фильтрация по числу гостей
const filterGuests = (ad) => {
  const filterGuestsValue = filterGuestsElement.value;
  if (filterGuestsValue === 'any') {
    return true;
  }
  return filterGuestsValue === String(ad.offer.guests);
};

//фильтрация фичеры
const filterFeatures = (ad) => {
  const checkedFeatures = featureElements.filter((feature) => feature.checked).map((feature) => feature.value);
  return checkedFeatures.every((checkedFeature) => ad.offer.features && ad.offer.features.includes(checkedFeature));
};

//сброс маркеров на карте


filterElement.addEventListener('change', debounce(() => {
  markerGroup.clearLayers();
  initialAds
    .filter((ad) => filterGuests(ad) && filterRooms(ad) && filterPrice(ad) && filterType(ad) && filterFeatures(ad))
    .slice(0, OFFERS_COUNT)
    .forEach((ad) => {
      createMarker(ad);
    });
}, FILTER_DELAY));

