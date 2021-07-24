
import {
  MAX_LENGTH_COMMENT,
  checkStringLength,
  createOnEscKeyDown,
  ErrorMessages,
  createOnClickButton,
  MAX_RESIZE
} from './service/index.js';

import {
  sendData
} from './api.js';

import {
  setImageScale
} from './scale.js';

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
const regularExpression = /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const successPopup = document.querySelector('#success').content.querySelector('.success');
const successButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');
const noneEffect = form.querySelector('#effect-none');

let onCloseModalEsc; // eslint-disable-line
let onCloseModalClick; // eslint-disable-line
let onCloseSuccessMessEsc; // eslint-disable-line

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
  textHashtags.setCustomValidity('');
  setImageScale(MAX_RESIZE);
  noneEffect.checked = true;

  uploadCancel.removeEventListener('click', onCloseModalClick);
  body.removeEventListener('keydown', onCloseModalEsc);
};

/**
 * Открывает модальное окно
 */
const onOpenModal = () => {
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
const onRenderValidationMessages = () => {

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
const onCheckComments = () => {
  if (checkStringLength(textDescription.value, MAX_LENGTH_COMMENT) === false) {
    textDescription.setCustomValidity((ErrorMessages.COMMENT_LENGTH));
  } else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
};


const removeEventListeners = (event) => {
  document.removeEventListener('click', event);
  document.removeEventListener('keydown', event);
};

const onPopupEvents = (evt) => {
  if (onCloseModalEsc(evt)) {
    document.body.lastChild.remove();
    removeEventListeners(onPopupEvents);
  } else if (evt.target === document.body.lastChild) {
    document.body.lastChild.remove();
    removeEventListeners(onPopupEvents);
  }
};

const onPopupClick = () => {
  document.body.lastChild.remove();
  removeEventListeners(onPopupEvents);
};

const popupOpenHandler = (template, button) => {
  onCloseModal();
  document.body.append(template);

  document.removeEventListener('keydown', onOpenModal);
  document.addEventListener('keydown', onCloseSuccessMessEsc);
  button.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEvents);
  document.addEventListener('click', onPopupEvents);
};

const setUserFormSubmit = () => {
  body.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => popupOpenHandler(successPopup, successButton),
      () => popupOpenHandler(errorPopup, errorButton),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit();


onCloseSuccessMessEsc = createOnEscKeyDown(onPopupClick);
onCloseModalEsc = createOnEscKeyDown(onCloseModal);
onCloseModalClick = createOnClickButton(onCloseModal);

uploadFile.addEventListener('change', onOpenModal);

fieldsContainer.addEventListener('focus', () => {
  textHashtags.addEventListener('input', onRenderValidationMessages);
  textDescription.addEventListener('input', onCheckComments);
}, true);


fieldsContainer.addEventListener('blur', () => {
  textHashtags.removeEventListener('input', onRenderValidationMessages);
  textDescription.removeEventListener('input', onCheckComments);
}, true);
