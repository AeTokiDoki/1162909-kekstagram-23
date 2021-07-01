import {
  createNodesFragment,
  renderElement
} from './service/index.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureComments = bigPictureModal.querySelector('.comments-count');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const commentsCounter = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const bigPictureCancelButton = bigPictureModal.querySelector('.big-picture__cancel');

const Pictures = document.querySelectorAll('.picture');

// /**
//  * Закрывает модальное окно
//  */
const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelButton.addEventListener('click', closeBigPictureModal);

};

// /**
//  * Открывает модальное окно
//  */
const openBigPictureModal = () => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureCancelButton.removeEventListener('click', closeBigPictureModal);
  bigPictureImage.setAttribute('src', url);
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = comments.length;
  bigPictureDescription.textContent = description;
  commentsContainer.innerHTML = '';


};

Pictures.addEventListener('click', () => {

});
