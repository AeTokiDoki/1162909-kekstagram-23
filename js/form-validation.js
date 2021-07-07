
import {
  MAX_LENGTH_COMMENT,
  checkStringLength,
  createOnEscKeyDown,
  ErrorMessages
} from './service/index.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('.body');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const regularExpression = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;


/**
 * Добавляет/убирает классы для закрытия модального окна
 */
const closeModal = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';
};

/**
 *
 * Вызывает по клику closeModal
 */
const onCloseModalEsc = (evt) => {
  if (document.activeElement !== textDescription && document.activeElement !== textHashtags) {
    if (createOnEscKeyDown(evt)) {
      evt.preventDefault();
      closeModal();
      body.removeEventListener('keydown', onCloseModalEsc);
    }
  }
};

/**
 * Открывает модальное окно
 */
const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  body.addEventListener('keydown', onCloseModalEsc);
};


uploadFile.addEventListener('change', openModal);


/**
 * закрытие на крестик
 */
uploadCancel.addEventListener('click', closeModal);

/**
 *
 * Валидация хэштегов. Выводит окно с ошибкой.
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

textDescription.addEventListener('focus', checkComments);
textDescription.addEventListener('blur', checkComments);
textHashtags.addEventListener('focus', renderValidationMessages);
textHashtags.removeEventListener('blur', renderValidationMessages);
