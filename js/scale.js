import {
  SCALE_MIN_VALUE,
  SCALE_MAX_VALUE,
  SCALE_STEP,
  MAX_RESIZE
} from './service/index.js';

const scale = document.querySelector('.img-upload__preview-container');
const minusButton = scale.querySelector('.scale__control--smaller');
const plusButton = scale.querySelector('.scale__control--bigger');
const imagePreview = scale.querySelector('.img-upload__preview');
const scaleValue = scale.querySelector('.scale__control--value');
const uploadImagePreview = imagePreview.querySelector('img');

let currentScale = MAX_RESIZE;

/**
 * Устанавливает масштаб изображения по умолчанию
 */
export const setImageScale = (newScale) => {
  scaleValue.value = `${newScale}%`;
  uploadImagePreview.style = `transform: scale(${newScale / 100})`;
  currentScale = newScale;
};

/**
 * Уменьшает масштаб изображения с шагом в 25
 */
const onMinusButtonClick = () => {
  if (currentScale > SCALE_MIN_VALUE) {
    currentScale -= SCALE_STEP;
    setImageScale(currentScale);
  }
};

/**
 * Увеличивает масштаб изображения с шагом в 25
 */
const onPlusButtonClick = () => {
  if (currentScale < SCALE_MAX_VALUE) {
    currentScale += SCALE_STEP;
    setImageScale(currentScale);
  }
};

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);
