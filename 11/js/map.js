import {activatePage, mainForm} from './page.js';
import {createCard} from './add-card.js';
import {getData} from './api.js';
import {debounce} from './util.js';

const OFFERS_COUNT = 10;
const MarkerLocation = {
  LAT: 35.68172,
  LNG: 139.75392,
};

const markerAddress = mainForm.querySelector('[name="address"]');


const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: MarkerLocation.LAT,
    lng: MarkerLocation.LNG,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const centerMarker = map.getCenter();
markerAddress.value = `${centerMarker.lat.toFixed(5)}, ${centerMarker.lng.toFixed(5)}`;

// Создаем точку на карте для передвижения
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainPinMarker = L.marker(
  {
    lat: MarkerLocation.LAT,
    lng: MarkerLocation.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// Создаем точки на карте для похожих объявлений

const simplePinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const {location} = ad;
  const marker = L.marker({
    lat: location.lat,
    lng: location.lng
  },
  {
    icon: simplePinIcon
  });
  marker.addTo(markerGroup)
    .bindPopup(createCard(ad));
  return marker;
};


const filterElement = document.querySelector('.map__filters-container');

const initialAds = [];
const RERENDER_DELAY = 500;

getData((ads) => {
  initialAds.push(...ads);
  ads
    .slice(0, OFFERS_COUNT)
    .forEach((ad) => {
      createMarker(ad);
    });
});
const DEFOLT_FILTER_VALUE = 'any';


//фильтрация по типу жилья
const filterTypeElement = document.querySelector('[name="housing-type"]');
let filterTypeValue = DEFOLT_FILTER_VALUE;
const filterType = (ad) => {
  filterTypeValue = filterTypeElement.value;
  if (filterTypeValue === 'any') {
    return true;
  } else {
    return filterTypeValue === ad.offer.type;
  }
};

//фильтрация по цене
const filterPriceElement = document.querySelector('[name="housing-price"]');
let filterPriceValue = DEFOLT_FILTER_VALUE;

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
const filterRoomsElement = document.querySelector('[name="housing-rooms"]');
let filterRoomsValue = DEFOLT_FILTER_VALUE;
const filterRooms = (ad) => {
  filterRoomsValue = filterRoomsElement.value;
  if (filterRoomsValue === 'any') {
    return true;
  } else {
    return filterRoomsValue === String(ad.offer.rooms);
  }
};

//фильтрация по числу гостей
const filterGuestsElement = document.querySelector('[name="housing-guests"]');
let filterGuestsValue = DEFOLT_FILTER_VALUE;
const filterGuests = (ad) => {
  filterGuestsValue = filterGuestsElement.value;
  if (filterGuestsValue === 'any') {
    return true;
  } else {
    return filterGuestsValue === String(ad.offer.guests);
  }
};

//фильтрация фичеры
const filterfeaturesElement = document.querySelector('[id="housing-features"]');
const featureElements = Array.from(document.querySelectorAll('[name="features"]'));
let checkedFeatures = [];

filterfeaturesElement.addEventListener('change', () => {
  markerGroup.clearLayers();
  checkedFeatures = featureElements.filter((feature) => feature.checked).map((feature) => feature.value);

  initialAds
    .filter((ad) => {
      checkedFeatures.every((checkedFeature) => ad.offer.features.includes(checkedFeature));
      //метод не может прочитать массив ad.offer.features в котором есть Undefined? как с этим быть?
    })
    .slice(0, OFFERS_COUNT)
    .forEach((ad) => {
      createMarker(ad);
    });
});

//не уверена, что debounce нужно использовать здесь, но как проверить проверить до того как сделаю фильтр, не знаю =)
debounce(
  filterElement.addEventListener('change', () => {
    markerGroup.clearLayers();
    initialAds
      .filter((ad) => filterGuests(ad) && filterRooms(ad) && filterPrice(ad) && filterType(ad))
      .slice(0, OFFERS_COUNT)
      .forEach((ad) => {
        createMarker(ad);
      });
  },
  RERENDER_DELAY));

mainPinMarker.on('moveend', (evt) => {
  const markerLatLng  = evt.target.getLatLng();
  markerAddress.value = `${markerLatLng.lat.toFixed(5)}, ${markerLatLng.lng.toFixed(5)}`;
});

const resetPoint = () => {
  const {LAT, LNG} = MarkerLocation;
  mainPinMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });
  map.setView({
    lat: LAT,
    lng: LNG,
  }, 12);
  markerAddress.value = `${LAT}, ${LNG}`;
  map.closePopup();
};

export {resetPoint};
