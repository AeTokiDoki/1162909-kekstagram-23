import {
  postsData
} from './pictures.js';

import {
  createOnEscKeyDown,
  toggleHidden,
  createOnClickButton,
  renderStringNodes
} from './service/index.js';

const pictures = document.querySelector('.pictures');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureComments = bigPictureModal.querySelector('.comments-count');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const commentsCounter = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const bigPictureCancelButton = bigPictureModal.querySelector('.big-picture__cancel');


let onEscKeyDown; // eslint-disable-line
let onCloseButtonClick; // eslint-disable-line

/**
 * Функция закрытия модального окна
 */
const closeBigPictureModal = () => {
  toggleHidden(bigPictureModal);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  bigPictureCancelButton.removeEventListener('click', onCloseButtonClick);
};


/**
 * Функция открытия модального окна
 */
const openBigPictureModal = () => {
  toggleHidden(bigPictureModal);
  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onEscKeyDown);
  bigPictureCancelButton.addEventListener('click', onCloseButtonClick);
};

/**
 * Наполняет модальное окно
 */
const fillModal = ({ url, likes, comments, description }) => {
  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = comments.length;
  bigPictureDescription.textContent = description;
};

/**
 * Создаёт строку с разметкой, подставляет в него объект.
 */
const createSocialComment = ({ avatar, name, message }) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
width = "35" height = "35" >
  <p class="social__text">${message}</p>
</li > `;


/**
 * создаёт массив объектов (строк)
 */
const createSocialComments = (comments) => comments.map((comment) => createSocialComment(comment));


/**
 * вызывает по клику
 */
const onPictureClick = (evt) => {
  const target = evt.target;

  if (target.classList.contains('picture__img')) {
    const post = postsData.find((data) => String(data.id) === target.dataset.id);
    evt.preventDefault();
    fillModal(post);
    openBigPictureModal();
    renderStringNodes(
      commentsContainer,
      createSocialComments(post.comments).join(''),
    );
  }
};


pictures.addEventListener('click', onPictureClick);


onEscKeyDown = createOnEscKeyDown(closeBigPictureModal);
onCloseButtonClick = createOnClickButton(closeBigPictureModal);
