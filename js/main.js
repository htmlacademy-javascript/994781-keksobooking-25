function getRandomFromRange (min, max) {
  if (min < max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return('Неверно указан диапазон: min, max');
}
getRandomFromRange(0, 20);

function getRandomWithComma (min, max, signsAfterComma) {
  if (min < max && min >= 0) {
    const RANDOMNUMBER = Math.random() * (max - min) + min;
    return RANDOMNUMBER.toFixed(signsAfterComma);
  }
  return('Неверно указан диапазон: min, max');
}

getRandomWithComma(0, 20, 2);
