//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

//Разобрался и повторил из источника, придумал как функция должна вести себя при до < от.

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return 'You cannot return random numbers. The maximum number must be greater than the minimum.';
  }

  if (max < min || max === min) {
    return 'You cannot return random numbers. The maximum number, it cannot be less or identical to min number.';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomNumber(1, 9));

//Сделал сам.

function checkLengthString(checkString,maxLength) {
  if (checkString <= maxLength) {
    return true;
  }
}

console.log(checkLengthString(10,140))
