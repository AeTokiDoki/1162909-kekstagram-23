import './form-validation.js';
import './scale.js';
import './slider.js';
import { getData } from './api.js';
import { ACADEMY_URL } from './service/constants.js';
import { renderMiniatures } from './pictures.js';
import { initBigPicture } from './big-picture.js';
import { initFilters } from './filters.js';
import { showAlert } from './service/utils.js';


getData(
  ACADEMY_URL,
  (posts) => {
    renderMiniatures(posts);
    initBigPicture(posts);
    initFilters();
  },
  () => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'),
);
