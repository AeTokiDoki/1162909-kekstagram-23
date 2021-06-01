//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomNumber(min, max) {
  if (max <= min ) {
    return -1;
  }

  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);

  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

getRandomNumber(1, 9);


function checkLengthString(thisString,maxLength) {
  if (thisString.length <= maxLength) {
    return true;
  }
  return false;
}

checkLengthString('test',140);
