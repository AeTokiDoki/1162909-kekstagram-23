/**
 * Принимает диапазон чисел.
 * @returns случайное положительное число.
 */
export const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Принимает данные строки и максимально допустимую длину, вычисляет длину строки.
 * @returns true / false.
 */
export const checkStringLength = (string, length) => string.length <= length;

/**
 * Принимает данные массива. Создаёт случайное число. Проверяет присутствует ли он в массиве и генерирует новое число.
 * @returns случайное уникальное число.
 */
const getRandomUnicNumber = (min, max, array) => {
  const number = getRandomPositiveInteger(min, max);
  if (array.includes(number)) {
    return getRandomUnicNumber(min, max, array);
  }
  return number;
};

const returnNewArray = (length) => new Array(length).fill();

/**
 * Принимает диапазон чисел и длину массива.
 * @returns массив случайных чисел.
 */
export const getArrayOfRandomNumbers = (min, max, length) => {
  const returnedArray = returnNewArray(length);
  returnedArray.forEach((item, index) => {
    returnedArray[index] = getRandomUnicNumber(min, max, returnedArray);
  });

  return returnedArray;
};

/**
 * Принимает id и array
 * @returns  массив уникальных id, с учётом id базового элемента.
 */
export const getArrayNumbersFromId = (array, id) => array.map((number) => id * 100 + number);

/**
 * Принимает массив.
 * @returns Случайный элемент из массива.
 */
export const getRandomElementFromArray = (array) => array[getRandomPositiveInteger(1, array.length - 1)];

/**
 * Принимает данные функции, массив ids, длину массива. Создаёт пустой массив , запускает процесс создания нового массива на основе текущего.
 * @returns возвращает массив значений.
 */
export const getArrayFromFunctionCall = (func, ids, length) => {
  if (ids.length < length) {
    throw new Error('Длина массива айдишников меньше ожидаемой длины возвращаемого массива');
  }
  return returnNewArray(length).map(
    (item, index) => func(ids[index]),
  );
};

export const renderElement = (root, node) => root.appendChild(node);

export const createNodes = (nodes) => {
  const fragment = document.createDocumentFragment();

  nodes.forEach((node) => {
    fragment.appendChild(node);
  });

  return fragment;
};
