/**
 * Фабрика, создающая функцию закрытия по нажатию Esc
 */
export const createOnEscKeyDown = (eventFunc) => (evt) => {
  if (evt.keyCode === 27) {
    eventFunc();
  }
};

/**
 * Добавляет/убирает класс hidden (переключатель)
 */
export const toggleHidden = (node) => node.classList.toggle('hidden');


export const createOnClickButton = (eventFunc) => (evt) => {
  evt.preventDefault();
  eventFunc();
};
