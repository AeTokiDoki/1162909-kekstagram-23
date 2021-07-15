
import {
  getData
} from './api.js';

import {
  initBigPicture
} from './big-picture.js';


import {
  initFilters
} from './filters.js';

import {
  renderElement,
  createNodesFragment,
  ACADEMY_URL,
  showAlert
} from './service/index.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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
const createMiniatures = (data) => data.map(
  (description) => createMiniature(description),
);

export const renderMiniatures = (posts) => renderElement(
  pictures,
  createNodesFragment(
    createMiniatures(posts),
  ),
);
