import {
  CHROME_MIN_VALUE,
  CHROME_MAX_VALUE,
  CHROME_STEP,
  SEPIA_MIN_VALUE,
  SEPIA_MAX_VALUE,
  SEPIA_STEP,
  MARVIN_MIN_VALUE,
  MARVIN_MAX_VALUE,
  MARVIN_STEP,
  PHOBOS_MIN_VALUE,
  PHOBOS_MAX_VALUE,
  PHOBOS_STEP,
  HEAT_MIN_VALUE,
  HEAT_MAX_VALUE,
  HEAT_STEP
} from './service/index.js';

const scale = document.querySelector('.img-upload__preview-container');
const imagePreview = scale.querySelector('.img-upload__preview');
const sliderElement = scale.querySelector('.effect-level__slider');
const effectValue = scale.querySelector('.effect-level__value');
const sliderWrapper = scale.querySelector('.img-upload__effect-level');

const effectsPhoto = document.querySelector('.img-upload__effects');
const noEffectRadio = effectsPhoto.querySelector('#effect-none');
const chromeEffectRadio = effectsPhoto.querySelector('#effect-chrome');
const sepiaEffectRadio = effectsPhoto.querySelector('#effect-sepia');
const marvinEffectRadio = effectsPhoto.querySelector('#effect-marvin');
const phobosEffectRadio = effectsPhoto.querySelector('#effect-phobos');
const heatEffectRadio = effectsPhoto.querySelector('#effect-heat');

// Объект с эффектами для фото.
const effects = {
  chrome: {
    name: 'grayscale',
    htmlClass: 'effects__preview--chrome',
    unit: '',
    min: CHROME_MIN_VALUE,
    max: CHROME_MAX_VALUE,
    step: CHROME_STEP,
    start: CHROME_MIN_VALUE,
  },
  sepia: {
    name: 'sepia',
    htmlClass: 'effects__preview--sepia',
    unit: '',
    min: SEPIA_MIN_VALUE,
    max: SEPIA_MAX_VALUE,
    step: SEPIA_STEP,
    start: SEPIA_MAX_VALUE,
  },
  marvin: {
    name: 'invert',
    htmlClass: 'effects__preview--marvin',
    unit: '%',
    min: MARVIN_MIN_VALUE,
    max: MARVIN_MAX_VALUE,
    step: MARVIN_STEP,
    start: MARVIN_MAX_VALUE,
  },
  phobos: {
    name: 'blur',
    htmlClass: 'effects__preview--phobos',
    unit: 'px',
    min: PHOBOS_MIN_VALUE,
    max: PHOBOS_MAX_VALUE,
    step: PHOBOS_STEP,
    start: PHOBOS_MAX_VALUE,
  },
  heat: {
    name: 'brightness',
    htmlClass: 'effects__preview--heat',
    unit: '',
    min: HEAT_MIN_VALUE,
    max: HEAT_MAX_VALUE,
    step: HEAT_STEP,
    start: HEAT_MAX_VALUE,
  },
};

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

const onEffects = () => {
  if (noEffectRadio.checked) {
    imagePreview.classList = 'img-upload__preview';
    sliderWrapper.classList.add('visually-hidden');
    imagePreview.style.filter = 'none';
  } else if (chromeEffectRadio.checked) {
    showEffect(effects.chrome.htmlClass, effects.chrome.name, effects.chrome.unit);
    sliderOptionsHandler(effects.chrome.min, effects.chrome.max, effects.chrome.start, effects.chrome.step);
  } else if (sepiaEffectRadio.checked) {
    showEffect(effects.sepia.htmlClass, effects.sepia.name, effects.sepia.unit);
    sliderOptionsHandler(effects.sepia.min, effects.sepia.max, effects.sepia.start, effects.sepia.step);
  } else if (marvinEffectRadio.checked) {
    showEffect(effects.marvin.htmlClass, effects.marvin.name, effects.marvin.unit);
    sliderOptionsHandler(effects.marvin.min, effects.marvin.max, effects.marvin.start, effects.marvin.step);
  } else if (phobosEffectRadio.checked) {
    showEffect(effects.phobos.htmlClass, effects.phobos.name, effects.phobos.unit);
    sliderOptionsHandler(effects.phobos.min, effects.phobos.max, effects.phobos.start, effects.phobos.step);
  } else if (heatEffectRadio.checked) {
    showEffect(effects.heat.htmlClass, effects.heat.name, effects.heat.unit);
    sliderOptionsHandler(effects.heat.min, effects.heat.max, effects.heat.start, effects.heat.step);
  }
};

noEffectRadio.addEventListener('click', onEffects);
chromeEffectRadio.addEventListener('click', onEffects);
sepiaEffectRadio.addEventListener('click', onEffects);
marvinEffectRadio.addEventListener('click', onEffects);
phobosEffectRadio.addEventListener('click', onEffects);
heatEffectRadio.addEventListener('click', onEffects);
