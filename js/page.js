const formElement = document.querySelector('.ad-form');
const formElements = formElement.querySelectorAll('fieldset');
const filterElement = document.querySelector('.map__filters');
const filterElements = filterElement.querySelectorAll('.map__filter');
const FeaturesElements = filterElement.querySelector('.map__features');


const deactivatePage = () => {
  formElement.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  filterElement.classList.add('ad-form--disabled');
  filterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  FeaturesElements.setAttribute('disabled', 'disabled');
};
deactivatePage();

const activatePage = () => {
  formElement.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  filterElement.classList.remove('ad-form--disabled');
  filterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  FeaturesElements.removeAttribute('disabled');
};

export {activatePage, formElement, filterElement};
