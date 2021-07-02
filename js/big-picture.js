
import {
  postsData
} from './pictures.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureComments = bigPictureModal.querySelector('.comments-count');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const commentsCounter = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const bigPictureCancelButton = bigPictureModal.querySelector('.big-picture__cancel');

const posts = document.querySelectorAll('.picture');


const onEscButton = (evt) => {
  if (evt.keyCode === 27) {
    closeBigPictureModal();
  }
};

// /**
//  * Функция закрытия модального окна
//  */
const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscButton);
};


// /**
//  * Функция открытия модального окна
//  */
const openBigPictureModal = () => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onEscButton);
};


/**
 * Наполняет модальное окно
 */
const fillModal = ({ url, likes, comments, description }) => {
  bigPictureImage.setAttribute('src', url);
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = comments.length;
  bigPictureDescription.textContent = description;
  commentsContainer.innerHTML = '';
};

/**
 * Перебирает массив, навешивает клик.
 * Вызывает функцию открытия модального окна.
 */
posts.forEach((element, idx) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    fillModal(postsData[idx]);
    openBigPictureModal();
  });
});


/**
 * Закрывает модалку по клику на крестик
 */
bigPictureCancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPictureModal();
});
