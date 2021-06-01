//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

//Разобрался и повторил из источника, придумал как функция должна вести себя при до < от.

function getRandomNumber(min, max) {
  if (max <= min ) {
    return -1;
  }

  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);

  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

getRandomNumber(1, 9);

//Сделал сам.

function checkLengthString(thisString,maxLength) {
  if (thisString.length <= maxLength) {
    return true;
  }
}

checkLengthString('test',140);
