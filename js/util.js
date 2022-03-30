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

const errorPopup = document.querySelector('#error').content.querySelector('.error');
const popup = errorPopup.cloneNode(true);
const isEscapeKey = (evt) => evt.key === 'Escape';


// const isEnterKey = (evt) => evt.key === 'Enter';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function closeUserModal () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const createErrorMessage = (message) => {
  popup.querySelector('.error__message').textContent = message;
  popup.querySelector('.error__button').textContent = 'ХОРОШО';
  popup.querySelector('.error__button').addEventListener('click', () => {
    popup.classList.add('hidden');
  });
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.append(popup);
};

export {getRandomIntegerFromRange, getRandomFloatNumber, getRandomArrayElement, getRandomArray, createErrorMessage};
