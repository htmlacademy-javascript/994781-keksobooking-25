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

export {activatePage, mainForm};
