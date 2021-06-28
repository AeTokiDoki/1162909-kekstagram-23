import {
  createPhotoDescriptions
} from './photo_descriptions.js';

import {
  renderElement,
  createNodes
} from './service/index.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoDescriptions = createPhotoDescriptions();

const createMiniature = ({ url, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments ? comments.length : 0;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  return pictureElement;
};

const createMiniatures = () => photoDescriptions.map(
  (description) => createMiniature(description),
);

renderElement(
  pictures,
  createNodes(
    createMiniatures(),
  ),
);
