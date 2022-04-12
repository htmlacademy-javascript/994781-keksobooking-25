import {initialAds, showMarkers} from './map.js';
import {debounce} from './util.js';

const FILTER_DELAY = 500;
const PricesRange = {
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
const filterElement = document.querySelector('.map__filters-container');
const filterTypeElement = document.querySelector('[name="housing-type"]');
const filterPriceElement = document.querySelector('[name="housing-price"]');
const filterRoomsElement = document.querySelector('[name="housing-rooms"]');
const filterGuestsElement = document.querySelector('[name="housing-guests"]');
const featureElements = Array.from(document.querySelectorAll('[name="features"]'));

const filterType = (ad) => {
  const filterTypeValue = filterTypeElement.value;
  if (filterTypeValue === 'any') {
    return true;
  }
  return filterTypeValue === ad.offer.type;
};

const filterPrice = (ad) => {
  const filterPriceValue = filterPriceElement.value;
  if (filterPriceValue === 'any') {
    return true;
  }
  return ad.offer.price > PricesRange[filterPriceValue].MIN && ad.offer.price < PricesRange[filterPriceValue].MAX;
};

const filterRooms = (ad) => {
  const filterRoomsValue = filterRoomsElement.value;
  if (filterRoomsValue === 'any') {
    return true;
  }
  return filterRoomsValue === String(ad.offer.rooms);
};

const filterGuests = (ad) => {
  const filterGuestsValue = filterGuestsElement.value;
  if (filterGuestsValue === 'any') {
    return true;
  }
  return filterGuestsValue === String(ad.offer.guests);
};

const filterFeatures = (ad) => {
  const checkedFeatures = featureElements.filter((feature) => feature.checked).map((feature) => feature.value);
  return checkedFeatures.every((checkedFeature) => ad.offer.features && ad.offer.features.includes(checkedFeature));
};

filterElement.addEventListener('change', debounce(() => {
  const filteredAds =  [];

  for (let i = 0; i < initialAds.length; i++) {
    if (filterGuests(initialAds[i]) && filterRooms(initialAds[i]) && filterPrice(initialAds[i]) && filterType(initialAds[i]) && filterFeatures(initialAds[i])) {
      filteredAds.push(initialAds[i]);
    }
    if (filteredAds.length === 10) {
      break;
    }
  }
  showMarkers(filteredAds);
}, FILTER_DELAY));
