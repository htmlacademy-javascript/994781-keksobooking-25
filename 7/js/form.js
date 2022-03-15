const mainForm = document.querySelector('.ad-form');
const mainFormElements = mainForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFeaturesElements = mapFilters.querySelector('.map__features');

const createInactivePage = () => {
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
createInactivePage();

const createActivePage = () => {
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
createActivePage();

//добавление временного значения адреса
mainForm.querySelector('[name="address"]').value = 1442456;

//Валидация формы

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

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
  return 'Значение не подходит для выбранного количчества комнат';
}

pristine.addValidator(capacityField, validateСapacity, getСapacityErrorMessage);


mainForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
