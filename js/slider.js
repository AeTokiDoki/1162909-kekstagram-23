import {
  effects
} from './service/index.js';

const scale = document.querySelector('.img-upload__preview-container');
const imagePreview = scale.querySelector('.img-upload__preview');
const sliderElement = scale.querySelector('.effect-level__slider');
const effectValue = scale.querySelector('.effect-level__value');
const sliderWrapper = scale.querySelector('.img-upload__effect-level');

const effectsPhoto = document.querySelector('.img-upload__effects');
const effectsList = document.querySelector('.effects__list');


//Создаёт слайдер с минимальным и максимальным значением, и шагом.
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

/**
 * Открывает просмотр изображения
 */
const showEffect = (effectClass, effectStyle, effectUnit) => {
  sliderWrapper.classList.remove('visually-hidden');
  imagePreview.classList = 'img-upload__preview';
  imagePreview.classList.add(`${effectClass}`);

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => { // eslint-disable-line
    effectValue.value = unencoded[handle];
    imagePreview.style.filter = `${effectStyle}(${effectValue.value}${effectUnit})`;
  });
};

/**
 * Обрабатывает настройки слайдера
 */
const sliderOptionsHandler = (minValue, maxValue, startValue, stepValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: stepValue,
  });
};

const createOnEffects = () => {
  const { chrome, sepia, marvin, phobos, heat } = effects;

  return (evt) => {
    switch (evt.target.id) {
      case ('effect-none'):
        imagePreview.classList = 'img-upload__preview';
        sliderWrapper.classList.add('visually-hidden');
        imagePreview.style.filter = 'none';
        break;
      case ('effect-chrome'):
        showEffect(chrome.htmlClass, chrome.name, chrome.unit);
        sliderOptionsHandler(chrome.min, chrome.max, chrome.start, chrome.step);
        break;
      case ('effect-sepia'):
        showEffect(sepia.htmlClass, sepia.name, sepia.unit);
        sliderOptionsHandler(sepia.min, sepia.max, sepia.start, sepia.step);
        break;
      case ('effect-marvin'):
        showEffect(marvin.htmlClass, marvin.name, marvin.unit);
        sliderOptionsHandler(marvin.min, marvin.max, marvin.start, marvin.step);
        break;
      case ('effect-phobos'):
        showEffect(phobos.htmlClass, phobos.name, phobos.unit);
        sliderOptionsHandler(phobos.min, phobos.max, phobos.start, phobos.step);
        break;
      case ('effect-heat'):
        showEffect(heat.htmlClass, heat.name, heat.unit);
        sliderOptionsHandler(heat.min, heat.max, heat.start, heat.step);
        break;
    }
  };
};


const onEffects = createOnEffects();

effectsPhoto.addEventListener('focus', () => {
  effectsList.addEventListener('click', onEffects);
}, true);


effectsPhoto.addEventListener('blur', () => {
  effectsList.removeEventListener('click', onEffects);
}, true);
