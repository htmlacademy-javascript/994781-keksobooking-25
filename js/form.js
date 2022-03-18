const mainForm = document.querySelector('.ad-form');
const mainFormElements = mainForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFeaturesElements = mapFilters.querySelector('.map__features');

const deactivatePage = () => {
  mainForm.classList.add('ad-form--disabled');
  mainFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFilters.classList.add('ad-form--disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFeaturesElements.setAttribute('disabled', 'disabled');
};
deactivatePage();

const activatePage = () => {
  mainForm.classList.remove('ad-form--disabled');
  mainFormElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  mapFilters.classList.remove('ad-form--disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  mapFeaturesElements.removeAttribute('disabled', 'disabled');
};
activatePage();

//добавление временного значения адреса
mainForm.querySelector('[name="address"]').value = 1442456;

// Валидация формы

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

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
