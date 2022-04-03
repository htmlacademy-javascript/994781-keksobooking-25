const SUCCESS_POPUP_SHOW_TIME = 3000;
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorPopup = errorElement.cloneNode(true);
const successElement = document.querySelector('#success').content.querySelector('.success');
const successPopup = successElement.cloneNode(true);

const getRandomIntegerFromRange = (min, max) => {
  if (min < max && min >= 0) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return (`Неверно указан диапазон от ${  min  } до ${  max}`);
};

const getRandomFloatNumber = (min, max, digits) => {
  if (min < max && min >= 0) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(digits);
  }
  return (`Неверно указан диапазон от ${  min  } до ${  max}`);
};

// возвращает рандомный элемент массива
const getRandomArrayElement = (array) => array[getRandomIntegerFromRange(0, array.length - 1)];

// возвращает массив случайной длинны из неповторяющихся значений
const getRandomArray = (array) => {

  const copyArray = array.slice();
  const newArray = [];

  for (let i = 0; i <= getRandomIntegerFromRange(0, copyArray.length - 1); i++) {
    newArray[i] = copyArray.splice(getRandomIntegerFromRange(0, copyArray.length - 1), 1).join();
  }
  return newArray;
};


// не разобралась как сделать универсальный закрыватель попапов, сделала два для каждого
const isEscapeKey = (evt) => evt.key === 'Escape';
// const isEnterKey = (evt) => evt.key === 'Enter';

const onPopupEscKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

function closeErrorModal () {
  errorPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydownError);
}

const onPopupEscKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

function closeSuccessModal () {
  successPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydownSuccess);
}
//end

const createErrorMessage = (message) => {
  errorPopup.classList.remove('hidden');
  errorPopup.querySelector('.error__message').textContent = message;
  errorPopup.querySelector('.error__button').textContent = 'ХОРОШО';
  document.addEventListener('click', () => {
    errorPopup.classList.add('hidden');
  });
  document.addEventListener('keydown', onPopupEscKeydownError);
  document.body.append(errorPopup);
};

const createSuccessMessage = () => {
  successPopup.classList.remove('hidden');
  document.addEventListener('click', () => {
    successPopup.classList.add('hidden');
  });
  document.addEventListener('keydown', onPopupEscKeydownSuccess);
  document.body.append(successPopup);
  setTimeout(() => {
    successPopup.classList.add('hidden');
  }, SUCCESS_POPUP_SHOW_TIME);
};

export {getRandomIntegerFromRange, getRandomFloatNumber, getRandomArrayElement, getRandomArray, createErrorMessage, createSuccessMessage};
