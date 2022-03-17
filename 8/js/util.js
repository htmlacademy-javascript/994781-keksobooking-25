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

export {getRandomIntegerFromRange, getRandomFloatNumber, getRandomArrayElement, getRandomArray};
