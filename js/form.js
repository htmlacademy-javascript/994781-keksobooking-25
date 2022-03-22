const mainForm = document.querySelector('.ad-form');

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

function validateСapacity () {
  return roomsOption[roomsField.value].includes(capacityField.value);
}

function getСapacityErrorMessage () {
  return 'Значение не подходит для выбранного количества комнат';
}

pristine.addValidator(capacityField, validateСapacity, getСapacityErrorMessage);

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

//записываю актуальное значение placeholder с ценой
priceField.placeholder = typeOption[typeField.value];

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
  step: 1,
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
sliderPriceElement.noUiSlider.on('update', () => {
  priceField.value = sliderPriceElement.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  sliderPriceElement.noUiSlider.updateOptions({
    start: priceField.value,
  });
});
//тз: Обратите внимание, вместе с минимальным значением цены нужно изменять и плейсхолдер.
//сейчас плейсхолдер не отображается, так как перекрывается стартовым значением слайдера.


// Валидация поля заезда/выезда
const timeInField = mainForm.querySelector('[name="timein"]');
const timeOutField = mainForm.querySelector('[name="timeout"]');

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});
timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

mainForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

export {mainForm};
