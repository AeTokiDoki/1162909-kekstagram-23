import { renderMiniatures } from './pictures.js';
import { getRandomArrayFromArray, removeChildsFromRoot } from './service/utils.js';

export const initFilters = (posts) => {
  const localPosts = [...posts];
  let discussedPost;

  const filters = document.querySelector('.img-filters');
  const form = filters.querySelector('.img-filters__form');
  const randomFilter = filters.querySelector('#filter-random');
  const discussedFilter = filters.querySelector('#filter-discussed');
  const pictures = document.querySelector('.pictures');

  filters.classList.remove('img-filters--inactive');

  const renderPictures = (data) => {
    removeChildsFromRoot(
      pictures,
      Array.from(pictures.querySelectorAll('.picture')),
    );
    renderMiniatures(data);
  };

  const onFiltersClick = (evt) => {
    switch (evt.target) {
      case randomFilter:
        renderPictures(
          getRandomArrayFromArray(posts, 10),
        );
        break;
      case discussedFilter:
        if (!discussedPost) {
          discussedPost = localPosts.sort((first, second) => second.comments.length - first.comments.length);
        }
        renderPictures(discussedPost);
        break;
      default:
        renderPictures(posts);
    }
  };

  filters.addEventListener('focus', () => {
    form.addEventListener('click', onFiltersClick);
  }, true);

  filters.addEventListener('blur', () => {
    form.removeEventListener('click', onFiltersClick);
  }, true);
};
