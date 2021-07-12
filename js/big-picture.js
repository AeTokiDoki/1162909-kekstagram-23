import {
  postsData
} from './pictures.js';

import {
  createOnEscKeyDown,
  toggleHidden,
  createOnClickButton,
  renderStringNodes,
  MAX_COMMENTS_TO_SHOW
} from './service/index.js';

const pictures = document.querySelector('.pictures');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureComments = bigPictureModal.querySelector('.comments-count');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const commentsCurrentCount = bigPictureModal.querySelector('.comments-current-count');
const bigPictureCancelButton = bigPictureModal.querySelector('.big-picture__cancel');
const loaderButton = bigPictureModal.querySelector('.social__comments-loader');

// Объявления функций
let onEscKeyDown; // eslint-disable-line
let onCloseButtonClick; // eslint-disable-line
let onLoaderButtonClick; // eslint-disable-line


/**
 * Функция замыкания принимает comments и возвращает функцию обработчик.
 */
const createOnLoaderButtonClick = (comments) => {
  if (comments.length <= MAX_COMMENTS_TO_SHOW) {
    toggleHidden(loaderButton);
    return;
  }

  const localComments = [...comments];

  let commentsToRender = localComments.splice(MAX_COMMENTS_TO_SHOW);
  let currentCommentsCount = MAX_COMMENTS_TO_SHOW;


  return () => {
    commentsToRender.slice(0, MAX_COMMENTS_TO_SHOW).forEach(toggleHidden);
    currentCommentsCount += commentsToRender.length > MAX_COMMENTS_TO_SHOW ? MAX_COMMENTS_TO_SHOW : commentsToRender.length;
    commentsCurrentCount.textContent = currentCommentsCount;
    commentsToRender = commentsToRender.splice(MAX_COMMENTS_TO_SHOW);

    if (currentCommentsCount === comments.length) {
      toggleHidden(loaderButton);
    }
  };
};

/**
 * Функция закрытия модального окна
 */
const closeBigPictureModal = () => {
  toggleHidden(bigPictureModal);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  toggleHidden(loaderButton);

  bigPictureCancelButton.removeEventListener('click', onCloseButtonClick);
  loaderButton.removeEventListener('click', onLoaderButtonClick);
};


/**
 * Функция открытия модального окна
 */
const openBigPictureModal = () => {
  toggleHidden(bigPictureModal);
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyDown);
  bigPictureCancelButton.addEventListener('click', onCloseButtonClick);
  loaderButton.addEventListener('click', onLoaderButtonClick);
};

/**
 * Наполняет модальное окно
 */
const fillModal = ({ url, likes, comments, description }) => {
  const commentsLength = comments.length;

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = commentsLength;
  bigPictureDescription.textContent = description;
  commentsCurrentCount.textContent = commentsLength > MAX_COMMENTS_TO_SHOW ? MAX_COMMENTS_TO_SHOW : commentsLength;
};

/**
 * Возвращает фрагмент разметки строкой с проставленными значениями из объекта, принимаемого в качестве аргумента.
 */
const createSocialComment = ({ avatar, name, message, isHidden }) => `
  <li class="social__comment ${isHidden ? 'hidden' : ''}">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
width = "35" height = "35" >
  <p class="social__text">${message}</p>
</li > `;


/**
 * Создаёт массив комментариев.
 */
const createSocialComments = (comments) => comments.map((comment, index) => createSocialComment(
  Object.assign(comment, { isHidden: index >= MAX_COMMENTS_TO_SHOW }),
));


/**
 * Вызывает по клику модальное окно с постом.
 */
const onPictureClick = (evt) => {
  const target = evt.target;

  if (target.classList.contains('picture__img')) {
    const post = postsData.find((data) => String(data.id) === target.dataset.id);

    evt.preventDefault();

    fillModal(post);
    renderStringNodes(
      commentsContainer,
      createSocialComments(post.comments).join(''),
    );

    onLoaderButtonClick = createOnLoaderButtonClick(
      Array.from(commentsContainer.children),
    );

    openBigPictureModal();
  }
};


pictures.addEventListener('click', onPictureClick);

// Объявления значений функций.
onEscKeyDown = createOnEscKeyDown(closeBigPictureModal);
onCloseButtonClick = createOnClickButton(closeBigPictureModal);
