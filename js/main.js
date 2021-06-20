import {
  MIN_LIKES,
  MAX_LIKES,
  AVATAR_COUNT,
  AUTHOR_NAMES,
  DESCRIPTIONS_PHOTO,
  DESCRIPTIONS_MESSAGE,
  getRandomPositiveInteger,
  checkStringLength,
  getArrayOfRandomNumbers,
  MIN_ID,
  MAX_ID,
  IDS_COUNT,
  getRandomElementFromArray,
  getArrayFromFunctionCall,
  getArrayNumbersFromId
} from './service/index.js';

/**
 * Принимает данные параметры, создаёт объект с комментарием к фотографии.
 * @returns Объект с комментарием к фотографии.
 */
const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomPositiveInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomElementFromArray(DESCRIPTIONS_MESSAGE),
  name: getRandomElementFromArray(AUTHOR_NAMES),
});


/**
  * Принимает id ,создаёт массив комментариев.
  * @returns
  */
const createComments = (id) => {
  const length = getRandomPositiveInteger(1, 15);
  return getArrayFromFunctionCall(
    createComment,
    getArrayNumbersFromId(
      getArrayOfRandomNumbers(MIN_ID, MAX_ID, length), id,
    ),
    length,
  );
};

/**
 * Принимает данные параметры, создаёт объект с описанием фотографии.
 * @returns Объект с описанием фотографии.
 */
const createPhotoDescription = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomElementFromArray(DESCRIPTIONS_PHOTO),
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(id),
});

window.createPhotoDescription = createPhotoDescription;
window.checkStringLength = checkStringLength;


/**
 * Принимает ID
 * @returns
 */
const createPhotoDescriptions = () => getArrayFromFunctionCall(
  createPhotoDescription,
  getArrayOfRandomNumbers(MIN_ID, MAX_ID, IDS_COUNT),
  IDS_COUNT,
);

window.createPhotoDescriptions = createPhotoDescriptions;
