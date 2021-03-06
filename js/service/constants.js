export const MAX_LENGTH_COMMENT = 140;
export const MAX_COMMENTS_TO_SHOW = 5;

export const SCALE_MIN_VALUE = 25;
export const SCALE_MAX_VALUE = 100;
export const SCALE_STEP = 25;

export const CHROME_MIN_VALUE = 0;
export const CHROME_MAX_VALUE = 1;
export const CHROME_STEP = 0.1;

export const SEPIA_MIN_VALUE = 0;
export const SEPIA_MAX_VALUE = 1;
export const SEPIA_STEP = 0.1;

export const MARVIN_MIN_VALUE = 1;
export const MARVIN_MAX_VALUE = 100;
export const MARVIN_STEP = 1;

export const PHOBOS_MIN_VALUE = 0;
export const PHOBOS_MAX_VALUE = 3;
export const PHOBOS_STEP = 0.1;

export const HEAT_MIN_VALUE = 1;
export const HEAT_MAX_VALUE = 3;
export const HEAT_STEP = 0.1;

export const ACADEMY_URL = 'https://23.javascript.pages.academy/kekstagram/data';
export const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';

export const ALERT_SHOW_TIME = 5000;
export const RANDOM_POSTS = 10;
export const MAX_RESIZE = 100;

export const ErrorMessages = {
  HASHTAG_SUM: 'Нельзя указать больше 5 хэш-тегов',
  HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи',
  COMMENT_LENGTH: 'Длинна комментария не должна быть больше 140 символов',
};

// Объект с эффектами для фото.
export const effects = {
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
