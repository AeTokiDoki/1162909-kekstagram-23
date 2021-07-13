export const MIN_LIKES = 15;
export const MAX_LIKES = 200;
export const AVATAR_COUNT = 6;
export const MIN_ID = 1;
export const MAX_ID = 25;
export const IDS_COUNT = 25;
export const MAX_COMMENTS = 15;
export const MIN_COMMENTS = 15;
export const MAX_LENGTH_COMMENT = 140;
export const MAX_COMMENTS_TO_SHOW = 5;

export const SCALE_MIN_VALUE = 25;
export const SCALE_MAX_VALUE = 100;
export const SCALE_STEP = 25;

export const CHROME_MIN_VALUE = 0;
export const CHROME_MAX_VALUE = 1;
export const CHROME_STEP = 0.1;

export const SEPIA_MIN_VALUE = 0;
export const SEPIA_MAX_VALUE = 1;
export const SEPIA_STEP = 0.1;

export const MARVIN_MIN_VALUE = 1;
export const MARVIN_MAX_VALUE = 100;
export const MARVIN_STEP = 1;

export const PHOBOS_MIN_VALUE = 0;
export const PHOBOS_MAX_VALUE = 3;
export const PHOBOS_STEP = 0.1;

export const HEAT_MIN_VALUE = 1;
export const HEAT_MAX_VALUE = 3;
export const HEAT_STEP = 0.1;

export const AUTHOR_NAMES = [
  'Оскар',
  'Бен',
  'Влад',
  'Никита',
  'Сергей',
  'Андрей',
];

export const DESCRIPTIONS_PHOTO = [
  'Сделал фото этим утром!',
  'Зацени моего пса!',
  'Фото на память.',
  'Я и моя тачка',
  'Это мы на море',
  'Закат в Москве',
];

export const DESCRIPTIONS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

export const ErrorMessages = {
  HASHTAG_SUM: 'Нельзя указать больше 5 хэш-тегов',
  HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи',
  COMMENT_LENGTH: 'Длинна комментария не должна быть больше 140 символов',
};
