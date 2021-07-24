import { renderMiniatures } from './pictures.js';
import { RANDOM_POSTS } from './service/constants.js';
import { debounce, getRandomArrayFromArray, removeChildsFromRoot } from './service/utils.js';

const filterButtonsClickHandler = (classRemove, classRemoveSecond, classAdd) => {
  classRemove.classList.remove('img-filters__button--active');
  classRemoveSecond.classList.remove('img-filters__button--active');
  classAdd.classList.add('img-filters__button--active');
};

export const initFilters = (posts) => {
  const localPosts = [...posts];
  let discussedPost;

  const filters = document.querySelector('.img-filters');
  const form = filters.querySelector('.img-filters__form');
  const defaultFilter = filters.querySelector('#filter-default');
  const randomFilter = filters.querySelector('#filter-random');
  const discussedFilter = filters.querySelector('#filter-discussed');
  const pictures = document.querySelector('.pictures');

  filters.classList.remove('img-filters--inactive');

  const renderPictures = (debounce(
    (data) => {
      removeChildsFromRoot(
        pictures,
        Array.from(pictures.querySelectorAll('.picture')),
      );
      renderMiniatures(data);
    },
    500,
  ));

  const onFiltersClick = (evt) => {
    switch (evt.target) {
      case randomFilter:
        filterButtonsClickHandler(defaultFilter, discussedFilter, randomFilter);
        renderPictures(
          getRandomArrayFromArray(posts, RANDOM_POSTS),
        );
        break;
      case discussedFilter:
        if (!discussedPost) {
          discussedPost = localPosts.sort((first, second) => second.comments.length - first.comments.length);
        }
        filterButtonsClickHandler(randomFilter, defaultFilter, discussedFilter);
        renderPictures(discussedPost);
        break;
      case defaultFilter:
        filterButtonsClickHandler(randomFilter, discussedFilter, defaultFilter);
        renderPictures(posts);
        break;
    }
  };

  filters.addEventListener('focus', () => {
    form.addEventListener('click', onFiltersClick);
  }, true);

  filters.addEventListener('blur', () => {
    form.removeEventListener('click', onFiltersClick);
  }, true);
};
