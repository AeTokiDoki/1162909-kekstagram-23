import {
  MIN_ID,
  MAX_ID,
  IDS_COUNT,
  MAX_COMMENTS,
  MIN_COMMENTS,
  MIN_LIKES,
  MAX_LIKES,
  AVATAR_COUNT,
  AUTHOR_NAMES,
  DESCRIPTIONS_PHOTO,
  DESCRIPTIONS_MESSAGE,
  getRandomPositiveInteger,
  checkStringLength,
  getArrayOfRandomNumbers,
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
  * Принимает id .
  * @returns создаёт массив комментариев.
  */
const createComments = (id) => {
  const length = getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS);
  return getArrayFromFunctionCall(
    createComment,
    getArrayNumbersFromId(
      getArrayOfRandomNumbers(MIN_ID, MAX_ID, length), id,
    ),
    length,
  );
};

/**
 * Принимает id фотографии
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
 *
 * @returns Возвращает вызов другой функции с параметрами.
 */
export const createPhotoDescriptions = () => getArrayFromFunctionCall(
  createPhotoDescription,
  getArrayOfRandomNumbers(MIN_ID, MAX_ID, IDS_COUNT),
  IDS_COUNT,
);

window.createPhotoDescriptions = createPhotoDescriptions;
