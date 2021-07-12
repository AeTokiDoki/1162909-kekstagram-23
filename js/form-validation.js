
import {
  MAX_LENGTH_COMMENT,
  checkStringLength,
  createOnEscKeyDown,
  ErrorMessages,
  createOnClickButton
} from './service/index.js';

const body = document.body;
const form = body.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const fieldsContainer = form.querySelector('.img-upload__text');
const uploadCancel = form.querySelector('#upload-cancel');
const textHashtags = fieldsContainer.querySelector('.text__hashtags');
const textDescription = fieldsContainer.querySelector('.text__description');
const imagePreview = form.querySelector('.img-upload__preview');
const sliderWrapper = form.querySelector('.img-upload__effect-level');
const regularExpression = /^#[\w]{1,19}$/;

let onCloseModalEsc; // eslint-disable-line
let onCloseModalClick; // eslint-disable-line

/**
 * Добавляет/убирает классы для закрытия модального окна
 */
const onCloseModal = () => {
  if (document.activeElement.parentElement === fieldsContainer) {
    // прерывает выполнение функции
    return;
  }
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  imagePreview.style.filter = 'none';

  uploadCancel.removeEventListener('click', onCloseModalClick);
  body.removeEventListener('keydown', onCloseModalEsc);
};

/**
 * Открывает модальное окно
 */
const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  sliderWrapper.classList.add('visually-hidden');
  body.addEventListener('keydown', onCloseModalEsc);
  uploadCancel.addEventListener('click', onCloseModalClick);
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

onCloseModalEsc = createOnEscKeyDown(onCloseModal);
onCloseModalClick = createOnClickButton(onCloseModal);

uploadFile.addEventListener('change', openModal);

fieldsContainer.addEventListener('focus', () => {
  textHashtags.addEventListener('input', renderValidationMessages);
  textDescription.addEventListener('input', checkComments);
}, true);


fieldsContainer.addEventListener('blur', () => {
  textHashtags.removeEventListener('input', renderValidationMessages);
  textDescription.removeEventListener('input', checkComments);
}, true);
