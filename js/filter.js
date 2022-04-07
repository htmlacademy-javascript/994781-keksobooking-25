import {mapFilter} from './page.js';
import {initialAds, OFFERS_COUNT, createMarker} from './map.js';


const DEFAULT_FILTER_VALUE = 'any';
const filterTypeElement = document.querySelector('[name="housing-type"]');
let filterTypeValue = DEFAULT_FILTER_VALUE;
const filterPriceElement = document.querySelector('[name="housing-price"]');
let filterPriceValue = DEFAULT_FILTER_VALUE;
const filterRoomsElement = document.querySelector('[name="housing-rooms"]');
let filterRoomsValue = DEFAULT_FILTER_VALUE;
const filterGuestsElement = document.querySelector('[name="housing-guests"]');
let filterGuestsValue = DEFAULT_FILTER_VALUE;
const featureElements = Array.from(document.querySelectorAll('[name="features"]'));


//фильтрация по типу жилья
const filterType = (ad) => {
  filterTypeValue = filterTypeElement.value;
  if (filterTypeValue === 'any') {
    return true;
  } else {
    return filterTypeValue === ad.offer.type;
  }
};

//фильтрация по цене
const filterPrices = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};
const filterPrice = (ad) => {
  filterPriceValue = filterPriceElement.value;
  if (filterPriceValue === 'any') {
    return true;
  } else {

    return ad.offer.price > filterPrices[filterPriceValue].min && ad.offer.price < filterPrices[filterPriceValue].max;
  }
};

//филтрация по числу комнат
const filterRooms = (ad) => {
  filterRoomsValue = filterRoomsElement.value;
  if (filterRoomsValue === 'any') {
    return true;
  } else {
    return filterRoomsValue === String(ad.offer.rooms);
  }
};

//фильтрация по числу гостей
const filterGuests = (ad) => {
  filterGuestsValue = filterGuestsElement.value;
  if (filterGuestsValue === 'any') {
    return true;
  } else {
    return filterGuestsValue === String(ad.offer.guests);
  }
};

//фильтрация фичеры
const filterFeatures = (ad) => {
  const checkedFeatures = featureElements.filter((feature) => feature.checked).map((feature) => feature.value);
  return checkedFeatures.every((checkedFeature) => ad.offer.features && ad.offer.features.includes(checkedFeature));
};

//сброс маркеров на карте
const mapFilterReset = () => {
  mapFilter.reset();
  initialAds.slice(0, OFFERS_COUNT)
    .forEach((ad) => {
      createMarker(ad);
    });
};

export {filterGuests, filterRooms, filterPrice, filterType, filterFeatures, mapFilterReset};
