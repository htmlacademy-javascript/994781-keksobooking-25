import {activatePage, mainForm} from './page.js';
import {similarOffers} from './data.js';
import {createOfferElement} from './similar-offers.js';
import {resetButton} from './form.js';

const markerAddress = mainForm.querySelector('[name="address"]');


const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 12);

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
    lat: 35.681729,
    lng: 139.753927,
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

const getCardsOffers = () => {
  const points = [];
  for (let i = 0; i <= similarOffers.length - 1; i++) {
    points[i] = similarOffers[i].offer.location;
    points[i].popup = createOfferElement(similarOffers[i]);
  }
  return points;
};

const pointsOfOffers = getCardsOffers();

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng, popup} = point;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: simplePinIcon,
  },);

  marker.addTo(markerGroup)
    .bindPopup(popup);

  return marker;
};

pointsOfOffers.forEach((point) => {
  createMarker(point);
});

// markerGroup.clearLayers();

mainPinMarker.on('moveend', (evt) => {
  const markerLatLng  = evt.target.getLatLng();
  markerAddress.value = `${markerLatLng.lat.toFixed(5)}, ${markerLatLng.lng.toFixed(5)}`;
});

const MARKER_LAT_LNG  = '35.68172, 139.75392';
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.68172,
    lng: 139.75392,
  });
  map.setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 12);
  markerAddress.value = MARKER_LAT_LNG;
  map.closePopup();
});


export {centerMarker};
