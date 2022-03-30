import {mainForm} from './page.js';
import {sendData} from './api.js';
import {createErrorMessage, createSuccessMessage} from './util.js';

const resetButton = document.querySelector('.ad-form__reset');
const mapFilter = document.querySelector('.map__filters');
const submitButton = document.querySelector('.ad-form__submit');

// Валидация формы
const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
}, false);

// Валидация начений "Количество комнат", "Количество гостей"
const roomsField = mainForm.querySelector('[name="rooms"]');
const capacityField = mainForm.querySelector('[name="capacity"]');
const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

function validateCapacity () {
  return roomsOption[roomsField.value].includes(capacityField.value);
}

function getCapacityErrorMessage () {
  return 'Значение не подходит для выбранного количества комнат';
}

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

//Валидация цены в зависимости от типа жилья
const typeField = mainForm.querySelector('[name="type"]');
const priceField = mainForm.querySelector('[name="price"]');
const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

typeField.addEventListener('change', () => {
  priceField.placeholder = typeOption[typeField.value];
});

function validatePriceField (value) {
  return value >= typeOption[typeField.value];
}

function getPriceFieldErrorMessage () {
  return `Для выбранного типа жилья минимальная цена ${typeOption[typeField.value]} руб.`;
}
pristine.addValidator(priceField, validatePriceField, getPriceFieldErrorMessage);

//слайдер для формы цены
const sliderPriceElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: typeOption[typeField.value],
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
  priceField.value = sliderPriceElement.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  sliderPriceElement.noUiSlider.updateOptions({
    start: priceField.value,
  });
});

// Валидация поля заезда/выезда
const timeInField = mainForm.querySelector('[name="timein"]');
const timeOutField = mainForm.querySelector('[name="timeout"]');

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});
timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

//сброс формы
const resetForm = () => {
  mainForm.reset();
  mapFilter.reset();
  sliderPriceElement.noUiSlider.reset();
  //как сбросить сообщения валидатора?
};

//Отправка формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  mainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          createSuccessMessage();
        },
        () => {
          createErrorMessage('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
      unblockSubmitButton();
    }
  });
};

setUserFormSubmit(resetForm);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {resetButton, submitButton};
