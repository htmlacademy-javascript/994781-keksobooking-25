import {formElement, filterElement} from './page.js';
import {resetPoint, showMarkers, initialAds} from './map.js';
import {sendData} from './api.js';
import {createErrorMessage, createSuccessMessage} from './util.js';
import {resetAvatar, resetPhotos} from './photo.js';

const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};
const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const resetButtonElement = document.querySelector('.ad-form__reset');
const submitButtonElement = document.querySelector('.ad-form__submit');
const roomsFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');
const typeFieldElement = formElement.querySelector('[name="type"]');
const priceFieldElement = formElement.querySelector('[name="price"]');
const sliderPriceElement = document.querySelector('.ad-form__slider');
const timeInFieldElement = formElement.querySelector('[name="timein"]');
const timeOutFieldElement = formElement.querySelector('[name="timeout"]');

noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: typeOption[typeFieldElement.value],
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
sliderPriceElement.noUiSlider.on('slide', () => {
  priceFieldElement.value = sliderPriceElement.noUiSlider.get();
});

priceFieldElement.addEventListener('change', () => {
  sliderPriceElement.noUiSlider.updateOptions({
    start: priceFieldElement.value,
  });
});

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
}, false);

const validateCapacityField = () => roomsOption[roomsFieldElement.value].includes(capacityFieldElement.value);

const getCapacityErrorMessage = () => 'Значение не подходит для выбранного количества комнат';

pristine.addValidator(capacityFieldElement, validateCapacityField, getCapacityErrorMessage);


typeFieldElement.addEventListener('change', () => {
  priceFieldElement.placeholder = typeOption[typeFieldElement.value];
});

const validatePriceField = (value) => value >= typeOption[typeFieldElement.value];

const getPriceFieldErrorMessage = () => `Для выбранного типа жилья минимальная цена ${typeOption[typeFieldElement.value]} руб.`;

pristine.addValidator(priceFieldElement, validatePriceField, getPriceFieldErrorMessage);


timeInFieldElement.addEventListener('change', () => {
  timeOutFieldElement.value = timeInFieldElement.value;
});
timeOutFieldElement.addEventListener('change', () => {
  timeInFieldElement.value = timeOutFieldElement.value;
});

const mapFilterReset = () => {
  filterElement.reset();
  showMarkers(initialAds);
};

const resetForm = () => {
  formElement.reset();
  sliderPriceElement.noUiSlider.reset();
  pristine.reset();
  resetPoint();
  resetAvatar();
  resetPhotos();
  mapFilterReset();
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        createSuccessMessage();
        resetForm();
        unblockSubmitButton();
      },
      () => {
        createErrorMessage('Не удалось отправить форму. Попробуйте ещё раз');
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {resetButtonElement, submitButtonElement};
