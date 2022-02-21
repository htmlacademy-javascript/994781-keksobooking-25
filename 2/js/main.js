function getRandomIntegerFromRange (min, max) {
  if (min < max && min >= 0) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return (`Неверно указан диапазон от ${  min  } до ${  max}`);
}
getRandomIntegerFromRange(0, 20);

function getRandomFloatNumber (min, max, digits) {
  if (min < max && min >= 0) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(digits);
  }
  return (`Неверно указан диапазон от ${  min  } до ${  max}`);
}

getRandomFloatNumber(0, 20, 2);
