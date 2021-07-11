
import {
  MAX_LENGTH_COMMENT,
  checkStringLength,
  createOnEscKeyDown,
  ErrorMessages
} from './service/index.js';

const body = document.body;
const form = body.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const fieldsContainer = form.querySelector('.img-upload__text');
const uploadCancel = form.querySelector('#upload-cancel');
const textHashtags = fieldsContainer.querySelector('.text__hashtags');
const textDescription = fieldsContainer.querySelector('.text__description');
const regularExpression = /^#[\w]{1,19}$/;

let onCloseModalEsc; // eslint-disable-line

/**
 * Добавляет/убирает классы для закрытия модального окна
 */
const oncloseModal = () => {
  if (document.activeElement.parentElement === fieldsContainer) {
    // прерывает выполнение функции
    return;
  }
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';

  uploadCancel.removeEventListener('click', oncloseModal);
  body.removeEventListener('keydown', onCloseModalEsc);


};

/**
 * Открывает модальное окно
 */
const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  body.addEventListener('keydown', onCloseModalEsc);
  uploadCancel.addEventListener('click', oncloseModal);
};

/**
 *
 * Валидация хештегов. Выводит окно с ошибкой.
 */
const renderValidationMessages = () => {

  const hashtags = textHashtags.value.trim().split(' ').filter(Boolean);

  if (hashtags.length > 5) {
    textHashtags.setCustomValidity(ErrorMessages.HASHTAG_SUM);
  } else {
    if (hashtags.length > 0) {
      hashtags.forEach((hashtag) => {
        if (regularExpression.test(hashtag)) {
          const repeats = hashtags.filter((repeat) => repeat.toLowerCase() === hashtag.toLowerCase());
          if (repeats.length >= 2) {
            textHashtags.setCustomValidity(ErrorMessages.HASHTAG_REPEAT);
          } else {
            textHashtags.setCustomValidity('');
          }
        } else {
          textHashtags.setCustomValidity(ErrorMessages.HASHTAG_TEMPLATE);
        }
      });
    } else {
      textHashtags.setCustomValidity('');
    }
  }
  textHashtags.reportValidity();
};


/**
 * проверка длинны комментария
 */
const checkComments = () => {
  if (checkStringLength(textDescription.value, MAX_LENGTH_COMMENT) === false) {
    textDescription.setCustomValidity((ErrorMessages.COMMENT_LENGTH));
  } else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
};

onCloseModalEsc = createOnEscKeyDown(oncloseModal);

uploadFile.addEventListener('change', openModal);

fieldsContainer.addEventListener('focus', () => {
  textHashtags.addEventListener('input', renderValidationMessages);
  textDescription.addEventListener('input', checkComments);
}, true);


fieldsContainer.addEventListener('blur', () => {
  textHashtags.removeEventListener('input', renderValidationMessages);
  textDescription.removeEventListener('input', checkComments);
}, true);
