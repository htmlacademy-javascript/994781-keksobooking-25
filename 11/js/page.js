const mainForm = document.querySelector('.ad-form');
const mainFormElements = mainForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');
const mapFeaturesElements = mapFilter.querySelector('.map__features');


const deactivatePage = () => {
  mainForm.classList.add('ad-form--disabled');
  mainFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFilter.classList.add('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFeaturesElements.setAttribute('disabled', 'disabled');
};
deactivatePage();

const activatePage = () => {
  mainForm.classList.remove('ad-form--disabled');
  mainFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilter.classList.remove('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFeaturesElements.removeAttribute('disabled');
};

export {activatePage, mainForm, mapFilter};
