import {
  createPhotoDescriptions
} from './photo_descriptions.js';

import {
  renderElement,
  createNodesFragment
} from './service/index.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
export const postsData = createPhotoDescriptions();

/**
 * Принимает объект, клонирует узел (pictureElement)
 * @returns узел (pictureElement)
 */
const createMiniature = ({ url, likes, comments, id }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').dataset.id = id;
  pictureElement.querySelector('.picture__comments').textContent = comments ? comments.length : 0;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  return pictureElement;
};


/**
 *
 * @returns массив миниатюр вызовом функции createMiniature.
 */
const createMiniatures = () => postsData.map(
  (description) => createMiniature(description),
);

renderElement(
  pictures,
  createNodesFragment(
    createMiniatures(),
  ),
);
