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

//module4-task1

//Функции от академии

function getRandomPositiveInteger (min,max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength(1,2);


const MIN_LIKES = 15;
const MAX_LIKES = 200;
const AVATAR_COUNT = 6;

const AUTHOR_NAMES = [
  'Оскар',
  'Бен',
  'Влад',
  'Никита',
  'Сергей',
  'Андрей',
];

const DESCRIPTION_PHOTO = [
  'Сделал фото этим утром!',
  'Зацени моего пса!',
  'Фото на память.',
  'Я и моя тачка',
  'Это мы на море',
  'Закат в Москве',
];

const DESCRIPTION_MESSAGE =[
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


const createComment = (index) =>
  ({
    id: index,
    avatar: `img/avatar-${getRandomPositiveInteger(1, AVATAR_COUNT)}.svg`,
    message: DESCRIPTION_MESSAGE[getRandomPositiveInteger(0,DESCRIPTION_MESSAGE.length-1)],
    name: AUTHOR_NAMES[getRandomPositiveInteger(0,AUTHOR_NAMES.length-1)],
    likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  });


createComment(DESCRIPTION_PHOTO);
