import {activatePage, mainForm} from './page.js';
import {createCard} from './add-card.js';
import {getData} from './api.js';

const OFFERS_COUNT = 10;
const initialAds = [];
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

const showMarkers = (ads) => {
  markerGroup.clearLayers();
  ads
    .slice(0, OFFERS_COUNT)
    .forEach((ad) => {
      createMarker(ad);
    });
};

getData((ads) => {
  ads.forEach((ad) => {
    createMarker(ad);
  });
});

// markerGroup.clearLayers();

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

export {resetPoint, initialAds, markerGroup, showMarkers};
